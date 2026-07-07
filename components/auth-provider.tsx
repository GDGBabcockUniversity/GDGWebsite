"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  firebaseSignOut,
  getIdToken,
  type FirebaseUser,
} from "@/lib/firebase";
import {
  loginWithFirebaseToken,
  logout as apiLogout,
  fetchProfile,
  updateProfile,
  getStoredTokens,
  clearTokens,
  type PlatformUser,
  type ProfileUpdatePayload,
} from "@/lib/auth-service";
import { onAuthStateChanged } from "firebase/auth";
import { getMemberSeedData } from "@/lib/member-seed-data";

// ─── Context shape ──────────────────────────────────────────────────────────

interface AuthContextType {
  user: PlatformUser | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  // Actions
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateUserProfile: (payload: ProfileUpdatePayload) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Provider ───────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PlatformUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  // Exchange a Firebase user for a platform JWT + profile
  // After login, do a no-op profile update to retrieve the full user object
  // because /auth/login and /auth/me only return ~10 fields,
  // while PUT /auth/profile returns all 27 fields.
  const exchangeToken = useCallback(async (firebaseUser: FirebaseUser) => {
    const firebaseToken = await getIdToken(firebaseUser);
    const { user: platformUser } = await loginWithFirebaseToken(firebaseToken);

    // Touch profile to get the full response
    let currentUser = platformUser;
    try {
      currentUser = await updateProfile({
        full_name: platformUser.full_name,
      });
    } catch {
      // Fallback to partial data if touch fails
    }

    // Auto-populate from spreadsheet seed data on first login
    // If profile is mostly empty (no department, no whatsapp), check the lookup
    const isNewProfile =
      !currentUser.department && !currentUser.whatsapp_number;
    if (isNewProfile && currentUser.email) {
      const seed = getMemberSeedData(currentUser.email);
      if (seed) {
        try {
          // Only send fields the user doesn't already have
          const payload: ProfileUpdatePayload = {};
          if (seed.full_name && !currentUser.full_name)
            payload.full_name = seed.full_name;
          if (seed.gender) payload.gender = seed.gender;
          if (seed.whatsapp_number)
            payload.whatsapp_number = seed.whatsapp_number;
          if (seed.birthday) payload.birthday = seed.birthday;
          if (seed.primary_track)
            payload.primary_track = seed.primary_track;
          if (seed.secondary_track)
            payload.secondary_track = seed.secondary_track;
          if (seed.student_status)
            payload.student_status = seed.student_status;
          if (seed.matric_no) payload.matric_no = seed.matric_no;
          if (seed.department) payload.department = seed.department;
          if (seed.faculty) payload.faculty = seed.faculty;
          if (seed.primary_skill_level)
            payload.primary_skill_level = seed.primary_skill_level;

          if (Object.keys(payload).length > 0) {
            currentUser = await updateProfile(payload);
          }
        } catch {
          // Seed populate failed — not critical, user can fill manually
        }
      }
    }

    setUser(currentUser);
  }, []);

  // On mount: check if we already have a valid session
  useEffect(() => {
    if (!auth) {
      // SSR or Firebase not initialized
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser && getStoredTokens()) {
          // We have tokens — fetch profile (merges with cache)
          const profile = await fetchProfile();
          // If profile looks incomplete, touch to get full data
          if (profile && !profile.whatsapp_number && !profile.department) {
            try {
              const full = await updateProfile({
                full_name: profile.full_name,
              });
              setUser(full);
            } catch {
              setUser(profile);
            }
          } else {
            setUser(profile);
          }
        } else if (firebaseUser) {
          // Firebase session but no platform tokens — exchange
          await exchangeToken(firebaseUser);
        } else {
          setUser(null);
          clearTokens();
        }
      } catch {
        // Tokens invalid or expired
        setUser(null);
        clearTokens();
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [exchangeToken]);

  // ── Login with Google ─────────────────────────────────────────────────────

  const loginWithGoogle = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await exchangeToken(result.user);
    } catch (err: any) {
      const msg =
        err?.code === "auth/popup-closed-by-user"
          ? "Sign-in cancelled"
          : err?.message || "Google sign-in failed";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [exchangeToken]);

  // ── Login with email / password ───────────────────────────────────────────

  const loginWithEmail = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        await exchangeToken(result.user);
      } catch (err: any) {
        const msg =
          err?.code === "auth/invalid-credential"
            ? "Invalid email or password"
            : err?.message || "Login failed";
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [exchangeToken]
  );

  // ── Sign up with email / password ─────────────────────────────────────────

  const signUpWithEmail = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await exchangeToken(result.user);
      } catch (err: any) {
        const msg =
          err?.code === "auth/email-already-in-use"
            ? "An account with this email already exists"
            : err?.code === "auth/weak-password"
              ? "Password must be at least 6 characters"
              : err?.message || "Sign up failed";
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [exchangeToken]
  );

  // ── Logout ────────────────────────────────────────────────────────────────

  const logout = useCallback(async () => {
    try {
      await apiLogout();
      await firebaseSignOut(auth);
    } catch {
      // best effort
    } finally {
      setUser(null);
      clearTokens();
    }
  }, []);

  // ── Refresh profile ───────────────────────────────────────────────────────

  const refreshProfile = useCallback(async () => {
    try {
      const profile = await fetchProfile();
      setUser(profile);
    } catch {
      // ignore
    }
  }, []);

  // ── Update profile ────────────────────────────────────────────────────────

  const updateUserProfile = useCallback(
    async (payload: ProfileUpdatePayload) => {
      setError(null);
      try {
        const updated = await updateProfile(payload);
        setUser(updated);
      } catch (err: any) {
        setError(err?.message || "Profile update failed");
        throw err;
      }
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        loginWithGoogle,
        loginWithEmail,
        signUpWithEmail,
        logout,
        refreshProfile,
        updateUserProfile,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ───────────────────────────────────────────────────────────────────

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
