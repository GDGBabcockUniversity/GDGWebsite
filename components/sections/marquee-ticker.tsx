import { MARQUEE_ITEMS } from "@/lib/content/site";
import { BG_CLASS, colorByIndex } from "@/lib/colors";

function TickerRun() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden>
      {MARQUEE_ITEMS.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-5 text-xs font-bold uppercase tracking-[0.2em] text-white/80">
            {item}
          </span>
          <span
            className={`h-1.5 w-1.5 rounded-full ${BG_CLASS[colorByIndex(i)]}`}
          />
        </span>
      ))}
    </div>
  );
}

/** Scrolling strip of community stats/program names under the hero */
export default function MarqueeTicker() {
  return (
    <div
      className="overflow-hidden border-y border-white/10 bg-[#0b0b0b] py-3"
      role="marquee"
      aria-label="GDG Babcock — 500+ members, 4 years active, ORBIT Summit, RADAR, The 100, GDG Week"
    >
      {/* content rendered exactly twice for the seamless -50% loop */}
      <div className="animate-marquee">
        <TickerRun />
        <TickerRun />
      </div>
    </div>
  );
}
