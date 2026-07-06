import { WHAT_WE_DO } from "@/lib/content/what-we-do";
import { PILL_CLASS } from "@/lib/colors";
import { SmartImage } from "@/components/placeholder-image";
import { cn } from "@/lib/utils";

/** "Where curiosity meets code." — four program polaroids */
export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="scroll-mt-24 bg-[#0f0f0f]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[2fr_3fr]">
          {/* Copy */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-yellow">
              What We Do
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-gdg-cream sm:text-5xl">
              Where curiosity meets code.
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-white/70">
              Four programs. One community. From your first line of code to a
              product real people use.
            </p>
          </div>

          {/* Scattered polaroids (grid below lg, scattered rotations on lg+) */}
          <div className="grid grid-cols-2 gap-5 sm:gap-8">
            {WHAT_WE_DO.map((item, i) => (
              <div
                key={item.title}
                className={cn(
                  "relative",
                  item.rotation,
                  i % 2 === 1 && "lg:translate-y-10"
                )}
              >
                <div className="rounded-md bg-white p-2 pb-8 shadow-xl">
                  <SmartImage
                    src={item.image.src}
                    alt={item.image.alt}
                    label={item.image.label}
                    className="aspect-[4/5] w-full"
                    sizes="(max-width: 1024px) 45vw, 25vw"
                  />
                </div>
                <span
                  className={cn(
                    "absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-bold shadow-lg sm:text-xs",
                    PILL_CLASS[item.color]
                  )}
                >
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
