import type { Metadata } from "next";
import GalleryIndex from "@/components/gallery/gallery-index";
import { getGalleries } from "@/lib/gicip";
import { SOCIAL_LINKS } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs from GDG Babcock events, trips and meetups, kept in one place.",
  alternates: { canonical: "/gallery" },
};

export const revalidate = 3600;

export default async function GalleryPage() {
  const galleries = await getGalleries();

  return (
    <main className="min-h-screen bg-[#0f0f0f] px-6 pb-24 pt-36">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-yellow">
          Gallery
        </p>
        <h1 className="mt-3 text-4xl font-bold text-gdg-cream sm:text-5xl">
          Everything we have run
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75">
          Photographs from our events, trips and meetups, kept here so they stay
          findable.
        </p>

        {galleries.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-white/15 bg-background p-10 text-center">
            <p className="text-sm text-white/60">
              The albums are being put together. In the meantime, the most
              recent photographs are on Instagram.
            </p>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block rounded-full bg-gdg-cream px-6 py-3 text-sm font-semibold text-[#0f0f0f]"
            >
              See them on Instagram
            </a>
          </div>
        ) : (
          <GalleryIndex galleries={galleries} />
        )}
      </div>
    </main>
  );
}
