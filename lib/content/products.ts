/**
 * Product registry — the things GDG Babcock has shipped. Used by the
 * /products page and the homepage "Featured products" section.
 */

import type { GdgColor } from "@/lib/tracks";

export type ProductStatus = "live" | "launching" | "in-design" | "planned";

export interface Product {
  name: string;
  tagline: string;
  description: string;
  status: ProductStatus;
  color: GdgColor;
  href?: string;
}

export const STATUS_LABEL: Record<ProductStatus, string> = {
  live: "Live",
  launching: "Launching",
  "in-design": "In design",
  planned: "Next build",
};

export const PRODUCTS: Product[] = [
  {
    name: "RADAR",
    tagline: "Publication & signal platform",
    description:
      "Our newsroom for the Babcock tech ecosystem — articles, series, and the trends worth your attention. Read what's next.",
    status: "live",
    color: "blue",
    href: "https://radar.gdgbabcock.com",
  },
  {
    name: "ORBIT",
    tagline: "Flagship first-semester initiative",
    description:
      "Our marquee program — a full arc of talks, demos, workshops, and community that opens the academic year.",
    status: "live",
    color: "red",
    href: "https://orbit.gdgbabcock.com",
  },
  {
    name: "Babcock 100",
    tagline: "Annual recognition platform",
    description:
      "The 100 — our yearly celebration of the 100 most active builders in the community. Recognition that means something.",
    status: "live",
    color: "yellow",
    href: "https://babcock100.com",
  },
  {
    name: "BabcockVotes",
    tagline: "Campus voting product",
    description:
      "A voting platform we built and ran for the wider Babcock campus — proof that we build things people across the school actually use.",
    status: "live",
    color: "green",
    href: "https://babcockvotes.com",
  },
  {
    name: "GDG Website",
    tagline: "The chapter's home on the web",
    description:
      "This site — who we are, what we run, and the front door to the whole ecosystem and its shared member profile.",
    status: "live",
    color: "blue",
    href: "https://gdgbabcock.com",
  },
  {
    name: "Wrapped",
    tagline: "Your year in review",
    description:
      "A shareable, story-by-story recap of the chapter's year and your place in it — launching around grad week.",
    status: "in-design",
    color: "red",
  },
  {
    name: "StudySmart",
    tagline: "Study product",
    description:
      "A learning tool for Babcock students that feeds into your shared profile — next up for the community to build.",
    status: "planned",
    color: "green",
  },
];

/** The three live, member-facing products featured on the homepage. */
export const FEATURED_PRODUCTS: Product[] = PRODUCTS.filter((p) =>
  ["RADAR", "ORBIT", "Babcock 100"].includes(p.name)
);
