import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FEATURED_PRODUCTS, STATUS_LABEL } from "@/lib/content/products";
import { OUTLINE_TEXT_CLASS, PILL_CLASS } from "@/lib/colors";
import { PreviewBanner } from "@/components/site-preview";
import { cn } from "@/lib/utils";

/** "Built here." — the flagship live products, linking out to each. */
export default function FeaturedProducts() {
  return (
    <section id="products" className="scroll-mt-24 bg-[#0b0b0b]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-red">
              What defines us
            </p>
            <h2 className="mt-4 max-w-lg text-4xl font-bold leading-tight text-gdg-cream sm:text-5xl">
              Products, not just events.
            </h2>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
          >
            See everything we&apos;ve shipped
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FEATURED_PRODUCTS.map((product) => (
            <a
              key={product.name}
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/12 bg-[#161616] transition-colors hover:border-white/30"
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
                  <ArrowUpRight className="h-5 w-5 text-white/40 transition-colors group-hover:text-white" />
                </div>
                <p
                  className={cn(
                    "mt-6 text-3xl font-extrabold uppercase leading-none sm:text-4xl",
                    OUTLINE_TEXT_CLASS[product.color]
                  )}
                >
                  {product.name}
                </p>
                <p className="mt-3 text-sm text-white/70">{product.tagline}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
