import { WHAT_WE_DO } from "@/lib/content/what-we-do";
import { PILL_CLASS } from "@/lib/colors";
import { SmartImage } from "@/components/placeholder-image";
import { cn } from "@/lib/utils";

const POLAROID_LAYOUT = [
  "lg:absolute lg:left-[29%] lg:top-[9%] lg:z-20 lg:w-[260px] lg:-rotate-4 xl:w-[300px]",
  "lg:absolute lg:right-[12%] lg:top-[17%] lg:z-10 lg:w-[245px] lg:rotate-3 xl:w-[285px]",
  "lg:absolute lg:right-[2%] lg:bottom-[6%] lg:z-30 lg:w-[255px] lg:rotate-5 xl:w-[295px]",
  "lg:absolute lg:left-[42%] lg:bottom-[5%] lg:z-20 lg:w-[255px] lg:-rotate-5 xl:w-[295px]",
];

/** "Where curiosity meets code." — four program polaroids */
export default function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      className="relative scroll-mt-24 overflow-hidden bg-[#0f0f0f]"
    >
      <div className="editorial-grid absolute inset-0 opacity-45" aria-hidden />
      <p
        className="text-outline-base text-outline-cream pointer-events-none absolute -left-2 top-10 hidden select-none whitespace-nowrap text-[clamp(8rem,22vw,19rem)] font-extrabold leading-none opacity-10 lg:block"
        aria-hidden
      >
        BUILD
      </p>

      <div className="relative mx-auto min-h-[760px] max-w-7xl px-6 py-24 sm:px-8 lg:min-h-[860px] lg:py-28">
        <div className="grid h-full items-center gap-16 lg:grid-cols-[0.72fr_1.28fr]">
          {/* Copy */}
          <div className="relative z-10 lg:pt-28">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-yellow">
              What We Do
            </p>
            <h2 className="mt-4 max-w-sm text-4xl font-bold leading-[1.08] text-gdg-cream sm:text-5xl lg:text-6xl">
              Where curiosity meets code.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60 sm:text-base">
              Four programs. One community. From your first line of code to a
              product real people use.
            </p>
          </div>

          {/* Scattered polaroids */}
          <div className="relative grid grid-cols-2 gap-5 sm:gap-8 lg:min-h-[620px] lg:gap-0">
            {WHAT_WE_DO.map((item, i) => (
              <div
                key={item.title}
                className={cn(
                  "relative transition-transform duration-300 hover:z-40 hover:scale-[1.03]",
                  item.rotation,
                  POLAROID_LAYOUT[i]
                )}
              >
                <SmartImage
                  src={item.image.src}
                  alt={item.image.alt}
                  label={item.image.label}
                  className="aspect-[4/5] w-full overflow-visible drop-shadow-[0_22px_38px_rgba(0,0,0,0.35)]"
                  imgClassName="object-contain"
                  sizes="(max-width: 1024px) 45vw, 25vw"
                />
                <span
                  className={cn(
                    "absolute bottom-2 left-1/2 max-w-[calc(100%-1rem)] -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-center text-[10px] font-bold leading-none shadow-lg sm:text-[11px] lg:bottom-3",
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
