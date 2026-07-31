import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CohortPage from "@/components/gicip/cohort-page";
import { getCohort, getCohortSummaries, sized } from "@/lib/gicip";

interface PageProps {
  params: { year: string };
}

export const revalidate = 3600;

// Pre-rendered per published cohort. An empty list is fine: the route still
// resolves on demand, so a cohort published later needs no redeploy.
export async function generateStaticParams() {
  const years = await getCohortSummaries();
  return years.map((y) => ({ year: String(y.year) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cohort = await getCohort(Number(params.year));
  if (!cohort) return { title: "GICIP" };

  const image = sized(cohort.coverImageUrl, { w: 1200, h: 630 });
  return {
    title: cohort.title,
    description: cohort.summary,
    alternates: { canonical: `/gicip/${cohort.year}` },
    openGraph: {
      title: cohort.title,
      description: cohort.summary,
      images: image ? [image] : undefined,
    },
  };
}

export default async function GicipCohortPage({ params }: PageProps) {
  const year = Number(params.year);
  const [cohort, years] = await Promise.all([
    getCohort(year),
    getCohortSummaries(),
  ]);

  if (!cohort) notFound();

  return (
    <main className="min-h-screen bg-[#0f0f0f] px-6 pb-24 pt-36">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/gicip"
          className="mb-8 inline-block text-sm font-medium text-gdg-red hover:text-gdg-cream"
        >
          GICIP
        </Link>
        <CohortPage cohort={cohort} years={years} />
      </div>
    </main>
  );
}
