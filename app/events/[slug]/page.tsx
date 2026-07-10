import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchEventBySlug } from "@/lib/events-service";
import { RegisterButton } from "@/components/events/register-button";

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
    return { title: "Event not found — GDG Babcock" };
  }

  const title = `${event.title} — GDG Babcock`;
  const description =
    event.description || `Join ${event.title} with GDG Babcock.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      ...(event.cover_image_url ? { images: [event.cover_image_url] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
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

  return (
    <main className="min-h-screen bg-[#0f0f0f] px-6 pb-24 pt-36">
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
