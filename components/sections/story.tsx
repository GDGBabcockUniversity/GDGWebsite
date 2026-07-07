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
      <div className="grid-pattern absolute inset-0 opacity-30" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Tilted polaroid */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="-rotate-3 rounded-md bg-gdg-cream p-3 pb-10 shadow-2xl">
              <SmartImage
                src={undefined} // drop in /images/story/founding-photo.png
                alt="Early GDG Babcock members"
                label="Founding-story photo — group shot of early members in GDG merch, ~1200×900"
                className="aspect-[4/3] w-full"
                sizes="(max-width: 1024px) 90vw, 40vw"
              />
            </div>
            <span className="absolute -top-2 left-6 rounded-full bg-gdg-red px-3 py-1 text-xs font-bold text-white shadow-lg -rotate-6">
              Generic caption
            </span>
            <span className="absolute bottom-4 right-2 rounded-full bg-gdg-yellow px-3 py-1 text-xs font-bold text-[#0f0f0f] shadow-lg rotate-3">
              Generic caption
            </span>
            <Starburst className="absolute -bottom-8 -left-8 h-24 w-24 rotate-12" />
          </div>

          {/* Copy */}
          <div className="text-center lg:text-right">
            <h2 className="text-4xl font-bold leading-tight text-gdg-cream sm:text-5xl lg:text-6xl">
              Founded to close the gap.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/70 lg:ml-auto lg:max-w-md">
              Officially affiliated with Google Developer Groups, giving our
              community direct access to Google technologies, developer
              resources, and the global GDG network.
            </p>
            <div className="relative mt-10 inline-block">
              <CurvedArrow className="absolute -top-14 left-1/2 h-16 w-24 -translate-x-1/2" />
              <span className="rounded-full bg-gdg-blue px-4 py-1.5 text-xs font-bold text-white -rotate-3 inline-block">
                Definitely not AI Generated.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Giant faint outline word bridging into the next section */}
      <div
        className="pointer-events-none relative -mb-8 overflow-hidden"
        aria-hidden
      >
        <p className="text-outline select-none whitespace-nowrap text-center text-[clamp(6rem,20vw,18rem)] font-extrabold leading-none opacity-15">
          BUILD
        </p>
      </div>
    </section>
  );
}
