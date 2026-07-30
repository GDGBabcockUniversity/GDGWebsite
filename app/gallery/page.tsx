import type { Metadata } from "next";
import Link from "next/link";
import { getGalleries, sized } from "@/lib/gicip";
import { SOCIAL_LINKS } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs from GDG Babcock events, trips and meetups, kept in one place.",
  alternates: { canonical: "/gallery" },
};

export const revalidate = 3600;

function albumDate(date?: string): string | null {
  if (!date) return null;
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

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
          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {galleries.map((gallery) => {
              const cover =
                gallery.coverImageUrl ?? gallery.images[0]?.imageUrl;
              const when = albumDate(gallery.date);
              return (
                <li key={gallery.slug}>
                  <Link
                    href={`/gallery/${gallery.slug}`}
                    className="group block overflow-hidden rounded-3xl border border-white/12 bg-[#171717] transition-transform hover:scale-[1.005]"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-black">
                      {cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={sized(cover, { w: 900, h: 675 })}
                          alt={gallery.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : null}
                    </div>
                    <div className="p-5">
                      <p className="font-semibold text-gdg-cream">
                        {gallery.title}
                      </p>
                      <p className="mt-1 text-xs text-white/45">
                        {[when, `${gallery.images.length} photographs`]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                      {gallery.description && (
                        <p className="mt-2 text-sm leading-relaxed text-white/60">
                          {gallery.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
