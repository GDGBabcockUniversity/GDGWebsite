import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/components/auth-provider";
import { GlassProvider } from "@/components/glass-provider";
import { SvgFilters } from "@/components/svg-filters";
import { SITE_URL, SITE_NAME, SOCIAL_LINKS } from "@/lib/content/site";

const SITE_DESCRIPTION =
  "The Google Developer Group at Babcock University. Workshops, tech talks, hackathons, and 500+ student members.";
const DEFAULT_TITLE =
  "GDG Babcock — Google Developer Group at Babcock University";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    // Child pages set a bare title (e.g. "About") — this appends the suffix.
    template: "%s — GDG Babcock",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "GDG Babcock",
    "Google Developer Group",
    "Babcock University",
    "student developers",
    "tech community",
    "ORBIT",
    "RADAR",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
    // Placeholder share image — the sticker logomark for now; swap for a
    // purpose-built 1200×630 card later.
    images: [{ url: "/og-image.png", width: 503, height: 340, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
    site: "@gdgbabcock",
    creator: "@gdgbabcock",
    images: ["/og-image.png"],
  },
};

// Organization structured data (build5 SEO pass) — helps Google associate
// the brand, its logo, and its social profiles (knowledge-panel eligible).
const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: "Google Developer Group on Campus Babcock University",
  url: SITE_URL,
  logo: `${SITE_URL}/gdg-logo.svg`,
  foundingDate: "2022",
  sameAs: [
    SOCIAL_LINKS.instagram,
    SOCIAL_LINKS.x,
    SOCIAL_LINKS.linkedin,
    SOCIAL_LINKS.tiktok,
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
        <SvgFilters />
        <GlassProvider>
          <AuthProvider>
            <Navigation />
            {children}
            <Footer />
          </AuthProvider>
        </GlassProvider>
        <Analytics />
      </body>
    </html>
  );
}
