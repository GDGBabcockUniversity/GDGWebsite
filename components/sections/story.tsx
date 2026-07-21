import { SmartImage } from "@/components/placeholder-image";

/** Green starburst sticker from the mockup */
function Starburst({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path
        fill="#34a853"
        d="M50 0l8.7 15.5L74 8.3l1.4 17.7 17.7 1.4-7.2 15.3L101.4 50l-15.5 8.7 7.2 15.3-17.7 1.4-1.4 17.7-15.3-7.2L50 101.4l-8.7-15.5-15.3 7.2-1.4-17.7-17.7-1.4 7.2-15.3L-1.4 50l15.5-8.7-7.2-15.3 17.7-1.4 1.4-17.7 15.3 7.2z"
      />
    </svg>
  );
}

/** Hand-drawn curved arrow pointing at the affiliation copy */
function CurvedArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" fill="none" className={className} aria-hidden>
      <path
        d="M110 10 C 60 5, 20 25, 14 62"
        stroke="#4285f4"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M4 50 L 14 64 L 26 54"
        stroke="#4285f4"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/** "Founded to close the gap." story section */
export default function Story() {
  return (
    <section className="relative overflow-hidden bg-[#0f0f0f]">
      <div className="editorial-grid absolute inset-0 opacity-80" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_35%_50%,rgba(66,133,244,0.07),transparent_34%),linear-gradient(90deg,rgba(15,15,15,0.15),rgba(15,15,15,0.55))]"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-6 py-24 sm:px-8 lg:min-h-[800px] lg:py-28">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Tilted polaroid */}
          <div className="relative mx-auto w-full max-w-xl lg:mx-0">
            <SmartImage
              src="/images/story/founding-photo.png"
              alt="Early GDG Babcock members"
              label="Founding-story photo — group shot of early members in GDG merch, ~1200×900"
              className="aspect-[658/610] w-full overflow-visible drop-shadow-[0_34px_58px_rgba(0,0,0,0.38)]"
              imgClassName="object-contain"
              sizes="(max-width: 1024px) 90vw, 40vw"
            />
            {/* Sticker captions on the founding photo. Swap in the real
                founding year here if you want it on the sticker. */}
            <span className="absolute -top-4 left-10 rounded-full bg-gdg-red px-4 py-1.5 text-xs font-bold text-white shadow-lg -rotate-6 sm:left-16 sm:text-sm">
              Early days.
            </span>
            <span className="absolute bottom-4 right-0 rounded-full bg-gdg-yellow px-4 py-1.5 text-xs font-bold text-[#0f0f0f] shadow-lg rotate-3 sm:right-6">
              Still building.
            </span>
            <Starburst className="absolute -bottom-8 -left-7 h-28 w-28 rotate-12 sm:-bottom-10 sm:-left-10 sm:h-36 sm:w-36" />
          </div>

          {/* Copy */}
          <div className="relative text-center lg:text-right">
            <h2 className="ml-auto max-w-2xl text-5xl font-bold leading-[1.12] text-gdg-cream sm:text-6xl lg:text-6xl xl:text-7xl">
              Founded to close
              <br />
              the gap.
            </h2>
            <p className="mt-8 text-base leading-relaxed text-white/65 sm:text-lg lg:ml-auto lg:max-w-[620px]">
              Officially affiliated with Google Developer Groups, giving our
              community direct access to Google technologies, developer
              resources, and the global GDG network.
            </p>
            <div className="relative mt-14 inline-block lg:mr-32">
              <CurvedArrow className="absolute -left-12 -top-16 h-20 w-28 -rotate-[28deg] sm:-left-20 sm:-top-20 sm:h-24 sm:w-36" />
              <span className="inline-block -rotate-3 rounded-full bg-gdg-blue px-5 py-2 text-xs font-bold text-white shadow-[0_12px_32px_rgba(66,133,244,0.28)]">
                Officially GDG.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
