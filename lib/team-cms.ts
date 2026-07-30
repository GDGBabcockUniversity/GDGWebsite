/**
 * The team roster, read from the content API.
 *
 * Returns the same RosterMember shape the page already consumed when this came
 * from the auth service, so the roster moved editing tools without the team
 * page changing how it groups or renders anyone.
 */

import { sized, type Hotspot } from "@/lib/sanity-image";

/**
 * The shape the team page renders. Kept as-is from when the roster came from
 * the auth service, so moving the editing tools changed nothing downstream.
 */
export interface RosterMember {
  id: string;
  name: string;
  role: string;
  section: string;
  subteam: string | null;
  is_lead: boolean;
  image_url: string | null;
  words_to_live_by: string | null;
  twitter_url: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  spotify_track_name: string | null;
  spotify_track_artist: string | null;
  spotify_track_url: string | null;
  team_year: string;
  display_order: number;
}

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const API_VERSION = "2024-01-01";

/** Edge length of a roster photo. Cards render a square. */
const PHOTO_SIZE = 640;

interface CmsMember {
  _id: string;
  name: string;
  role: string;
  section?: string;
  subteam?: string | null;
  isLead?: boolean;
  photoUrl?: string | null;
  photoHotspot?: Hotspot | null;
  wordsToLiveBy?: string | null;
  teamYear?: string;
  displayOrder?: number;
  platformUserId?: string | null;
  links?: {
    twitter?: string | null;
    linkedin?: string | null;
    portfolio?: string | null;
  } | null;
  music?: {
    name?: string | null;
    artist?: string | null;
    url?: string | null;
  } | null;
}

const QUERY = `*[_type == "teamMemberProfile" && isPublic == true]
  | order(section asc, displayOrder asc, name asc){
    _id, name, role, section, subteam, isLead, wordsToLiveBy,
    teamYear, displayOrder, platformUserId, links, music,
    "photoUrl": photo.asset->url,
    "photoHotspot": photo.hotspot{x, y}
  }`;

function toRosterMember(m: CmsMember): RosterMember {
  return {
    id: m._id,
    name: m.name,
    role: m.role,
    section: m.section ?? "core",
    subteam: m.subteam ?? null,
    is_lead: !!m.isLead,
    image_url:
      sized(m.photoUrl ?? undefined, {
        w: PHOTO_SIZE,
        h: PHOTO_SIZE,
        hotspot: m.photoHotspot,
      }) ?? null,
    words_to_live_by: m.wordsToLiveBy ?? null,
    twitter_url: m.links?.twitter ?? null,
    linkedin_url: m.links?.linkedin ?? null,
    portfolio_url: m.links?.portfolio ?? null,
    spotify_track_name: m.music?.name ?? null,
    spotify_track_artist: m.music?.artist ?? null,
    spotify_track_url: m.music?.url ?? null,
    team_year: m.teamYear ?? "current",
    display_order: m.displayOrder ?? 0,
  };
}

/** Every publicly listed member, across all years. Empty when unconfigured. */
export async function fetchTeamRoster(): Promise<RosterMember[]> {
  if (!PROJECT_ID) return [];
  const endpoint =
    `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}` +
    `?query=${encodeURIComponent(QUERY)}`;
  try {
    const res = await fetch(endpoint, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = (await res.json()) as { result?: CmsMember[] };
    return (data.result ?? []).map(toRosterMember);
  } catch {
    return [];
  }
}

/**
 * The serving team member linked to a platform account, or null.
 *
 * The volunteer badge on a member's profile used to be resolved by the auth
 * service from its own roster table. With the roster in the CMS, the match is
 * made here against the optional platform id on each entry.
 */
export async function fetchTeamMembershipFor(
  platformUserId: string | undefined
): Promise<{ role: string; section: string; subteam: string | null } | null> {
  if (!platformUserId || !PROJECT_ID) return null;

  const query = `*[_type == "teamMemberProfile" && isPublic == true
    && platformUserId == ${JSON.stringify(platformUserId)}]
    | order(teamYear desc)[0]{ role, section, subteam }`;

  const endpoint =
    `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}` +
    `?query=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(endpoint, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      result?: { role: string; section: string; subteam: string | null } | null;
    };
    return data.result ?? null;
  } catch {
    return null;
  }
}
