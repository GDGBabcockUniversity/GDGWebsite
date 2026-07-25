/**
 * Member activity — the shape the linked profile grows into as other
 * ecosystem services (events, certificates, RADAR, StudySmart) start writing
 * to the auth user record. These fields don't exist on PlatformUser yet; the
 * profile reads them optionally and shows "coming online" states until a
 * service fills them in. Keeping the type here means the contract is one place.
 */

import type { PlatformUser } from "@/lib/auth-service";

export interface MemberCertificate {
  id: string;
  title: string;
  event?: string;
  issued_at?: string;
  url?: string;
}

export interface MemberActivity {
  events_attended?: number;
  stars?: number;
  streak?: number;
  radar_articles_read?: number;
  radar_reading_minutes?: number;
  radar_games_played?: number;
}

export interface MemberTeamMembership {
  role: string;
  section: string;
  subteam?: string | null;
}

/** Optional reads off the user record — safe before the services exist. */
export function getCertificates(user: PlatformUser | null): MemberCertificate[] {
  return ((user as unknown as { certificates?: MemberCertificate[] })
    ?.certificates) ?? [];
}

export function getActivity(user: PlatformUser | null): MemberActivity {
  return (
    (user as unknown as { activity?: MemberActivity })?.activity ?? {}
  );
}

/** The linked team_members row (role/section/subteam), or null if unlinked. */
export function getTeamMembership(
  user: PlatformUser | null
): MemberTeamMembership | null {
  return (
    (user as unknown as { team_membership?: MemberTeamMembership | null })
      ?.team_membership ?? null
  );
}

/** "September 2024" from an ISO timestamp. */
export function formatJoinDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-NG", { month: "long", year: "numeric" });
}

/** Members who joined before this counted as early/founding members. */
export const FOUNDING_CUTOFF = new Date("2025-01-01");

export function isFoundingMember(iso?: string): boolean {
  if (!iso) return false;
  const d = new Date(iso);
  return !Number.isNaN(d.getTime()) && d < FOUNDING_CUTOFF;
}
