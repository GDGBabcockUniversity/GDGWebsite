"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  createEvent,
  fetchAdminEvents,
  updateEvent,
  type EventInput,
  type PlatformEvent,
} from "@/lib/events-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EMPTY_FORM: EventInput = {
  title: "",
  description: "",
  location: "",
  starts_at: "",
  ends_at: "",
  capacity: undefined,
  status: "draft",
  certificate_type: "participation",
  cover_image_url: "",
};

function toDatetimeLocal(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<PlatformEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EventInput>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = async () => {
    setLoading(true);
    const all = await fetchAdminEvents();
    setEvents(
      all.sort(
        (a, b) => new Date(b.starts_at).getTime() - new Date(a.starts_at).getTime()
      )
    );
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError(null);
    setShowForm(true);
  };

  const openEdit = (event: PlatformEvent) => {
    setEditingId(event.id);
    setForm({
      title: event.title,
      description: event.description || "",
      location: event.location || "",
      starts_at: toDatetimeLocal(event.starts_at),
      ends_at: toDatetimeLocal(event.ends_at),
      capacity: event.capacity ?? undefined,
      status: event.status,
      certificate_type: event.certificate_type,
      cover_image_url: event.cover_image_url || "",
    });
    setError(null);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload: EventInput = {
        ...form,
        starts_at: form.starts_at ? new Date(form.starts_at).toISOString() : "",
        ends_at: form.ends_at ? new Date(form.ends_at).toISOString() : undefined,
        capacity: form.capacity ? Number(form.capacity) : null,
      };
      if (editingId) {
        await updateEvent(editingId, payload);
      } else {
        await createEvent(payload);
      }
      setShowForm(false);
      await loadEvents();
    } catch (err: any) {
      setError(err?.message || "Failed to save event");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gdg-cream">Events</h1>
        <Button onClick={openCreate}>New event</Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-3xl border border-white/12 bg-[#161616] p-6"
        >
          <h2 className="text-lg font-bold text-gdg-cream">
            {editingId ? "Edit event" : "New event"}
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Title">
              <Input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </Field>
            <Field label="Location">
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </Field>
            <Field label="Starts at">
              <Input
                required
                type="datetime-local"
                value={form.starts_at}
                onChange={(e) => setForm({ ...form, starts_at: e.target.value })}
              />
            </Field>
            <Field label="Ends at">
              <Input
                type="datetime-local"
                value={form.ends_at}
                onChange={(e) => setForm({ ...form, ends_at: e.target.value })}
              />
            </Field>
            <Field label="Capacity (blank = unlimited)">
              <Input
                type="number"
                min={1}
                value={form.capacity ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    capacity: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
              />
            </Field>
            <Field label="Cover image URL">
              <Input
                value={form.cover_image_url}
                onChange={(e) =>
                  setForm({ ...form, cover_image_url: e.target.value })
                }
              />
            </Field>
            <Field label="Status">
              <select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as EventInput["status"] })
                }
                className="h-9 w-full rounded-md border border-white/15 bg-transparent px-3 text-sm text-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="ended">Ended</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </Field>
            <Field label="Certificate type">
              <select
                value={form.certificate_type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    certificate_type: e.target.value as EventInput["certificate_type"],
                  })
                }
                className="h-9 w-full rounded-md border border-white/15 bg-transparent px-3 text-sm text-white"
              >
                <option value="participation">Participation</option>
                <option value="completion">Completion</option>
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Description">
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={4}
                  className="w-full rounded-md border border-white/15 bg-transparent px-3 py-2 text-sm text-white"
                />
              </Field>
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

          <div className="mt-6 flex gap-3">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : editingId ? "Save changes" : "Create event"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="mt-10 overflow-x-auto rounded-3xl border border-white/12">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-white/12 text-xs uppercase tracking-wide text-white/40">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Starts</th>
              <th className="px-4 py-3">Registered</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-6 text-white/50" colSpan={5}>
                  Loading…
                </td>
              </tr>
            ) : events.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-white/50" colSpan={5}>
                  No events yet.
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id} className="border-b border-white/6">
                  <td className="px-4 py-3 font-medium text-gdg-cream">
                    <Link
                      href={`/admin/events/${event.id}`}
                      className="hover:underline"
                    >
                      {event.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 capitalize text-white/70">
                    {event.status}
                  </td>
                  <td className="px-4 py-3 text-white/70">
                    {formatDate(event.starts_at)}
                  </td>
                  <td className="px-4 py-3 text-white/70">
                    {event.registered_count ?? 0}
                    {typeof event.capacity === "number" ? ` / ${event.capacity}` : ""}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => openEdit(event)}
                      className="text-xs font-semibold text-white/60 hover:text-white"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
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
