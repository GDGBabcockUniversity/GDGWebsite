import { defineField, defineType } from "sanity";

// One photograph inside a gallery.
export default defineType({
  name: "galleryImage",
  title: "Photograph",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [{ name: "alt", type: "string", title: "Alternative Text" }],
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      validation: (Rule) => Rule.max(180),
    }),
    defineField({
      name: "location",
      title: "Where",
      type: "string",
    }),
    defineField({
      name: "credit",
      title: "Photographer",
      type: "string",
    }),
    defineField({
      name: "feature",
      title: "Feature this image",
      type: "boolean",
      description: "Featured images run wide across the grid.",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "caption", subtitle: "location", media: "image" },
    prepare({ title, subtitle, media }) {
      return { title: title || "Photograph", subtitle, media };
    },
  },
});
