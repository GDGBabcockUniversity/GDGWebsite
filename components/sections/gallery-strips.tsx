import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { GALLERY_STRIPS } from "@/lib/content/gallery";
import { BG_CLASS } from "@/lib/colors";
import { SmartImage } from "@/components/placeholder-image";

/**
 * Full-width horizontal photo strips ("ORBIT", "FIELD TRIP.", "MONTHLY
 * MEETUP"). Designer spec: all images colored until one is hovered, then
 * every image except the hovered one goes black & white — handled by the
 * .gallery-strip / .gallery-item utilities in globals.css.
 */
interface GalleryStripsProps {
  /** Render only these strip titles (in this order). Omit to render all. */
  titles?: string[];
}

export default function GalleryStrips({ titles }: GalleryStripsProps) {
  const strips = titles
    ? titles
        .map((t) => GALLERY_STRIPS.find((s) => s.title === t))
        .filter((s): s is (typeof GALLERY_STRIPS)[number] => !!s)
    : GALLERY_STRIPS;

  return (
    <section aria-label="Event galleries">
      {strips.map((strip) => (
        <div key={strip.title} className="relative">
          <div className="gallery-strip flex h-64 w-full sm:h-80 lg:h-[420px]">
            {strip.images.map((image, i) => (
              <Fragment key={i}>
                {i > 0 && (
                  <div
                    className={`w-[3px] shrink-0 ${
                      BG_CLASS[strip.dividerColors[(i - 1) % strip.dividerColors.length]]
                    }`}
                    aria-hidden
                  />
                )}
                <div className="gallery-item relative min-w-0 flex-1">
                  <SmartImage
                    src={image.src}
                    alt={image.alt}
                    label={image.label}
                    className="h-full w-full"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </Fragment>
            ))}
          </div>

          {/* Strip label */}
          <div className="pointer-events-none absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
            <p className="text-xs font-medium text-white/80 drop-shadow">
              Gallery
            </p>
            <p className="text-outline text-4xl font-extrabold uppercase leading-none sm:text-6xl lg:text-7xl">
              {strip.title}
            </p>
          </div>

          {/* See more */}
          <a
            href={strip.seeMoreHref}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-gdg-cream px-4 py-2 text-xs font-semibold text-[#0f0f0f] transition-transform hover:scale-[1.04] sm:bottom-6 sm:right-6"
          >
            See more
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      ))}
    </section>
  );
}
