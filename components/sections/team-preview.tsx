import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TEAM_PREVIEW } from "@/lib/team-data";
import { GDG_HEX, TEXT_CLASS, colorByIndex } from "@/lib/colors";
import { cn } from "@/lib/utils";

const ROTATIONS = [
  "-rotate-3",
  "rotate-2",
  "rotate-3",
  "-rotate-2",
  "rotate-1",
  "-rotate-1",
  "rotate-2",
  "-rotate-3",
  "rotate-3",
  "-rotate-2",
];

const TAPE_ROTATIONS = [
  "before:-rotate-6",
  "before:rotate-3",
  "before:-rotate-2",
  "before:rotate-6",
  "before:-rotate-3",
  "before:rotate-2",
];

/** "The people behind the pixels." — scattered team cards on the home page */
export default function TeamPreview() {
  return (
    <section id="team" className="scroll-mt-24 bg-[#0f0f0f]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-blue">
          The Team
        </p>
        <h2 className="mt-4 text-4xl font-bold leading-tight text-gdg-cream sm:text-5xl">
          The people behind the pixels.
        </h2>

        {/* Snap-scroll row below lg, scattered grid on lg+ */}
        <div className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:gap-8 lg:gap-y-12 lg:overflow-visible lg:pb-0">
          {TEAM_PREVIEW.map((member, i) => {
            const color = colorByIndex(i);
            return (
              <div
                key={member.name}
                className={cn(
                  "group relative min-w-[220px] snap-start rounded-[1.75rem] border bg-[#161616] p-3 shadow-2xl shadow-black/40 transition-transform duration-300 hover:z-10 hover:scale-[1.03] hover:rotate-0 lg:min-w-0",
                  "before:absolute before:left-1/2 before:top-0 before:z-10 before:h-7 before:w-24 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-sm before:border before:border-white/15 before:bg-white/20 before:backdrop-blur-sm before:content-['']",
                  ROTATIONS[i % ROTATIONS.length],
                  TAPE_ROTATIONS[i % TAPE_ROTATIONS.length],
                  i % 2 === 1 && "lg:translate-y-8"
                )}
                style={{ borderColor: GDG_HEX[color] }}
              >
                <div className="pointer-events-none absolute inset-2 rounded-[1.35rem] border border-white/10" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-white/5">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 220px, 220px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-3 pt-12">
                    <p className="truncate text-sm font-bold text-white">
                      {member.name}
                    </p>
                    <p className="truncate text-xs text-white/70">
                      {member.role}
                    </p>
                  </div>
                </div>
                <p
                  className={cn(
                    "relative mt-3 text-xs font-medium italic leading-relaxed",
                    TEXT_CLASS[color]
                  )}
                >
                  “{member.wordsToLiveBy}”
                </p>
              </div>
            );
          })}
        </div>

        <Link
          href="/team"
          className="mt-12 inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Meet the full team
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
