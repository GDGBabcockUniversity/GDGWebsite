import type { Metadata } from "next";
import Link from "next/link";
import { fetchPublishedEvents } from "@/lib/events-service";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Events",
  description:
    "Browse upcoming and past GDG Babcock events — register, check in, and earn a certificate.",
  alternates: { canonical: "/events" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function EventsPage() {
  const events = await fetchPublishedEvents();
  const now = Date.now();
  const upcoming = events
    .filter((e) => new Date(e.starts_at).getTime() >= now)
    .sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime());
  const past = events
    .filter((e) => new Date(e.starts_at).getTime() < now)
    .sort((a, b) => new Date(b.starts_at).getTime() - new Date(a.starts_at).getTime());

  return (
    <main className="min-h-screen bg-[#0f0f0f] px-6 pb-24 pt-36">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-red">
          Events
        </p>
        <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[1.05] text-gdg-cream sm:text-6xl">
          Browse & register for GDG Babcock events.
        </h1>

        <section className="mt-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/50">
            Upcoming
          </h2>
          {upcoming.length === 0 ? (
            <p className="mt-6 text-white/50">
              No upcoming events right now — check back soon.
            </p>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>

        {past.length > 0 && (
          <section className="mt-16">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/50">
              Past events
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {past.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function EventCard({
  event,
}: {
  event: Awaited<ReturnType<typeof fetchPublishedEvents>>[number];
}) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group flex flex-col rounded-3xl border border-white/12 bg-[#161616] p-6 transition-colors hover:border-white/30"
    >
      <p className="text-xs font-semibold text-white/40">
        {formatDate(event.starts_at)}
      </p>
      <p className="mt-3 text-xl font-bold text-gdg-cream">{event.title}</p>
      {event.location && (
        <p className="mt-2 text-sm text-white/55">{event.location}</p>
      )}
      {event.description && (
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/55">
          {event.description}
        </p>
      )}
      {typeof event.capacity === "number" && (
        <p className="mt-4 text-xs font-medium text-white/40">
          {event.registered_count ?? 0} / {event.capacity} registered
        </p>
      )}
    </Link>
  );
}
