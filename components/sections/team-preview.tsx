import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchTeamRoster } from "@/lib/team-cms";
import { GDG_HEX, TEXT_CLASS, colorByIndex } from "@/lib/colors";
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

/** Core-team members shown on the home page, leads first. */
async function getPreviewMembers() {
  const roster = await fetchTeamRoster();
  return roster
    .filter((m) => m.team_year === "current" && m.section === "core" && m.image_url)
    .sort((a, b) => Number(b.is_lead) - Number(a.is_lead));
}

/** "The people behind the pixels." — scattered team cards on the home page */
export default async function TeamPreview() {
  const members = await getPreviewMembers();
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
          {members.map((member, i) => {
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
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-white/5">
                  <Image
                    src={member.image_url!}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 220px, 220px"
                    className="object-cover"
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
                    "mt-3 text-xs font-medium italic leading-relaxed",
                    TEXT_CLASS[color]
                  )}
                >
                  “{member.words_to_live_by}”
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
