"use client";

import { useMemo, useState } from "react";
import TeamMemberCard from "@/components/team-member-card";
import {
  TEAM_YEARS,
  TEAM_SECTIONS,
  type TeamMember,
  type SectionDef,
} from "@/lib/team-data";
import { getTrack, type GdgColor } from "@/lib/tracks";
import { BG_CLASS } from "@/lib/colors";
import { cn } from "@/lib/utils";

/** Leads first, everyone else in their original order. */
function leadsFirst(members: TeamMember[]): TeamMember[] {
  return [...members].sort(
    (a, b) => (b.isLead ? 1 : 0) - (a.isLead ? 1 : 0)
  );
}

/** Track subteams get their brand color; other sections cycle by index. */
function subteamColor(section: string, subteam: string): GdgColor | undefined {
  if (section === "tracks") return getTrack(subteam)?.color;
  return undefined;
}

function MemberGrid({
  members,
  accentColor,
}: {
  members: TeamMember[];
  accentColor?: GdgColor;
}) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {leadsFirst(members).map((member, i) => (
        <TeamMemberCard
          key={member.name}
          name={member.name}
          role={member.role}
          wordsToLiveBy={member.wordsToLiveBy}
          image={member.image}
          music={member.music}
          links={member.links}
          accentColor={accentColor}
          accentIndex={i}
        />
      ))}
    </div>
  );
}

function Section({
  def,
  members,
}: {
  def: SectionDef;
  members: TeamMember[];
}) {
  if (members.length === 0) return null;

  // Group by subteam, honoring the section's declared order; anything else
  // (or members with no subteam) falls into a trailing untitled group.
  const grouped: { subteam: string; members: TeamMember[] }[] = [];
  if (def.subteams.length > 0) {
    for (const st of def.subteams) {
      const inSub = members.filter((m) => m.subteam === st);
      if (inSub.length) grouped.push({ subteam: st, members: inSub });
    }
    const rest = members.filter(
      (m) => !m.subteam || !def.subteams.includes(m.subteam)
    );
    if (rest.length) grouped.push({ subteam: "", members: rest });
  } else {
    grouped.push({ subteam: "", members });
  }

  return (
    <section id={`section-${def.id}`} className="scroll-mt-28">
      <h2 className="text-outline text-3xl font-extrabold uppercase leading-none sm:text-5xl">
        {def.label}
      </h2>
      <div className="mt-10 space-y-12">
        {grouped.map((g) => {
          const color = subteamColor(def.id, g.subteam);
          return (
            <div key={g.subteam || "_"}>
              {g.subteam && (
                <div className="mb-6 flex items-center gap-3">
                  {color && (
                    <span
                      className={cn("h-3 w-3 rounded-full", BG_CLASS[color])}
                      aria-hidden
                    />
                  )}
                  <h3 className="text-lg font-bold text-gdg-cream">
                    {g.subteam}
                  </h3>
                </div>
              )}
              <MemberGrid members={g.members} accentColor={color} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function TeamPage() {
  const [yearId, setYearId] = useState(TEAM_YEARS[0].id);
  const year = TEAM_YEARS.find((y) => y.id === yearId) ?? TEAM_YEARS[0];

  const sectionsWithMembers = useMemo(
    () =>
      TEAM_SECTIONS.map((def) => ({
        def,
        members: year.members.filter((m) => (m.section ?? "core") === def.id),
      })).filter((s) => s.members.length > 0),
    [year]
  );

  const scrollToSection = (id: string) => {
    document
      .getElementById(`section-${id}`)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <section className="px-4 pb-12 pt-36 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-blue">
            The Team
          </p>
          <h1 className="text-outline mt-4 text-5xl font-extrabold uppercase leading-none sm:text-7xl">
            The people behind it all
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Every team that has built GDG Babcock — browsable by year. The
            faces that make the whole ecosystem run.
          </p>

          {/* Year tabs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {TEAM_YEARS.map((y) => (
              <button
                key={y.id}
                onClick={() => setYearId(y.id)}
                className={cn(
                  "cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-all",
                  y.id === yearId
                    ? "bg-gdg-cream text-[#0f0f0f]"
                    : "border border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                {y.label}
              </button>
            ))}
          </div>

          {/* Section jump-pills (current-year structure) */}
          {sectionsWithMembers.length > 1 && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {sectionsWithMembers.map(({ def }) => (
                <button
                  key={def.id}
                  onClick={() => scrollToSection(def.id)}
                  className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {def.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {year.members.length === 0 ? (
            <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-white/20 bg-[#161616] p-10 text-center">
              <p className="text-lg font-bold text-gdg-cream">
                The {year.label} archive is being assembled.
              </p>
              <p className="mt-3 text-sm text-white/60">
                We&apos;re gathering names and photos for this year&apos;s team.
                Know where they live? Reach out{" "}
                <a
                  href="https://www.instagram.com/gdgbabcock/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gdg-blue hover:underline"
                >
                  @gdgbabcock
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="space-y-20">
              {sectionsWithMembers.map(({ def, members }) => (
                <Section key={def.id} def={def} members={members} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
