/**
 * "How we work across campus" — the relationships that make GDG Babcock an
 * institution, not a club. Used by the homepage Across-Campus section.
 */

import type { GdgColor } from "@/lib/tracks";

export interface CampusRelationship {
  title: string;
  description: string;
  color: GdgColor;
}

export const CAMPUS_RELATIONSHIPS: CampusRelationship[] = [
  {
    title: "Departments",
    description:
      "We partner with academic departments to bring industry tools and real projects into the classroom.",
    color: "blue",
  },
  {
    title: "Student communities",
    description:
      "We collaborate with other student bodies on co-branded events that reach the whole campus.",
    color: "red",
  },
  {
    title: "Sponsors",
    description:
      "Organizations back our programs and get direct access to a pipeline of 500+ student builders.",
    color: "yellow",
  },
  {
    title: "Alumni",
    description:
      "Our graduates stay in the loop — mentoring, hiring, and keeping the network alive year over year.",
    color: "green",
  },
];
