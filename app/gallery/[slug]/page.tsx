import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PhotoGrid from "@/components/gallery/photo-grid";
import { getGalleries, getGallery, sized } from "@/lib/gicip";

interface PageProps {
  params: { slug: string };
}

export const revalidate = 3600;

// Pre-rendered per published album. An empty list is fine: the route still
// resolves on demand, so an album published later needs no redeploy.
export async function generateStaticParams() {
  const galleries = await getGalleries();
  return galleries.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const gallery = await getGallery(params.slug);
  if (!gallery) return { title: "Gallery" };

  const cover = sized(gallery.coverImageUrl ?? gallery.images[0]?.imageUrl, {
    w: 1200,
    h: 630,
  });
  return {
    title: gallery.title,
    description: gallery.description,
    alternates: { canonical: `/gallery/${gallery.slug}` },
    openGraph: {
      title: gallery.title,
      description: gallery.description,
      images: cover ? [cover] : undefined,
    },
  };
}

export default async function GalleryDetailPage({ params }: PageProps) {
  const gallery = await getGallery(params.slug);
  if (!gallery) notFound();

  const when = gallery.date
    ? new Date(gallery.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })
    : null;

  return (
    <main className="min-h-screen bg-[#0f0f0f] px-6 pb-24 pt-36">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/gallery"
          className="mb-8 inline-block text-sm font-medium text-gdg-yellow hover:text-gdg-cream"
        >
          All albums
        </Link>

        <h1 className="text-4xl font-bold text-gdg-cream sm:text-5xl">
          {gallery.title}
        </h1>
        <p className="mt-3 text-sm text-white/45">
          {[when, `${gallery.images.length} photographs`]
            .filter(Boolean)
            .join(" · ")}
        </p>
        {gallery.description && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75">
            {gallery.description}
          </p>
        )}

        <div className="mt-12">
          <PhotoGrid images={gallery.images} />
        </div>
      </div>
    </main>
  );
}
