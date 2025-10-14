"use client";

import { IMAGES } from "@/lib/constants";
import { GraduationCap, Rocket, Users, Trophy } from "lucide-react";
import Image from "next/image";

const benefits = [
  {
    icon: GraduationCap,
    title: "Learn & Grow",
    description:
      "Access to workshops, resources, and mentorship from industry professionals",
    color: "#4285F4",
    glowClass: "card-glow-blue",
  },
  {
    icon: Rocket,
    title: "Build Projects",
    description:
      "Hands-on experience with real-world projects and cutting-edge technologies",
    color: "#34A853",
    glowClass: "card-glow-red",
  },
  {
    icon: Users,
    title: "Network",
    description:
      "Connect with industry professionals, alumni, and passionate peers",
    color: "#FBBC04",
    glowClass: "card-glow-yellow",
  },
  {
    icon: Trophy,
    title: "Get Recognized",
    description:
      "Earn certificates, showcase achievements, and build your portfolio",
    color: "#EA4335",
    glowClass: "card-glow-green",
  },
];

export default function WhyJoin() {
  return (
    <section className="py-16 sm:py-24 relative bg-black">
      <Image
        src={IMAGES.why_join_1.src}
        alt="Why Join GDG Babcock"
        width={IMAGES.why_join_1.w}
        height={IMAGES.why_join_1.h}
        className="absolute top-0 left-0 z-0 md:w-24 w-12 h-auto"
      />

      <Image
        src={IMAGES.why_join_2.src}
        alt="Why Join GDG Babcock"
        width={IMAGES.why_join_2.w}
        height={IMAGES.why_join_2.h}
        className="absolute bottom-0 right-0 z-0 md:w-24 w-12 h-auto"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Why Join GDG Babcock?
          </h2>

          <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto mt-4 text-pretty">
            Because tech is better when we build it together
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`bg-card border border-border rounded-xl p-6 sm:p-8 text-center transition-all duration-300 group ${benefit.glowClass}`}
              style={{
                borderColor: benefit.color,
              }}
            >
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ backgroundColor: `${benefit.color}20` }}
              >
                <benefit.icon
                  className="w-8 h-8"
                  style={{ color: benefit.color }}
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
