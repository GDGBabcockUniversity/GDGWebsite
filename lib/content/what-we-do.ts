/**
 * "Where curiosity meets code." — the four program polaroids with colored
 * tag pills, scattered/tilted per the mockup.
 */

import type { GdgColor } from "@/lib/tracks";
import type { SlideImage } from "./site";

export interface WhatWeDoItem {
  title: string;
  color: GdgColor;
  /** Tailwind rotation class for the scattered look on lg+ */
  rotation: string;
  image: SlideImage;
}

export const WHAT_WE_DO: WhatWeDoItem[] = [
  {
    title: "Workshops & Study Jams",
    color: "blue",
    rotation: "-rotate-3",
    image: {
      src: "/images/what-we-do/workshops.png",
      label: "Workshops photo — member presenting/teaching at a whiteboard or screen, portrait ~900×1100",
      alt: "A member leading a workshop",
    },
  },
  {
    title: "Tech Talks & DevFests",
    color: "green",
    rotation: "rotate-2",
    image: {
      src: "/images/what-we-do/tech-talks.png",
      label: "Tech talks photo — seated audience in a classroom session, portrait ~900×1100",
      alt: "Audience at a tech talk",
    },
  },
  {
    title: "Community & Networking",
    color: "red",
    rotation: "rotate-3",
    image: {
      src: "/images/what-we-do/community.png",
      label: "Community photo — close-up of a member speaking/mingling, portrait ~900×1100",
      alt: "Members networking",
    },
  },
  {
    title: "Hackathons & Build Days",
    color: "yellow",
    rotation: "-rotate-2",
    image: {
      src: "/images/what-we-do/hackathons.png",
      label: "Hackathons photo — group photo of a build-day cohort, portrait ~900×1100",
      alt: "Hackathon participants",
    },
  },
];
