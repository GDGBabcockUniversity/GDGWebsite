import type { Metadata } from "next";
import TeamRosterClient from "@/components/team-roster-client";
import { fetchTeamRoster, type RosterMember } from "@/lib/team-service";
import type { TeamMember, TeamSection, TeamYear } from "@/lib/team-data";

export const metadata: Metadata = {
  title: "The Team",
  description: "Every team that has built GDG Babcock — browsable by year.",
  alternates: { canonical: "/team" },
};

export const revalidate = 60;

function yearLabel(id: string): string {
  return id === "current" ? "Current Team" : id;
}

// Roster members without a photo are excluded from the org-chart display —
// TeamMemberCard renders every entry with a required <Image>, and every
// currently-imported member has one. This just keeps a future roster entry
// missing a photo from crashing the page instead of rendering broken.
function toTeamMember(m: RosterMember): TeamMember | null {
  if (!m.image_url) return null;
  return {
    name: m.name,
    role: m.role,
    section: (m.section as TeamSection) ?? "core",
    subteam: m.subteam ?? undefined,
    isLead: m.is_lead,
    image: m.image_url,
    wordsToLiveBy: m.words_to_live_by ?? "",
    links: {
      twitter: m.twitter_url ?? "",
      linkedin: m.linkedin_url ?? "",
      portfolio: m.portfolio_url ?? "",
    },
    music: {
      name: m.spotify_track_name ?? "",
      artist: m.spotify_track_artist ?? "",
      url: m.spotify_track_url ?? "",
    },
  };
}

function groupByYear(roster: RosterMember[]): TeamYear[] {
  const byYear = new Map<string, TeamMember[]>();
  for (const m of roster) {
    const member = toTeamMember(m);
    if (!member) continue;
    const list = byYear.get(m.team_year) ?? [];
    list.push(member);
    byYear.set(m.team_year, list);
  }

  const ids = [...byYear.keys()].sort((a, b) => {
    if (a === "current") return -1;
    if (b === "current") return 1;
    return b.localeCompare(a);
  });

  return ids.map((id) => ({ id, label: yearLabel(id), members: byYear.get(id)! }));
}

export default async function TeamPage() {
  const roster = await fetchTeamRoster();
  const years = groupByYear(roster);
  return <TeamRosterClient years={years} />;
}
