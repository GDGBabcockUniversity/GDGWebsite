import { defineField, defineType } from "sanity";

// One member of a GICIP cohort. This dataset is served publicly, so the fields
// here are only the ones meant for the cohort page: no email, no phone, no
// matriculation number.
export default defineType({
  name: "gicipParticipant",
  title: "Participant",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "course",
      title: "Course",
      type: "string",
      description: 'e.g. "Computer Science"',
    }),
    defineField({
      name: "cameToFind",
      title: "What they came to find",
      type: "string",
      description: "One line, in their own words. Captioned under the portrait.",
      validation: (Rule) => Rule.max(140),
    }),
    defineField({
      name: "photo",
      title: "Portrait",
      type: "image",
      description: "Square crop. The hotspot sets what stays in frame.",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative Text" }],
    }),
    defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 0,
    }),
  ],
  preview: { select: { title: "name", subtitle: "course", media: "photo" } },
});
