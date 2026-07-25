import type { Metadata } from "next";
import Hero from "@/components/hero";
import MarqueeTicker from "@/components/sections/marquee-ticker";
import Story from "@/components/sections/story";
import WhatWeDo from "@/components/sections/what-we-do";
import AnnualStructure from "@/components/sections/annual-structure";
import UpcomingEvents from "@/components/sections/upcoming-events";
import FeaturedProducts from "@/components/sections/featured-products";
import ComingSoon from "@/components/sections/coming-soon";
import Engage from "@/components/sections/engage";
import GalleryStrips from "@/components/sections/gallery-strips";
import AcrossCampus from "@/components/sections/across-campus";
import Partner from "@/components/sections/partner";
import TeamPreview from "@/components/sections/team-preview";
import RadarLatest from "@/components/sections/radar-latest";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1. What GDG Babcock is */}
      <Hero />
      <MarqueeTicker />
      <Story />
      <WhatWeDo />
      {/* 2. Upcoming events, then the annual structure backdrop */}
      <UpcomingEvents />
      <AnnualStructure />
      {/* 3. Featured products, then what's nearly shipped */}
      <FeaturedProducts />
      <ComingSoon />
      {/* 4. How students engage */}
      <Engage />
      <GalleryStrips titles={["ORBIT"]} />
      {/* 5. How we work across campus */}
      <AcrossCampus />
      {/* 6. Partnership CTA */}
      <Partner />
      {/* 7. Team preview */}
      <TeamPreview />
      {/* 8. Latest from RADAR */}
      <RadarLatest />
    </main>
  );
}
