/**
 * Auth Service client — talks to the GDG Babcock Auth Service API.
 * Handles login (Firebase token → platform JWT), refresh, logout, and profile.
 */

const AUTH_API_URL =
  process.env.NEXT_PUBLIC_AUTH_API_URL || "https://auth.gdgbabcock.com";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface PlatformUser {
  id: string;
  firebase_uid: string;
  full_name: string;
  email: string;
  whatsapp_number?: string;
  gender?: string;
  birthday_day?: number;
  birthday_month?: number;
  teams?: string[];
  student_status?: string;
  matric_no?: string;
  department?: string;
  faculty?: string;
  primary_track?: string;
  secondary_track?: string;
  primary_skill_level?: string;
  secondary_skill_level?: string;
  avatar_url?: string;
  tos_agreed?: boolean;
  tos_agreed_at?: string;
  tos_version?: string;
  created_at: string;
  updated_at: string;
  roles?: string[];
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface LoginResponse {
  tokens: AuthTokens;
  user: PlatformUser;
}

export interface ProfileUpdatePayload {
  full_name?: string;
  whatsapp_number?: string;
  gender?: string;
  birthday_day?: number;
  birthday_month?: number;
  teams?: string[];
  student_status?: string;
  matric_no?: string;
  department?: string;
  faculty?: string;
  primary_track?: string;
  secondary_track?: string;
  primary_skill_level?: string;
  secondary_skill_level?: string;
  avatar_url?: string;
}

// ─── Token helpers ──────────────────────────────────────────────────────────

const TOKEN_KEY = "gdg_access_token";
const REFRESH_KEY = "gdg_refresh_token";

export function getStoredTokens(): AuthTokens | null {
  if (typeof window === "undefined") return null;
  const access_token = localStorage.getItem(TOKEN_KEY);
  const refresh_token = localStorage.getItem(REFRESH_KEY);
  if (!access_token || !refresh_token) return null;
  return { access_token, refresh_token };
}

export function storeTokens(tokens: AuthTokens) {
  localStorage.setItem(TOKEN_KEY, tokens.access_token);
  localStorage.setItem(REFRESH_KEY, tokens.refresh_token);
}

export function clearTokens() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

function authHeaders(token?: string): HeadersInit {
  const t = token || getStoredTokens()?.access_token;
  return {
    "Content-Type": "application/json",
    ...(t ? { Authorization: `Bearer ${t}` } : {}),
  };
}

// ─── API calls ──────────────────────────────────────────────────────────────

/** Exchange a Firebase ID token for platform JWT + user profile */
export async function loginWithFirebaseToken(
  firebaseToken: string
): Promise<LoginResponse> {
  const res = await fetch(`${AUTH_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firebase_token: firebaseToken }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Login failed");
  }
  const data: LoginResponse = await res.json();
  storeTokens(data.tokens);
  return data;
}

/** Refresh access token using stored refresh token */
export async function refreshAccessToken(): Promise<AuthTokens | null> {
  const tokens = getStoredTokens();
  if (!tokens?.refresh_token) return null;

  const res = await fetch(`${AUTH_API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: tokens.refresh_token }),
  });
  if (!res.ok) {
    clearTokens();
    return null;
  }
  const data = await res.json();
  storeTokens(data.tokens);
  return data.tokens;
}

/** Logout — revoke refresh token on backend */
export async function logout(): Promise<void> {
  const tokens = getStoredTokens();
  if (tokens?.refresh_token) {
    await fetch(`${AUTH_API_URL}/auth/logout`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ refresh_token: tokens.refresh_token }),
    }).catch(() => {}); // best effort
  }
  clearTokens();
}

/** Fetch current user profile */
export async function fetchProfile(): Promise<PlatformUser> {
  const res = await fetch(`${AUTH_API_URL}/auth/me`, {
    headers: authHeaders(),
  });
  if (res.status === 401) {
    // Try refreshing
    const newTokens = await refreshAccessToken();
    if (!newTokens) throw new Error("Session expired");
    const retry = await fetch(`${AUTH_API_URL}/auth/me`, {
      headers: authHeaders(newTokens.access_token),
    });
    if (!retry.ok) throw new Error("Failed to fetch profile");
    return retry.json();
  }
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

/** Update current user profile */
export async function updateProfile(
  payload: ProfileUpdatePayload
): Promise<PlatformUser> {
  const res = await fetch(`${AUTH_API_URL}/auth/profile`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (res.status === 401) {
    const newTokens = await refreshAccessToken();
    if (!newTokens) throw new Error("Session expired");
    const retry = await fetch(`${AUTH_API_URL}/auth/profile`, {
      method: "PUT",
      headers: authHeaders(newTokens.access_token),
      body: JSON.stringify(payload),
    });
    if (!retry.ok) throw new Error("Failed to update profile");
    return retry.json();
  }
  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
}

/** Verify token validity */
export async function verifyToken(): Promise<boolean> {
  const tokens = getStoredTokens();
  if (!tokens?.access_token) return false;
  const res = await fetch(`${AUTH_API_URL}/auth/verify`, {
    headers: authHeaders(),
  });
  return res.ok;
}
