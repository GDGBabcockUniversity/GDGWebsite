/**
 * "Let's build together." — partner section floating benefit pills.
 */

import type { GdgColor } from "@/lib/tracks";
import type { SlideImage } from "./site";

export interface PartnerPill {
  text: string;
  color: GdgColor;
  /** Absolute-position classes on lg+ */
  position: string;
}

export const PARTNER_PILLS: PartnerPill[] = [
  { text: "Brand visibility to 500+ students", color: "blue", position: "top-[16%] left-[38%]" },
  { text: "Direct talent pipeline", color: "green", position: "top-[28%] right-[10%]" },
  { text: "Co-branded events", color: "yellow", position: "top-[52%] left-[46%]" },
  { text: "Community-wide reach", color: "red", position: "bottom-[24%] right-[14%]" },
];

export const PARTNER_PHOTO: SlideImage = {
  src: undefined, // drop in /images/partner/group-photo.jpg
  label:
    "Partner section background — large outdoor group photo of the whole community (like the mockup), landscape 1920×1080",
  alt: "GDG Babcock community group photo",
};
