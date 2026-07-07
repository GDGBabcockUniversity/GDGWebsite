"use client";

import { Linkedin, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GDG_HEX, colorByIndex } from "@/lib/colors";
import type { GdgColor } from "@/lib/tracks";

interface TeamMemberCardProps {
  name: string;
  role: string;
  wordsToLiveBy: string;
  image: string;
  music: {
    name: string;
    artist: string;
    url: string;
  };
  links: {
    twitter: string;
    linkedin: string;
    portfolio: string;
  };
  /** Rotates the border through the four Google colors */
  accentIndex?: number;
  /** Explicit border color (e.g. a track color) — overrides accentIndex */
  accentColor?: GdgColor;
}

export default function TeamMemberCard({
  name,
  role,
  wordsToLiveBy,
  links,
  music,
  image,
  accentIndex = 0,
  accentColor,
}: TeamMemberCardProps) {
  const [showPlayer, setShowPlayer] = useState(false);
  const accent = accentColor ? GDG_HEX[accentColor] : GDG_HEX[colorByIndex(accentIndex)];
  return (
    <div>
      <div
        className="bg-[#161616] border rounded-3xl overflow-hidden hover:scale-[1.02] hover:rotate-1 transition-all duration-300 shadow-2xl"
        style={{ borderColor: accent }}
      >
        {/* Favourite song — a slim, subordinate strip, not a widget */}
        {music.name && music.artist && (
          <div className="px-3 pt-3">
            {!showPlayer ? (
              <button
                onClick={() => setShowPlayer(true)}
                className="flex w-full items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-2.5 py-2 text-left transition-colors hover:bg-white/[0.06]"
              >
                <svg
                  className="h-3.5 w-3.5 shrink-0 text-green-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                <span className="min-w-0 flex-1 truncate text-xs text-white/70">
                  <span className="font-medium text-white/85">{music.name}</span>
                  <span className="text-white/40"> · {music.artist}</span>
                </span>
                <Play
                  className="h-3 w-3 shrink-0 fill-white/50 text-white/50"
                  aria-hidden
                />
              </button>
            ) : (
              <div className="rounded-xl border border-white/8 bg-white/[0.03] p-2">
                <div className="mb-1.5 flex items-center justify-between px-0.5">
                  <span className="truncate text-[11px] text-white/50">
                    {music.name} · {music.artist}
                  </span>
                  <button
                    onClick={() => setShowPlayer(false)}
                    className="shrink-0 text-[11px] text-white/40 transition-colors hover:text-white"
                  >
                    Close
                  </button>
                </div>
                <iframe
                  src={music.url}
                  width="100%"
                  height="80"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-lg"
                />
              </div>
            )}
          </div>
        )}

        {/* Main Photo with Overlay */}
        <div className="relative p-2">
          <div className="aspect-square rounded-2xl overflow-hidden relative">
            <Image
              src={image}
              alt={name}
              width={400}
              height={500}
              className="w-full h-full object-cover"
            />

            {/* Social Media Overlay Buttons */}
            <div className="absolute bottom-3 left-3 flex gap-1.5">
              {links.twitter && (
                <Link href={links.twitter}>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md transition-all duration-300 hover:bg-white">
                    <svg
                      className="h-3.5 w-3.5 text-black"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>
                </Link>
              )}
              {links.linkedin && (
                <Link href={links.linkedin}>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md transition-all duration-300 hover:bg-white">
                    <Linkedin className="h-3.5 w-3.5 text-black" />
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Role and Motto */}
      </div>

      <div className="mt-3">
        <h3 className="text-gdg-cream text-lg md:text-xl font-semibold mb-0.5">
          {name}
        </h3>
        <p className="text-sm font-medium mb-1" style={{ color: accent }}>
          {role}
        </p>
        <p className="text-white/50 text-sm italic">{wordsToLiveBy}</p>
      </div>
    </div>
  );
}
