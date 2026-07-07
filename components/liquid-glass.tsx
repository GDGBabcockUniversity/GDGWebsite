"use client";

/**
 * LiquidGlass — a glass surface whose edges refract the content behind it,
 * adapted in-repo from React Bits' glass-surface pattern (copy-paste source,
 * not an npm dep).
 *
 * How it works: a canvas-generated displacement map is fed into an SVG
 * feDisplacementMap that runs inside `backdrop-filter`, so the pixels behind
 * the card bend at the rounded edges like light entering real glass. The
 * per-pixel displacement comes from Snell's law (sin θ₁ = n · sin θ₂): the
 * card edge is modeled as a quarter-round bevel, the surface normal tilts
 * across the bevel, and the lateral shift of a refracted ray through a slab
 * of the given thickness is tan(θ₁ − θ₂) × thickness. Flat center = no shift.
 *
 * SVG filters inside backdrop-filter only work in Chromium; Safari/Firefox
 * gracefully fall back to the plain `.glass-card` blur.
 */

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

interface LiquidGlassProps {
  children: ReactNode;
  className?: string;
  /** Border radius in px — must match the map's rounded corners */
  radius?: number;
  /** Refractive index of the "glass" (~1.5 for crown glass) */
  refractiveIndex?: number;
  /** Width of the refracting bevel at the edges, in px */
  bevel?: number;
  /** Virtual glass thickness in px — scales how far edge pixels bend */
  thickness?: number;
  /** Backdrop blur in px (keep ≤12 for perf over moving backgrounds) */
  blur?: number;
  style?: CSSProperties;
}

/** Chromium is the only engine that runs SVG filters in backdrop-filter. */
function supportsSvgBackdrop(): boolean {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent;
  const isChromium = "chrome" in window || /Chrom(e|ium)|Edg\//.test(ua);
  return (
    isChromium &&
    typeof CSS !== "undefined" &&
    CSS.supports("backdrop-filter", "blur(1px)")
  );
}

/**
 * Snell's law lateral displacement for a ray hitting the bevel at fractional
 * depth t (0 = outer edge, 1 = flat center).
 */
function refractionShift(t: number, n: number, thickness: number): number {
  // Surface normal tilt across a quarter-round bevel: steepest at the edge.
  const theta1 = Math.acos(Math.min(1, Math.max(0, t))); // incidence angle
  const theta2 = Math.asin(Math.sin(theta1) / n); // Snell: sin θ₁ = n sin θ₂
  return Math.tan(theta1 - theta2) * thickness;
}

/**
 * Build the displacement map: dx encoded in R, dy in G, 128 = no shift.
 * Only pixels within `bevel` of the rounded border get displaced, pointing
 * inward with Snell-derived magnitude.
 */
function buildDisplacementMap(
  width: number,
  height: number,
  radius: number,
  bevel: number,
  n: number,
  thickness: number,
  maxShift: number
): string | null {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const img = ctx.createImageData(width, height);
  const data = img.data;

  // Signed distance to a rounded rectangle centered in the canvas
  const hw = width / 2;
  const hh = height / 2;
  const r = Math.min(radius, hw, hh);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const px = x + 0.5 - hw;
      const py = y + 0.5 - hh;
      const qx = Math.abs(px) - (hw - r);
      const qy = Math.abs(py) - (hh - r);
      const ax = Math.max(qx, 0);
      const ay = Math.max(qy, 0);
      // distance outside the inner (radius-inset) box, minus corner radius
      const dist = Math.hypot(ax, ay) + Math.min(Math.max(qx, qy), 0) - r;
      // dist ≈ 0 at the border, negative inside. Depth into the bevel:
      const depth = -dist;

      let dx = 0;
      let dy = 0;
      if (depth >= 0 && depth < bevel) {
        const t = depth / bevel;
        const shift = Math.min(refractionShift(t, n, thickness), maxShift);
        // Inward-pointing normal of the rounded rect at this pixel
        let nx: number;
        let ny: number;
        if (qx > 0 || qy > 0) {
          const len = Math.hypot(ax, ay) || 1;
          nx = (ax / len) * Math.sign(px);
          ny = (ay / len) * Math.sign(py);
        } else if (qx > qy) {
          nx = Math.sign(px);
          ny = 0;
        } else {
          nx = 0;
          ny = Math.sign(py);
        }
        // Sample outward: pixels near the edge show light bent in from outside
        dx = (nx * shift) / maxShift; // normalized [-1, 1]
        dy = (ny * shift) / maxShift;
      }

      const i = (y * width + x) * 4;
      data[i] = Math.round(128 + dx * 127); // R = x displacement
      data[i + 1] = Math.round(128 + dy * 127); // G = y displacement
      data[i + 2] = 128;
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL();
}

export function LiquidGlass({
  children,
  className,
  radius = 18,
  refractiveIndex = 1.5,
  bevel = 16,
  thickness = 28,
  blur = 12,
  style,
}: LiquidGlassProps) {
  const id = useId().replace(/[:]/g, "");
  const filterId = `liquid-glass-${id}`;
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [map, setMap] = useState<{ url: string; w: number; h: number } | null>(
    null
  );
  const maxShift = 32; // px — feDisplacementMap scale

  useEffect(() => {
    if (!supportsSvgBackdrop()) return;
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const regenerate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const w = Math.round(el.offsetWidth);
        const h = Math.round(el.offsetHeight);
        if (w < 2 || h < 2) return;
        const url = buildDisplacementMap(
          w,
          h,
          radius,
          bevel,
          refractiveIndex,
          thickness,
          maxShift
        );
        if (url) {
          setMap({ url, w, h });
          setEnabled(true);
        }
      });
    };

    regenerate();
    const observer = new ResizeObserver(regenerate);
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [radius, bevel, refractiveIndex, thickness]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative isolate overflow-hidden shadow-[0_18px_54px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-18px_36px_rgba(255,255,255,0.035)]",
        !enabled && "glass-card",
        className
      )}
      style={{
        borderRadius: radius,
        ...(enabled && map
          ? {
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.13), rgba(15,15,15,0.46) 44%, rgba(15,15,15,0.34))",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              backdropFilter: `url(#${filterId}) blur(${blur}px)`,
              WebkitBackdropFilter: `url(#${filterId}) blur(${blur}px)`,
            }
          : {}),
        ...style,
      }}
    >
      {enabled && map && (
        <svg
          aria-hidden
          width="0"
          height="0"
          style={{ position: "absolute", overflow: "hidden" }}
        >
          <defs>
            <filter
              id={filterId}
              x="0"
              y="0"
              width={map.w}
              height={map.h}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feImage
                href={map.url}
                x="0"
                y="0"
                width={map.w}
                height={map.h}
                result="map"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                scale={maxShift}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}
      <span
        className="pointer-events-none absolute inset-px rounded-[inherit] bg-[linear-gradient(140deg,rgba(255,255,255,0.2),rgba(255,255,255,0.035)_34%,rgba(255,255,255,0)_68%)]"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute -left-1/4 -top-1/2 h-full w-2/3 rotate-12 rounded-full bg-white/[0.12] blur-2xl"
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
