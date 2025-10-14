"use client";

import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden pt-60 pb-40 bg-gdg-cream"
    >
      {/* Animated Background */}
      {/* <div className="absolute inset-0 grid-pattern opacity-50" /> */}

      {/* Floating Dots */}
      {/* <div className="absolute inset-0 overflow-hidden">
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
      </div> */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Heading */}

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="bg-gdg-green w-10 h-10 rounded-full border" />
            <div className="bg-gdg-green w-10 h-10 rounded-full border" />
            <div className="bg-gdg-green w-10 h-10 rounded-full border" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 text-balance">
            Your tech journey <br />
            starts here
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 text-balance">
            Collaborate with designers, developers, and innovators shaping the
            future of tech at Babcock.
          </p>

          <Button
            onClick={() => scrollToSection("registration")}
            className="h-12 bg-black w-fit hover:bg-black rounded-full font-semibold cursor-pointer text-white glow-blue hover:scale-[1.02] transition-all"
          >
            Join The Community
            <div className="flex items-center justify-center bg-white rounded-full p-1">
              <ArrowRight className="h-4 w-4 text-black" />
            </div>
          </Button>
        </div>
      </div>
    </section>
  );
}
