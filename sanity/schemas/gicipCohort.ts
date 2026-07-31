import { defineField, defineType } from "sanity";

// A GICIP cohort: one year of the university's immersion programme.
//
// One document per year, and the year is the key: it orders the archive and it
// is the URL, so 2026 lives at /gicip/2026. Creating next year's cohort means
// creating one document and typing the year.
//
// Each cohort holds everything about that year in one place: the route, the
// people, the photographs, the film and the writing. /gicip shows the newest
// and lets visitors move between years from there.
export default defineType({
  name: "gicipCohort",
  title: "GICIP Cohort",
  type: "document",
  fields: [
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      description:
        "Calendar year of the trip, e.g. 2026. This is the key: it orders the archive and forms the URL, /gicip/2026. One cohort per year.",
      validation: (Rule) => Rule.required().integer().min(2017),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        'Optional. Defaults to "GICIP 2026". Set it only for a year that needs a different name.',
    }),
    defineField({
      name: "isPublished",
      title: "Published",
      type: "boolean",
      description: "Unpublished cohorts stay off the website.",
      initialValue: false,
    }),
    defineField({
      name: "departureDate",
      title: "Departure",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
    }),
    defineField({
      name: "returnDate",
      title: "Return",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
    }),
    defineField({
      name: "cohortSize",
      title: "Cohort size",
      type: "number",
      description: "Number who travelled. Shown as a headline figure.",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "Two or three sentences. Used on cards and link previews.",
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      description: "Page header and link preview.",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative Text" }],
    }),
    defineField({
      name: "filmUrl",
      title: "Film",
      type: "url",
      description:
        "YouTube URL of the cohort's film. The page embeds it once this is set.",
    }),
    defineField({
      name: "hosts",
      title: "Itinerary",
      type: "array",
      description: "Every organisation visited, in the order the trip ran.",
      of: [{ type: "gicipHost" }],
    }),
    defineField({
      name: "participants",
      title: "Cohort",
      type: "array",
      of: [{ type: "gicipParticipant" }],
    }),
    defineField({
      name: "gallery",
      title: "Photograph archive",
      type: "reference",
      to: [{ type: "gallery" }],
      description:
        "The gallery holding this cohort's photographs. Created under Galleries.",
    }),
    defineField({
      name: "writingUrls",
      title: "Written pieces",
      type: "array",
      description: "Links to the RADAR pieces written about this cohort.",
      of: [
        {
          type: "object",
          name: "writingLink",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "excerpt",
              title: "Excerpt",
              type: "string",
              validation: (Rule) => Rule.max(200),
            }),
          ],
          preview: { select: { title: "title", subtitle: "url" } },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      year: "year",
      isPublished: "isPublished",
      participants: "participants",
      media: "coverImage",
    },
    prepare({ title, year, isPublished, participants, media }) {
      const count = Array.isArray(participants) ? participants.length : 0;
      const bits = [
        count > 0 ? `${count} participant${count === 1 ? "" : "s"}` : null,
        isPublished ? null : "draft",
      ].filter(Boolean);
      return {
        title: title || `GICIP ${year ?? ""}`.trim(),
        subtitle: bits.join(" · "),
        media,
      };
    },
  },
  orderings: [
    {
      title: "Year (newest first)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
});
