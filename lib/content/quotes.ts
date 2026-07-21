/**
 * Hero floating member-quote cards (the glassy cards scattered over the
 * hero carousel in the mockup). Position classes place each card on lg+.
 */

import type { GdgColor } from "@/lib/tracks";

export interface HeroQuote {
  name: string;
  initials: string;
  quote: string;
  /** Small colored tag pill attached to the card (optional) */
  tag?: string;
  tagColor?: GdgColor;
  borderColor: GdgColor;
  /** Absolute-position classes on lg+ screens */
  position: string;
  /** Extra rotation/styling */
  rotation?: string;
}

export const HERO_QUOTES: HeroQuote[] = [
  {
    name: "Xavier O.",
    initials: "XO",
    quote: "I'm literally him, highkenuinely a perfect candidate for The 100.",
    borderColor: "blue",
    position: "top-[10%] right-[4%] w-72",
    rotation: "rotate-2",
  },
  {
    name: "Destiny N.",
    initials: "DN",
    quote: "Best in the league, Next is the win.",
    tag: "Build with AI",
    tagColor: "yellow",
    borderColor: "green",
    position: "top-[34%] right-[30%] w-64",
    rotation: "-rotate-3",
  },
  {
    name: "Daniel B.",
    initials: "DB",
    quote: "Jack here, all trades are mine. Type shii.",
    tag: "GDG Babcock 2026",
    tagColor: "green",
    borderColor: "red",
    position: "top-[42%] right-[6%] w-72",
    rotation: "rotate-3",
  },
  {
    name: "Oluwole A.",
    initials: "OA",
    quote:
      "My life has been filled with terrible misfortune: most of which never happened.",
    tag: "ORBIT!!!!",
    tagColor: "red",
    borderColor: "yellow",
    position: "bottom-[12%] right-[26%] w-72",
    rotation: "-rotate-2",
  },
];
