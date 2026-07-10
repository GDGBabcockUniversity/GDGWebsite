/**
 * Events service client — talks to the GDG Babcock Auth Service's /events
 * endpoints. Public fetchers are server-safe (no localStorage); authed
 * actions are client-only and mirror lib/auth-service.ts's JWT + 401-retry
 * pattern.
 */

import { getStoredTokens, refreshAccessToken } from "@/lib/auth-service";

const AUTH_API_URL =
  process.env.NEXT_PUBLIC_AUTH_API_URL || "https://auth.gdgbabcock.com";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface PlatformEvent {
  id: string;
  slug: string;
  title: string;
  description?: string;
  cover_image_url?: string;
  location?: string;
  starts_at: string;
  ends_at?: string;
  capacity?: number | null;
  status: "draft" | "published" | "ended" | "cancelled";
  certificate_type: "participation" | "completion";
  registered_count?: number;
  created_at: string;
  updated_at: string;
}

export interface EventRegistration {
  id: string;
  event_id: string;
  user_id: string;
  status: "registered" | "waitlisted" | "cancelled";
  registered_at: string;
}

export interface EventAttendee {
  user_id: string;
  full_name: string;
  email: string;
  matric_no?: string;
  department?: string;
  registered_at: string;
  checked_in_at?: string | null;
  certificate_status?: "pending" | "issued" | "failed" | null;
  certificate_url?: string | null;
}

export interface EventInput {
  title: string;
  description?: string;
  cover_image_url?: string;
  location?: string;
  starts_at: string;
  ends_at?: string;
  capacity?: number | null;
  status?: "draft" | "published" | "ended" | "cancelled";
  certificate_type?: "participation" | "completion";
}

// ─── Public fetchers (server-safe, no localStorage) ────────────────────────

/** List published events. Safe to call from server components. */
export async function fetchPublishedEvents(): Promise<PlatformEvent[]> {
  const res = await fetch(`${AUTH_API_URL}/events`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.events || data.data?.events || data.data || [];
}

/** Fetch a single published/ended event by slug. Returns null on 404. */
export async function fetchEventBySlug(
  slug: string
): Promise<PlatformEvent | null> {
  const res = await fetch(`${AUTH_API_URL}/events/${slug}`, {
    next: { revalidate: 60 },
  });
  if (res.status === 404) return null;
  if (!res.ok) return null;
  const data = await res.json();
  return data.event || data.data?.event || data.data || null;
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

/** The caller's own registration for an event, or null if not registered. */
export async function fetchMyRegistration(
  eventId: string
): Promise<EventRegistration | null> {
  const res = await authedFetch(`/events/${eventId}/registration`, {
    method: "GET",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.registration ?? null;
}

export async function registerForEvent(eventId: string): Promise<void> {
  const res = await authedFetch(`/events/${eventId}/register`, {
    method: "POST",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.error || "Failed to register");
  }
}

export async function cancelRegistration(eventId: string): Promise<void> {
  const res = await authedFetch(`/events/${eventId}/register`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.error || "Failed to cancel registration");
  }
}

/** Admin: list events in any status. */
export async function fetchAdminEvents(status?: string): Promise<PlatformEvent[]> {
  const query = status ? `?status=${encodeURIComponent(status)}` : "";
  const res = await authedFetch(`/events/admin/all${query}`, { method: "GET" });
  if (!res.ok) return [];
  const data = await res.json();
  return data.events || data.data?.events || data.data || [];
}

export async function createEvent(payload: EventInput): Promise<PlatformEvent> {
  const res = await authedFetch("/events", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.error || "Failed to create event");
  }
  const data = await res.json();
  return data.event || data.data?.event || data.data;
}

export async function updateEvent(
  id: string,
  payload: Partial<EventInput>
): Promise<PlatformEvent> {
  const res = await authedFetch(`/events/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.error || "Failed to update event");
  }
  const data = await res.json();
  return data.event || data.data?.event || data.data;
}

/** Admin: attendee roster with check-in + certificate state. */
export async function fetchAttendees(eventId: string): Promise<EventAttendee[]> {
  const res = await authedFetch(`/events/${eventId}/attendees`, { method: "GET" });
  if (!res.ok) return [];
  const data = await res.json();
  return data.attendees || data.data?.attendees || data.data || [];
}

/** Admin: mark a user as checked in (triggers certificate issuance). */
export async function checkInAttendee(
  eventId: string,
  userId: string
): Promise<{ certificate_status: string }> {
  const res = await authedFetch(`/events/${eventId}/checkin`, {
    method: "POST",
    body: JSON.stringify({ user_id: userId }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.error || "Failed to check in attendee");
  }
  return res.json();
}
