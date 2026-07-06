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
    value: "Software Dev & Engineering",
    slug: "software",
    label: "Software Dev & Engineering",
    color: "blue",
    description:
      "Web, mobile, backend, and everything in between — build products real people use.",
    whatsappUrl: "#", // TODO: paste real invite link
    aliases: [
      "Web Development",
      "Mobile Development",
      "Game Development",
      "Blockchain",
      "Software Development",
      "Software Dev and Engineering",
    ],
  },
  {
    value: "Infrastructure & Security",
    slug: "infra",
    label: "Infrastructure & Security",
    color: "red",
    description:
      "Cloud, DevOps, networking, and cybersecurity — keep systems running and safe.",
    whatsappUrl: "#", // TODO: paste real invite link
    aliases: [
      "Cloud Computing",
      "Cybersecurity",
      "DevOps",
      "Infrastructure and Security",
    ],
  },
  {
    value: "Data & AI",
    slug: "data-ai",
    label: "Data & AI",
    color: "yellow",
    description:
      "Data science, analytics, and machine learning — turn data into decisions.",
    whatsappUrl: "#", // TODO: paste real invite link
    aliases: [
      "Machine Learning / AI",
      "Data Science",
      "Data and AI",
      "Machine Learning",
      "AI",
    ],
  },
  {
    value: "Design & Management",
    slug: "design",
    label: "Design & Management",
    color: "green",
    description:
      "UI/UX, product design, and product management — shape what gets built and why.",
    whatsappUrl: "#", // TODO: paste real invite link
    aliases: ["UI/UX Design", "Product Design", "Product Management", "Design and Management"],
  },
];

/** General community group every member can join. TODO: paste real invite link */
export const COMMUNITY_WHATSAPP_URL = "#";

export const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

export const STUDENT_STATUSES = [
  "100 Level",
  "200 Level",
  "300 Level",
  "400 Level",
  "500 Level",
  "Postgraduate",
  "Alumni",
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
