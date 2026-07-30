/**
 * Team structure — the section/subteam org chart shared by the /team page
 * and the home team-preview section. The roster itself (names, roles,
 * photos, links) now lives in the CMS, served via lib/team-cms.ts —
 * this file only keeps the presentation structure that groups it.
 */

export type TeamCategory = "core" | "track-leads" | "dev-team" | "specialists";

/** Top-level sections, in display order. */
export type TeamSection = "core" | "tracks" | "dev" | "media" | "events";

export interface TeamMember {
  name: string;
  role: string;
  /** @deprecated legacy grouping — use `section` */
  category?: TeamCategory;
  section?: TeamSection;
  /** Sub-group within a section (track name, "Frontend", "Photographers", …) */
  subteam?: string;
  /** Leads render first, in the first row of their group. */
  isLead?: boolean;
  image: string;
  wordsToLiveBy: string;
  links: {
    twitter: string;
    linkedin: string;
    portfolio: string;
  };
  music: {
    name: string;
    artist: string;
    url: string;
  };
}

// ─── Section / subteam structure ─────────────────────────────────────────────

/** Track subteam names (color-coded to the four brand tracks). */
export const TRACK_SUBTEAMS = [
  "Software Development & Engineering",
  "Data & AI",
  "Infrastructure & Security",
  "Design & Management",
] as const;

export interface SectionDef {
  id: TeamSection;
  label: string;
  /** Ordered subteams; members outside these render under "" (no header). */
  subteams: string[];
}

export const TEAM_SECTIONS: SectionDef[] = [
  { id: "core", label: "Core Team", subteams: [] },
  { id: "tracks", label: "Tracks", subteams: [...TRACK_SUBTEAMS] },
  { id: "dev", label: "Dev Team", subteams: ["Frontend", "Backend", "Product Design", "Product Management"] },
  {
    id: "media",
    label: "Media Team",
    subteams: ["Photographers", "Content Creators", "Graphic Designers", "Video Editors", "RADAR"],
  },
  { id: "events", label: "Events Planning Team", subteams: [] },
];

export interface TeamYear {
  id: string;
  label: string;
  members: TeamMember[];
}
