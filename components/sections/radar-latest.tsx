import { ArrowRight, ExternalLink } from "lucide-react";
import { getLatestRadarIssues, RADAR_BASE_URL } from "@/lib/radar";
import { SmartImage } from "@/components/placeholder-image";

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** "Latest from RADAR" — 3 newest issues, linking directly to radar.gdgbabcock.com */
export default async function RadarLatest() {
  const issues = await getLatestRadarIssues();

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

        {issues && issues.length > 0 ? (
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {issues.map((issue) => {
              const editionLabel =
                issue.issueNumber != null
                  ? `Issue #${String(issue.issueNumber).padStart(3, "0")}`
                  : "Edition";

              return (
                <a
                  key={issue.slug}
                  href={issue.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col overflow-hidden rounded-3xl border border-white/12 bg-[#161616] transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-2xl hover:shadow-gdg-blue/5"
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-[#1f1f1f]">
                    <SmartImage
                      src={issue.imageUrl}
                      alt={issue.title}
                      label="RADAR issue cover"
                      className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/75 px-3 py-1 backdrop-blur-md">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gdg-blue">
                        {editionLabel}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between text-xs text-white/50">
                      <span>{formatDate(issue.publishedAt)}</span>
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-white/40 transition-colors group-hover:text-gdg-blue">
                        Read
                        <ExternalLink className="h-3 w-3" />
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-bold leading-snug text-gdg-cream transition-colors group-hover:text-white">
                      {issue.title}
                    </h3>

                    {issue.description && (
                      <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-white/60">
                        {issue.description}
                      </p>
                    )}
                  </div>
                </a>
              );
            })}
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
              Browse all issues on radar.gdgbabcock.com
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
