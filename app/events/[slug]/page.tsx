import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchEventBySlug } from "@/lib/events-service";
import { RegisterButton } from "@/components/events/register-button";
import { SITE_URL, SITE_NAME } from "@/lib/content/site";

interface EventPageProps {
  params: { slug: string };
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-NG", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const event = await fetchEventBySlug(params.slug);
  if (!event) {
    return { title: "Event not found" };
  }

  // The `title` field is bare — the layout's title template appends
  // " — GDG Babcock". Open Graph/Twitter titles are not templated, so they
  // carry the full string themselves.
  const fullTitle = `${event.title} — GDG Babcock`;
  const description =
    event.description || `Join ${event.title} with GDG Babcock.`;

  return {
    title: event.title,
    description,
    alternates: { canonical: `/events/${params.slug}` },
    openGraph: {
      title: fullTitle,
      description,
      type: "article",
      siteName: SITE_NAME,
      url: `${SITE_URL}/events/${params.slug}`,
      ...(event.cover_image_url ? { images: [event.cover_image_url] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(event.cover_image_url ? { images: [event.cover_image_url] } : {}),
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await fetchEventBySlug(params.slug);
  if (!event) {
    notFound();
  }

  const capacityFull =
    typeof event.capacity === "number" &&
    (event.registered_count ?? 0) >= event.capacity;

  // Event structured data (build5 SEO pass) — eligible for event rich results.
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.starts_at,
    ...(event.ends_at ? { endDate: event.ends_at } : {}),
    eventStatus:
      event.status === "cancelled"
        ? "https://schema.org/EventCancelled"
        : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...(event.location
      ? { location: { "@type": "Place", name: event.location } }
      : {}),
    ...(event.description ? { description: event.description } : {}),
    ...(event.cover_image_url ? { image: [event.cover_image_url] } : {}),
    organizer: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    url: `${SITE_URL}/events/${event.slug}`,
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f] px-6 pb-24 pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <div className="mx-auto max-w-3xl">
        {event.cover_image_url && (
          <img
            src={event.cover_image_url}
            alt=""
            className="mb-8 w-full rounded-3xl border border-white/12 object-cover"
          />
        )}
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-red">
          {formatDateTime(event.starts_at)}
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-[1.05] text-gdg-cream sm:text-5xl">
          {event.title}
        </h1>
        {event.location && (
          <p className="mt-4 text-base text-white/60">{event.location}</p>
        )}
        {event.description && (
          <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-white/70">
            {event.description}
          </p>
        )}
        {typeof event.capacity === "number" && (
          <p className="mt-4 text-sm font-medium text-white/40">
            {event.registered_count ?? 0} / {event.capacity} registered
          </p>
        )}

        <div className="mt-10">
          <RegisterButton eventId={event.id} capacityFull={capacityFull} />
        </div>
      </div>
    </main>
  );
}
