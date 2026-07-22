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
  /**
   * Screenshot of the product's live site, shown behind the card as a
   * preview. Recommended: ~1200×750 (16:10), top/hero of the page.
   * The card renders fine with the file missing — it just shows no preview
   * until the screenshot is dropped in at this path.
   */
  preview?: string;
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
    preview: "/images/products/radar.jpg",
  },
  {
    name: "ORBIT",
    tagline: "Flagship first-semester initiative",
    description:
      "Our marquee program — a full arc of talks, demos, workshops, and community that opens the academic year.",
    status: "live",
    color: "purple", // ORBIT's own brand accent (#a040ff)
    href: "https://orbit.gdgbabcock.com",
    preview: "/images/products/orbit.jpg",
  },
  {
    name: "Babcock 100",
    tagline: "Annual recognition platform",
    description:
      "The 100 — our yearly celebration of the 100 most active builders in the community. Recognition that means something.",
    status: "live",
    color: "yellow",
    href: "https://babcock100.com",
    preview: "/images/products/babcock-100.jpg",
  },
  {
    name: "BabcockVotes",
    tagline: "Campus voting product",
    description:
      "A voting platform we built and ran for the wider Babcock campus — proof that we build things people across the school actually use.",
    status: "live",
    color: "green",
    href: "https://babcockvotes.com",
    preview: "/images/products/babcockvotes.jpg",
  },
  {
    name: "GDG Website",
    tagline: "The chapter's home on the web",
    description:
      "This site — who we are, what we run, and the front door to the whole ecosystem and its shared member profile.",
    status: "live",
    color: "blue",
    href: "https://gdgbabcock.com",
    preview: "/images/products/gdg-website.jpg",
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
