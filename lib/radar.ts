/**
 * RADAR — fetch the latest posts straight from Sanity's public content API.
 *
 * No Sanity SDK dependency: we hit the read-only query endpoint with plain
 * fetch (same project/dataset/GROQ that radar.gdgbabcock.com uses). Returns
 * null when the env isn't configured or the request fails, so the homepage
 * degrades to an editorial card instead of breaking the build.
 */

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const API_VERSION = "2024-01-01";

export const RADAR_BASE_URL = "https://radar.gdgbabcock.com";

export interface RadarPost {
  title: string;
  slug: string;
  description?: string;
  publishedAt?: string;
  imageUrl?: string;
  url: string;
}

const QUERY = `*[_type == "post" && hidden != true] | order(publishedAt desc)[0...3]{
  title,
  "slug": slug.current,
  description,
  publishedAt,
  "imageUrl": mainImage.asset->url
}`;

export async function getLatestRadarPosts(): Promise<RadarPost[] | null> {
  if (!PROJECT_ID) return null;

  const endpoint =
    `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}` +
    `?query=${encodeURIComponent(QUERY)}`;

  try {
    const res = await fetch(endpoint, {
      // revalidate hourly — RADAR publishes on its own cadence
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      result?: Array<Omit<RadarPost, "url">>;
    };
    if (!data.result?.length) return null;
    return data.result.map((p) => ({
      ...p,
      url: `${RADAR_BASE_URL}/posts/${p.slug}`,
    }));
  } catch {
    return null;
  }
}
