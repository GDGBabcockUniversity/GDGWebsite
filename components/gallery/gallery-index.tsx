"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  YearSwitcher,
  useYearSwipe,
  step,
} from "@/components/year-switcher";
import { sized, type Gallery } from "@/lib/gicip";

const UNDATED = "undated";

/** Year an album belongs to, taken from its date. */
function yearOf(gallery: Gallery): string {
  if (!gallery.date) return UNDATED;
  const d = new Date(gallery.date);
  return Number.isNaN(d.getTime()) ? UNDATED : String(d.getUTCFullYear());
}

function monthLabel(date?: string): string | null {
  if (!date) return null;
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", { month: "long", timeZone: "UTC" });
}

/**
 * The albums, grouped by year, with the same year control the team and GICIP
 * pages use. Albums with no date collect under their own heading rather than
 * being dropped.
 */
export default function GalleryIndex({ galleries }: { galleries: Gallery[] }) {
  const years = useMemo(() => {
    const seen = new Set(galleries.map(yearOf));
    // Newest first, with undated albums last.
    return [...seen].sort((a, b) => {
      if (a === UNDATED) return 1;
      if (b === UNDATED) return -1;
      return Number(b) - Number(a);
    });
  }, [galleries]);

  const [activeYear, setActiveYear] = useState(years[0] ?? UNDATED);
  const shown = galleries.filter((g) => yearOf(g) === activeYear);

  const index = years.indexOf(activeYear);
  const go = (direction: -1 | 1) => {
    const next = step(index, years.length, direction);
    if (next !== null) setActiveYear(years[next]!);
  };
  const swipe = useYearSwipe(() => go(-1), () => go(1));

  return (
    <>
      <YearSwitcher
        options={years.map((y) => ({
          id: y,
          label: y === UNDATED ? "Undated" : y,
        }))}
        activeId={activeYear}
        onSelect={setActiveYear}
        className="mt-10"
      />

      <ul className="mt-12 grid gap-6 sm:grid-cols-2" {...swipe}>
        {shown.map((gallery) => {
          const cover = gallery.coverImageUrl ?? gallery.images[0]?.imageUrl;
          const when = monthLabel(gallery.date);
          return (
            <li key={gallery.slug}>
              <Link
                href={`/gallery/${gallery.slug}`}
                className="group block overflow-hidden rounded-3xl border border-white/12 bg-[#171717] transition-transform hover:scale-[1.005]"
              >
                <div className="aspect-[4/3] overflow-hidden bg-black">
                  {cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={sized(cover, { w: 900, h: 675 })}
                      alt={gallery.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <div className="p-5">
                  <p className="font-semibold text-gdg-cream">{gallery.title}</p>
                  <p className="mt-1 text-xs text-white/45">
                    {[when, `${gallery.images.length} photographs`]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  {gallery.description && (
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {gallery.description}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
