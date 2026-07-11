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
  fetchSignInMethodsForEmail,
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

// Firebase treats email/password and Google as separate, unlinked
// identities for the same email address. When a sign-in attempt collides
// with an account under a different provider, Firebase's own error message
// is technically accurate but easy to misread ("doesn't exist" instead of
// "not with this method") — this looks up which provider the email is
// actually linked to and names it directly.
async function suggestExistingProvider(email: string | undefined): Promise<string | null> {
  if (!email || !auth) return null;
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (methods.includes("google.com")) return "Google";
    if (methods.includes("password")) return "email & password";
    return null;
  } catch {
    return null;
  }
}

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
      let msg: string;
      if (err?.code === "auth/popup-closed-by-user") {
        msg = "Sign-in cancelled";
      } else if (err?.code === "auth/account-exists-with-different-credential") {
        const provider = await suggestExistingProvider(err?.customData?.email);
        msg = provider
          ? `You already have an account with this email — sign in with ${provider} instead.`
          : "You already have an account with this email under a different sign-in method.";
      } else {
        msg = err?.message || "Google sign-in failed";
      }
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
        let msg: string;
        if (err?.code === "auth/invalid-credential" || err?.code === "auth/user-not-found") {
          // Could genuinely be a wrong password, or could be an email that
          // only ever signed in with Google — tell them which, if we can.
          const provider = await suggestExistingProvider(email);
          msg =
            provider && provider !== "email & password"
              ? `You signed up with ${provider} — sign in with that instead.`
              : "Invalid email or password";
        } else {
          msg = err?.message || "Login failed";
        }
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
        let msg: string;
        if (err?.code === "auth/email-already-in-use") {
          const provider = await suggestExistingProvider(email);
          msg = provider
            ? `You already have an account with this email — sign in with ${provider} instead.`
            : "An account with this email already exists";
        } else if (err?.code === "auth/weak-password") {
          msg = "Password must be at least 6 characters";
        } else {
          msg = err?.message || "Sign up failed";
        }
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
