"use client";

import { IMAGES } from "@/lib/constants";
import { GraduationCap, Rocket, Users, Trophy, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { scrollToSection } from "@/lib/utils";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-16 sm:py-24 relative bg-black">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 bg-gdg-cream rounded-3xl py-16">
        <Image
          src={IMAGES.cta_1.src}
          alt="CTA 1"
          width={IMAGES.cta_1.w}
          height={IMAGES.cta_1.h}
          className="absolute bottom-0 left-0 z-0 md:w-32 sm:w-24 w-16 h-auto"
        />

        <Image
          src={IMAGES.cta_2.src}
          alt="CTA 2"
          width={IMAGES.cta_2.w}
          height={IMAGES.cta_2.h}
          className="absolute bottom-0 right-0 z-0 md:w-32 sm:w-24 w-16 h-auto"
        />

        {/* Section Header */}
        <div className="text-center z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-black">
            Are you ready to start your journey?
          </h2>

          <p className="mb-6 text-muted-foreground text-lg sm:text-xl max-w-xl font-medium mx-auto mt-4 text-pretty">
            Join hundreds of students learning, building, and growing with GDG
            Babcock.
          </p>

          <Link href="/#registration">
            <Button className="h-12 z-10 bg-black w-fit hover:bg-black rounded-full font-semibold cursor-pointer text-white glow-blue hover:scale-[1.02] transition-all">
              Join The Community
              <div className="flex items-center justify-center bg-white rounded-full p-1">
                <ArrowRight className="h-4 w-4 text-black" />
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
