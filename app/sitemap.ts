import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content/site";
import { fetchPublishedEvents } from "@/lib/events-service";

// Rebuild the sitemap hourly so new events show up without a redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/events`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/products`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/team`, changeFrequency: "monthly", priority: 0.7 },
  ];

  try {
    const events = await fetchPublishedEvents();
    for (const event of events) {
      staticRoutes.push({
        url: `${SITE_URL}/events/${event.slug}`,
        lastModified: event.updated_at ? new Date(event.updated_at) : undefined,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  } catch {
    // Events API unavailable at build/request time — ship the static routes only.
  }

  return staticRoutes;
}
