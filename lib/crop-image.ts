/**
 * Client-side image cropping. Kept free of React so it can be exercised on
 * its own, and because it's the piece that has to be correct: it's what
 * decides the bytes the auth service ends up storing.
 *
 * Team cards render into a fixed `aspect-square` box
 * (components/team-member-card.tsx), so output is always a square. Doing the
 * resize and encode here is what keeps the auth service free of any
 * image-processing dependency — it only validates and stores.
 */

/** Edge length of the stored photo, in pixels. */
export const OUTPUT_SIZE = 512;
const OUTPUT_QUALITY = 0.9;

/** A crop region in the source image's own pixel coordinates. */
export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    // Harmless for the object URLs this is normally used with, and required
    // if a remote URL is ever cropped — without it the canvas is tainted and
    // toDataURL throws a SecurityError.
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load that image"));
    img.src = src;
  });
}

/**
 * Renders `area` of `src` onto a square canvas and encodes it as a JPEG data
 * URL, ready to POST.
 */
export async function cropToDataUrl(
  src: string,
  area: CropArea,
  size: number = OUTPUT_SIZE
): Promise<string> {
  const image = await loadImage(src);

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is unavailable in this browser");

  // Cropping a small region of a large photo and scaling it up looks better
  // with smoothing on; it's the browser default, but worth being explicit.
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(
    image,
    area.x,
    area.y,
    area.width,
    area.height,
    0,
    0,
    size,
    size
  );

  return canvas.toDataURL("image/jpeg", OUTPUT_QUALITY);
}
