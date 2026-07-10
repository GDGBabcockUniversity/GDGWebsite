/**
 * Team service client — talks to the GDG Babcock Auth Service's /team
 * endpoints. Public fetcher is server-safe (no localStorage); admin actions
 * are client-only and mirror lib/events-service.ts's JWT + 401-retry pattern.
 */

import { getStoredTokens, refreshAccessToken } from "@/lib/auth-service";

const AUTH_API_URL =
  process.env.NEXT_PUBLIC_AUTH_API_URL || "https://auth.gdgbabcock.com";

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

export interface AdminRosterMember extends RosterMember {
  user_id: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export type TeamMemberInput = Partial<
  Omit<AdminRosterMember, "id" | "created_at" | "updated_at">
>;

// ─── Public fetcher (server-safe, no localStorage) ─────────────────────────

/** Public roster listing. Safe to call from server components. */
export async function fetchTeamRoster(): Promise<RosterMember[]> {
  const res = await fetch(`${AUTH_API_URL}/team`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.members || data.data?.members || data.data || [];
}

// ─── Client-only authed actions ─────────────────────────────────────────────

function authHeaders(token?: string): HeadersInit {
  const t = token || getStoredTokens()?.access_token;
  return {
    "Content-Type": "application/json",
    ...(t ? { Authorization: `Bearer ${t}` } : {}),
  };
}

async function authedFetch(path: string, init: RequestInit): Promise<Response> {
  const res = await fetch(`${AUTH_API_URL}${path}`, {
    ...init,
    headers: authHeaders(),
  });
  if (res.status === 401) {
    const newTokens = await refreshAccessToken();
    if (!newTokens) throw new Error("Session expired");
    return fetch(`${AUTH_API_URL}${path}`, {
      ...init,
      headers: authHeaders(newTokens.access_token),
    });
  }
  return res;
}

/** Admin: full roster listing, including inactive entries. */
export async function fetchAdminTeam(): Promise<AdminRosterMember[]> {
  const res = await authedFetch("/team/admin/all", { method: "GET" });
  if (!res.ok) return [];
  const data = await res.json();
  return data.members || data.data?.members || data.data || [];
}

export async function createTeamMember(
  payload: TeamMemberInput
): Promise<AdminRosterMember> {
  const res = await authedFetch("/team/admin", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.error || "Failed to create team member");
  }
  const data = await res.json();
  return data.member || data.data?.member || data.data;
}

export async function updateTeamMember(
  id: string,
  payload: TeamMemberInput
): Promise<AdminRosterMember> {
  const res = await authedFetch(`/team/admin/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.error || "Failed to update team member");
  }
  const data = await res.json();
  return data.member || data.data?.member || data.data;
}

/** Soft-delete — flips is_public off. */
export async function deactivateTeamMember(id: string): Promise<void> {
  const res = await authedFetch(`/team/admin/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.error || "Failed to deactivate team member");
  }
}
