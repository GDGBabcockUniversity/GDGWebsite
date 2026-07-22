import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Auth-gated / private surfaces — no SEO value, keep them out of the index.
      disallow: ["/admin", "/profile", "/onboarding", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
