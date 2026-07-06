import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import AnnualStructure from "@/components/sections/annual-structure";
import { APPLY_URL, PARTNER_EMAIL } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "About — GDG Babcock",
  description:
    "GDG Babcock is a student institution for learning, innovation, visibility, and recognition — officially affiliated with Google Developer Groups.",
};

const PILLARS = [
  {
    title: "Learning",
    body: "Workshops, study jams, and hands-on programs that take you from your first line of code to shipping real products.",
    color: "blue",
  },
  {
    title: "Innovation",
    body: "We build products the whole campus uses — from BabcockVotes to RADAR — not demos that get shelved.",
    color: "red",
  },
  {
    title: "Visibility",
    body: "Recognition platforms like The 100 and a publication in RADAR that put student builders on the map.",
    color: "yellow",
  },
  {
    title: "Continuity",
    body: "Structured leadership, yearly team archives, and a shared member profile so the institution outlives any one cohort.",
    color: "green",
  },
] as const;

const COLOR_CLASS: Record<string, string> = {
  blue: "text-gdg-blue",
  red: "text-gdg-red",
  yellow: "text-gdg-yellow",
  green: "text-gdg-green",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      {/* Statement */}
      <section className="px-6 pb-20 pt-36">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-blue">
            About
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-[1.05] text-gdg-cream sm:text-6xl lg:text-7xl">
            A student institution, not just a club.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            GDG Babcock is the Google Developer Group on campus at Babcock
            University — officially affiliated with Google Developer Groups
            worldwide. That affiliation gives our community direct access to
            Google technologies, developer resources, and the global GDG
            network. But what we are is bigger than an affiliation: a structured
            home for learning, innovation, visibility, recognition, and
            continuity across the Babcock tech ecosystem.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="px-6 pb-8">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="rounded-3xl border border-white/12 bg-[#161616] p-6"
            >
              <h2 className={`text-xl font-bold ${COLOR_CLASS[p.color]}`}>
                {p.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Annual structure (reused) */}
      <AnnualStructure />

      {/* What membership means + links */}
      <section className="px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <h2 className="max-w-2xl text-4xl font-bold leading-tight text-gdg-cream sm:text-5xl">
            What membership means.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70">
            Becoming a member gives you one profile across the whole ecosystem —
            your track group chats, the events you attend, the certificates you
            earn, and eventually your personal Wrapped. It&apos;s how we keep
            track of your journey and how the institution keeps its memory.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/team"
              className="flex items-center gap-2 rounded-full bg-gdg-cream px-6 py-3 text-sm font-semibold text-[#0f0f0f] transition-transform hover:scale-[1.03]"
            >
              Meet the team
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Apply for Leadership
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={`mailto:${PARTNER_EMAIL}?subject=Partnership%20with%20GDG%20Babcock`}
              className="flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
