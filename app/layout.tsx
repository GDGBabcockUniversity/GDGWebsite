import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/components/auth-provider";
import { GlassProvider } from "@/components/glass-provider";
import { SvgFilters } from "@/components/svg-filters";

export const metadata: Metadata = {
  title: "GDG Babcock — Google Developer Group at Babcock University",
  description:
    "The Google Developer Group at Babcock University. Workshops, tech talks, hackathons, and 500+ students who build things the campus uses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body>
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
