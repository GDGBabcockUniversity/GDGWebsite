"use client"

import { Users, Layers, Calendar, Code } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const stats = [
  { icon: Users, label: "Active Members", value: "500+", color: "#4285F4" },
  { icon: Layers, label: "Specialized Tracks", value: "4", color: "#EA4335" },
  { icon: Calendar, label: "Events Annually", value: "50+", color: "#FBBC04" },
  { icon: Code, label: "Projects Built", value: "100+", color: "#34A853" },
]

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-card border border-border rounded-lg p-6 sm:p-8 text-center transition-all duration-700 hover:scale-105 hover:border-[${stat.color}] ${
                isVisible ? "animate-in fade-in slide-in-from-bottom-4" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-4" style={{ color: stat.color }} />
              <div className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
