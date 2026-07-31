"use client";

import { useRouter } from "next/navigation";
import CohortView from "@/components/gicip/cohort-view";
import {
  YearSwitcher,
  useYearSwipe,
  step,
  type YearOption,
} from "@/components/year-switcher";
import type { GicipCohort, GicipCohortSummary } from "@/lib/gicip";

/**
 * A cohort with the year control above it.
 *
 * Each year is its own page, so the pills are links and a swipe navigates.
 * Years run newest first, and a swipe left moves to the next year along that
 * list, which is the older one.
 */
export default function CohortPage({
  cohort,
  years,
}: {
  cohort: GicipCohort;
  years: GicipCohortSummary[];
}) {
  const router = useRouter();
  const options: YearOption[] = years.map((y) => ({
    id: String(y.year),
    label: String(y.year),
    href: `/gicip/${y.year}`,
  }));

  const index = years.findIndex((y) => y.year === cohort.year);
  const go = (direction: -1 | 1) => {
    const next = step(index, years.length, direction);
    if (next !== null) router.push(`/gicip/${years[next]!.year}`);
  };
  const swipe = useYearSwipe(() => go(-1), () => go(1));

  return (
    <>
      <YearSwitcher
        options={options}
        activeId={String(cohort.year)}
        className="mb-12"
      />
      <div {...swipe}>
        <CohortView cohort={cohort} />
      </div>
    </>
  );
}
