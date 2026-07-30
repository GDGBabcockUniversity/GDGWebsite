import { defineField, defineType } from "sanity";

// One institution a cohort visits. Ordered by visitDate on the website, so the
// itinerary reads as the trip actually ran.
export default defineType({
  name: "gicipHost",
  title: "Host",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Organisation",
      type: "string",
      description: 'e.g. "SAP Innovation Center Berlin"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: [
          { title: "Company", value: "company" },
          { title: "Institution", value: "institution" },
          { title: "School", value: "school" },
          { title: "Court", value: "court" },
        ],
        layout: "radio",
      },
      initialValue: "company",
    }),
    defineField({ name: "city", title: "City", type: "string" }),
    defineField({ name: "country", title: "Country", type: "string" }),
    defineField({
      name: "visitDate",
      title: "Visit date",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
    }),
    defineField({
      name: "note",
      title: "Note",
      type: "text",
      rows: 3,
      description: "One or two sentences on what the cohort saw here.",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative Text" }],
    }),
    defineField({ name: "url", title: "Website", type: "url" }),
  ],
  preview: {
    select: { title: "name", city: "city", visitDate: "visitDate", media: "logo" },
    prepare({ title, city, visitDate, media }) {
      const bits = [city, visitDate].filter(Boolean);
      return { title, subtitle: bits.join(" · "), media };
    },
  },
});
