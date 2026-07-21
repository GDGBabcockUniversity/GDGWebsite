"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { HERO_SLIDES } from "@/lib/content/site";
import { HERO_QUOTES } from "@/lib/content/quotes";
import { SmartImage } from "@/components/placeholder-image";
import { QuoteCard } from "@/components/quote-card";
import { useMemberCta } from "@/components/use-member-cta";
import LoginModal from "@/components/login-modal";
import { cn } from "@/lib/utils";
import { useGlassScene } from "@/components/glass-provider";

const AUTOPLAY_MS = 6000;

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { becomeMember, isLoginOpen, setIsLoginOpen } = useMemberCta();
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { setBackdrop, setBackdropRef } = useGlassScene();
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      emblaApi?.scrollNext();
    }, AUTOPLAY_MS);
  }, [emblaApi]);

  useEffect(() => {
    // Provide the backdrop node to the global GlassProvider
    setBackdrop(
      <div className="flex h-full w-full">
        {HERO_SLIDES.map((slide, i) => (
          <div key={i} className="relative h-full min-w-0 flex-[0_0_100%]">
            <SmartImage
              src={slide.src}
              alt={slide.alt}
              label={slide.label}
              className="h-full w-full"
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
    );
    // Provide the container node so we can track its transform
    if (carouselContainerRef.current) {
      setBackdropRef(carouselContainerRef.current);
    }
  }, [setBackdrop, setBackdropRef]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    // restart the timer whenever the user interacts
    emblaApi.on("pointerDown", startAutoplay);
    startAutoplay();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("pointerDown", startAutoplay);
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [emblaApi, startAutoplay]);

  const scrollTo = (index: number) => {
    emblaApi?.scrollTo(index);
    startAutoplay();
  };

  return (
    <section className="relative h-svh min-h-[600px] w-full overflow-hidden">
      {/* Carousel background */}
      <div ref={emblaRef} className="absolute inset-0 overflow-hidden">
        <div ref={carouselContainerRef} className="flex h-full w-full">
          {HERO_SLIDES.map((slide, i) => (
            <div key={i} className="relative h-full min-w-0 flex-[0_0_100%]">
              <SmartImage
                src={slide.src}
                alt={slide.alt}
                label={slide.label}
                className="h-full w-full"
                sizes="100vw"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Legibility overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-black/40 to-black/30"
        aria-hidden
      />

      {/* Floating quote cards (lg+) */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {HERO_QUOTES.map((quote) => (
          <QuoteCard
            key={quote.name}
            quote={quote}
            className={cn("absolute", quote.position)}
          />
        ))}
      </div>

      {/* Hero copy */}
      <div className="absolute inset-x-0 bottom-0 pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white/80 sm:text-sm">
              <ArrowRight className="h-4 w-4" aria-hidden />
              Google Developer Group
              <span aria-hidden>•</span>
              Babcock University
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] text-gdg-cream sm:text-6xl lg:text-7xl">
              The developer community at Babcock University.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Workshops, a monthly meetup, ORBIT, and products like BabcockVotes
              and RADAR.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={becomeMember}
                className="cursor-pointer rounded-full bg-gdg-cream px-6 py-3 text-sm font-semibold text-[#0f0f0f] transition-transform hover:scale-[1.03]"
              >
                Become a member
              </button>
              <a
                href="#events"
                className="flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                See What We Run
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel controls */}
      <button
        onClick={() => {
          emblaApi?.scrollPrev();
          startAutoplay();
        }}
        className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/25 md:block"
        aria-label="Previous slide"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => {
          emblaApi?.scrollNext();
          startAutoplay();
        }}
        className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/25 md:block"
        aria-label="Next slide"
      >
        <ArrowRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === selectedIndex ? "w-6 bg-gdg-cream" : "w-1.5 bg-white/40"
            )}
          />
        ))}
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </section>
  );
}
