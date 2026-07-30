import { defineField, defineType } from "sanity";

// A named set of photographs: an event, a trip, a launch. Galleries stand on
// their own so the same set can be shown on an event page, pulled into a GICIP
// cohort, or linked directly.
//
// Images are stored once and cropped on delivery, so a photograph serves as a
// wide banner and a square tile without a second upload.
export default defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 60 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative Text" }],
    }),
    defineField({
      name: "images",
      title: "Photographs",
      type: "array",
      of: [{ type: "galleryImage" }],
    }),
    defineField({
      name: "isPublished",
      title: "Published",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      images: "images",
      media: "coverImage",
      published: "isPublished",
    },
    prepare({ title, date, images, media, published }) {
      const count = Array.isArray(images) ? images.length : 0;
      const bits = [
        count > 0 ? `${count} photograph${count === 1 ? "" : "s"}` : null,
        date,
        published ? null : "draft",
      ].filter(Boolean);
      return { title, subtitle: bits.join(" · "), media };
    },
  },
  orderings: [
    {
      title: "Date (newest first)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
