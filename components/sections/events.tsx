import { PROGRAMS, CALENDAR_HREF } from "@/lib/content/programs";
import { OUTLINE_TEXT_CLASS } from "@/lib/colors";
import { SmartImage } from "@/components/placeholder-image";
import { cn } from "@/lib/utils";

/** Overlapping concentric circles in the 4 Google colors with a photo */
function CircleStack() {
  const rings = [
    { color: "#ea4335", offset: "translate-x-[72%]" },
    { color: "#faab00", offset: "translate-x-[48%]" },
    { color: "#34a853", offset: "translate-x-[24%]" },
    { color: "#4285f4", offset: "translate-x-0" },
  ];
  return (
    <div
      className="relative mx-auto h-44 w-72 sm:h-56 sm:w-96"
      aria-hidden={false}
    >
      {rings.map((ring) => (
        <div
          key={ring.color}
          className={cn(
            "absolute left-0 top-0 h-44 w-44 rounded-full sm:h-56 sm:w-56",
            ring.offset
          )}
          style={{ backgroundColor: ring.color }}
          aria-hidden
        />
      ))}
      <SmartImage
        src={undefined} // drop in /images/events/orbit-circle.jpg
        alt="Members at a GDG Babcock event"
        label="Events circle photo — square group shot, shown in a circle crop, ~600×600"
        className="absolute left-0 top-0 h-44 w-44 rounded-full sm:h-56 sm:w-56"
        imgClassName="rounded-full"
        sizes="224px"
      />
    </div>
  );
}

/** "Programs worth marking your calendar for." — giant outlined program names */
export default function Events() {
  return (
    <section id="events" className="scroll-mt-24 bg-[#0f0f0f]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-green">
              Our Events
            </p>
            <h2 className="mt-4 max-w-md text-4xl font-bold leading-tight text-gdg-cream sm:text-5xl">
              Programs worth marking your calendar for.
            </h2>
          </div>
          <CircleStack />
        </div>

        <div className="mt-16 space-y-10">
          {PROGRAMS.map((program) => (
            <div
              key={program.name}
              className="grid items-center gap-3 lg:grid-cols-[3fr_2fr] lg:gap-10"
            >
              {program.href ? (
                <a
                  href={program.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "text-outline-fill w-fit whitespace-nowrap text-[clamp(2.75rem,9vw,7rem)] font-extrabold uppercase leading-none",
                    OUTLINE_TEXT_CLASS[program.color]
                  )}
                >
                  {program.name}
                </a>
              ) : (
                <p
                  className={cn(
                    "text-outline-fill w-fit whitespace-nowrap text-[clamp(2.75rem,9vw,7rem)] font-extrabold uppercase leading-none",
                    OUTLINE_TEXT_CLASS[program.color]
                  )}
                >
                  {program.name}
                </p>
              )}
              <p className="max-w-xs text-sm leading-relaxed text-white/70">
                {program.description}
              </p>
            </div>
          ))}
        </div>

        <a
          href={CALENDAR_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-14 inline-block rounded-full bg-gdg-cream px-6 py-3 text-sm font-semibold text-[#0f0f0f] transition-transform hover:scale-[1.03]"
        >
          See Full Calendar
        </a>
      </div>
    </section>
  );
}
