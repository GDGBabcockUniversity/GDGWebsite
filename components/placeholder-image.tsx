import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  /** Self-describing label: what photo goes here, orientation, target size */
  label: string;
  className?: string;
}

/**
 * A labeled slot for a photo that doesn't exist yet. The label renders on
 * the page so the team knows exactly what to shoot/crop and where it goes.
 */
export function PlaceholderImage({ label, className }: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-3 border-2 border-dashed border-white/20 bg-[#1a1a1a] p-4 text-center",
        className
      )}
    >
      <ImageIcon className="h-8 w-8 shrink-0 text-white/30" aria-hidden />
      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
        Placeholder
      </p>
      <p className="max-w-xs font-mono text-xs leading-relaxed text-white/50">
        {label}
      </p>
    </div>
  );
}

interface SmartImageProps {
  src?: string;
  alt: string;
  /** Placeholder label when src is missing (falls back to alt) */
  label?: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Renders the real photo when `src` exists, otherwise a self-describing
 * placeholder. All site imagery flows through this so swapping in a real
 * photo is just setting `src` in the content data file.
 */
export function SmartImage({
  src,
  alt,
  label,
  className,
  imgClassName,
  sizes,
  priority,
}: SmartImageProps) {
  if (!src) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <PlaceholderImage label={label || alt} />
      </div>
    );
  }
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
