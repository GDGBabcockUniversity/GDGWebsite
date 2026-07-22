import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PRODUCTS, STATUS_LABEL } from "@/lib/content/products";
import { getLatestRadarPosts, RADAR_BASE_URL } from "@/lib/radar";
import { APPLY_URL, PARTNER_EMAIL } from "@/lib/content/site";
import { OUTLINE_TEXT_CLASS, PILL_CLASS, GDG_HEX } from "@/lib/colors";
import { PreviewBanner } from "@/components/site-preview";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The things GDG Babcock has shipped: RADAR, ORBIT, Babcock 100, BabcockVotes, and what's next.",
  alternates: { canonical: "/products" },
};

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-NG", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function ProductsPage() {
  const radarPosts = await getLatestRadarPosts();

  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <section className="px-6 pb-16 pt-36">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-red">
            What we ship
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[1.05] text-gdg-cream sm:text-6xl">
            We build things people actually use.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            GDG Babcock is defined by its products — live platforms that serve
            the community and the wider campus, all linked by one member
            profile.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => {
            const isRadar = product.name === "RADAR";
            const Wrapper = product.href ? "a" : "div";
            return (
              <Wrapper
                key={product.name}
                {...(product.href
                  ? {
                      href: product.href,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {})}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-3xl border border-white/12 bg-[#161616] transition-colors",
                  product.href && "hover:border-white/30",
                  isRadar && radarPosts && "md:col-span-2"
                )}
                style={{ borderTopColor: GDG_HEX[product.color], borderTopWidth: 3 }}
              >
                {/* Live-site preview as a banner (renders nothing until the
                    screenshot exists — the card just goes text-only). */}
                <PreviewBanner src={product.preview} />
                <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between">
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-[11px] font-bold",
                      PILL_CLASS[product.color]
                    )}
                  >
                    {STATUS_LABEL[product.status]}
                  </span>
                  {product.href && (
                    <ArrowUpRight className="h-5 w-5 text-white/40 transition-colors group-hover:text-white" />
                  )}
                </div>
                <p
                  className={cn(
                    "mt-6 text-4xl font-extrabold uppercase leading-none",
                    OUTLINE_TEXT_CLASS[product.color]
                  )}
                >
                  {product.name}
                </p>
                <p className="mt-3 text-sm font-medium text-white/80">
                  {product.tagline}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {product.description}
                </p>

                {/* RADAR shows its latest posts inline when available */}
                {isRadar && radarPosts && (
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {radarPosts.map((post) => (
                      <a
                        key={post.slug}
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-2xl border border-white/10 bg-[#0f0f0f] p-4 transition-colors hover:border-white/25"
                      >
                        <p className="text-[11px] text-white/40">
                          {formatDate(post.publishedAt)}
                        </p>
                        <p className="mt-1 line-clamp-3 text-sm font-semibold text-gdg-cream">
                          {post.title}
                        </p>
                      </a>
                    ))}
                  </div>
                )}
                </div>
              </Wrapper>
            );
          })}
        </div>
      </section>

      {/* CTA row */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3">
          <a
            href={RADAR_BASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gdg-cream px-6 py-3 text-sm font-semibold text-[#0f0f0f] transition-transform hover:scale-[1.03]"
          >
            Read RADAR
          </a>
          <a
            href={APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Apply for Leadership
          </a>
          <a
            href={`mailto:${PARTNER_EMAIL}?subject=Partnership%20with%20GDG%20Babcock`}
            className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Partner With Us
          </a>
        </div>
      </section>
    </main>
  );
}
