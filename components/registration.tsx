"use client"

import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Registration() {
  return (
    <section id="registration" className="py-16 sm:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">Join GDG Babcock</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-4 text-pretty">
            Become part of Nigeria's most innovative campus tech community
          </p>
          <p className="text-base text-secondary-foreground max-w-2xl mx-auto leading-relaxed">
            Fill out this form to register. You'll choose your track preference and we'll get you started on your tech
            journey!
          </p>
        </div>

        {/* Google Form Embed */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSeyFxCLhBFvUmdq4fT6NqQ4iwbadSzBS9J5ROJY0zlXBIRiUw/viewform?embedded=true"
              width="100%"
              height="1200"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="w-full"
            >
              Loading…
            </iframe>
          </div>

          {/* Fallback Button */}
          <div className="text-center mt-6">
            <Button
              variant="outline"
              onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSeyFxCLhBFvUmdq4fT6NqQ4iwbadSzBS9J5ROJY0zlXBIRiUw/viewform?usp=preview", "_blank")}
              className="group"
            >
              Open Registration Form
              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>

          {/* Note */}
          <p className="text-center text-muted-foreground text-sm mt-6">
            After registration, check your email for next steps and community access links 📧
          </p>
        </div>
      </div>
    </section>
  )
}
