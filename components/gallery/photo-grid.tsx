import { sized, type GalleryImage } from "@/lib/gicip";

/**
 * A grid of photographs. Shared by the gallery pages and the GICIP cohort
 * archive so both render identically.
 *
 * Featured images run the full width of the grid. Every crop is anchored to
 * the image's hotspot, so a wide photograph squared off keeps its subject.
 */
export default function PhotoGrid({ images }: { images: GalleryImage[] }) {
  const usable = images.filter((image) => image.imageUrl);
  if (usable.length === 0) return null;

  const featured = usable.filter((image) => image.feature);
  const rest = usable.filter((image) => !image.feature);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {[...featured, ...rest].map((photo, i) => (
        <figure
          key={`${photo.imageUrl}-${i}`}
          className={`overflow-hidden rounded-2xl border border-white/12 ${
            photo.feature ? "col-span-2" : ""
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sized(photo.imageUrl, {
              w: photo.feature ? 1200 : 700,
              h: 700,
              hotspot: photo.hotspot,
            })}
            alt={photo.alt ?? photo.caption ?? ""}
            loading="lazy"
            className="w-full object-cover"
          />
          {(photo.caption || photo.location) && (
            <figcaption className="bg-[#171717] px-4 py-3 text-xs text-white/55">
              {photo.caption}
              {photo.location && (
                <span className="text-white/35">
                  {photo.caption ? " · " : ""}
                  {photo.location}
                </span>
              )}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
