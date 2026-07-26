"use client";

import { useEffect, useRef, useState } from "react";
import {
  createTeamMember,
  deactivateTeamMember,
  deleteTeamPhoto,
  fetchAdminTeam,
  updateTeamMember,
  uploadTeamPhoto,
  type AdminRosterMember,
  type TeamMemberInput,
} from "@/lib/team-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageCropper, { OUTPUT_SIZE } from "@/components/image-cropper";

const SECTIONS = ["core", "tracks", "dev", "media", "events"];

const EMPTY_FORM: TeamMemberInput = {
  name: "",
  role: "",
  section: "core",
  subteam: "",
  is_lead: false,
  image_url: "",
  words_to_live_by: "",
  twitter_url: "",
  linkedin_url: "",
  portfolio_url: "",
  spotify_track_name: "",
  spotify_track_artist: "",
  spotify_track_url: "",
  team_year: "current",
  display_order: 0,
};

export default function AdminTeamPage() {
  const [members, setMembers] = useState<AdminRosterMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TeamMemberInput>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Photo state. `cropSrc` is the object URL currently in the cropper;
  // `pendingPhoto` is a cropped result held back because the member has no id
  // yet (a brand-new member can't be uploaded to until it's been created).
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [pendingPhoto, setPendingPhoto] = useState<string | null>(null);
  const [photoBusy, setPhotoBusy] = useState(false);

  const loadMembers = async () => {
    setLoading(true);
    const all = await fetchAdminTeam();
    setMembers(
      all.sort((a, b) => a.display_order - b.display_order || a.name.localeCompare(b.name))
    );
    setLoading(false);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const resetPhotoState = () => {
    setCropSrc((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });
    setPendingPhoto(null);
    setPhotoBusy(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError(null);
    resetPhotoState();
    setShowForm(true);
  };

  const handleFilePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("That file isn't an image");
      return;
    }
    setError(null);
    setCropSrc(URL.createObjectURL(file));
  };

  /**
   * An existing member is updated immediately — that's the least surprising
   * behaviour for "replace photo". A new one has no id to upload against, so
   * the crop is held and sent once the member exists.
   */
  const handleCropped = async (dataUrl: string) => {
    resetPhotoState();
    if (!editingId) {
      setPendingPhoto(dataUrl);
      return;
    }
    setPhotoBusy(true);
    setError(null);
    try {
      const updated = await uploadTeamPhoto(editingId, dataUrl, OUTPUT_SIZE);
      setForm((f) => ({ ...f, image_url: updated.image_url || "" }));
      await loadMembers();
    } catch (err: any) {
      setError(err?.message || "Failed to upload photo");
    } finally {
      setPhotoBusy(false);
    }
  };

  const handleRemovePhoto = async () => {
    if (pendingPhoto) {
      setPendingPhoto(null);
      return;
    }
    if (!editingId) {
      setForm((f) => ({ ...f, image_url: "" }));
      return;
    }
    setPhotoBusy(true);
    setError(null);
    try {
      await deleteTeamPhoto(editingId);
      setForm((f) => ({ ...f, image_url: "" }));
      await loadMembers();
    } catch (err: any) {
      setError(err?.message || "Failed to remove photo");
    } finally {
      setPhotoBusy(false);
    }
  };

  const openEdit = (member: AdminRosterMember) => {
    setEditingId(member.id);
    setForm({
      name: member.name,
      role: member.role,
      section: member.section,
      subteam: member.subteam || "",
      is_lead: member.is_lead,
      image_url: member.image_url || "",
      words_to_live_by: member.words_to_live_by || "",
      twitter_url: member.twitter_url || "",
      linkedin_url: member.linkedin_url || "",
      portfolio_url: member.portfolio_url || "",
      spotify_track_name: member.spotify_track_name || "",
      spotify_track_artist: member.spotify_track_artist || "",
      spotify_track_url: member.spotify_track_url || "",
      team_year: member.team_year,
      display_order: member.display_order,
    });
    setError(null);
    resetPhotoState();
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload: TeamMemberInput = {
        ...form,
        subteam: form.subteam || undefined,
        display_order: Number(form.display_order) || 0,
      };
      const saved = editingId
        ? await updateTeamMember(editingId, payload)
        : await createTeamMember(payload);

      // A crop taken before the member existed goes up now that it has an id.
      if (pendingPhoto && saved?.id) {
        await uploadTeamPhoto(saved.id, pendingPhoto, OUTPUT_SIZE);
      }

      setShowForm(false);
      resetPhotoState();
      await loadMembers();
    } catch (err: any) {
      setError(err?.message || "Failed to save team member");
    } finally {
      setSaving(false);
    }
  };

  const handleDeactivate = async (id: string) => {
    await deactivateTeamMember(id);
    await loadMembers();
  };

  return (
    <>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gdg-cream">Team roster</h1>
        <Button onClick={openCreate}>New member</Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-3xl border border-white/12 bg-[#161616] p-6"
        >
          <h2 className="text-lg font-bold text-gdg-cream">
            {editingId ? "Edit member" : "New member"}
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Name">
              <Input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Field>
            <Field label="Role / title">
              <Input
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
            </Field>
            <Field label="Section">
              <select
                value={form.section}
                onChange={(e) => setForm({ ...form, section: e.target.value })}
                className="h-9 w-full rounded-md border border-white/15 bg-transparent px-3 text-sm text-white"
              >
                {SECTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Subteam">
              <Input
                value={form.subteam ?? ""}
                onChange={(e) => setForm({ ...form, subteam: e.target.value })}
              />
            </Field>
            <Field label="Team year">
              <Input
                value={form.team_year}
                onChange={(e) => setForm({ ...form, team_year: e.target.value })}
              />
            </Field>
            <Field label="Display order">
              <Input
                type="number"
                value={form.display_order ?? 0}
                onChange={(e) =>
                  setForm({ ...form, display_order: Number(e.target.value) })
                }
              />
            </Field>
            <Field label="Photo">
              {(() => {
                // A crop waiting to be uploaded wins over the saved URL, so
                // the preview always shows what will actually be saved.
                const preview = pendingPhoto || form.image_url || "";
                return (
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/12 bg-background">
                      {preview ? (
                        // Deliberately a plain <img>: the source is often a
                        // data URL that hasn't been uploaded yet, which
                        // next/image can't take.
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={preview}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] text-white/35">
                          No photo
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFilePicked}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        disabled={photoBusy}
                        onClick={() => fileInputRef.current?.click()}
                        className="rounded-full bg-gdg-blue px-4 text-xs font-semibold text-white hover:bg-gdg-blue/90"
                      >
                        {photoBusy
                          ? "Working…"
                          : preview
                            ? "Replace photo"
                            : "Upload photo"}
                      </Button>
                      {preview && (
                        <Button
                          type="button"
                          disabled={photoBusy}
                          onClick={handleRemovePhoto}
                          className="rounded-full border border-white/15 bg-transparent px-4 text-xs font-semibold text-gdg-cream hover:bg-white/5"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })()}
              {pendingPhoto && (
                <p className="mt-2 text-xs text-white/45">
                  Uploads when you save this member.
                </p>
              )}
            </Field>
            <Field label="Image URL (fallback)">
              <Input
                value={form.image_url ?? ""}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                placeholder="Or paste a link to an image"
              />
            </Field>
            <Field label="Lead">
              <label className="flex h-9 items-center gap-2 text-sm text-white/80">
                <input
                  type="checkbox"
                  checked={!!form.is_lead}
                  onChange={(e) => setForm({ ...form, is_lead: e.target.checked })}
                />
                Leads this section/subteam
              </label>
            </Field>
            <Field label="Twitter/X URL">
              <Input
                value={form.twitter_url ?? ""}
                onChange={(e) => setForm({ ...form, twitter_url: e.target.value })}
              />
            </Field>
            <Field label="LinkedIn URL">
              <Input
                value={form.linkedin_url ?? ""}
                onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
              />
            </Field>
            <Field label="Portfolio URL">
              <Input
                value={form.portfolio_url ?? ""}
                onChange={(e) => setForm({ ...form, portfolio_url: e.target.value })}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Words to live by">
                <textarea
                  value={form.words_to_live_by ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, words_to_live_by: e.target.value })
                  }
                  rows={2}
                  className="w-full rounded-md border border-white/15 bg-transparent px-3 py-2 text-sm text-white"
                />
              </Field>
            </div>
            <Field label="Spotify track name">
              <Input
                value={form.spotify_track_name ?? ""}
                onChange={(e) =>
                  setForm({ ...form, spotify_track_name: e.target.value })
                }
              />
            </Field>
            <Field label="Spotify artist">
              <Input
                value={form.spotify_track_artist ?? ""}
                onChange={(e) =>
                  setForm({ ...form, spotify_track_artist: e.target.value })
                }
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Spotify embed URL">
                <Input
                  value={form.spotify_track_url ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, spotify_track_url: e.target.value })
                  }
                />
              </Field>
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

          <div className="mt-6 flex gap-3">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : editingId ? "Save changes" : "Add member"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="mt-10 overflow-x-auto rounded-3xl border border-white/12">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-white/12 text-xs uppercase tracking-wide text-white/40">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Section</th>
              <th className="px-4 py-3">Subteam</th>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">Public</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-6 text-white/50" colSpan={7}>
                  Loading…
                </td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-white/50" colSpan={7}>
                  No team members yet.
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr key={member.id} className="border-b border-white/6">
                  <td className="px-4 py-3 font-medium text-gdg-cream">
                    {member.name}
                  </td>
                  <td className="px-4 py-3 text-white/70">{member.role}</td>
                  <td className="px-4 py-3 text-white/70">{member.section}</td>
                  <td className="px-4 py-3 text-white/70">
                    {member.subteam || "—"}
                  </td>
                  <td className="px-4 py-3 text-white/70">{member.team_year}</td>
                  <td className="px-4 py-3 text-white/70">
                    {member.is_public ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => openEdit(member)}
                      className="mr-4 text-xs font-semibold text-white/60 hover:text-white"
                    >
                      Edit
                    </button>
                    {member.is_public && (
                      <button
                        onClick={() => handleDeactivate(member.id)}
                        className="text-xs font-semibold text-red-400 hover:text-red-300"
                      >
                        Deactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {cropSrc && (
        <ImageCropper
          src={cropSrc}
          onCancel={resetPhotoState}
          onCropped={handleCropped}
        />
      )}
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-white/50">
        {label}
      </label>
      {children}
    </div>
  );
}
