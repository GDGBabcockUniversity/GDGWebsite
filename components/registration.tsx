"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/auth-provider";
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
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Loader2,
  User,
  GraduationCap,
  Search,
} from "lucide-react";

interface FormData {
  full_name: string;
  email: string;
  password: string;
  gender: string;
  whatsapp_number: string;
  birthday_day: number | undefined;
  birthday_month: number | undefined;
  teams: string[];
  student_status: string;
  matric_no: string;
  department: string;
  faculty: string;
  primary_track: string;
  secondary_track: string;
  primary_skill_level: string;
  secondary_skill_level: string;
}

const INITIAL_FORM: FormData = {
  full_name: "",
  email: "",
  password: "",
  gender: "",
  whatsapp_number: "",
  birthday_day: undefined,
  birthday_month: undefined,
  teams: [],
  student_status: "",
  matric_no: "",
  department: "",
  faculty: "",
  primary_track: "",
  secondary_track: "",
  primary_skill_level: "",
  secondary_skill_level: "",
};

export default function Registration() {
  const { isAuthenticated, user, loginWithGoogle, signUpWithEmail, updateUserProfile } =
    useAuth();
  const [step, setStep] = useState(0); // 0 = account, 1 = personal, 2 = academic
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [deptSearch, setDeptSearch] = useState("");
  const [facultySearch, setFacultySearch] = useState("");

  // Pre-fill form fields from authenticated user data (Google sign-in)
  useEffect(() => {
    if (isAuthenticated && user) {
      setForm((prev) => ({
        ...prev,
        full_name: prev.full_name || user.full_name || "",
        email: prev.email || user.email || "",
        gender: prev.gender || user.gender || "",
        whatsapp_number: prev.whatsapp_number || user.whatsapp_number || "",
        birthday_day: prev.birthday_day || user.birthday_day || undefined,
        birthday_month: prev.birthday_month || user.birthday_month || undefined,
        teams: prev.teams.length > 0 ? prev.teams : user.teams || [],
        student_status: prev.student_status || user.student_status || "",
        matric_no: prev.matric_no || user.matric_no || "",
        department: prev.department || user.department || "",
        faculty: prev.faculty || user.faculty || "",
        primary_track: prev.primary_track || user.primary_track || "",
        secondary_track: prev.secondary_track || user.secondary_track || "",
        primary_skill_level: prev.primary_skill_level || user.primary_skill_level || "",
        secondary_skill_level: prev.secondary_skill_level || user.secondary_skill_level || "",
      }));
    }
  }, [isAuthenticated, user]);

  const updateField = (field: keyof FormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const toggleTeam = (team: string) => {
    setForm((prev) => {
      const teams = prev.teams.includes(team)
        ? prev.teams.filter((t) => t !== team)
        : prev.teams.length < 2
          ? [...prev.teams, team]
          : prev.teams;
      return { ...prev, teams };
    });
  };

  // ── Step validation ─────────────────────────────────────────────────────

  const validateStep0 = () => {
    if (isAuthenticated) return true;
    if (!form.email.trim()) return "Email is required";
    if (!form.password || form.password.length < 6)
      return "Password must be at least 6 characters";
    return true;
  };

  const validateStep1 = () => {
    if (!form.full_name.trim()) return "Full name is required";
    if (!form.gender) return "Gender is required";
    if (!form.whatsapp_number.trim()) return "WhatsApp number is required";
    if (!form.birthday_month || !form.birthday_day) return "Birthday is required";
    if (form.teams.length === 0) return "Select at least one team";
    if (!form.student_status) return "Student status is required";
    return true;
  };

  const validateStep2 = () => {
    if (form.student_status !== "Non-Student" && !form.matric_no.trim()) return "Matric number is required";
    if (!form.department) return "Department is required";
    if (!form.faculty) return "Faculty is required";
    if (!form.primary_track) return "Primary track is required";
    if (!form.primary_skill_level) return "Skill level is required";
    return true;
  };

  const validators = [validateStep0, validateStep1, validateStep2];

  const handleNext = () => {
    const result = validators[step]();
    if (result !== true) {
      setError(result);
      return;
    }
    setError("");
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setError("");
    setStep((s) => s - 1);
  };

  // ── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    const result = validateStep2();
    if (result !== true) {
      setError(result);
      return;
    }

    setLoading(true);
    setError("");

    const profilePayload: Record<string, any> = {
      full_name: form.full_name,
      whatsapp_number: form.whatsapp_number,
      gender: form.gender,
      teams: form.teams,
      student_status: form.student_status,
      matric_no: form.matric_no,
      department: form.department,
      faculty: form.faculty,
      primary_track: form.primary_track,
      primary_skill_level: form.primary_skill_level,
    };
    // Ensure birthday is sent in the format the API expects
    if (form.birthday_day != null && form.birthday_month != null) {
      const m = String(form.birthday_month).padStart(2, "0");
      const d = String(form.birthday_day).padStart(2, "0");
      profilePayload.birthday = `2000-${m}-${d}`;
    }
    if (form.secondary_track) profilePayload.secondary_track = form.secondary_track;
    if (form.secondary_skill_level) profilePayload.secondary_skill_level = form.secondary_skill_level;

    try {
      // Step 1: Create account if not already authenticated
      if (!isAuthenticated) {
        await signUpWithEmail(form.email, form.password);
        // Give auth state a moment to settle before updating profile
        await new Promise((r) => setTimeout(r, 500));
      }

      // Step 2: Update profile with all the form data
      // Retry up to 3 times in case auth tokens are still propagating
      let lastError: Error | null = null;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          await updateUserProfile(profilePayload);
          lastError = null;
          break;
        } catch (err: any) {
          lastError = err;
          if (attempt < 2) {
            await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
          }
        }
      }

      if (lastError) {
        throw lastError;
      }

      // Step 3: Send welcome email (best-effort, don't block registration)
      try {
        await fetch("/api/send-welcome-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.full_name,
            email: form.email || user?.email,
            primaryTrack: form.primary_track,
            secondaryTrack: form.secondary_track,
          }),
        });
      } catch {
        // Email failure should never block registration
      }

      setDone(true);
    } catch (err: any) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError("");
    try {
      await loginWithGoogle();
      setStep(1);
    } catch (err: any) {
      if (err?.code !== "auth/popup-closed-by-user") {
        setError(err?.message || "Google sign-in failed");
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Done state ────────────────────────────────────────────────────────────

  if (done) {
    return (
      <section id="registration" className="py-16 sm:py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto text-center">
            <div className="bg-card border border-border rounded-2xl p-10">
              <div className="w-16 h-16 rounded-full bg-gdg-green/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8 text-gdg-green" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                Welcome to GDG Babcock! 🎉
              </h2>
              <p className="text-muted-foreground mb-6">
                Your account has been created and your profile is set up. Check
                your email for next steps and community access links.
              </p>
              <Button
                onClick={() => (window.location.href = "/profile")}
                className="bg-white hover:bg-gray-100 text-black rounded-full font-semibold h-12 px-8"
              >
                View Your Profile
                <div className="flex items-center justify-center bg-black rounded-full p-1 ml-1">
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Step indicators ───────────────────────────────────────────────────────

  const steps = [
    { label: "Account", icon: User },
    { label: "Personal Info", icon: User },
    { label: "Academic & Track", icon: GraduationCap },
  ];

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

  return (
    <section id="registration" className="py-16 sm:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            Join GDG Babcock
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Become part of Nigeria&apos;s most innovative campus tech community.
            Create your account and we&apos;ll get you started on your tech
            journey!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    i === step
                      ? "bg-gdg-blue text-white"
                      : i < step
                        ? "bg-gdg-green/20 text-gdg-green"
                        : "bg-card border border-border text-muted-foreground"
                  }`}
                >
                  {i < step ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <s.icon className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">{s.label}</span>
                  <span className="sm:hidden">{i + 1}</span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 mx-1 ${i < step ? "bg-gdg-green" : "bg-border"}`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form card */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg">
            {/* ── Step 0: Account ─────────────────────────────────────── */}
            {step === 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Create Your Account</h3>
                  <p className="text-sm text-muted-foreground">
                    {isAuthenticated
                      ? "You're already signed in — continue to fill out your details."
                      : "Sign up with Google or create an account with email."}
                  </p>
                </div>

                {isAuthenticated ? (
                  <div className="bg-gdg-green/10 border border-gdg-green/30 rounded-xl p-4 text-sm text-gdg-green font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    You&apos;re signed in. Click Next to continue.
                  </div>
                ) : (
                  <>
                    <Button
                      onClick={handleGoogleSignUp}
                      disabled={loading}
                      className="w-full h-12 bg-white hover:bg-gray-100 text-black font-medium rounded-full transition-all hover:scale-[1.01]"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Sign up with Google
                    </Button>

                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-px bg-border" />
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        or
                      </span>
                      <div className="flex-1 h-px bg-border" />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                          Email address *
                        </label>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          className="h-12 rounded-xl bg-background"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                          Password *
                        </label>
                        <Input
                          type="password"
                          placeholder="At least 6 characters"
                          value={form.password}
                          onChange={(e) =>
                            updateField("password", e.target.value)
                          }
                          minLength={6}
                          className="h-12 rounded-xl bg-background"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ── Step 1: Personal Info ───────────────────────────────── */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Personal Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Tell us about yourself so we can personalize your experience.
                  </p>
                </div>

                {/* Full Name */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Full Name (First name first) *
                  </label>
                  <Input
                    placeholder="e.g. John Doe"
                    value={form.full_name}
                    onChange={(e) => updateField("full_name", e.target.value)}
                    className="h-12 rounded-xl bg-background"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Gender *
                  </label>
                  <div className="flex gap-3">
                    {GENDERS.map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => updateField("gender", g)}
                        className={`flex-1 h-11 rounded-xl text-sm font-medium border transition-all ${
                          form.gender === g
                            ? "bg-gdg-blue text-white border-gdg-blue"
                            : "bg-background border-border text-foreground hover:border-gdg-blue/50"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    WhatsApp Number *
                  </label>
                  <Input
                    type="tel"
                    placeholder="+234..."
                    value={form.whatsapp_number}
                    onChange={(e) =>
                      updateField("whatsapp_number", e.target.value)
                    }
                    className="h-12 rounded-xl bg-background"
                  />
                </div>

                {/* Birthday */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Birthday (Day &amp; Month only) *
                  </label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <select
                        value={form.birthday_month || ""}
                        onChange={(e) =>
                          updateField(
                            "birthday_month",
                            e.target.value ? parseInt(e.target.value) : undefined
                          )
                        }
                        className="w-full h-12 rounded-xl bg-background border border-border px-3 text-foreground text-sm appearance-none cursor-pointer"
                      >
                        <option value="">Month</option>
                        {MONTHS.map((m, i) => (
                          <option key={m} value={i + 1}>
                            {m}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="h-4 w-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    <Input
                      type="number"
                      min={1}
                      max={31}
                      placeholder="Day"
                      value={form.birthday_day || ""}
                      onChange={(e) =>
                        updateField(
                          "birthday_day",
                          e.target.value ? parseInt(e.target.value) : undefined
                        )
                      }
                      className="w-24 h-12 rounded-xl bg-background"
                    />
                  </div>
                </div>

                {/* Teams */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    What Team(s) are you part of? (Max 2) *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {TEAMS.map((team) => (
                      <button
                        key={team}
                        type="button"
                        onClick={() => toggleTeam(team)}
                        className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all text-left ${
                          form.teams.includes(team)
                            ? "bg-gdg-blue text-white border-gdg-blue"
                            : "bg-background border-border text-foreground hover:border-gdg-blue/50"
                        } ${
                          form.teams.length >= 2 && !form.teams.includes(team)
                            ? "opacity-40 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={
                          form.teams.length >= 2 && !form.teams.includes(team)
                        }
                      >
                        {team}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Student Status */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Student Status *
                  </label>
                  <div className="relative">
                    <select
                      value={form.student_status}
                      onChange={(e) =>
                        updateField("student_status", e.target.value)
                      }
                      className="w-full h-12 rounded-xl bg-background border border-border px-3 text-foreground text-sm appearance-none cursor-pointer"
                    >
                      <option value="">Select...</option>
                      {STUDENT_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="h-4 w-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 2: Academic & Track ────────────────────────────── */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    Academic &amp; Track Info
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Help us place you in the right track for your learning
                    journey.
                  </p>
                </div>

                {/* Matric No */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Matriculation Number{" "}
                    {form.student_status === "Non-Student" ? (
                      <span className="text-muted-foreground/60">(optional)</span>
                    ) : (
                      <span>*</span>
                    )}
                  </label>
                  <Input
                    placeholder="e.g. 20/1234"
                    value={form.matric_no}
                    onChange={(e) => updateField("matric_no", e.target.value)}
                    className="h-12 rounded-xl bg-background"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Department of Study *
                  </label>
                  <div className="relative mb-2">
                    <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    <Input
                      placeholder="Search departments..."
                      value={deptSearch}
                      onChange={(e) => setDeptSearch(e.target.value)}
                      className="h-10 rounded-xl bg-background pl-9 text-sm"
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto rounded-xl border border-border bg-background p-1 space-y-0.5">
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
                      <p className="text-sm text-muted-foreground px-3 py-2">
                        No results
                      </p>
                    )}
                  </div>
                </div>

                {/* Faculty */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Faculty / School *
                  </label>
                  <div className="relative mb-2">
                    <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    <Input
                      placeholder="Search faculties..."
                      value={facultySearch}
                      onChange={(e) => setFacultySearch(e.target.value)}
                      className="h-10 rounded-xl bg-background pl-9 text-sm"
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto rounded-xl border border-border bg-background p-1 space-y-0.5">
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
                      <p className="text-sm text-muted-foreground px-3 py-2">
                        No results
                      </p>
                    )}
                  </div>
                </div>

                {/* Primary Track */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Primary Track *
                  </label>
                  <div className="relative">
                    <select
                      value={form.primary_track}
                      onChange={(e) =>
                        updateField("primary_track", e.target.value)
                      }
                      className="w-full h-12 rounded-xl bg-background border border-border px-3 text-foreground text-sm appearance-none cursor-pointer"
                    >
                      <option value="">Select your main track...</option>
                      {TRACKS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="h-4 w-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Primary Skill Level */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Skill Level in Primary Track *
                  </label>
                  <div className="flex gap-2">
                    {SKILL_LEVELS.map((sl) => (
                      <button
                        key={sl.value}
                        type="button"
                        onClick={() =>
                          updateField("primary_skill_level", sl.value)
                        }
                        className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-all ${
                          form.primary_skill_level === sl.value
                            ? "bg-gdg-blue text-white border-gdg-blue"
                            : "bg-background border-border text-foreground hover:border-gdg-blue/50"
                        }`}
                      >
                        {sl.value}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1 px-1">
                    <span>Beginner</span>
                    <span>Experienced</span>
                  </div>
                </div>

                {/* Secondary Track (optional) */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Secondary Track{" "}
                    <span className="text-muted-foreground/60">(optional)</span>
                  </label>
                  <div className="relative">
                    <select
                      value={form.secondary_track}
                      onChange={(e) =>
                        updateField("secondary_track", e.target.value)
                      }
                      className="w-full h-12 rounded-xl bg-background border border-border px-3 text-foreground text-sm appearance-none cursor-pointer"
                    >
                      <option value="">None</option>
                      {TRACKS.filter((t) => t !== form.primary_track).map(
                        (t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        )
                      )}
                    </select>
                    <ChevronDown className="h-4 w-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Secondary Skill Level */}
                {form.secondary_track && (
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                      Skill Level in Secondary Track
                    </label>
                    <div className="flex gap-2">
                      {SKILL_LEVELS.map((sl) => (
                        <button
                          key={sl.value}
                          type="button"
                          onClick={() =>
                            updateField("secondary_skill_level", sl.value)
                          }
                          className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-all ${
                            form.secondary_skill_level === sl.value
                              ? "bg-gdg-blue text-white border-gdg-blue"
                              : "bg-background border-border text-foreground hover:border-gdg-blue/50"
                          }`}
                        >
                          {sl.value}
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1 px-1">
                      <span>Beginner</span>
                      <span>Experienced</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mt-5 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              {step > 0 ? (
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="rounded-full h-11 px-6"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < 2 ? (
                <Button
                  onClick={handleNext}
                  className="bg-white hover:bg-gray-100 text-black rounded-full font-semibold h-11 px-8 hover:scale-[1.02] transition-all"
                >
                  Next
                  <div className="flex items-center justify-center bg-black rounded-full p-1 ml-1">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-gdg-blue hover:bg-gdg-blue/90 text-white rounded-full font-semibold h-11 px-8 glow-blue hover:scale-[1.02] transition-all"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                  )}
                  {loading ? "Creating account..." : "Complete Registration"}
                </Button>
              )}
            </div>
          </div>

          {/* Note */}
          <p className="text-center text-muted-foreground text-sm mt-6">
            After registration, check your email for next steps and community
            access links 📧
          </p>
        </div>
      </div>
    </section>
  );
}
