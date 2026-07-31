"use client";

import { useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Moving between years, shared by the team, GICIP and gallery pages so they
 * all behave the same way.
 *
 * Two modes. Where an option carries an href the pills are links, which is
 * what GICIP needs since each year is its own page. Otherwise they are buttons
 * and the parent holds the selection in state.
 */

export interface YearOption {
  id: string;
  label: string;
  /** Set for page-per-year sections. Omit to switch in place. */
  href?: string;
}

export function YearSwitcher({
  options,
  activeId,
  onSelect,
  className,
}: {
  options: YearOption[];
  activeId: string;
  onSelect?: (id: string) => void;
  className?: string;
}) {
  // A single year is not a choice, so the control stays out of the way.
  if (options.length < 2) return null;

  return (
    <div
      role="tablist"
      aria-label="Year"
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 sm:gap-3",
        className
      )}
    >
      {options.map((option) => {
        const active = option.id === activeId;
        const styles = cn(
          "cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-all",
          active
            ? "bg-gdg-cream text-[#0f0f0f]"
            : "border border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
        );

        return option.href ? (
          <Link
            key={option.id}
            href={option.href}
            role="tab"
            aria-selected={active}
            className={styles}
            scroll={false}
          >
            {option.label}
          </Link>
        ) : (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect?.(option.id)}
            className={styles}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Horizontal swipe between years on touch screens.
 *
 * Spread the returned handlers onto the content being swiped rather than the
 * pills. A vertical drag is ignored, so scrolling the page never changes the
 * year by accident.
 */
export function useYearSwipe(onPrev: () => void, onNext: () => void) {
  const start = useRef<{ x: number; y: number } | null>(null);

  return {
    onTouchStart: (e: React.TouchEvent) => {
      const touch = e.touches[0];
      start.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      const from = start.current;
      const touch = e.changedTouches[0];
      start.current = null;
      if (!from || !touch) return;

      const dx = touch.clientX - from.x;
      const dy = touch.clientY - from.y;
      // Deliberately strict: a long horizontal travel that clearly beats the
      // vertical one. Anything else is a scroll.
      if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      if (dx < 0) onNext();
      else onPrev();
    },
  };
}

/** Steps an index within bounds. Returns null at the ends, so nothing wraps. */
export function step(
  index: number,
  length: number,
  direction: -1 | 1
): number | null {
  const next = index + direction;
  return next >= 0 && next < length ? next : null;
}
