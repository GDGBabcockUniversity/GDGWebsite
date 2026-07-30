import type { Metadata } from "next";
import CohortView, { ArchiveList } from "@/components/gicip/cohort-view";
import { getCurrentCohort, getCohortSummaries } from "@/lib/gicip";

export const metadata: Metadata = {
  title: "GICIP",
  description:
    "The Global Immersion and Cultural Immersion Programme: Babcock University students inside the institutions building the technology they study.",
  alternates: { canonical: "/gicip" },
};

// The cohort record changes rarely once a year is closed, and during a trip an
// hour is fresh enough for a page that is not the live feed.
export const revalidate = 3600;

const PROGRAMME_DESCRIPTION = [
  "GICIP places Babcock University students inside the organisations building the technology they study. Each cohort travels for six weeks, visiting companies, research institutions and courts across Europe, and spends a week at a coding school working alongside its students.",
  "The programme has run every year since 2017. Each cohort is recorded here in full: the route, the people who travelled, the photographs, the film and the writing that came out of it.",
];

export default async function GicipPage() {
  const [cohort, summaries] = await Promise.all([
    getCurrentCohort(),
    getCohortSummaries(),
  ]);

  return (
    <main className="min-h-screen bg-[#0f0f0f] px-6 pb-24 pt-36">
      <div className="mx-auto max-w-4xl">
        {cohort ? (
          <>
            <CohortView cohort={cohort} />
            <ArchiveList cohorts={summaries} currentSlug={cohort.slug} />
          </>
        ) : (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-red">
              Babcock University
            </p>
            <h1 className="mt-3 text-4xl font-bold text-gdg-cream sm:text-5xl">
              GICIP
            </h1>
            <div className="mt-6 max-w-2xl space-y-4">
              {PROGRAMME_DESCRIPTION.map((para) => (
                <p key={para} className="text-base leading-relaxed text-white/75">
                  {para}
                </p>
              ))}
            </div>
            <ArchiveList cohorts={summaries} />
          </>
        )}
      </div>
    </main>
  );
}
