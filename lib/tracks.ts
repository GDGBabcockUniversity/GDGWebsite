/**
 * Tracks config — single source of truth for the community's tracks,
 * their WhatsApp group-chat invite links, and the profile field options.
 *
 * To update a WhatsApp link: edit `whatsappUrl` below and commit.
 */

export type GdgColor = "blue" | "red" | "yellow" | "green";

export interface Track {
  /** EXACT string stored in the auth service DB for primary/secondary_track */
  value: string;
  slug: string;
  label: string;
  color: GdgColor;
  description: string;
  /** Track WhatsApp group invite. TODO: paste the real invite link */
  whatsappUrl: string;
  /** Legacy track values (old 10-track list) that map into this umbrella track */
  aliases: string[];
}

export const TRACKS: Track[] = [
  {
    value: "Software Development & Engineering",
    slug: "software",
    label: "Software Development & Engineering",
    color: "blue",
    description:
      "Web, mobile, backend, and everything in between — build products real people use.",
    whatsappUrl: "https://chat.whatsapp.com/CHIWG2ov7OAL8TlScKQmbH",
    aliases: [
      "Software Dev & Engineering",
      "Software Dev and Engineering",
      "Software Development",
      "Web Development",
      "Mobile Development",
      "Game Development",
      "Blockchain",
    ],
  },
  {
    value: "Data & AI",
    slug: "data-ai",
    label: "Data & AI",
    color: "yellow",
    description:
      "Data science, analytics, and machine learning — turn data into decisions.",
    whatsappUrl: "https://chat.whatsapp.com/L6tZpiji4zv4R2cAd3arDz",
    aliases: [
      "Machine Learning / AI",
      "Data Science",
      "Data and AI",
      "Machine Learning",
      "AI",
    ],
  },
  {
    value: "Infrastructure & Security",
    slug: "infra",
    label: "Infrastructure & Security",
    color: "green",
    description:
      "Cloud, DevOps, networking, and cybersecurity — keep systems running and safe.",
    whatsappUrl: "https://chat.whatsapp.com/IM7GLUYtVlmJqtbLMtdT49",
    aliases: [
      "Infrastructure and Security",
      "Infrasture & Security", // legacy misspelling from the form
      "Cloud Computing",
      "Cybersecurity",
      "DevOps",
    ],
  },
  {
    value: "Design & Management",
    slug: "design",
    label: "Design & Management",
    color: "red",
    description:
      "UI/UX, product design, and product management — shape what gets built and why.",
    whatsappUrl: "https://chat.whatsapp.com/KMudBQKGv037dt4xKcPgPy",
    aliases: [
      "Design and Management",
      "UI/UX Design",
      "Product Design",
      "Product Management",
    ],
  },
];

/** General community group every member can join. */
export const COMMUNITY_WHATSAPP_URL =
  "https://chat.whatsapp.com/CI57lyG7PAf3ZFF0cSTHgh";

/** Register here to be officially part of GDG worldwide. */
export const GDG_COMMUNITY_DEV_URL =
  "https://gdg.community.dev/gdg-on-campus-babcock-university-ilishan-remo-nigeria/";

/**
 * Skill levels — stored as "1".."5" to match the member registry (seed +
 * migration data). Labels are shown; values are saved.
 */
export const SKILL_LEVELS = [
  { value: "1", label: "1 — Beginner" },
  { value: "2", label: "2 — Elementary" },
  { value: "3", label: "3 — Intermediate" },
  { value: "4", label: "4 — Advanced" },
  { value: "5", label: "5 — Experienced" },
];

export const STUDENT_STATUSES = [
  "100 Level",
  "200 Level",
  "300 Level",
  "400 Level",
  "500 Level",
  "Postgraduate",
  "Alumni",
  "Non-Student",
];

export const GENDERS = ["Male", "Female", "Prefer not to say"];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Resolve a stored track value to its Track config.
 * Tolerant of casing and legacy values so existing members' profiles
 * (saved with the old 10-track labels) still resolve to a group.
 */
export function getTrack(value?: string | null): Track | undefined {
  if (!value) return undefined;
  const needle = value.trim().toLowerCase();
  return TRACKS.find(
    (t) =>
      t.value.toLowerCase() === needle ||
      t.slug === needle ||
      t.aliases.some((a) => a.toLowerCase() === needle)
  );
}

/** A member counts as onboarded once they've picked a primary track. */
export function isProfileComplete(
  user: { primary_track?: string | null } | null | undefined
): boolean {
  return !!user?.primary_track;
}
