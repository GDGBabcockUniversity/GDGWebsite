/**
 * "How students engage" — the member pathway and the four key CTAs.
 * Used by the homepage Engage section.
 */

import type { GdgColor } from "@/lib/tracks";
import { APPLY_URL, SOCIAL_LINKS } from "@/lib/content/site";
import { COMMUNITY_WHATSAPP_URL } from "@/lib/tracks";

export interface PathwayStep {
  step: string;
  title: string;
  description: string;
  color: GdgColor;
}

export const PATHWAY: PathwayStep[] = [
  {
    step: "01",
    title: "Become a member",
    description:
      "Create your profile, pick your track, and join your WhatsApp group chats. One profile, the whole ecosystem.",
    color: "blue",
  },
  {
    step: "02",
    title: "Show up to Monthly Meetups",
    description:
      "Our recurring touchpoint — meet the community, hear what's shipping, and find your people.",
    color: "red",
  },
  {
    step: "03",
    title: "Build in our programs",
    description:
      "ORBIT, Build with AI, hackathons, and study jams. Learn by making things real people use.",
    color: "yellow",
  },
  {
    step: "04",
    title: "Apply for leadership",
    description:
      "Ready to run a team? Leadership applications open every year — this is how the chapter continues.",
    color: "green",
  },
];

export interface KeyCta {
  label: string;
  /** "member" triggers the member-join flow; otherwise a plain href */
  action: "member" | "link";
  href?: string;
  external?: boolean;
  color: GdgColor;
}

export const KEY_CTAS: KeyCta[] = [
  { label: "Become a Member", action: "member", color: "blue" },
  { label: "Read RADAR", action: "link", href: SOCIAL_LINKS.radar, external: true, color: "red" },
  { label: "Apply for Leadership", action: "link", href: APPLY_URL, external: true, color: "yellow" },
  { label: "Join the Community", action: "link", href: COMMUNITY_WHATSAPP_URL, external: true, color: "green" },
];
