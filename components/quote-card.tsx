import { cn } from "@/lib/utils";
import type { HeroQuote } from "@/lib/content/quotes";
import { GDG_HEX, PILL_CLASS, TEXT_CLASS } from "@/lib/colors";
import { InitialsAvatar } from "@/components/initials-avatar";
import { LiquidGlass } from "@/components/liquid-glass";

interface QuoteCardProps {
  quote: HeroQuote;
  className?: string;
}

/** Glassy floating member-quote card from the hero mockup */
export function QuoteCard({ quote, className }: QuoteCardProps) {
  return (
    <div className={cn("relative", quote.rotation, className)}>
      <LiquidGlass
        radius={16}
        className="p-4"
        style={{
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: GDG_HEX[quote.borderColor],
        }}
      >
        <div className="flex items-center gap-2.5">
          <InitialsAvatar name={quote.name} color={quote.borderColor} />
          <p className="text-sm font-bold text-white">{quote.name}</p>
        </div>
        <p className="mt-2.5 text-sm leading-snug text-white/90">
          {quote.quote}
        </p>
        <p className={cn("mt-2 text-xs font-medium", TEXT_CLASS[quote.borderColor])}>
          • gdgbabcock
        </p>
      </LiquidGlass>
      {quote.tag && quote.tagColor && (
        <span
          className={cn(
            "absolute -top-3 -right-2 rounded-full px-3 py-1 text-xs font-bold shadow-lg",
            PILL_CLASS[quote.tagColor]
          )}
        >
          {quote.tag}
        </span>
      )}
    </div>
  );
}
