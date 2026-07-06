"use client";

import { useState } from "react";
import TeamMemberCard from "@/components/team-member-card";
import { teamMembers, type TeamCategory } from "@/lib/team-data";
import { cn } from "@/lib/utils";

type FilterType = "all" | TeamCategory;

export default function TeamPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredMembers =
    activeFilter === "all"
      ? teamMembers
      : teamMembers.filter((member) => member.category === activeFilter);

  const filters: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "Core Team", value: "core" },
    { label: "Track Leads", value: "track-leads" },
    { label: "Dev Team", value: "dev-team" },
    { label: "Specialists", value: "specialists" },
  ];

  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      {/* Hero Section */}
      <section className="px-4 pb-16 pt-36 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-blue">
            The Team
          </p>
          <h1 className="text-outline mt-4 text-5xl font-extrabold uppercase leading-none sm:text-7xl">
            The Dream Team
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            The people behind the pixels. These heroes craft the whole
            experience — we do the magic, and we&apos;re proud to share it with
            you.
          </p>

          {/* Filter Tabs */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-all",
                  activeFilter === filter.value
                    ? "bg-gdg-cream text-[#0f0f0f]"
                    : "border border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((member, index) => (
              <TeamMemberCard
                key={member.name}
                name={member.name}
                role={member.role}
                wordsToLiveBy={member.wordsToLiveBy}
                image={member.image}
                music={member.music}
                links={member.links}
                accentIndex={index}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
