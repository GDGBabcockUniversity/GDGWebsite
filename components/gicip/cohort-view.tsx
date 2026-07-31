import PhotoGrid from "@/components/gallery/photo-grid";
import { dateRange, sized, youTubeId, type GicipCohort } from "@/lib/gicip";

/**
 * One cohort rendered in full: the headline figures, the itinerary, the film,
 * the cohort, the photograph archive and the writing. Used by /gicip for the
 * current year and by /gicip/<slug> for any earlier one, so both routes stay
 * identical in layout as the archive grows.
 *
 * Every block is skipped when its data is absent, which is what lets a cohort
 * be published before departure and fill in as the trip runs.
 */
export default function CohortView({ cohort }: { cohort: GicipCohort }) {
  const range = dateRange(cohort.departureDate, cohort.returnDate);
  const filmId = youTubeId(cohort.filmUrl);

  return (
    <div className="space-y-16">
      {/* Header */}
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gdg-red">
          {cohort.year}
        </p>
        <h1 className="mt-3 text-4xl font-bold text-gdg-cream sm:text-5xl">
          {cohort.title}
        </h1>
        {range && <p className="mt-3 text-sm text-white/55">{range}</p>}
        {cohort.summary && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75">
            {cohort.summary}
          </p>
        )}

        <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {cohort.cohortSize ? (
            <Figure value={cohort.cohortSize} label="Travelled" color="blue" />
          ) : null}
          {cohort.hosts.length > 0 && (
            <Figure
              value={cohort.hosts.length}
              label="Organisations visited"
              color="yellow"
            />
          )}
          {cohort.images.length > 0 && (
            <Figure
              value={cohort.images.length}
              label="Photographs"
              color="green"
            />
          )}
        </dl>
      </header>

      {cohort.coverImageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={sized(cohort.coverImageUrl, { w: 1600, h: 700, hotspot: cohort.coverHotspot })}
          alt={cohort.coverImageAlt ?? cohort.title}
          className="w-full rounded-3xl border border-white/12 object-cover"
        />
      )}

      {/* Film */}
      {filmId && (
        <section>
          <SectionTitle>The film</SectionTitle>
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/12 bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${filmId}`}
              title={`${cohort.title} film`}
              allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </section>
      )}

      {/* Itinerary */}
      {cohort.hosts.length > 0 && (
        <section>
          <SectionTitle>Itinerary</SectionTitle>
          <ul className="space-y-3">
            {cohort.hosts.map((host, i) => (
              <li
                key={`${host.name}-${i}`}
                className="rounded-2xl border border-white/12 bg-[#171717] p-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold text-gdg-cream">
                    {host.url ? (
                      <a
                        href={host.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline-offset-4 hover:underline"
                      >
                        {host.name}
                      </a>
                    ) : (
                      host.name
                    )}
                  </p>
                  <p className="text-xs text-white/45">
                    {[host.city, host.country].filter(Boolean).join(", ")}
                  </p>
                </div>
                {host.note && (
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {host.note}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Cohort */}
      {cohort.participants.length > 0 && (
        <section>
          <SectionTitle>The cohort</SectionTitle>
          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {cohort.participants.map((person, i) => (
              <li key={`${person.name}-${i}`}>
                <div className="aspect-square overflow-hidden rounded-2xl border border-white/12 bg-[#171717]">
                  {person.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={sized(person.photoUrl, { w: 512, h: 512, hotspot: person.photoHotspot })}
                      alt={person.photoAlt ?? person.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-white/30">
                      {person.name.charAt(0)}
                    </div>
                  )}
                </div>
                <p className="mt-3 text-sm font-semibold text-gdg-cream">
                  {person.name}
                </p>
                {person.course && (
                  <p className="text-xs text-white/45">{person.course}</p>
                )}
                {person.cameToFind && (
                  <p className="mt-1.5 text-xs italic leading-relaxed text-white/60">
                    {person.cameToFind}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Archive */}
      {cohort.images.length > 0 && (
        <section>
          <SectionTitle>Photographs</SectionTitle>
          <PhotoGrid images={cohort.images} />
        </section>
      )}

      {/* Writing */}
      {cohort.writing.length > 0 && (
        <section>
          <SectionTitle>Written from the trip</SectionTitle>
          <ul className="space-y-3">
            {cohort.writing.map((piece, i) => (
              <li key={`${piece.title}-${i}`}>
                <a
                  href={piece.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-white/12 bg-[#171717] p-5 transition-transform hover:scale-[1.005]"
                >
                  <p className="font-semibold text-gdg-cream">{piece.title}</p>
                  {piece.excerpt && (
                    <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                      {piece.excerpt}
                    </p>
                  )}
                  <p className="mt-2 text-xs uppercase tracking-wider text-gdg-red">
                    Read on RADAR
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-white/40">
      {children}
    </h2>
  );
}

function Figure({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: "blue" | "yellow" | "green";
}) {
  const tone = {
    blue: "text-gdg-blue",
    yellow: "text-gdg-yellow",
    green: "text-gdg-green",
  }[color];
  return (
    <div className="rounded-2xl border border-white/12 bg-[#171717] p-5">
      <dd className={`text-3xl font-bold ${tone}`}>{value}</dd>
      <dt className="mt-1 text-xs text-white/45">{label}</dt>
    </div>
  );
}
