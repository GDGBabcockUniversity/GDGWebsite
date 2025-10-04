"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Floating Dots */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="floating-dot absolute top-20 left-10 w-3 h-3 rounded-full bg-[#4285F4] opacity-60"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="floating-dot-alt absolute top-40 right-20 w-2 h-2 rounded-full bg-[#EA4335] opacity-70"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="floating-dot absolute bottom-40 left-1/4 w-4 h-4 rounded-full bg-[#FBBC04] opacity-50"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="floating-dot-alt absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-[#34A853] opacity-60"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="floating-dot absolute bottom-20 right-10 w-2 h-2 rounded-full bg-[#4285F4] opacity-80"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="floating-dot-alt absolute top-1/2 left-1/3 w-5 h-5 rounded-full bg-[#EA4335] opacity-40"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="floating-dot absolute top-3/4 right-1/4 w-3 h-3 rounded-full bg-[#FBBC04] opacity-70"
          style={{ animationDelay: "2.5s" }}
        />
        <div
          className="floating-dot-alt absolute bottom-1/3 left-1/2 w-2 h-2 rounded-full bg-[#34A853] opacity-50"
          style={{ animationDelay: "3.5s" }}
        />
        <div
          className="floating-dot absolute top-1/4 right-1/2 w-4 h-4 rounded-full bg-[#4285F4] opacity-60"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="floating-dot-alt absolute bottom-1/2 left-20 w-3 h-3 rounded-full bg-[#EA4335] opacity-70"
          style={{ animationDelay: "4.5s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="w-4 h-4 text-[#4285F4]" />
            <span className="text-sm font-medium">Launching October 5, 2025</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 text-balance">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC04] bg-clip-text text-transparent">
              GDG Babcock
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 text-balance">
            Babcock University's Premier Tech Community
          </p>

          {/* Tagline */}
          <p className="text-lg sm:text-xl text-secondary-foreground mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 text-pretty">
            Building the Future, One Line of Code at a Time
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400 leading-relaxed">
            Join our newly restructured community with 4 specialized tracks designed to take your tech skills to the
            next level
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <Button
              size="lg"
              onClick={() => scrollToSection("registration")}
              className="bg-[#4285F4] hover:bg-[#4285F4]/90 text-white glow-blue hover:scale-[1.02] w-full sm:w-auto group transition-all"
            >
              Join GDG
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("tracks")}
              className="border-border hover:bg-card hover:scale-[1.02] w-full sm:w-auto transition-all"
            >
              Explore Tracks
            </Button>
          </div>

          {/* Pixel Art Badge */}
          <div className="mt-16 inline-block animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600">
            <div className="px-6 py-3 bg-card border-2 border-[#4285F4] rounded-lg font-mono text-sm sm:text-base">
              <span className="text-[#4285F4]">{"<"}</span>
              <span className="text-foreground">GDG BABCOCK</span>
              <span className="text-[#4285F4]">{" />"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
