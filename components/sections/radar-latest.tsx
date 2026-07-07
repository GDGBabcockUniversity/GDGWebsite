import { ArrowRight } from "lucide-react";
import { getLatestRadarPosts, RADAR_BASE_URL } from "@/lib/radar";
import { SmartImage } from "@/components/placeholder-image";

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** "Latest from RADAR" — 3 newest posts, or an editorial fallback panel */
export default async function RadarLatest() {
  const posts = await getLatestRadarPosts();

  return (
    <section className="bg-[#0f0f0f]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-blue">
              Latest from RADAR
            </p>
            <h2 className="mt-4 max-w-md text-4xl font-bold leading-tight text-gdg-cream sm:text-5xl">
              Our publication and signal platform.
            </h2>
          </div>
          <a
            href={RADAR_BASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-gdg-cream px-6 py-3 text-sm font-semibold text-[#0f0f0f] transition-transform hover:scale-[1.03]"
          >
            Read RADAR
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        {posts ? (
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <a
                key={post.slug}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-3xl border border-white/12 bg-[#161616] transition-colors hover:border-white/30"
              >
                <SmartImage
                  src={post.imageUrl}
                  alt={post.title}
                  label="RADAR article cover"
                  className="aspect-[16/10] w-full"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs text-white/50">
                    {formatDate(post.publishedAt)}
                  </p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-gdg-cream group-hover:text-white">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-white/60">
                      {post.description}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="mt-14 rounded-3xl border border-white/12 bg-[#161616] p-8 sm:p-12">
            <p className="max-w-2xl text-lg leading-relaxed text-white/70">
              RADAR is our newsroom for the Babcock tech ecosystem — articles,
              series, and the tools and trends worth your attention. Fresh
              posts land regularly.
            </p>
            <a
              href={RADAR_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gdg-blue transition-colors hover:text-white"
            >
              Browse the latest on radar.gdgbabcock.com
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
