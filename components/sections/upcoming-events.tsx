import { ArrowRight } from "lucide-react";
import { fetchPublishedEvents } from "@/lib/events-service";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/** "Upcoming events" — next 3 published events, or nothing when there are none. */
export default async function UpcomingEvents() {
  const events = await fetchPublishedEvents();
  const now = Date.now();
  const upcoming = events
    .filter((e) => new Date(e.starts_at).getTime() >= now)
    .sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime())
    .slice(0, 3);

  if (upcoming.length === 0) return null;

  return (
    <section className="bg-[#0f0f0f]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-red">
              Upcoming events
            </p>
            <h2 className="mt-4 max-w-md text-4xl font-bold leading-tight text-gdg-cream sm:text-5xl">
              Register for what's next.
            </h2>
          </div>
          <a
            href="/events"
            className="flex items-center gap-2 rounded-full bg-gdg-cream px-6 py-3 text-sm font-semibold text-[#0f0f0f] transition-transform hover:scale-[1.03]"
          >
            View all events
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {upcoming.map((event) => (
            <a
              key={event.id}
              href={`/events/${event.slug}`}
              className="group flex flex-col rounded-3xl border border-white/12 bg-[#161616] p-6 transition-colors hover:border-white/30"
            >
              <p className="text-xs font-semibold text-white/40">
                {formatDate(event.starts_at)}
              </p>
              <p className="mt-3 text-xl font-bold text-gdg-cream">
                {event.title}
              </p>
              {event.location && (
                <p className="mt-2 text-sm text-white/55">{event.location}</p>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
