"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { useMemberCta } from "@/components/use-member-cta";
import LoginModal from "@/components/login-modal";
import {
  cancelRegistration,
  fetchMyRegistration,
  registerForEvent,
} from "@/lib/events-service";
import { Button } from "@/components/ui/button";

interface RegisterButtonProps {
  eventId: string;
  capacityFull: boolean;
}

export function RegisterButton({ eventId, capacityFull }: RegisterButtonProps) {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { isLoginOpen, setIsLoginOpen } = useMemberCta();
  const [registered, setRegistered] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setRegistered(null);
      return;
    }
    let cancelled = false;
    fetchMyRegistration(eventId).then((registration) => {
      if (!cancelled) setRegistered(!!registration);
    });
    return () => {
      cancelled = true;
    };
  }, [eventId, isAuthenticated]);

  if (authLoading) {
    return (
      <Button disabled size="lg">
        Loading…
      </Button>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Button size="lg" onClick={() => setIsLoginOpen(true)}>
          Sign in to register
        </Button>
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </>
    );
  }

  const handleRegister = async () => {
    setBusy(true);
    setMessage(null);
    try {
      await registerForEvent(eventId);
      setRegistered(true);
    } catch (err: any) {
      setMessage(err?.message || "Failed to register");
    } finally {
      setBusy(false);
    }
  };

  const handleCancel = async () => {
    setBusy(true);
    setMessage(null);
    try {
      await cancelRegistration(eventId);
      setRegistered(false);
    } catch (err: any) {
      setMessage(err?.message || "Failed to cancel registration");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      {registered ? (
        <Button size="lg" variant="outline" disabled={busy} onClick={handleCancel}>
          {busy ? "Cancelling…" : "Cancel registration"}
        </Button>
      ) : (
        <Button size="lg" disabled={busy || capacityFull} onClick={handleRegister}>
          {busy ? "Registering…" : capacityFull ? "Event is full" : "Register"}
        </Button>
      )}
      {message && <p className="mt-2 text-sm text-red-400">{message}</p>}
    </div>
  );
}
