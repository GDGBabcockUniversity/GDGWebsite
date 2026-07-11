"use client";

/**
 * 3-step member onboarding — replaces the old Google Form + Apps Script
 * registration. Collects the profile, saves it in ONE PUT to the auth
 * service, then shows the member's WhatsApp group links.
 */

import { forwardRef, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import type { ProfileUpdatePayload } from "@/lib/auth-service";
import {
  TRACKS,
  SKILL_LEVELS,
  STUDENT_STATUSES,
  GENDERS,
  MONTHS,
  isProfileComplete,
} from "@/lib/tracks";
import { GDG_HEX, TEXT_CLASS } from "@/lib/colors";
import Completion from "@/components/onboarding/completion";
import { cn } from "@/lib/utils";

// ─── Schemas ────────────────────────────────────────────────────────────────

const PHONE_REGEX = /^\+?\d[\d\s-]{7,14}$/;

const aboutSchema = z
  .object({
    full_name: z.string().trim().min(2, "Enter your full name"),
    whatsapp_number: z
      .string()
      .trim()
      .regex(PHONE_REGEX, "Enter a valid number, e.g. +2348012345678"),
    gender: z.string(),
    birthday_month: z.string(),
    birthday_day: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.birthday_day && !data.birthday_month) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["birthday_month"],
        message: "Pick a month too",
      });
    }
    if (data.birthday_day) {
      const day = Number(data.birthday_day);
      const monthIndex = MONTHS.indexOf(data.birthday_month);
      const maxDay =
        monthIndex >= 0 ? new Date(2024, monthIndex + 1, 0).getDate() : 31;
      if (!Number.isInteger(day) || day < 1 || day > maxDay) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["birthday_day"],
          message: `Enter a day between 1 and ${maxDay}`,
        });
      }
    }
  });

const academicsSchema = z.object({
  student_status: z.string().min(1, "Select your level"),
  matric_no: z.string(),
  department: z.string(),
  faculty: z.string(),
});

const tracksSchema = z
  .object({
    primary_track: z.string().min(1, "Pick your main track"),
    primary_skill_level: z.string().min(1, "Pick your skill level"),
    secondary_track: z.string(),
    secondary_skill_level: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.secondary_track && data.secondary_track === data.primary_track) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["secondary_track"],
        message: "Pick a different track from your primary",
      });
    }
    if (data.secondary_track && !data.secondary_skill_level) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["secondary_skill_level"],
        message: "Pick your skill level for this track",
      });
    }
  });

type AboutValues = z.infer<typeof aboutSchema>;
type AcademicsValues = z.infer<typeof academicsSchema>;
type TracksValues = z.infer<typeof tracksSchema>;
type FormData = AboutValues & AcademicsValues & TracksValues;

// ─── Shared field UI ────────────────────────────────────────────────────────

const inputClass =
  "h-12 w-full rounded-xl border border-white/15 bg-[#0f0f0f] px-4 text-sm text-white placeholder:text-white/35 focus:border-gdg-blue focus:outline-none";

function Field({
  label,
  error,
  optional,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-baseline gap-2 text-sm font-medium text-white/80">
        {label}
        {optional && <span className="text-xs text-white/40">optional</span>}
      </span>
      {children}
      {error && <p className="mt-1.5 text-xs text-gdg-red">{error}</p>}
    </label>
  );
}

// forwardRef matters here: react-hook-form's register() returns a `ref`
// that must reach the native <select> for it to track the field's value at
// all — a plain function component silently drops it (React won't forward
// refs to non-forwardRef function components), leaving every field routed
// through this component permanently `undefined` from RHF's perspective
// regardless of what the user visibly picks.
const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    options: string[];
    /** Parallel array of stored values when they differ from the labels */
    optionValues?: string[];
    placeholder: string;
  }
>(function Select({ options, optionValues, placeholder, ...props }, ref) {
  return (
    <select
      ref={ref}
      {...props}
      className={cn(inputClass, "appearance-none")}
    >
      <option value="">{placeholder}</option>
      {options.map((o, i) => (
        <option key={o} value={optionValues ? optionValues[i] : o}>
          {o}
        </option>
      ))}
    </select>
  );
});

// ─── Steps ──────────────────────────────────────────────────────────────────

const STEP_META = [
  { title: "About you", blurb: "The basics — how we reach you." },
  { title: "Academics", blurb: "Where you are in your Babcock journey." },
  { title: "Your tracks", blurb: "Pick what you want to build." },
];

const DOT_COLORS = ["#4285f4", "#ea4335", "#faab00", "#34a853"];

function StepAbout({
  defaults,
  onNext,
}: {
  defaults: AboutValues;
  onNext: (v: AboutValues) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AboutValues>({
    resolver: zodResolver(aboutSchema),
    defaultValues: defaults,
    mode: "onTouched",
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <Field label="Full name" error={errors.full_name?.message}>
        <input
          {...register("full_name")}
          className={inputClass}
          placeholder="Ada Lovelace"
          autoComplete="name"
        />
      </Field>
      <Field label="WhatsApp number" error={errors.whatsapp_number?.message}>
        <input
          {...register("whatsapp_number")}
          className={inputClass}
          placeholder="+2348012345678"
          autoComplete="tel"
          inputMode="tel"
        />
      </Field>
      <Field label="Gender" optional error={errors.gender?.message}>
        <Select
          {...register("gender")}
          options={GENDERS}
          placeholder="Select gender"
        />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Birthday month" optional error={errors.birthday_month?.message}>
          <Select
            {...register("birthday_month")}
            options={MONTHS}
            placeholder="Month"
          />
        </Field>
        <Field label="Day" optional error={errors.birthday_day?.message}>
          <input
            {...register("birthday_day")}
            className={inputClass}
            placeholder="14"
            inputMode="numeric"
          />
        </Field>
      </div>
      <NextButton />
    </form>
  );
}

function StepAcademics({
  defaults,
  onNext,
  onBack,
}: {
  defaults: AcademicsValues;
  onNext: (v: AcademicsValues) => void;
  onBack: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AcademicsValues>({
    resolver: zodResolver(academicsSchema),
    defaultValues: defaults,
    mode: "onTouched",
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <Field label="Level / status" error={errors.student_status?.message}>
        <Select
          {...register("student_status")}
          options={STUDENT_STATUSES}
          placeholder="Select your level"
        />
      </Field>
      <Field label="Matric number" optional error={errors.matric_no?.message}>
        <input
          {...register("matric_no")}
          className={inputClass}
          placeholder="21/0000"
        />
      </Field>
      <Field label="Department" optional error={errors.department?.message}>
        <input
          {...register("department")}
          className={inputClass}
          placeholder="Software Engineering"
        />
      </Field>
      <Field label="Faculty / school" optional error={errors.faculty?.message}>
        <input
          {...register("faculty")}
          className={inputClass}
          placeholder="Computing & Engineering Sciences"
        />
      </Field>
      <div className="flex items-center justify-between">
        <BackButton onClick={onBack} />
        <NextButton />
      </div>
    </form>
  );
}

function TrackPicker({
  value,
  onChange,
  exclude,
  allowNone,
}: {
  value: string;
  onChange: (v: string) => void;
  exclude?: string;
  allowNone?: boolean;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {allowNone && (
        <button
          type="button"
          onClick={() => onChange("")}
          className={cn(
            "rounded-2xl border p-4 text-left text-sm transition-colors",
            value === ""
              ? "border-white bg-white/10 text-white"
              : "border-white/15 bg-[#0f0f0f] text-white/60 hover:border-white/40"
          )}
        >
          <span className="font-bold">No second track</span>
          <span className="mt-1 block text-xs opacity-70">
            Just my primary for now
          </span>
        </button>
      )}
      {TRACKS.map((track) => {
        const disabled = track.value === exclude;
        const selected = value === track.value;
        return (
          <button
            key={track.slug}
            type="button"
            disabled={disabled}
            onClick={() => onChange(track.value)}
            className={cn(
              "rounded-2xl border p-4 text-left text-sm transition-colors",
              disabled && "cursor-not-allowed opacity-30",
              selected
                ? "bg-white/10"
                : "border-white/15 bg-[#0f0f0f] hover:border-white/40"
            )}
            style={selected ? { borderColor: GDG_HEX[track.color] } : undefined}
          >
            <span className={cn("font-bold", TEXT_CLASS[track.color])}>
              {track.label}
            </span>
            <span className="mt-1 block text-xs text-white/60">
              {track.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function StepTracks({
  defaults,
  onSubmit,
  onBack,
  submitting,
  submitError,
}: {
  defaults: TracksValues;
  onSubmit: (v: TracksValues) => void;
  onBack: () => void;
  submitting: boolean;
  submitError: string | null;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TracksValues>({
    resolver: zodResolver(tracksSchema),
    defaultValues: defaults,
    mode: "onTouched",
  });

  const primary = watch("primary_track");
  const secondary = watch("secondary_track");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Field label="Primary track" error={errors.primary_track?.message}>
        <TrackPicker
          value={primary}
          onChange={(v) => {
            setValue("primary_track", v, { shouldValidate: true });
            if (v === secondary)
              setValue("secondary_track", "", { shouldValidate: true });
          }}
        />
      </Field>
      <Field label="Your skill level" error={errors.primary_skill_level?.message}>
        <Select
          {...register("primary_skill_level")}
          options={SKILL_LEVELS.map((s) => s.label)}
          optionValues={SKILL_LEVELS.map((s) => s.value)}
          placeholder="Select skill level"
        />
      </Field>
      <Field
        label="Second track"
        optional
        error={errors.secondary_track?.message}
      >
        <TrackPicker
          value={secondary}
          exclude={primary}
          allowNone
          onChange={(v) =>
            setValue("secondary_track", v, { shouldValidate: true })
          }
        />
      </Field>
      {secondary && (
        <Field
          label="Skill level in your second track"
          error={errors.secondary_skill_level?.message}
        >
          <Select
            {...register("secondary_skill_level")}
            options={SKILL_LEVELS.map((s) => s.label)}
            optionValues={SKILL_LEVELS.map((s) => s.value)}
            placeholder="Select skill level"
          />
        </Field>
      )}

      {submitError && (
        <p className="rounded-lg bg-gdg-red/10 px-3 py-2 text-sm text-gdg-red">
          {submitError}
        </p>
      )}

      <div className="flex items-center justify-between">
        <BackButton onClick={onBack} disabled={submitting} />
        <button
          type="submit"
          disabled={submitting}
          className="flex items-center gap-2 rounded-full bg-gdg-cream px-6 py-3 text-sm font-semibold text-[#0f0f0f] transition-transform hover:scale-[1.03] disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving…
            </>
          ) : (
            <>
              Finish <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function NextButton() {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        className="flex items-center gap-2 rounded-full bg-gdg-cream px-6 py-3 text-sm font-semibold text-[#0f0f0f] transition-transform hover:scale-[1.03]"
      >
        Next <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function BackButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 disabled:opacity-50"
    >
      <ArrowLeft className="h-4 w-4" /> Back
    </button>
  );
}

// ─── Flow ───────────────────────────────────────────────────────────────────

export default function OnboardingFlow() {
  const { user, updateUserProfile } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // A member who already finished onboarding lands on the completion screen
  const [done, setDone] = useState(() => isProfileComplete(user));
  const [step, setStep] = useState(0);

  const [data, setData] = useState<FormData>(() => ({
    full_name: user?.full_name || "",
    whatsapp_number: user?.whatsapp_number || "",
    gender: user?.gender || "",
    birthday_month:
      user?.birthday_month != null ? MONTHS[user.birthday_month - 1] || "" : "",
    birthday_day: user?.birthday_day != null ? String(user.birthday_day) : "",
    student_status: user?.student_status || "",
    matric_no: user?.matric_no || "",
    department: user?.department || "",
    faculty: user?.faculty || "",
    primary_track: user?.primary_track || "",
    primary_skill_level: user?.primary_skill_level || "",
    secondary_track: user?.secondary_track || "",
    secondary_skill_level: user?.secondary_skill_level || "",
  }));

  const payloadFrom = (all: FormData): ProfileUpdatePayload => {
    const payload: ProfileUpdatePayload = {
      full_name: all.full_name.trim(),
      whatsapp_number: all.whatsapp_number.trim(),
      primary_track: all.primary_track,
      primary_skill_level: all.primary_skill_level,
    };
    // omit empties instead of sending "" so the PUT stays clean
    if (all.gender) payload.gender = all.gender;
    if (all.birthday_month && all.birthday_day) {
      payload.birthday_month = MONTHS.indexOf(all.birthday_month) + 1;
      payload.birthday_day = Number(all.birthday_day);
    }
    if (all.student_status) payload.student_status = all.student_status;
    if (all.matric_no.trim()) payload.matric_no = all.matric_no.trim();
    if (all.department.trim()) payload.department = all.department.trim();
    if (all.faculty.trim()) payload.faculty = all.faculty.trim();
    if (all.secondary_track) {
      payload.secondary_track = all.secondary_track;
      payload.secondary_skill_level = all.secondary_skill_level;
    }
    return payload;
  };

  const handleFinish = async (tracksValues: TracksValues) => {
    const all = { ...data, ...tracksValues };
    setData(all);
    setSubmitting(true);
    setSubmitError(null);
    try {
      await updateUserProfile(payloadFrom(all));
      // Fire the welcome email — best-effort, never blocks the completion screen
      // (the API no-ops when RESEND_API_KEY isn't set).
      void fetch("/api/send-welcome-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: all.full_name,
          email: user?.email,
          primaryTrack: all.primary_track,
          secondaryTrack: all.secondary_track || undefined,
        }),
      }).catch(() => {});
      setDone(true);
    } catch (err: any) {
      setSubmitError(
        err?.message || "Couldn't save your profile — please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (done && user) {
    return <Completion user={user} />;
  }

  return (
    <div className="mx-auto max-w-xl">
      {/* Progress dots */}
      <div
        className="flex items-center justify-center gap-2"
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={STEP_META.length}
        aria-label={`Step ${step + 1} of ${STEP_META.length}`}
      >
        {STEP_META.map((_, i) => (
          <span
            key={i}
            className="h-2 rounded-full transition-all"
            style={{
              width: i === step ? 28 : 8,
              backgroundColor:
                i <= step ? DOT_COLORS[i % DOT_COLORS.length] : "#333",
            }}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-blue">
          Step {step + 1} of {STEP_META.length}
        </p>
        <h1 className="mt-3 text-3xl font-bold text-gdg-cream">
          {STEP_META[step].title}
        </h1>
        <p className="mt-2 text-sm text-white/60">{STEP_META[step].blurb}</p>
      </div>

      <div className="mt-10 rounded-3xl border border-white/15 bg-[#171717] p-6 sm:p-8">
        {step === 0 && (
          <StepAbout
            defaults={data}
            onNext={(v) => {
              setData((d) => ({ ...d, ...v }));
              setStep(1);
            }}
          />
        )}
        {step === 1 && (
          <StepAcademics
            defaults={data}
            onNext={(v) => {
              setData((d) => ({ ...d, ...v }));
              setStep(2);
            }}
            onBack={() => setStep(0)}
          />
        )}
        {step === 2 && (
          <StepTracks
            defaults={data}
            onSubmit={handleFinish}
            onBack={() => setStep(1)}
            submitting={submitting}
            submitError={submitError}
          />
        )}
      </div>
    </div>
  );
}
