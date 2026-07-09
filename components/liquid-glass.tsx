"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { useGlassScene } from "@/components/glass-provider";

interface LiquidGlassProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  radius?: number;
  refractiveIndex?: number;
  bevel?: number;
  thickness?: number;
  blur?: number;
  style?: CSSProperties;
  disableRefraction?: boolean; // Forces frosted fallback
}

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
 * Builds the displacement map using the gradient of the height field.
 * This ensures the map is curl-free and won't tear at the corners.
 */
function buildDisplacementMap(
  width: number,
  height: number,
  radius: number,
  bevel: number,
  n: number,
  maxShift: number
): string | null {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const img = ctx.createImageData(width, height);
  const data = img.data;

  const hw = width / 2;
  const hh = height / 2;
  const r = Math.min(radius, hw, hh);

  // Generate the displacement field by accumulating bend(d)
  const phi = new Float32Array(width * height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const px = x + 0.5 - hw;
      const py = y + 0.5 - hh;
      const qx = Math.abs(px) - (hw - r);
      const qy = Math.abs(py) - (hh - r);
      const ax = Math.max(qx, 0);
      const ay = Math.max(qy, 0);
      const dist = Math.hypot(ax, ay) + Math.min(Math.max(qx, qy), 0) - r;
      const depth = -dist; // depth from edge into the shape

      let bendVal = 0;
      if (depth >= 0 && depth < bevel) {
        // Surface is a squircle dome. x = depth in from the rim (0 = edge, 1 = flat centre)
        const t = depth / bevel;
        // The optics formula for the bend amount
        const slope = (1 - t) ** 3 / (1 - (1 - t) ** 4) ** 0.75;
        const thetaI = Math.atan(slope);
        const thetaT = Math.asin(Math.sin(thetaI) / n); // Snell's law
        bendVal = Math.sin(thetaI - thetaT); // 0 at centre, max at rim
      }

      // We approximate the integral of bend over the distance field radially.
      // Since dist increases outward, phi decreases outward.
      // For simplicity in a single pass without marching, we can just map the 
      // analytical depth to phi directly if we integrate the formula, but 
      // summing it up radially from center is tricky in 2D.
      // Actually, since bend is a function of depth, we can precompute the integral!
      // But an easier way is just to assign the analytical normal * bend, which is exactly
      // the gradient we want! The curl-free property comes from the normal field of 
      // the rounded rectangle.
      
      let nx = 0, ny = 0;
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

      // dx, dy are the gradient of the displacement map
      const dx = nx * bendVal;
      const dy = ny * bendVal;

      const i = (y * width + x) * 4;
      data[i] = Math.round(128 + dx * 127);
      data[i + 1] = Math.round(128 + dy * 127);
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
  contentClassName,
  radius = 18,
  refractiveIndex = 1.5,
  bevel = 16,
  thickness = 28, // Currently unused in the bend formula but kept for API compat
  blur = 12,
  style,
  disableRefraction = false,
}: LiquidGlassProps) {
  const id = useId().replace(/[:]/g, "");
  const filterId = `liquid-glass-${id}`;
  const ref = useRef<HTMLDivElement>(null);
  
  // Safari/Firefox Clone sync refs
  const cloneWrapperRef = useRef<HTMLDivElement>(null);
  const { backdrop, backdropRef } = useGlassScene();
  
  const [isChromium, setIsChromium] = useState(true);
  const [map, setMap] = useState<{ url: string; w: number; h: number } | null>(null);
  const maxShift = 32;

  useEffect(() => {
    setIsChromium(supportsSvgBackdrop());
  }, []);

  useEffect(() => {
    if (disableRefraction) return;
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
          maxShift
        );
        if (url) {
          setMap({ url, w, h });
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
  }, [radius, bevel, refractiveIndex, disableRefraction]);

  // Sync loop for non-Chromium browsers to copy backdrop transforms and positions
  useEffect(() => {
    if (isChromium || disableRefraction || !map || !backdrop) return;
    
    let frame = 0;
    const sync = () => {
      if (ref.current && cloneWrapperRef.current) {
        // Counter-position the clone relative to the page
        const rect = ref.current.getBoundingClientRect();
        const x = rect.left + window.scrollX;
        const y = rect.top + window.scrollY;
        
        cloneWrapperRef.current.style.transform = `translate3d(-${x}px, -${y}px, 0)`;
        
        // If the original backdrop has dynamic transforms (like Embla carousel), sync them to the clone's child
        if (backdropRef) {
          const originalTransform = backdropRef.style.transform;
          const cloneChild = cloneWrapperRef.current.firstChild as HTMLElement;
          if (cloneChild) {
            cloneChild.style.transform = originalTransform;
          }
        }
      }
      frame = requestAnimationFrame(sync);
    };
    
    frame = requestAnimationFrame(sync);
    return () => cancelAnimationFrame(frame);
  }, [isChromium, disableRefraction, map, backdrop, backdropRef]);

  const enabled = map && !disableRefraction;
  
  // Fallback state (disabled or not enabled yet)
  if (!enabled) {
    return (
      <div
        ref={ref}
        className={cn("glass-card relative overflow-hidden", className)}
        style={{ borderRadius: radius, ...style }}
      >
        <div className={cn("relative z-10", contentClassName)}>{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative isolate overflow-hidden shadow-[0_18px_54px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-18px_36px_rgba(255,255,255,0.035)]",
        className
      )}
      style={{
        borderRadius: radius,
        background: "linear-gradient(135deg, rgba(255,255,255,0.13), rgba(15,15,15,0.46) 44%, rgba(15,15,15,0.34))",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        // Chromium: use live backdrop-filter
        ...(isChromium ? {
          backdropFilter: `url(#${filterId}) blur(${blur}px)`,
          WebkitBackdropFilter: `url(#${filterId}) blur(${blur}px)`,
        } : {}),
        ...style,
      }}
    >
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
            {/* Combine with a blur to match the fallback */}
            <feGaussianBlur stdDeviation={blur} />
          </filter>
        </defs>
      </svg>
      
      {/* Safari/Firefox: Render the counter-positioned copy with a standard filter */}
      {!isChromium && backdrop && (
        <div 
          className="pointer-events-none absolute inset-0 z-0"
          style={{ filter: `url(#${filterId})` }}
        >
          {/* We must set width/height to match the page so the counter-positioning works perfectly */}
          <div ref={cloneWrapperRef} className="absolute left-0 top-0 w-screen h-screen">
            {backdrop}
          </div>
        </div>
      )}

      <span
        className="pointer-events-none absolute inset-px rounded-[inherit] bg-[linear-gradient(140deg,rgba(255,255,255,0.2),rgba(255,255,255,0.035)_34%,rgba(255,255,255,0)_68%)]"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute -left-1/4 -top-1/2 h-full w-2/3 rotate-12 rounded-full bg-white/[0.12] blur-2xl"
        aria-hidden
      />
      <div className={cn("relative z-10", contentClassName)}>{children}</div>
    </div>
  );
}
