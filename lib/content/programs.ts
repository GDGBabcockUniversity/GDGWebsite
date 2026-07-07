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
    description:
      "Our flagship first-semester initiative — a full arc of talks, demos, and community.",
    href: "https://orbit.gdgbabcock.com/",
  },
  {
    name: "RADAR",
    color: "blue",
    description:
      "Our publication and signal platform — what's next in the Babcock tech ecosystem.",
    href: "https://radar.gdgbabcock.com/",
  },
  {
    name: "MONTHLY MEETUP",
    color: "green",
    description:
      "Our recurring community touchpoint — every month, the whole chapter in one room.",
  },
  {
    name: "GDG WEEK / BUILD WITH AI",
    color: "yellow",
    description:
      "Our second-semester concentrated program — a week of daily hands-on AI workshops.",
  },
  {
    name: "BABCOCK 100",
    color: "red",
    description:
      "Our annual recognition platform — celebrating our 100 most active builders.",
    href: "https://babcock100.com/",
  },
];

export const CALENDAR_HREF = "https://gdg.community.dev/gdg-on-campus-babcock-university-ilishan-remo-nigeria/"; // TODO: confirm events calendar link
