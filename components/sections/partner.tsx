import { PARTNER_PILLS, PARTNER_PHOTO } from "@/lib/content/partner";
import { PARTNER_EMAIL } from "@/lib/content/site";
import { PILL_CLASS } from "@/lib/colors";
import { SmartImage } from "@/components/placeholder-image";
import { cn } from "@/lib/utils";

/** "Let's build together." — full-bleed partner CTA */
export default function Partner() {
  return (
    <section
      id="partner"
      className="relative scroll-mt-24 overflow-hidden"
    >
      {/* Background group photo */}
      <div className="absolute inset-0">
        <SmartImage
          src={PARTNER_PHOTO.src}
          alt={PARTNER_PHOTO.alt}
          label={PARTNER_PHOTO.label}
          className="h-full w-full"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"
          aria-hidden
        />
      </div>

      {/* Floating benefit pills (lg+) */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {PARTNER_PILLS.map((pill) => (
          <span
            key={pill.text}
            className={cn(
              "absolute rounded-full px-4 py-1.5 text-xs font-bold shadow-lg",
              PILL_CLASS[pill.color],
              pill.position
            )}
          >
            {pill.text}
          </span>
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-32 lg:py-44">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-yellow">
          Become a Partner
        </p>
        <h2 className="mt-4 max-w-md text-4xl font-bold leading-tight text-gdg-cream sm:text-5xl">
          Let&apos;s build together.
        </h2>

        {/* Benefit pills inline on smaller screens */}
        <div className="mt-6 flex flex-wrap gap-2 lg:hidden">
          {PARTNER_PILLS.map((pill) => (
            <span
              key={pill.text}
              className={cn(
                "rounded-full px-3 py-1 text-[11px] font-bold",
                PILL_CLASS[pill.color]
              )}
            >
              {pill.text}
            </span>
          ))}
        </div>

        <a
          href={`mailto:${PARTNER_EMAIL}?subject=Partnership%20with%20GDG%20Babcock`}
          className="mt-10 inline-block rounded-full bg-gdg-cream px-6 py-3 text-sm font-semibold text-[#0f0f0f] transition-transform hover:scale-[1.03]"
        >
          Partner With Us
        </a>
      </div>
    </section>
  );
}
