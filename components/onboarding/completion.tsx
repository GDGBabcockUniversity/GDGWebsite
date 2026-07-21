"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PlatformUser } from "@/lib/auth-service";
import {
  getTrack,
  COMMUNITY_WHATSAPP_URL,
  GDG_COMMUNITY_DEV_URL,
  type Track,
} from "@/lib/tracks";
import { GDG_HEX, TEXT_CLASS } from "@/lib/colors";
import WhatsApp from "@/components/svgs/whatsapp";
import { cn } from "@/lib/utils";

function TrackInviteCard({ track }: { track: Track }) {
  const linkReady = track.whatsappUrl && track.whatsappUrl !== "#";
  return (
    <a
      href={track.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-4 rounded-2xl border bg-[#161616] p-5 transition-transform hover:scale-[1.01]"
      style={{ borderColor: GDG_HEX[track.color] }}
    >
      <div className="min-w-0">
        <p className={cn("text-sm font-bold", TEXT_CLASS[track.color])}>
          {track.label}
        </p>
        <p className="mt-1 text-xs text-white/60">
          {linkReady
            ? "Tap to join your track's WhatsApp group chat"
            : "Group link coming soon — check your profile later"}
        </p>
      </div>
      <WhatsApp className="h-6 w-6 shrink-0 text-[#25D366]" />
    </a>
  );
}

/** Post-onboarding success screen with the member's WhatsApp group links */
export default function Completion({ user }: { user: PlatformUser }) {
  const tracks = [
    getTrack(user.primary_track),
    getTrack(user.secondary_track),
  ].filter((t, i, arr): t is Track => !!t && arr.indexOf(t) === i);

  return (
    <div className="mx-auto max-w-xl text-center">
      <p className="text-5xl" aria-hidden>
        🎉
      </p>
      <h1 className="mt-4 text-3xl font-bold text-gdg-cream sm:text-4xl">
        You&apos;re in, {user.full_name?.split(" ")[0] || "member"}!
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-white/60">
        Your GDG Babcock profile is ready. It follows you across our events,
        certificates, and your end-of-year Wrapped. Join your track group
        {tracks.length > 1 ? " chats" : " chat"} to stay in the loop:
      </p>

      <div className="mt-8 space-y-4 text-left">
        {tracks.map((track) => (
          <TrackInviteCard key={track.slug} track={track} />
        ))}
        <a
          href={COMMUNITY_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-[#161616] p-5 transition-transform hover:scale-[1.01]"
        >
          <div>
            <p className="text-sm font-bold text-gdg-cream">
              GDG Babcock Community
            </p>
            <p className="mt-1 text-xs text-white/60">
              The general group — announcements, events, everything
            </p>
          </div>
          <WhatsApp className="h-6 w-6 shrink-0 text-[#25D366]" />
        </a>
        <a
          href={GDG_COMMUNITY_DEV_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-[#161616] p-5 transition-transform hover:scale-[1.01]"
        >
          <div>
            <p className="text-sm font-bold text-gdg-cream">
              Register on GDG Community
            </p>
            <p className="mt-1 text-xs text-white/60">
              One more step — register with GDG worldwide so you can join
              events from any chapter.
            </p>
          </div>
          <ArrowRight className="h-5 w-5 shrink-0 text-gdg-blue" />
        </a>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/profile"
          className="flex items-center gap-2 rounded-full bg-gdg-cream px-6 py-3 text-sm font-semibold text-[#0f0f0f] transition-transform hover:scale-[1.03]"
        >
          Open your profile
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <Link
          href="/"
          className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
