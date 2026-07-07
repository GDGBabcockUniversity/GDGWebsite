/**
 * Site-wide content: navigation, socials, footer, marquee, hero slides.
 * Edit content here — never inside the section components.
 */

import type { GdgColor } from "@/lib/tracks";

/** Where leadership applications live. */
export const APPLY_URL = "https://apply.gdgbabcock.com";

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "What We Do", href: "/#what-we-do" },
  { label: "Products", href: "/products" },
  { label: "Team", href: "/team" },
  { label: "Apply", href: APPLY_URL, external: true },
  { label: "Partner", href: "/#partner" },
];

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/gdgbabcock/",
  x: "https://x.com/gdgbabcock",
  linkedin: "https://www.linkedin.com/company/gdgbabcock",
  tiktok: "https://www.tiktok.com/@gdgbabcock",
  radar: "https://radar.gdgbabcock.com/",
};

export const PARTNER_EMAIL = "gdgbabcock@gmail.com"; // TODO: confirm partnership contact email

export const MARQUEE_ITEMS = [
  "GDG BABCOCK",
  "500+ MEMBERS",
  "4 YEARS ACTIVE",
  "ORBIT",
  "RADAR",
  "THE 100",
  "BUILD WITH AI",
  "MONTHLY MEETUP",
  "GDG WEEK",
];

export interface SlideImage {
  /** Path under /public. Leave undefined to render a labeled placeholder. */
  src?: string;
  /** Self-describing placeholder label — tells the team exactly what photo goes here */
  label: string;
  alt: string;
}

export const HERO_SLIDES: SlideImage[] = [
  {
    src: "/images/hero/hero-01.png",
    label:
      "Hero slide 1 — landscape event photo, audience close-up at a GDG session (like the mockup's lecture-hall shot), 1920×1080",
    alt: "GDG Babcock members at an event",
  },
  {
    src: "/images/hero/hero-02.png",
    label:
      "Hero slide 2 — landscape photo, speaker on stage or workshop in progress, 1920×1080",
    alt: "A speaker presenting at a GDG Babcock event",
  },
  {
    src: "/images/hero/hero-03.png",
    label:
      "Hero slide 3 — landscape photo, group of members collaborating on laptops, 1920×1080",
    alt: "GDG Babcock members collaborating",
  },
  {
    src: "/images/hero/hero-04.png",
    label:
      "Hero slide 4 — landscape crowd shot, full room at ORBIT summit or GDG Week, 1920×1080",
    alt: "Crowd at a GDG Babcock summit",
  },
];

export interface FooterColumn {
  title: string;
  color: GdgColor;
  links: { label: string; href: string; external?: boolean }[];
}
