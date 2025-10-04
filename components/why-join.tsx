"use client"

import { GraduationCap, Rocket, Users, Trophy } from "lucide-react"

const benefits = [
  {
    icon: GraduationCap,
    title: "Learn & Grow",
    description: "Access to workshops, resources, and mentorship from industry professionals",
    color: "#4285F4",
    glowClass: "card-glow-blue",
  },
  {
    icon: Rocket,
    title: "Build Projects",
    description: "Hands-on experience with real-world projects and cutting-edge technologies",
    color: "#EA4335",
    glowClass: "card-glow-red",
  },
  {
    icon: Users,
    title: "Network",
    description: "Connect with industry professionals, alumni, and passionate peers",
    color: "#FBBC04",
    glowClass: "card-glow-yellow",
  },
  {
    icon: Trophy,
    title: "Get Recognized",
    description: "Earn certificates, showcase achievements, and build your portfolio",
    color: "#34A853",
    glowClass: "card-glow-green",
  },
]

export default function WhyJoin() {
  return (
    <section className="py-16 sm:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Why Join GDG Babcock?</h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`bg-card border border-border rounded-xl p-6 sm:p-8 text-center transition-all duration-300 group ${benefit.glowClass}`}
              style={{
                borderColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = benefit.color
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "transparent"
              }}
            >
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ backgroundColor: `${benefit.color}20` }}
              >
                <benefit.icon className="w-8 h-8" style={{ color: benefit.color }} />
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
