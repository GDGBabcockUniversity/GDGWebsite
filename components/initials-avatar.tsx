import { cn } from "@/lib/utils";
import type { GdgColor } from "@/lib/tracks";
import { PILL_CLASS } from "@/lib/colors";

export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface InitialsAvatarProps {
  name: string;
  color?: GdgColor;
  className?: string;
}

/** Colored circle with a person's initials — hero quote cards, team cards, nav */
export function InitialsAvatar({
  name,
  color = "blue",
  className,
}: InitialsAvatarProps) {
  return (
    <div
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold",
        PILL_CLASS[color],
        className
      )}
      aria-hidden
    >
      {getInitials(name)}
    </div>
  );
}
