/**
 * Flagship programs — used by the home Events section AND the footer
 * PROGRAMS column. Descriptions are verbatim from the 2026 mockup.
 */

import type { GdgColor } from "@/lib/tracks";

export interface Program {
  name: string;
  color: GdgColor;
  description: string;
  href?: string;
}

export const PROGRAMS: Program[] = [
  {
    name: "ORBIT",
    color: "red",
    description: "Our annual summit — a full day of talks, demos, and community.",
  },
  {
    name: "RADAR",
    color: "blue",
    description: "Monthly scouting of the tools and trends worth your attention.",
    href: "https://radar.gdgbabcock.com/",
  },
  {
    name: "THE 100",
    color: "yellow",
    description: "A cohort-based deep dive for our most active 100 builders.",
  },
  {
    name: "GDG WEEK",
    color: "green",
    description: "A week of daily workshops closing out every semester.",
  },
];

export const CALENDAR_HREF = "https://gdg.community.dev/gdg-on-campus-babcock-university-ilishan-remo-nigeria/"; // TODO: confirm events calendar link
