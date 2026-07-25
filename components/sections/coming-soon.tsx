import { PRODUCTS } from "@/lib/content/products";
import { PreviewBanner } from "@/components/site-preview";
import { OUTLINE_TEXT_CLASS, PILL_CLASS } from "@/lib/colors";
import { cn } from "@/lib/utils";

/**
 * "Coming soon" — the same shape as UpcomingEvents: it renders the things
 * that are on the way, and nothing at all when there aren't any. Driven
 * entirely by `status: "coming-soon"` in the product registry, so a product
 * enters and leaves this section by changing one field.
 *
 * These cards deliberately DON'T link out (the sites may be deployed but
 * aren't meant to be visited yet) — the preview and the travelling border
 * lights do the teasing instead.
 */
export default function ComingSoon() {
  const coming = PRODUCTS.filter((p) => p.status === "coming-soon");
  if (coming.length === 0) return null;

  return (
    <section className="bg-[#0b0b0b]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="max-w-lg">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-yellow">
            Coming soon
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-gdg-cream sm:text-5xl">
            Almost out of the workshop.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            Built, in testing, and nearly yours. Keep an eye on this one.
          </p>
        </div>

        <div
          className={cn(
            "mt-12 grid gap-8",
            coming.length > 1 && "md:grid-cols-2",
            // A lone card shouldn't stretch the full 7xl — it reads as a
            // feature, not a banner.
            coming.length === 1 && "max-w-2xl"
          )}
        >
          {coming.map((product) => (
            // The outer element hosts the travelling lights and must stay
            // transparent and un-clipped (the bloom has to escape it); the
            // inner panel is the opaque surface that masks the middle.
            <div key={product.name} className="border-lights group rounded-3xl">
              <div className="relative z-10 overflow-hidden rounded-3xl bg-[#161616]">
              {/* The preview here must be a glimpse from INSIDE the product,
                  not its landing page: a shot of the front door repeats the
                  wordmark and branding this card already shows, and its live
                  CTAs contradict the "Coming soon" label. Show the thing
                  people actually want to see. */}
              <PreviewBanner src={product.preview} />
              <div className="flex flex-col p-6 sm:p-8">
                <span
                  className={cn(
                    "w-fit rounded-full px-3 py-1 text-[11px] font-bold",
                    PILL_CLASS[product.color]
                  )}
                >
                  Coming soon
                </span>
                <p
                  className={cn(
                    "mt-6 text-4xl font-extrabold uppercase leading-none sm:text-5xl",
                    OUTLINE_TEXT_CLASS[product.color]
                  )}
                >
                  {product.name}
                </p>
                <p className="mt-4 text-sm font-medium text-white/80">
                  {product.tagline}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {product.description}
                </p>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
