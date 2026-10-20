import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Partners() {
  return (
    <section
      id="partners"
      aria-labelledby="partners-heading"
      className="scroll-mt-24 bg-[#0f0f0f]"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-yellow">
          Working together
        </p>
        <h2
          id="partners-heading"
          className="mt-4 max-w-xl text-4xl font-bold leading-tight tracking-tight text-gdg-cream sm:text-5xl"
        >
          Our partners
        </h2>

        <article className="mt-12 grid items-start gap-8 rounded-3xl border border-white/12 bg-[#161616] p-6 sm:p-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          <div className="flex min-h-40 items-center rounded-2xl bg-white p-6 sm:min-h-48 sm:p-8">
            <Image
              src="/images/partners/cyberiad-labs.jpeg"
              alt="Cyberiad Labs"
              width={2048}
              height={462}
              sizes="(min-width: 1280px) 420px, (min-width: 1024px) 35vw, (min-width: 640px) 75vw, 80vw"
              className="h-auto w-full"
            />
          </div>
          <div>
            <span className="inline-block rounded-full bg-gdg-green/15 px-3 py-1 text-xs font-medium tracking-wide text-green-300">
              Free courses for individual learners
            </span>
            <h3 className="mt-5 text-2xl font-bold tracking-tight text-gdg-cream sm:text-3xl">
              Cyberiad Labs
            </h3>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-white/75">
              <p>
                Cyberiad Labs gives everyone, from students and developers to
                professionals in any field, the AI skills that matter now and
                later.
              </p>
              <p>
                Its online courses go beyond tips and tricks: learners discover
                how AI models actually work, how to use them effectively in their
                studies and careers, and how to judge when their output can be
                trusted. Courses are free for individual learners.
              </p>
              <p>
                Cyberiad Labs partners with communities and organisations
                worldwide to bring AI education within everyone’s reach.
              </p>
            </div>
            <Link
              href="https://cyberiadlabs.com/"
              target="_blank"
              className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-gdg-cream px-5 py-3 text-sm font-semibold text-[#0f0f0f] transition-colors hover:bg-white active:bg-gdg-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gdg-blue motion-reduce:transition-none"
            >
              Visit Cyberiad Labs
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
