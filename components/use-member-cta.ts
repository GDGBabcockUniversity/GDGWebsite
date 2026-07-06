"use client";

/**
 * Shared behavior for every "Become a member" button:
 * - signed out            → open the login modal (join copy)
 * - signed in, no track   → go to /onboarding
 * - signed in, onboarded  → go to /profile
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { isProfileComplete } from "@/lib/tracks";

export function useMemberCta() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const becomeMember = () => {
    if (!isAuthenticated || !user) {
      setIsLoginOpen(true);
      return;
    }
    router.push(isProfileComplete(user) ? "/profile" : "/onboarding");
  };

  return { becomeMember, isLoginOpen, setIsLoginOpen };
}
