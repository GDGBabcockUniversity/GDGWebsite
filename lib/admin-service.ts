/**
 * Admin service client — talks to the GDG Babcock Auth Service's
 * /admin/users and /analytics endpoints. Client-only; mirrors
 * lib/events-service.ts's JWT + 401-retry pattern.
 */

import { getStoredTokens, refreshAccessToken } from "@/lib/auth-service";

const AUTH_API_URL =
  process.env.NEXT_PUBLIC_AUTH_API_URL || "https://auth.gdgbabcock.com";

export interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  roles: string[];
  teams: string[];
  is_active: boolean;
  created_at: string;
  last_login_at: string | null;
}

export interface AdminUserListResult {
  users: AdminUser[];
  total: number;
  page: number;
  limit: number;
}

export interface AdminUserUpdateInput {
  roles?: string[];
  teams?: string[];
  is_active?: boolean;
}

export interface AnalyticsOverview {
  top_scorers: { user_id: string; full_name: string | null; best_score: number }[];
  most_played_games: { game: string; play_count: number }[];
  most_read_articles: { slug: string; reader_count: number }[];
  event_attendance: {
    event_id: string;
    title: string;
    slug: string;
    registrations: number;
    checkins: number;
  }[];
  track_participation: { primary_track: string; member_count: number }[];
}

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

/** Admin: search/list users with pagination. */
export async function fetchAdminUsers(params: {
  search?: string;
  role?: string;
  page?: number;
  limit?: number;
} = {}): Promise<AdminUserListResult> {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.role) query.set("role", params.role);
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  const qs = query.toString();

  const res = await authedFetch(`/admin/users${qs ? `?${qs}` : ""}`, {
    method: "GET",
  });
  if (!res.ok) return { users: [], total: 0, page: 1, limit: 20 };
  return res.json();
}

/** Admin: update a user's roles, teams, or active status. */
export async function updateUserRoles(
  userId: string,
  payload: AdminUserUpdateInput
): Promise<AdminUser> {
  const res = await authedFetch(`/admin/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.error || "Failed to update user");
  }
  const data = await res.json();
  return data.user || data.data?.user || data.data;
}

/** Admin: cross-service analytics aggregates. */
export async function fetchAnalyticsOverview(): Promise<AnalyticsOverview | null> {
  const res = await authedFetch("/analytics/overview", { method: "GET" });
  if (!res.ok) return null;
  const data = await res.json();
  return data.analytics || data.data?.analytics || data.data || null;
}
