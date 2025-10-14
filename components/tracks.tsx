"use client";

import { useState } from "react";
import { Code, Shield, Brain, Palette, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const tracks = [
  {
    title: "Software Development & Engineering",
    icon: Code,
    color: "#4285F4",
    glowClass: "card-glow-blue",
    description:
      "Master full-stack web development, mobile apps, system design, and competitive programming",
    specialists: [
      "Frontend Web Development Specialist",
      "Backend Systems Specialist",
      "Mobile Development Specialist",
      "Data Structures & Algorithms Specialist",
      "QA Specialist (Quality Assurance & Testing)",
    ],
    focus: [
      "Full-stack web",
      "Mobile apps",
      "System architecture",
      "DSA",
      "Software testing",
    ],
  },
  {
    title: "Infrastructure & Security",
    icon: Shield,
    color: "#EA4335",
    glowClass: "card-glow-red",
    description:
      "Build secure, scalable cloud infrastructure and explore blockchain technology",
    specialists: [
      "Cloud Computing Specialist",
      "Cybersecurity Specialist",
      "Web3 & Blockchain Specialist",
    ],
    focus: [
      "GCP & AWS",
      "DevOps & CI/CD",
      "Cybersecurity",
      "Blockchain & dApps",
    ],
  },
  {
    title: "Data & AI",
    icon: Brain,
    color: "#FBBC04",
    glowClass: "card-glow-yellow",
    description:
      "Transform data into insights with data science, machine learning, and AI",
    specialists: [
      "Data Science Specialist",
      "Data Analytics Specialist",
      "Machine Learning Specialist",
      "Data Engineering Specialist",
    ],
    focus: ["Data science", "ML & AI", "Big data", "Google AI tools"],
  },
  {
    title: "Design & Management",
    icon: Palette,
    color: "#34A853",
    glowClass: "card-glow-green",
    description: "Create beautiful products and lead impactful tech projects",
    specialists: [
      "Product Design Specialist",
      "Product Management Specialist",
      "Games & Interactive Media Specialist",
    ],
    focus: [
      "UI/UX design",
      "Product strategy",
      "Game development",
      "Project management",
    ],
  },
];

export default function Tracks() {
  const [expandedTrack, setExpandedTrack] = useState<number | null>(null);

  return (
    <section id="tracks" className="py-16 sm:py-24 relative bg-gdg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            Choose Your Path - Our 4 Tracks
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Streamlined structure for focused, high-quality learning experiences
          </p>
        </div>

        {/* Track Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto mb-8">
          {tracks.map((track, index) => (
            <div
              key={index}
              className={`rounded-3xl transition-all duration-300 overflow-hidden ${track.glowClass}`}
              style={{
                backgroundColor: track.color,
              }}
            >
              {/* Track Header */}
              <div className="flex items-center gap-4 p-6 sm:p-8">
                <div className="p-3 rounded-lg bg-black">
                  <track.icon
                    className="w-8 h- sm:w-10 sm:h-10"
                    style={{ color: track.color }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-balance text-white">
                    {track.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <div className="bg-black p-6 sm:p-8 rounded-t-3xl h-full">
                <p className="text-white mb-4 leading-relaxed">
                  {track.description}
                </p>

                {/* Focus Areas */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {track.focus.map((area, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-white rounded-full text-xs sm:text-sm"
                      style={{
                        backgroundColor: `${track.color}60`,
                      }}
                    >
                      {area}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-border animate-in fade-in slide-in-from-top-2 duration-300">
                  <h4
                    className="font-semibold mb-3 text-sm uppercase tracking-wide"
                    style={{ color: track.color }}
                  >
                    Specialist Areas
                  </h4>
                  <ul className="space-y-2">
                    {track.specialists.map((specialist, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-secondary-foreground"
                      >
                        <span style={{ color: track.color }}>•</span>
                        <span>{specialist}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
