/**
 * RADAR — fetch the latest issues straight from Sanity's public content API.
 *
 * No Sanity SDK dependency: we hit the read-only query endpoint with plain
 * fetch (same project/dataset/GROQ that radar.gdgbabcock.com uses).
 * Falls back to our verified recent issues if the request fails or is offline,
 * guaranteeing the section always displays the 3 newest issues.
 */

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const API_VERSION = "2024-01-01";

export const RADAR_BASE_URL = "https://radar.gdgbabcock.com";

export interface RadarIssue {
  title: string;
  slug: string;
  issueNumber?: number | null;
  description?: string;
  publishedAt?: string;
  imageUrl?: string;
  url: string;
  kind?: "issue" | "post";
}

// Backward-compatible alias for existing imports
export type RadarPost = RadarIssue;

/** Verified fallback editions from RADAR so the UI never degrades to an empty box */
export const FALLBACK_RADAR_ISSUES: RadarIssue[] = [
  {
    title: "September: Resumption and Suicide Prevention",
    slug: "009",
    issueNumber: 9,
    description:
      "Everywhere's been drama this month. The holiday ending, changes to campus life, IPO banter, and notes on suicide prevention. In this edition, the team shares its view of it all.",
    publishedAt: "2026-09-27T14:00:00.000Z",
    imageUrl:
      "https://cdn.sanity.io/images/6i04sce6/production/de024f17120d0198d0f45243d60b74f39b809cdc-2056x2875.png",
    url: `${RADAR_BASE_URL}/issues/009`,
    kind: "issue",
  },
  {
    title: "August: So Much Has Changed",
    slug: "008",
    issueNumber: 8,
    description:
      "The tech ecosystem across Babcock — stories, spotlights, and the tools shaping our campus community.",
    publishedAt: "2026-08-31T19:01:00.000Z",
    imageUrl:
      "https://cdn.sanity.io/images/6i04sce6/production/e4343ba67814f17636d717c6535b3be544453ca0-2056x2875.png",
    url: `${RADAR_BASE_URL}/issues/008`,
    kind: "issue",
  },
  {
    title: "June: The First Curtain Draws",
    slug: "the-first-curtain-draws",
    issueNumber: null,
    description:
      "We worked to deliver the very best, ensuring a spotlight on everything that mattered. Enjoy the final publication from this session's RADAR executive body.",
    publishedAt: "2026-06-30T12:00:00.000Z",
    imageUrl:
      "https://cdn.sanity.io/images/6i04sce6/production/44953e70dfad5f04c3279d3fe4d4e89efc1217f1-2056x2875.png",
    url: `${RADAR_BASE_URL}/posts/the-first-curtain-draws`,
    kind: "post",
  },
];

// Query issues first, and include legacy posts to ensure 3 latest editions are always available
const QUERY = `*[(_type == "issue") || (_type == "post" && hidden != true)] | order(coalesce(publishedAt, _createdAt) desc)[0...3]{
  _type,
  title,
  issueNumber,
  "slug": slug.current,
  "description": coalesce(excerpt, description),
  publishedAt,
  "imageUrl": coalesce(coverImage.asset->url, mainImage.asset->url)
}`;

export async function getLatestRadarIssues(): Promise<RadarIssue[]> {
  const endpoint =
    `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}` +
    `?query=${encodeURIComponent(QUERY)}`;

  try {
    const res = await fetch(endpoint, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) return FALLBACK_RADAR_ISSUES;

    const data = (await res.json()) as {
      result?: Array<Omit<RadarIssue, "url" | "kind"> & { _type: string }>;
    };
    if (!data.result?.length) {
      return FALLBACK_RADAR_ISSUES; 
    }

    return data.result.map((item) => {
      const isIssue = item._type === "issue";
      const url = isIssue
    ? `${RADAR_BASE_URL}/issues/${item.slug}`
    : `${RADAR_BASE_URL}/posts/${item.slug}`;

  return {
    ...item, 
    url,     
    kind: (item._type as "issue" | "post") || "issue",
  };
});
  } catch {
    return FALLBACK_RADAR_ISSUES;
  }
}

/** Backward-compatible export for existing callers */
export async function getLatestRadarPosts(): Promise<RadarPost[]> {
  return getLatestRadarIssues();
}
