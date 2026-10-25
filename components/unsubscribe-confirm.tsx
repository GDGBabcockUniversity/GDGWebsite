"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, MailX, ArrowLeft, AlertCircle } from "lucide-react";

type Stage = "confirm" | "working" | "done" | "error";

export default function UnsubscribeConfirm({ token }: { token: string }) {
  const [stage, setStage] = useState<Stage>("confirm");
  const [message, setMessage] = useState("");

  async function unsubscribe() {
    setStage("working");
    try {
      // Proxied through our own route so the email service URL and the
      // browser's origin never have to meet.
      const response = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (response.ok) {
        setStage("done");
        return;
      }
      const body = await response.json().catch(() => ({}));
      setMessage(
        response.status === 404
          ? "This unsubscribe link is no longer valid. It may have already been used, or the address was removed from our list."
          : body?.error ||
              "We couldn't reach our email service just now. Please try again in a moment.",
      );
      setStage("error");
    } catch {
      setMessage(
        "We couldn't reach our email service just now. Please check your connection and try again.",
      );
      setStage("error");
    }
  }

  if (!token) {
    return (
      <Card eyebrow="Email preferences" eyebrowClass="text-gdg-yellow">
        <Heading>This link looks incomplete.</Heading>
        <Body>
          Unsubscribe links carry a code that tells us which address to remove,
          and this one arrived without it. Open the link straight from the email
          we sent, or email us and we'll take care of it by hand.
        </Body>
        <HomeLink />
      </Card>
    );
  }

  if (stage === "done") {
    return (
      <Card eyebrow="Unsubscribed" eyebrowClass="text-gdg-green">
        <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-white/[0.06]">
          <MailX className="size-7 text-gdg-cream" />
        </div>
        <Heading>Sad to see you go.</Heading>
        <Body>
          You're off the list — we won't email you again. If this was a mistake,
          or you change your mind later, you're always welcome back.
        </Body>
        <HomeLink />
      </Card>
    );
  }

  return (
    <Card
      eyebrow={stage === "error" ? "Something went wrong" : "Email preferences"}
      eyebrowClass={stage === "error" ? "text-gdg-red" : "text-gdg-blue"}
    >
      <Heading>
        {stage === "error" ? "That didn't go through." : "Are you sure?"}
      </Heading>

      {stage === "error" ? (
        <Body>
          <span className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-gdg-red" />
            <span>{message}</span>
          </span>
        </Body>
      ) : (
        <Body>
          You'll stop receiving emails from GDG Babcock — event invites,
          workshop announcements, and everything else we send. You can always
          rejoin later.
        </Body>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={unsubscribe}
          disabled={stage === "working"}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gdg-red px-7 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {stage === "working" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Unsubscribing…
            </>
          ) : stage === "error" ? (
            "Try again"
          ) : (
            "Yes, unsubscribe me"
          )}
        </button>

        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-7 text-sm font-semibold text-gdg-cream transition-colors hover:bg-white/[0.06]"
        >
          No, keep me subscribed
        </Link>
      </div>
    </Card>
  );
}

/* Shared shell so every stage sits in the same card. */

function Card({
  eyebrow,
  eyebrowClass,
  children,
}: {
  eyebrow: string;
  eyebrowClass: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-xl rounded-3xl border border-white/12 bg-[#161616] p-8 sm:p-10">
      <p
        className={`text-xs font-bold uppercase tracking-[0.25em] ${eyebrowClass}`}
      >
        {eyebrow}
      </p>
      {children}
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="mt-4 text-4xl font-bold leading-[1.05] text-gdg-cream sm:text-5xl">
      {children}
    </h1>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-5 text-base leading-relaxed text-white/70">{children}</p>
  );
}

function HomeLink() {
  return (
    <Link
      href="/"
      className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gdg-blue transition-opacity hover:opacity-80"
    >
      <ArrowLeft className="size-4" />
      Back to gdgbabcock.com
    </Link>
  );
}
