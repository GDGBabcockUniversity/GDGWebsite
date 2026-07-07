import { CAMPUS_RELATIONSHIPS } from "@/lib/content/campus";
import { BG_CLASS } from "@/lib/colors";
import { cn } from "@/lib/utils";

/** "How we work across campus" — the institutional relationships. */
export default function AcrossCampus() {
  return (
    <section id="campus" className="scroll-mt-24 bg-[#0b0b0b]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-yellow">
          Across campus
        </p>
        <h2 className="mt-4 max-w-lg text-4xl font-bold leading-tight text-gdg-cream sm:text-5xl">
          We don&apos;t work in a bubble.
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CAMPUS_RELATIONSHIPS.map((rel) => (
            <div
              key={rel.title}
              className="rounded-3xl border border-white/12 bg-[#161616] p-6"
            >
              <span
                className={cn("block h-1.5 w-10 rounded-full", BG_CLASS[rel.color])}
                aria-hidden
              />
              <h3 className="mt-4 text-lg font-bold text-gdg-cream">
                {rel.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {rel.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
