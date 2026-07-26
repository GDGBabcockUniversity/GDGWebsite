"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

interface SignInFormProps {
  title?: string;
  subtitle?: string;
  /** Hide the "create an account" toggle — /admin is sign-in only. */
  allowSignUp?: boolean;
  /**
   * Fired once the provider has actually populated `user`, not merely when
   * the login call resolves. Optional: a surface that re-renders itself on
   * auth (like the admin layout) needs no callback at all.
   */
  onAuthed?: () => void;
}

/**
 * The shared sign-in body: Google, then email/password. Owns the credential
 * flow and its error state; owns nothing about where it's rendered or what
 * happens afterwards. LoginModal wraps it in modal chrome, AdminSignIn wraps
 * it in a page card.
 */
export default function SignInForm({
  title,
  subtitle,
  allowSignUp = true,
  onAuthed,
}: SignInFormProps) {
  const {
    user,
    loginWithGoogle,
    loginWithEmail,
    signUpWithEmail,
    error,
    clearError,
    loading,
  } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [justAuthed, setJustAuthed] = useState(false);

  // The login functions resolve before the provider has set `user`, so the
  // handoff waits for the user object rather than the promise.
  useEffect(() => {
    if (justAuthed && user) {
      setJustAuthed(false);
      onAuthed?.();
    }
  }, [justAuthed, user, onAuthed]);

  const handleGoogleLogin = async () => {
    setLocalLoading(true);
    try {
      await loginWithGoogle();
      setJustAuthed(true);
    } catch {
      // error is set in context
    } finally {
      setLocalLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalLoading(true);
    try {
      if (mode === "login") {
        await loginWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
      setJustAuthed(true);
    } catch {
      // error is set in context
    } finally {
      setLocalLoading(false);
    }
  };

  const switchMode = () => {
    setMode((m) => (m === "login" ? "signup" : "login"));
    clearError();
    setEmail("");
    setPassword("");
  };

  const isLoading = localLoading || loading;

  return (
    <>
      {/* Header */}
      <div className="text-center mb-8">
        <Image
          src="/gdg-logo.svg"
          alt="GDG Babcock"
          width={160}
          height={36}
          className="mx-auto mb-6"
        />
        <h2 className="text-2xl font-bold text-gdg-cream">
          {title ?? (mode === "login" ? "Welcome back" : "Create your account")}
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          {subtitle ??
            (mode === "login"
              ? "Sign in to your GDG Babcock account"
              : "Join the GDG Babcock platform")}
        </p>
      </div>

      {/* Google Sign-In */}
      <Button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="w-full h-12 bg-white hover:bg-gray-100 text-black font-medium rounded-full mb-6 transition-all hover:scale-[1.01]"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          or
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Email form */}
      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="h-12 rounded-xl bg-background border-border px-4 text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            minLength={6}
            className="h-12 rounded-xl bg-background border-border px-4 pr-12 text-foreground placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-gdg-blue hover:bg-gdg-blue/90 text-white font-semibold rounded-full transition-all hover:scale-[1.01] glow-blue"
        >
          <Mail className="h-4 w-4 mr-2" />
          {isLoading
            ? "Please wait…"
            : mode === "login"
              ? "Sign In"
              : "Create Account"}
        </Button>
      </form>

      {/* Toggle mode */}
      {allowSignUp && (
        <p className="text-center text-sm text-muted-foreground mt-6">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            onClick={switchMode}
            className="text-gdg-blue hover:underline font-medium"
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      )}
    </>
  );
}
