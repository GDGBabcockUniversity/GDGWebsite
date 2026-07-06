"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import LoginModal from "@/components/login-modal";
import OnboardingFlow from "@/components/onboarding/onboarding-flow";

export default function OnboardingPage() {
  const { user, loading } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0f0f0f] px-4 pb-24 pt-32">
      {loading ? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gdg-blue" />
        </div>
      ) : !user ? (
        <div className="mx-auto max-w-md rounded-3xl border border-white/15 bg-[#171717] p-10 text-center">
          <h1 className="text-2xl font-bold text-gdg-cream">
            Sign in to continue
          </h1>
          <p className="mt-3 text-sm text-white/60">
            Create an account or sign in to set up your GDG Babcock member
            profile.
          </p>
          <button
            onClick={() => setIsLoginOpen(true)}
            className="mt-8 w-full rounded-full bg-gdg-cream px-6 py-3 text-sm font-semibold text-[#0f0f0f] transition-transform hover:scale-[1.02]"
          >
            Sign in / Join
          </button>
          <Link
            href="/"
            className="mt-4 inline-block text-sm text-white/50 hover:text-white"
          >
            Back home
          </Link>
          <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            title="Join GDG Babcock"
            subtitle="One profile for events, certificates, and your Wrapped."
          />
        </div>
      ) : (
        <OnboardingFlow />
      )}
    </main>
  );
}
