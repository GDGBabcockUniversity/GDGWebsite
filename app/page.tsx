import Hero from "@/components/hero";
import MarqueeTicker from "@/components/sections/marquee-ticker";
import GalleryStrips from "@/components/sections/gallery-strips";
import Story from "@/components/sections/story";
import WhatWeDo from "@/components/sections/what-we-do";
import Events from "@/components/sections/events";
import TeamPreview from "@/components/sections/team-preview";
import Partner from "@/components/sections/partner";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <MarqueeTicker />
      <GalleryStrips />
      <Story />
      <WhatWeDo />
      <Events />
      <TeamPreview />
      <Partner />
    </main>
  );
}
