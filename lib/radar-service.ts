/**
 * RADAR service client — talks to the GDG Babcock Auth Service's /radar
 * endpoints. Mirrors lib/events-service.ts's JWT + 401-retry pattern.
 *
 * Deliberately goes through the auth service rather than calling RADAR's own
 * /api/me/stats: that endpoint authenticates with an httpOnly cookie scoped to
 * radar.gdgbabcock.com, which this origin never sets. The auth service is the
 * shared hub and already holds the same numbers.
 */

import { getStoredTokens, refreshAccessToken } from "@/lib/auth-service";

const AUTH_API_URL =
  process.env.NEXT_PUBLIC_AUTH_API_URL || "https://auth.gdgbabcock.com";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface RadarGameStat {
  game: string;
  plays: number;
  best_score: number;
}

export interface RadarReadRef {
  slug: string;
  seconds: number;
  read_count: number;
}

export interface RadarWriterPiece {
  slug: string;
  title: string | null;
  readers: number;
  seconds: number;
  published_at: string | null;
}

export interface RadarWriterStats {
  pieces_published: number;
  total_readers: number;
  total_read_minutes: number;
  most_read_piece: RadarWriterPiece | null;
  first_published_at: string | null;
}

export interface RadarStats {
  articles_read: number;
  read_events: number;
  reading_seconds: number;
  reading_minutes: number;
  first_read_at: string | null;
  last_read_at: string | null;
  games_played: number;
  distinct_games: number;
  last_played_at: string | null;
  active_days: number;
  current_streak: number;
  longest_streak: number;
  busiest_month: { month: string; active_days: number } | null;
  most_played_game: string | null;
  games: RadarGameStat[];
  most_read: RadarReadRef | null;
  /** Only present for contributors — null for everyone else. */
  writer: RadarWriterStats | null;
}

// ─── Client ─────────────────────────────────────────────────────────────────

function authHeaders(token?: string): HeadersInit {
  const t = token || getStoredTokens()?.access_token;
  return {
    "Content-Type": "application/json",
    ...(t ? { Authorization: `Bearer ${t}` } : {}),
  };
}

/**
 * The signed-in member's RADAR stats, or null when there's no session or the
 * service is unreachable. Never throws: this powers one profile section, and
 * a RADAR outage must not take the whole profile down with it.
 */
export async function fetchMyRadarStats(): Promise<RadarStats | null> {
  if (!getStoredTokens()) return null;

  try {
    let res = await fetch(`${AUTH_API_URL}/radar/me/stats`, {
      headers: authHeaders(),
    });

    if (res.status === 401) {
      const newTokens = await refreshAccessToken();
      if (!newTokens) return null;
      res = await fetch(`${AUTH_API_URL}/radar/me/stats`, {
        headers: authHeaders(newTokens.access_token),
      });
    }

    if (!res.ok) return null;
    const data = await res.json();
    return (data.stats as RadarStats) ?? null;
  } catch {
    return null;
  }
}

/** "July 2026" from a "YYYY-MM" bucket. */
export function formatMonthLabel(month: string): string {
  const [year, m] = month.split("-").map(Number);
  if (!year || !m) return month;
  return new Date(Date.UTC(year, m - 1, 1)).toLocaleDateString("en-NG", {
    month: "long",
    year: "numeric",
  });
}

/** "signal" / "wordle" → "Signal" — game ids are lowercase slugs. */
export function formatGameName(game: string): string {
  return game
    .split(/[-_:]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

/** Turns a reading path back into something human ("/articles/foo" → "foo"). */
export function readablePath(slug: string): string {
  const last = slug.split("/").filter(Boolean).pop() ?? slug;
  return last.replace(/-/g, " ");
}
