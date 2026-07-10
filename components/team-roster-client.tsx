"use client";

import { useMemo, useState } from "react";
import { Users } from "lucide-react";
import TeamMemberCard from "@/components/team-member-card";
import {
  TEAM_SECTIONS,
  type TeamMember,
  type SectionDef,
  type TeamYear,
} from "@/lib/team-data";
import { getTrack, type GdgColor } from "@/lib/tracks";
import { GDG_HEX } from "@/lib/colors";
import { cn } from "@/lib/utils";

/** Track subteams get their brand color; other sections have no accent. */
function subteamColor(section: string, subteam: string): GdgColor | undefined {
  if (section === "tracks") return getTrack(subteam)?.color;
  return undefined;
}

/** Vertical org-chart connector between a pill and the cards below it. */
function Connector() {
  return (
    <div
      className="mx-auto hidden h-8 w-px bg-white/15 lg:block"
      aria-hidden
    />
  );
}

/** Centered dark pill header — the org-chart node. */
function Pill({
  label,
  color,
  size = "section",
}: {
  label: string;
  color?: GdgColor;
  size?: "section" | "sub";
}) {
  return (
    <div
      className={cn(
        "mx-auto flex w-fit items-center gap-2.5 rounded-full border bg-[#171717]",
        size === "section" ? "px-6 py-3" : "px-4 py-2"
      )}
      style={{ borderColor: color ? GDG_HEX[color] : "rgba(255,255,255,0.15)" }}
    >
      <Users
        className={cn(size === "section" ? "h-4 w-4" : "h-3.5 w-3.5")}
        style={{ color: color ? GDG_HEX[color] : "#fff6e0" }}
        aria-hidden
      />
      <span
        className={cn(
          "font-bold uppercase tracking-widest text-gdg-cream",
          size === "section" ? "text-sm" : "text-xs"
        )}
      >
        {label}
      </span>
    </div>
  );
}

/**
 * Size-aware, centered layout.
 * Mobile (below sm): a lone card (e.g. a single track lead) renders as one
 * normal, modestly-sized centered card — not stretched full-width; a pair
 * (e.g. Organizer + Co-Organizer) fills a 2-column grid side by side; 3+
 * wrap in that same 2-column grid.
 * sm and up: the org-chart look — 1 member → one centered card; 2 → a
 * centered pair on one row; 3+ → a centered wrapping grid (trailing cards
 * never float left). Leads render first.
 */
function MemberRow({
  members,
  accentColor,
  accentOffset,
}: {
  members: TeamMember[];
  accentColor?: GdgColor;
  accentOffset: number;
}) {
  if (members.length === 0) return null;
  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
      {members.map((member, i) => (
        <div key={member.name} className="w-[45%] max-w-[300px] sm:w-[330px] sm:max-w-[360px]">
          <TeamMemberCard
            name={member.name}
            role={member.role}
            wordsToLiveBy={member.wordsToLiveBy}
            image={member.image}
            music={member.music}
            links={member.links}
            accentColor={accentColor}
            accentIndex={accentOffset + i}
          />
        </div>
      ))}
    </div>
  );
}

/**
 * Leads get their own row, always — a flex-wrap on the full member list
 * would only sort leads first, not guarantee they land on a separate visual
 * row. Splitting into two row containers makes "leads on the first row"
 * (organizer + co-organizer, track lead, etc.) an actual layout guarantee.
 */
function GroupBlock({
  members,
  accentColor,
}: {
  members: TeamMember[];
  accentColor?: GdgColor;
}) {
  const leads = members.filter((m) => m.isLead);
  const rest = members.filter((m) => !m.isLead);
  return (
    <div className="space-y-8">
      <MemberRow members={leads} accentColor={accentColor} accentOffset={0} />
      <MemberRow
        members={rest}
        accentColor={accentColor}
        accentOffset={leads.length}
      />
    </div>
  );
}

function Section({ def, members }: { def: SectionDef; members: TeamMember[] }) {
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

  const hasSubteams = grouped.some((g) => g.subteam);

  return (
    <section id={`section-${def.id}`} className="scroll-mt-28">
      <Pill label={def.label} />
      <Connector />
      <div className="mt-8 space-y-14 lg:mt-0">
        {grouped.map((g) => {
          const color = subteamColor(def.id, g.subteam);
          return (
            <div key={g.subteam || "_"}>
              {g.subteam && (
                <>
                  <Pill label={g.subteam} color={color} size="sub" />
                  <Connector />
                </>
              )}
              <div className={cn(g.subteam ? "mt-6 lg:mt-0" : "")}>
                <GroupBlock members={g.members} accentColor={color} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function TeamRosterClient({ years }: { years: TeamYear[] }) {
  const [yearId, setYearId] = useState(years[0]?.id ?? "current");
  const year = years.find((y) => y.id === yearId) ?? years[0];

  const sectionsWithMembers = useMemo(
    () =>
      TEAM_SECTIONS.map((def) => ({
        def,
        members: (year?.members ?? []).filter((m) => (m.section ?? "core") === def.id),
      })).filter((s) => s.members.length > 0),
    [year]
  );

  const scrollToSection = (id: string) => {
    document
      .getElementById(`section-${id}`)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0f0f0f]">
      <div className="editorial-grid pointer-events-none absolute inset-0 opacity-75" aria-hidden />
      <section className="relative px-4 pb-12 pt-36 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-blue">
            The Team
          </p>
          <h1 className="text-outline-base text-outline-cream mx-auto mt-4 w-full max-w-[calc(100vw-2rem)] text-[clamp(2.35rem,10vw,3.8rem)] font-extrabold uppercase leading-none sm:max-w-none sm:text-7xl">
            <span className="block whitespace-nowrap">The people</span>
            <span className="block whitespace-nowrap">behind it all</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Every team that has built GDG Babcock — browsable by year. The
            faces that make the whole ecosystem run.
          </p>

          {/* Year tabs */}
          {years.length > 1 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {years.map((y) => (
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
          )}

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
          {!year || year.members.length === 0 ? (
            <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-white/20 bg-[#161616] p-10 text-center">
              <p className="text-lg font-bold text-gdg-cream">
                The {year?.label ?? "team"} archive is being assembled.
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
