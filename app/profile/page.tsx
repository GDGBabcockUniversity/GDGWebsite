"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  GENDERS,
  TEAMS,
  STUDENT_STATUSES,
  TRACKS,
  DEPARTMENTS,
  FACULTIES,
  SKILL_LEVELS,
  MONTHS,
} from "@/lib/constants";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Save,
  LogOut,
  ArrowLeft,
  Loader2,
  Calendar,
  Building,
  Code2,
  ChevronDown,
  Users,
  Search,
} from "lucide-react";
import Link from "next/link";
import type { ProfileUpdatePayload } from "@/lib/auth-service";

export default function ProfilePage() {
  const { user, logout, updateUserProfile, loading, error } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [deptSearch, setDeptSearch] = useState("");
  const [facultySearch, setFacultySearch] = useState("");

  // Build form state from user
  const buildFormFromUser = () => {
    // Parse birthday from API's 'birthday' field
    let bDay: number | undefined = user?.birthday_day;
    let bMonth: number | undefined = user?.birthday_month;
    if (!bDay && user?.birthday) {
      const d = new Date(user.birthday);
      if (!isNaN(d.getTime())) {
        bDay = d.getUTCDate();
        bMonth = d.getUTCMonth() + 1;
      }
    }
    return {
      full_name: user?.full_name || "",
      whatsapp_number: user?.whatsapp_number || "",
      gender: user?.gender || "",
      birthday_day: bDay ?? undefined,
      birthday_month: bMonth ?? undefined,
      teams: user?.teams || [],
      student_status: user?.student_status || "",
      matric_no: user?.matric_no || "",
      department: user?.department || "",
      faculty: user?.faculty || "",
      primary_track: user?.primary_track || "",
      secondary_track: user?.secondary_track || "",
      primary_skill_level: user?.primary_skill_level || "",
      secondary_skill_level: user?.secondary_skill_level || "",
      avatar_url: user?.avatar_url || undefined,
    };
  };

  // Form state
  const [form, setForm] = useState<ProfileUpdatePayload>(buildFormFromUser());

  // Sync form state when user data arrives/changes
  useEffect(() => {
    if (user) {
      setForm(buildFormFromUser());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const filteredDepts = deptSearch
    ? DEPARTMENTS.filter((d) =>
        d.toLowerCase().includes(deptSearch.toLowerCase())
      )
    : DEPARTMENTS;

  const filteredFaculties = facultySearch
    ? FACULTIES.filter((f) =>
        f.toLowerCase().includes(facultySearch.toLowerCase())
      )
    : FACULTIES;

  const updateField = (field: keyof ProfileUpdatePayload, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccessMsg("");
    try {
      // Strip undefined values so we don't accidentally null out fields on the backend
      const payload: ProfileUpdatePayload = {};
      if (form.full_name) payload.full_name = form.full_name;
      if (form.whatsapp_number) payload.whatsapp_number = form.whatsapp_number;
      if (form.gender) payload.gender = form.gender;
      if (form.birthday_day != null && form.birthday_month != null) {
        // API expects 'birthday' as ISO date string — use year 2000 as placeholder
        const m = String(form.birthday_month).padStart(2, "0");
        const d = String(form.birthday_day).padStart(2, "0");
        payload.birthday = `2000-${m}-${d}`;
      }
      if (form.teams && form.teams.length > 0) payload.teams = form.teams;
      if (form.student_status) payload.student_status = form.student_status;
      if (form.matric_no) payload.matric_no = form.matric_no;
      if (form.department) payload.department = form.department;
      if (form.faculty) payload.faculty = form.faculty;
      if (form.primary_track) payload.primary_track = form.primary_track;
      if (form.secondary_track) payload.secondary_track = form.secondary_track;
      if (form.primary_skill_level) payload.primary_skill_level = form.primary_skill_level;
      if (form.secondary_skill_level) payload.secondary_skill_level = form.secondary_skill_level;
      if (form.avatar_url) payload.avatar_url = form.avatar_url;

      await updateUserProfile(payload);
      setIsEditing(false);
      setSuccessMsg("Profile updated successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch {
      // error is set in context
    } finally {
      setSaving(false);
    }
  };

  const handleStartEditing = () => {
    setForm(buildFormFromUser());
    setDeptSearch("");
    setFacultySearch("");
    setIsEditing(true);
  };

  if (loading) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gdg-blue" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="max-w-md mx-auto bg-card border border-border rounded-2xl p-8">
            <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Not signed in
            </h1>
            <p className="text-muted-foreground mb-6">
              Sign in to view and manage your profile.
            </p>
            <Link href="/">
              <Button className="bg-white hover:bg-white rounded-full font-semibold text-black glow-blue hover:scale-[1.02] transition-all">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Parse birthday from API's 'birthday' field (ISO date string) into day/month
  const parsedBirthday = (() => {
    if (user.birthday) {
      const d = new Date(user.birthday);
      if (!isNaN(d.getTime())) {
        return { day: d.getUTCDate(), month: d.getUTCMonth() + 1 };
      }
    }
    if (user.birthday_day && user.birthday_month) {
      return { day: user.birthday_day, month: user.birthday_month };
    }
    return null;
  })();

  // Get initials for avatar fallback
  const initials = user.full_name
    ? user.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back nav */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>

        <div className="max-w-3xl mx-auto">
          {/* Profile Header Card */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
            {/* Gradient banner */}
            <div className="h-32 bg-gradient-to-r from-gdg-blue via-gdg-red to-gdg-yellow" />

            <div className="px-6 sm:px-8 pb-6">
              {/* Avatar + name */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12">
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.full_name}
                    className="w-24 h-24 rounded-full border-4 border-card object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full border-4 border-card bg-gdg-blue flex items-center justify-center text-white text-2xl font-bold">
                    {initials}
                  </div>
                )}
                <div className="flex-1 min-w-0 pt-2 sm:pt-0">
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground truncate">
                    {user.full_name || "GDG Member"}
                  </h1>
                  <p className="text-muted-foreground text-sm">{user.email}</p>
                  {user.primary_track && (
                    <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-gdg-blue/20 text-gdg-blue border border-gdg-blue/30">
                      {user.primary_track}
                    </span>
                  )}
                </div>
                <div className="flex gap-2 sm:ml-auto">
                  {!isEditing ? (
                    <Button
                      onClick={handleStartEditing}
                      className="bg-white hover:bg-gray-100 text-black rounded-full font-medium h-10 px-5"
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="rounded-full h-10 px-5"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-gdg-blue hover:bg-gdg-blue/90 text-white rounded-full font-medium h-10 px-5 glow-blue"
                      >
                        {saving ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        Save
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Success / Error messages */}
          {successMsg && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-gdg-green/10 border border-gdg-green/30 text-gdg-green text-sm font-medium">
              {successMsg}
            </div>
          )}
          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm font-medium">
              {error}
            </div>
          )}

          {/* Profile Details */}
          <div className="grid gap-6">
            {/* Personal Information */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <User className="h-5 w-5 text-gdg-blue" />
                Personal Information
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <FieldRow
                  icon={<User className="h-4 w-4" />}
                  label="Full Name"
                  value={isEditing ? undefined : user.full_name}
                  editing={isEditing}
                  input={
                    <Input
                      value={form.full_name}
                      onChange={(e) => updateField("full_name", e.target.value)}
                      className="h-11 rounded-xl bg-background"
                    />
                  }
                />
                <FieldRow
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  value={user.email}
                />
                <FieldRow
                  icon={<Phone className="h-4 w-4" />}
                  label="WhatsApp"
                  value={isEditing ? undefined : user.whatsapp_number}
                  editing={isEditing}
                  input={
                    <Input
                      value={form.whatsapp_number}
                      onChange={(e) =>
                        updateField("whatsapp_number", e.target.value)
                      }
                      placeholder="+234..."
                      className="h-11 rounded-xl bg-background"
                    />
                  }
                />
                <SelectRow
                  icon={<User className="h-4 w-4" />}
                  label="Gender"
                  value={isEditing ? form.gender : user.gender}
                  editing={isEditing}
                  options={GENDERS}
                  onChange={(v) => updateField("gender", v)}
                />
                <FieldRow
                  icon={<Calendar className="h-4 w-4" />}
                  label="Birthday"
                  value={
                    isEditing
                      ? undefined
                      : parsedBirthday
                        ? `${MONTHS[parsedBirthday.month - 1]} ${parsedBirthday.day}`
                        : undefined
                  }
                  editing={isEditing}
                  input={
                    <div className="flex gap-2">
                      <select
                        value={form.birthday_month || ""}
                        onChange={(e) =>
                          updateField(
                            "birthday_month",
                            e.target.value ? parseInt(e.target.value) : undefined
                          )
                        }
                        className="flex-1 h-11 rounded-xl bg-background border border-border px-3 text-foreground text-sm"
                      >
                        <option value="">Month</option>
                        {MONTHS.map((m, i) => (
                          <option key={m} value={i + 1}>
                            {m}
                          </option>
                        ))}
                      </select>
                      <Input
                        type="number"
                        min={1}
                        max={31}
                        value={form.birthday_day || ""}
                        onChange={(e) =>
                          updateField(
                            "birthday_day",
                            e.target.value
                              ? parseInt(e.target.value)
                              : undefined
                          )
                        }
                        placeholder="Day"
                        className="w-20 h-11 rounded-xl bg-background"
                      />
                    </div>
                  }
                />
              </div>
            </section>

            {/* Academic Information */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-gdg-green" />
                Academic Information
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <SelectRow
                  icon={<GraduationCap className="h-4 w-4" />}
                  label="Student Status"
                  value={isEditing ? form.student_status : user.student_status}
                  editing={isEditing}
                  options={STUDENT_STATUSES}
                  onChange={(v) => updateField("student_status", v)}
                />
                <FieldRow
                  icon={<GraduationCap className="h-4 w-4" />}
                  label="Matric No."
                  value={isEditing ? undefined : user.matric_no}
                  editing={isEditing}
                  input={
                    <Input
                      value={form.matric_no}
                      onChange={(e) =>
                        updateField("matric_no", e.target.value)
                      }
                      placeholder="e.g. 20/0001"
                      className="h-11 rounded-xl bg-background"
                    />
                  }
                />
                {/* Department — searchable list when editing */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5">
                    <Building className="h-4 w-4" />
                    Department
                  </label>
                  {isEditing ? (
                    <>
                      <div className="relative mb-1.5">
                        <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                        <Input
                          placeholder="Search departments..."
                          value={deptSearch}
                          onChange={(e) => setDeptSearch(e.target.value)}
                          className="h-10 rounded-xl bg-background pl-9 text-sm"
                        />
                      </div>
                      <div className="max-h-36 overflow-y-auto rounded-xl border border-border bg-background p-1 space-y-0.5">
                        {filteredDepts.map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => {
                              updateField("department", d);
                              setDeptSearch("");
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              form.department === d
                                ? "bg-gdg-blue text-white"
                                : "hover:bg-white/5 text-foreground"
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                        {filteredDepts.length === 0 && (
                          <p className="text-sm text-muted-foreground px-3 py-2">No results</p>
                        )}
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-foreground">{user.department || "—"}</p>
                  )}
                </div>
                {/* Faculty — searchable list when editing */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5">
                    <Building className="h-4 w-4" />
                    Faculty / School
                  </label>
                  {isEditing ? (
                    <>
                      <div className="relative mb-1.5">
                        <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                        <Input
                          placeholder="Search faculties..."
                          value={facultySearch}
                          onChange={(e) => setFacultySearch(e.target.value)}
                          className="h-10 rounded-xl bg-background pl-9 text-sm"
                        />
                      </div>
                      <div className="max-h-36 overflow-y-auto rounded-xl border border-border bg-background p-1 space-y-0.5">
                        {filteredFaculties.map((f) => (
                          <button
                            key={f}
                            type="button"
                            onClick={() => {
                              updateField("faculty", f);
                              setFacultySearch("");
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              form.faculty === f
                                ? "bg-gdg-blue text-white"
                                : "hover:bg-white/5 text-foreground"
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                        {filteredFaculties.length === 0 && (
                          <p className="text-sm text-muted-foreground px-3 py-2">No results</p>
                        )}
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-foreground">{user.faculty || "—"}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Teams */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <Users className="h-5 w-5 text-gdg-red" />
                Teams
              </h2>
              {isEditing ? (
                <div className="grid grid-cols-2 gap-2">
                  {TEAMS.map((team) => {
                    const selected = (form.teams || []).includes(team);
                    const maxed = (form.teams || []).length >= 2 && !selected;
                    return (
                      <button
                        key={team}
                        type="button"
                        disabled={maxed}
                        onClick={() => {
                          const current = form.teams || [];
                          const next = selected
                            ? current.filter((t) => t !== team)
                            : [...current, team];
                          updateField("teams", next);
                        }}
                        className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all text-left ${
                          selected
                            ? "bg-gdg-blue text-white border-gdg-blue"
                            : "bg-background border-border text-foreground hover:border-gdg-blue/50"
                        } ${maxed ? "opacity-40 cursor-not-allowed" : ""}`}
                      >
                        {team}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {user.teams && user.teams.length > 0 ? (
                    user.teams.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-sm font-medium rounded-full bg-gdg-red/20 text-gdg-red border border-gdg-red/30"
                      >
                        {t}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">—</p>
                  )}
                </div>
              )}
            </section>

            {/* Track & Skills */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <Code2 className="h-5 w-5 text-gdg-yellow" />
                Tracks & Skills
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <SelectRow
                  icon={<Briefcase className="h-4 w-4" />}
                  label="Primary Track"
                  value={
                    isEditing ? form.primary_track : user.primary_track
                  }
                  editing={isEditing}
                  options={TRACKS}
                  onChange={(v) => updateField("primary_track", v)}
                />
                <SelectRow
                  icon={<Code2 className="h-4 w-4" />}
                  label="Primary Skill Level"
                  value={
                    isEditing
                      ? form.primary_skill_level
                      : user.primary_skill_level
                  }
                  editing={isEditing}
                  options={SKILL_LEVELS.map((sl) => sl.label)}
                  optionValues={SKILL_LEVELS.map((sl) => sl.value)}
                  onChange={(v) => updateField("primary_skill_level", v)}
                />
                <SelectRow
                  icon={<Briefcase className="h-4 w-4" />}
                  label="Secondary Track"
                  value={
                    isEditing
                      ? form.secondary_track
                      : user.secondary_track
                  }
                  editing={isEditing}
                  options={TRACKS.filter((t) => t !== (isEditing ? form.primary_track : user.primary_track))}
                  onChange={(v) => updateField("secondary_track", v)}
                  allowEmpty
                />
                {(isEditing ? form.secondary_track : user.secondary_track) && (
                  <SelectRow
                    icon={<Code2 className="h-4 w-4" />}
                    label="Secondary Skill Level"
                    value={
                      isEditing
                        ? form.secondary_skill_level
                        : user.secondary_skill_level
                    }
                    editing={isEditing}
                    options={SKILL_LEVELS.map((sl) => sl.label)}
                    optionValues={SKILL_LEVELS.map((sl) => sl.value)}
                    onChange={(v) => updateField("secondary_skill_level", v)}
                  />
                )}
              </div>
            </section>

            {/* Account Info (read only) */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-gdg-blue" />
                Account
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <FieldRow
                  label="Member since"
                  value={
                    user.created_at
                      ? new Date(user.created_at).toLocaleDateString("en-NG", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "—"
                  }
                />
                <FieldRow
                  label="Platform ID"
                  value={user.id?.slice(0, 8) + "…"}
                />
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <Button
                  onClick={logout}
                  variant="outline"
                  className="rounded-full text-destructive border-destructive/30 hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── Reusable field components ──────────────────────────────────────────────

function FieldRow({
  icon,
  label,
  value,
  editing,
  input,
}: {
  icon?: React.ReactNode;
  label: string;
  value?: string | null;
  editing?: boolean;
  input?: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5">
        {icon}
        {label}
      </label>
      {editing && input ? (
        input
      ) : (
        <p className="text-sm text-foreground">{value || "—"}</p>
      )}
    </div>
  );
}

function SelectRow({
  icon,
  label,
  value,
  editing,
  options,
  optionValues,
  onChange,
  allowEmpty,
}: {
  icon?: React.ReactNode;
  label: string;
  value?: string | null;
  editing?: boolean;
  options: string[];
  optionValues?: string[];
  onChange?: (value: string) => void;
  allowEmpty?: boolean;
}) {
  // For display: map stored value to label if optionValues provided
  const displayValue = (() => {
    if (!value) return "—";
    if (optionValues) {
      const idx = optionValues.indexOf(value);
      return idx >= 0 ? options[idx] : value;
    }
    return value;
  })();

  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5">
        {icon}
        {label}
      </label>
      {editing ? (
        <div className="relative">
          <select
            value={value || ""}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full h-11 rounded-xl bg-background border border-border px-3 text-foreground text-sm appearance-none cursor-pointer"
          >
            <option value="">{allowEmpty ? "None" : "Select\u2026"}</option>
            {options.map((opt, i) => (
              <option key={opt} value={optionValues ? optionValues[i] : opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="h-4 w-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      ) : (
        <p className="text-sm text-foreground">{displayValue}</p>
      )}
    </div>
  );
}
