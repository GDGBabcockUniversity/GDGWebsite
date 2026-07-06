import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TEAM_PREVIEW } from "@/lib/team-data";
import { GDG_HEX, TEXT_CLASS, colorByIndex } from "@/lib/colors";
import { InitialsAvatar } from "@/components/initials-avatar";
import { cn } from "@/lib/utils";

const ROTATIONS = [
  "lg:-rotate-2",
  "lg:rotate-1",
  "lg:rotate-3",
  "lg:-rotate-1",
  "lg:rotate-2",
  "lg:-rotate-3",
  "lg:rotate-1",
  "lg:-rotate-2",
  "lg:rotate-2",
  "lg:-rotate-1",
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
                  "min-w-[220px] snap-start rounded-2xl border bg-[#161616] p-4 lg:min-w-0",
                  ROTATIONS[i % ROTATIONS.length],
                  i % 2 === 1 && "lg:translate-y-6"
                )}
                style={{ borderColor: GDG_HEX[color] }}
              >
                <div className="flex items-center gap-3">
                  <InitialsAvatar name={member.name} color={color} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-white">
                      {member.name}
                    </p>
                    <p className="truncate text-xs text-white/50">
                      {member.role}
                    </p>
                  </div>
                </div>
                <p className={cn("mt-3 text-xs font-medium", TEXT_CLASS[color])}>
                  @gdgbabcock
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
