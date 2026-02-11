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
  const exchangeToken = useCallback(async (firebaseUser: FirebaseUser) => {
    const firebaseToken = await getIdToken(firebaseUser);
    const { user: platformUser } = await loginWithFirebaseToken(firebaseToken);
    setUser(platformUser);
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
          // We have tokens — try loading profile
          const profile = await fetchProfile();
          setUser(profile);
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
