import { OUTLINE_TEXT_CLASS, BG_CLASS } from "@/lib/colors";
import type { GdgColor } from "@/lib/tracks";
import { cn } from "@/lib/utils";

interface Phase {
  when: string;
  name: string;
  description: string;
  color: GdgColor;
}

const PHASES: Phase[] = [
  {
    when: "First semester",
    name: "ORBIT",
    description:
      "Our flagship initiative opens the year — talks, demos, workshops, and community.",
    color: "red",
  },
  {
    when: "All year long",
    name: "MEETUPS + RADAR",
    description:
      "Monthly meetups keep the community close; RADAR publishes what's next the whole way through.",
    color: "blue",
  },
  {
    when: "Second semester",
    name: "BUILD WITH AI",
    description:
      "GDG Week — a concentrated week of daily, hands-on AI workshops to close out the term.",
    color: "yellow",
  },
  {
    when: "Year end",
    name: "THE 100",
    description:
      "We recognize the 100 most active builders of the year on babcock100.com.",
    color: "green",
  },
];

/** "One year, structured." — the annual rhythm. Owns the #events anchor. */
export default function AnnualStructure() {
  return (
    <section id="events" className="scroll-mt-24 bg-[#0f0f0f]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-green">
          Our year
        </p>
        <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-gdg-cream sm:text-5xl">
          Programs worth marking your calendar for.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
          Every semester has its flagship, every month its touchpoint, and the
          year closes on recognition.
        </p>

        {/* Timeline: 4 nodes across on lg, stacked on mobile */}
        <div className="mt-16 grid gap-10 lg:grid-cols-4 lg:gap-6">
          {PHASES.map((phase, i) => (
            <div key={phase.name} className="relative">
              {/* connector line (lg only) */}
              {i < PHASES.length - 1 && (
                <div
                  className="absolute left-[calc(50%+1.5rem)] right-[-1.5rem] top-2 hidden h-px bg-white/15 lg:block"
                  aria-hidden
                />
              )}
              <div className="flex items-center gap-3 lg:block">
                <span
                  className={cn(
                    "block h-4 w-4 shrink-0 rounded-full",
                    BG_CLASS[phase.color]
                  )}
                  aria-hidden
                />
                <p className="mt-0 text-xs font-bold uppercase tracking-[0.2em] text-white/50 lg:mt-4">
                  {phase.when}
                </p>
              </div>
              <p
                className={cn(
                  "mt-3 text-3xl font-extrabold uppercase leading-none lg:text-4xl",
                  OUTLINE_TEXT_CLASS[phase.color]
                )}
              >
                {phase.name}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
