"use client"

import { Button } from "@/components/ui/button"
import { Calendar, ExternalLink, Trophy } from "lucide-react"

export default function EventSpotlight() {
  return (
    <section id="events" className="py-16 sm:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-card via-card to-[#1a1a2e] border border-border rounded-2xl p-8 sm:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 grid-pattern opacity-30" />

            {/* Floating Dots */}
            <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-[#4285F4]/10 blur-2xl" />
            <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-[#EA4335]/10 blur-2xl" />

            <div className="relative z-10">
              {/* Event Title */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl sm:text-5xl">🎃</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance">Hacktoberfest 2025</h2>
              </div>

              {/* Event Dates */}
              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <Calendar className="w-5 h-5" />
                <span className="text-lg">October 1st - October 31st, 2025</span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="px-4 py-2 bg-[#4285F4]/20 border border-[#4285F4]/50 rounded-full text-sm font-medium flex items-center gap-2">
                  <span>😊</span>
                  <span>Beginner Friendly</span>
                </div>
                <div className="px-4 py-2 bg-[#EA4335]/20 border border-[#EA4335]/50 rounded-full text-sm font-medium flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>Leaderboard + Prizes</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-lg text-secondary-foreground mb-8 max-w-2xl leading-relaxed">
                Join our month-long open source contribution challenge. Perfect for beginners! Learn Git, contribute to
                real projects, and win amazing prizes.
              </p>

              {/* CTA Button */}
              <Button
                size="lg"
                onClick={() => window.open("https://gdg.community.dev", "_blank")}
                className="bg-[#4285F4] hover:bg-[#4285F4]/90 text-white glow-blue group"
              >
                View Event Details
                <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
