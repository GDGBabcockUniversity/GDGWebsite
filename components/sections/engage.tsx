"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PATHWAY, KEY_CTAS } from "@/lib/content/engage";
import { BG_CLASS, PILL_CLASS, TEXT_CLASS } from "@/lib/colors";
import { useMemberCta } from "@/components/use-member-cta";
import LoginModal from "@/components/login-modal";
import { cn } from "@/lib/utils";

/** "Your pathway in." — how a student goes from curious to leadership. */
export default function Engage() {
  const { becomeMember, isLoginOpen, setIsLoginOpen } = useMemberCta();

  return (
    <section id="engage" className="scroll-mt-24 bg-[#0f0f0f]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-blue">
          How students engage
        </p>
        <h2 className="mt-4 max-w-lg text-4xl font-bold leading-tight text-gdg-cream sm:text-5xl">
          Your pathway in.
        </h2>

        {/* Pathway steps */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PATHWAY.map((step) => (
            <div
              key={step.step}
              className="rounded-3xl border border-white/12 bg-[#161616] p-6"
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold",
                    PILL_CLASS[step.color]
                  )}
                >
                  {step.step}
                </span>
                <span className={cn("h-px flex-1", BG_CLASS[step.color])} />
              </div>
              <h3 className={cn("mt-4 text-lg font-bold", TEXT_CLASS[step.color])}>
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Key CTAs */}
        <div className="mt-12 flex flex-wrap gap-3">
          {KEY_CTAS.map((cta) =>
            cta.action === "member" ? (
              <button
                key={cta.label}
                onClick={becomeMember}
                className="flex items-center gap-2 rounded-full bg-gdg-cream px-6 py-3 text-sm font-semibold text-[#0f0f0f] transition-transform hover:scale-[1.03]"
              >
                {cta.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            ) : (
              <a
                key={cta.label}
                href={cta.href}
                target={cta.external ? "_blank" : undefined}
                rel={cta.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {cta.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            )
          )}
        </div>
      </div>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        title="Join GDG Babcock"
        subtitle="One profile for events, certificates, and your Wrapped."
      />
    </section>
  );
}
