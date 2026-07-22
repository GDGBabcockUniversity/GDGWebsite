"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A product-site screenshot rendered behind a product card. If the image is
 * missing or fails to load, it renders nothing — so a product without a
 * screenshot yet just shows the plain card (non-destructive). Drop a
 * screenshot at the mapped path in /public/images/products and the card
 * upgrades to a live-looking preview automatically.
 */
export function SitePreview({ src, className }: { src?: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full object-cover object-top",
        className
      )}
    />
  );
}
