/**
 * GDG color helpers — map a GdgColor token to the Tailwind classes / hex
 * values components need. Full class strings are listed literally so the
 * Tailwind v4 scanner picks them up.
 */

import type { GdgColor } from "@/lib/tracks";

export const GDG_HEX: Record<GdgColor, string> = {
  blue: "#4285f4",
  red: "#ea4335",
  yellow: "#faab00",
  green: "#34a853",
  purple: "#a040ff",
};

export const TEXT_CLASS: Record<GdgColor, string> = {
  blue: "text-gdg-blue",
  red: "text-gdg-red",
  yellow: "text-gdg-yellow",
  green: "text-gdg-green",
  purple: "text-gdg-purple",
};

export const BG_CLASS: Record<GdgColor, string> = {
  blue: "bg-gdg-blue",
  red: "bg-gdg-red",
  yellow: "bg-gdg-yellow",
  green: "bg-gdg-green",
  purple: "bg-gdg-purple",
};

export const BORDER_CLASS: Record<GdgColor, string> = {
  blue: "border-gdg-blue",
  red: "border-gdg-red",
  yellow: "border-gdg-yellow",
  green: "border-gdg-green",
  purple: "border-gdg-purple",
};

export const OUTLINE_TEXT_CLASS: Record<GdgColor, string> = {
  blue: "text-outline-base text-outline-blue",
  red: "text-outline-base text-outline-red",
  yellow: "text-outline-base text-outline-yellow",
  green: "text-outline-base text-outline-green",
  purple: "text-outline-base text-outline-purple",
};

/** Pill text color: yellow/green read better with dark text */
export const PILL_CLASS: Record<GdgColor, string> = {
  blue: "bg-gdg-blue text-white",
  red: "bg-gdg-red text-white",
  yellow: "bg-gdg-yellow text-[#0f0f0f]",
  green: "bg-gdg-green text-white",
  purple: "bg-gdg-purple text-white",
};

const ORDER: GdgColor[] = ["blue", "green", "yellow", "red"];

/** Cycle through the four Google colors by index */
export function colorByIndex(i: number): GdgColor {
  return ORDER[i % ORDER.length];
}
