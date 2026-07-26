"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import SignInForm from "@/components/sign-in-form";
import { X } from "lucide-react";
import { isProfileComplete } from "@/lib/tracks";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

/**
 * Modal chrome around the shared SignInForm. Owns only what's specific to
 * signing in from a modal: closing it afterwards, and routing incomplete
 * profiles to onboarding.
 */
export default function LoginModal({
  isOpen,
  onClose,
  title,
  subtitle,
}: LoginModalProps) {
  const { user } = useAuth();
  const router = useRouter();

  const handleAuthed = useCallback(() => {
    onClose();
    if (user && !isProfileComplete(user)) {
      router.push("/onboarding");
    }
  }, [onClose, router, user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
        onClick={onClose}
      />

      {/* Centering wrapper */}
      <div className="relative z-[101] min-h-full flex items-center justify-center p-4">
        {/* Modal */}
        <div className="w-full max-w-md rounded-3xl border border-white/15 bg-[#171717] p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-white/5"
          >
            <X className="h-5 w-5" />
          </button>

          <SignInForm
            title={title}
            subtitle={subtitle}
            onAuthed={handleAuthed}
          />
        </div>
      </div>
    </div>
  );
}
