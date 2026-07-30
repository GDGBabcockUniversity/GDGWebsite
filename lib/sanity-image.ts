/**
 * Image URLs for the content CDN.
 *
 * Transforms happen on delivery, so one uploaded photograph serves as a wide
 * banner and a square tile without a second upload. Where an image carries a
 * hotspot, the crop is anchored to it, which is what stops a square crop of a
 * wide photograph cutting someone's head off.
 *
 * Deliberately built by hand rather than through the image SDK, so the read
 * path stays plain fetch.
 */

export interface Hotspot {
  x?: number;
  y?: number;
}

export function sized(
  url: string | undefined,
  opts: {
    w: number;
    h?: number;
    fit?: "crop" | "max";
    hotspot?: Hotspot | null;
  } = { w: 1200 }
): string | undefined {
  if (!url) return undefined;

  const params = new URLSearchParams({
    w: String(opts.w),
    auto: "format",
    q: "80",
  });

  if (opts.h) {
    params.set("h", String(opts.h));
    params.set("fit", opts.fit ?? "crop");

    const { x, y } = opts.hotspot ?? {};
    if (typeof x === "number" && typeof y === "number") {
      params.set("crop", "focalpoint");
      params.set("fp-x", x.toFixed(3));
      params.set("fp-y", y.toFixed(3));
    }
  }

  return `${url}?${params.toString()}`;
}
