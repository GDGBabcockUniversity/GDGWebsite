"use client";

import { useState } from "react";

/**
 * A product-site screenshot rendered as a card banner (a contained header
 * strip, not a background), so the card's own title/text sit cleanly below
 * it instead of fighting the screenshot. Renders nothing when there's no
 * screenshot yet — or if it fails to load — so the card falls back to a
 * clean text-only layout. Non-destructive: drop a file in at the mapped
 * path and the banner appears.
 */
export function PreviewBanner({ src }: { src?: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-[#0f0f0f]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
      />
      {/* Soft fade so the banner melts into the card body below it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#161616] to-transparent"
      />
    </div>
  );
}
