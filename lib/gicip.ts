/**
 * GICIP and galleries, read from the content API.
 *
 * Same approach as lib/radar.ts: no client SDK on the read path, just the
 * read-only query endpoint over plain fetch. Every function degrades to null
 * or an empty array when the environment isn't configured or a request fails,
 * so the pages render their static copy instead of breaking the build.
 */

import { sized, type Hotspot } from "@/lib/sanity-image";

export { sized };

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const API_VERSION = "2024-01-01";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface GicipHost {
  name: string;
  kind?: "company" | "institution" | "school" | "court";
  city?: string;
  country?: string;
  visitDate?: string;
  note?: string;
  logoUrl?: string;
  url?: string;
}

export interface GicipParticipant {
  name: string;
  course?: string;
  cameToFind?: string;
  photoUrl?: string;
  photoAlt?: string;
  linkedin?: string;
  order?: number;
  photoHotspot?: Hotspot | null;
}

export interface GalleryImage {
  imageUrl?: string;
  alt?: string;
  caption?: string;
  location?: string;
  credit?: string;
  feature?: boolean;
  hotspot?: Hotspot | null;
}

export interface Gallery {
  title: string;
  slug: string;
  date?: string;
  description?: string;
  coverImageUrl?: string;
  images: GalleryImage[];
}

export interface WritingLink {
  title: string;
  url: string;
  excerpt?: string;
}

export interface GicipCohort {
  year: number;
  title: string;
  slug: string;
  departureDate?: string;
  returnDate?: string;
  cohortSize?: number;
  summary?: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  coverHotspot?: Hotspot | null;
  filmUrl?: string;
  hosts: GicipHost[];
  participants: GicipParticipant[];
  images: GalleryImage[];
  writing: WritingLink[];
}

export type GicipCohortSummary = {
  year: number;
  title: string;
  slug: string;
  summary?: string;
  cohortSize?: number;
  coverImageUrl?: string;
  hostCount: number;
};

// ─── Transport ──────────────────────────────────────────────────────────────

async function run<T>(query: string): Promise<T | null> {
  if (!PROJECT_ID) return null;
  const endpoint =
    `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}` +
    `?query=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(endpoint, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = (await res.json()) as { result?: T };
    return data.result ?? null;
  } catch {
    return null;
  }
}

const IMAGE_FIELDS = `
  caption, location, credit, feature,
  "imageUrl": image.asset->url,
  "alt": image.alt,
  "hotspot": image.hotspot{x, y}
`;

const COHORT_FIELDS = `
  year,
  title,
  "slug": slug.current,
  departureDate,
  returnDate,
  cohortSize,
  summary,
  "coverImageUrl": coverImage.asset->url,
  "coverImageAlt": coverImage.alt,
  "coverHotspot": coverImage.hotspot{x, y},
  filmUrl,
  "hosts": hosts[]{
    name, kind, city, country, visitDate, note, url,
    "logoUrl": logo.asset->url
  },
  "participants": participants[] | order(order asc, name asc){
    name, course, cameToFind, linkedin, order,
    "photoUrl": photo.asset->url,
    "photoAlt": photo.alt,
    "photoHotspot": photo.hotspot{x, y}
  },
  "images": gallery->images[]{${IMAGE_FIELDS}},
  "writing": writingUrls[]{ title, url, excerpt }
`;

function normalise(raw: Partial<GicipCohort> | null): GicipCohort | null {
  if (!raw || typeof raw.year !== "number" || !raw.slug || !raw.title) return null;
  return {
    ...raw,
    year: raw.year,
    title: raw.title,
    slug: raw.slug,
    hosts: raw.hosts ?? [],
    participants: raw.participants ?? [],
    images: raw.images ?? [],
    writing: raw.writing ?? [],
  } as GicipCohort;
}

// ─── GICIP ──────────────────────────────────────────────────────────────────

/** The newest published cohort, shown in full on /gicip. */
export async function getCurrentCohort(): Promise<GicipCohort | null> {
  return normalise(
    await run<Partial<GicipCohort>>(
      `*[_type == "gicipCohort" && isPublished == true] | order(year desc)[0]{${COHORT_FIELDS}}`
    )
  );
}

/** One cohort by slug, for /gicip/<slug>. */
export async function getCohort(slug: string): Promise<GicipCohort | null> {
  return normalise(
    await run<Partial<GicipCohort>>(
      `*[_type == "gicipCohort" && isPublished == true && slug.current == ${JSON.stringify(
        slug
      )}][0]{${COHORT_FIELDS}}`
    )
  );
}

/** Every published cohort, newest first. Powers the archive list and routing. */
export async function getCohortSummaries(): Promise<GicipCohortSummary[]> {
  return (
    (await run<GicipCohortSummary[]>(
      `*[_type == "gicipCohort" && isPublished == true] | order(year desc){
        year, title, "slug": slug.current, summary, cohortSize,
        "coverImageUrl": coverImage.asset->url,
        "hostCount": count(hosts)
      }`
    )) ?? []
  );
}

// ─── Galleries ──────────────────────────────────────────────────────────────

export async function getGallery(slug: string): Promise<Gallery | null> {
  return run<Gallery>(
    `*[_type == "gallery" && isPublished == true && slug.current == ${JSON.stringify(
      slug
    )}][0]{
      title, "slug": slug.current, date, description,
      "coverImageUrl": coverImage.asset->url,
      "images": images[]{${IMAGE_FIELDS}}
    }`
  );
}

export async function getGalleries(): Promise<Gallery[]> {
  return (
    (await run<Gallery[]>(
      `*[_type == "gallery" && isPublished == true] | order(date desc){
        title, "slug": slug.current, date, description,
        "coverImageUrl": coverImage.asset->url,
        "images": images[]{${IMAGE_FIELDS}}
      }`
    )) ?? []
  );
}

// ─── Helpers ────────────────────────────────────────────────────────────────

/** The 11-character YouTube id from any of the usual URL shapes. */
export function youTubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([^&?/]{11})/
  );
  return match ? match[1] : null;
}

/** "6 August to 18 September 2026" from the two trip dates. */
export function dateRange(start?: string, end?: string): string | null {
  if (!start || !end) return null;
  const a = new Date(start);
  const b = new Date(end);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return null;
  const day = (d: Date) =>
    d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      timeZone: "UTC",
    });
  return `${day(a)} to ${day(b)} ${b.getUTCFullYear()}`;
}
