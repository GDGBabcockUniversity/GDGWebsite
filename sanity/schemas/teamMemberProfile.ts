import { defineField, defineType } from "sanity";

// One person on a GDG Babcock team, for one year.
//
// Named teamMemberProfile rather than teamMember: this dataset is shared with
// RADAR, which already holds a legacy `teamMember` type, and two schemas
// claiming one type name would edit each other's documents.
//
// Roles rotate yearly, so a person who serves two years has two documents.
// That keeps each year's roster a frozen record of who held what.
export default defineType({
  name: "teamMemberProfile",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: 'Display title, e.g. "Organizer", "Design Lead".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "section",
      title: "Section",
      type: "string",
      options: {
        list: [
          { title: "Core", value: "core" },
          { title: "Tracks", value: "tracks" },
          { title: "Dev", value: "dev" },
          { title: "Media", value: "media" },
          { title: "Events", value: "events" },
        ],
        layout: "radio",
      },
      initialValue: "core",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subteam",
      title: "Subteam",
      type: "string",
      description: "Optional grouping inside a section, e.g. a track name.",
    }),
    defineField({
      name: "isLead",
      title: "Lead",
      type: "boolean",
      description: "Leads are shown above the rest of their section.",
      initialValue: false,
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      description:
        "Cards render a square. The hotspot decides what stays in frame.",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative Text" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "teamYear",
      title: "Team year",
      type: "string",
      description: '"current" for the serving team, otherwise e.g. "2024/2025".',
      initialValue: "current",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first within a section.",
      initialValue: 0,
    }),
    defineField({
      name: "isPublic",
      title: "Show on the team page",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "wordsToLiveBy",
      title: "Words to live by",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "platformUserId",
      title: "Platform profile ID",
      type: "string",
      description:
        "Optional. The member's GDG platform ID, from the admin user list. Shows the volunteer badge on their profile. Deliberately the ID and not an email, since this dataset is public.",
      validation: (Rule) =>
        Rule.regex(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
          { name: "UUID" }
        ).error("Must be a full platform UUID."),
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "twitter", title: "X / Twitter", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
        defineField({ name: "portfolio", title: "Portfolio", type: "url" }),
      ],
    }),
    defineField({
      name: "music",
      title: "Track of the year",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "name", title: "Track", type: "string" }),
        defineField({ name: "artist", title: "Artist", type: "string" }),
        defineField({ name: "url", title: "Spotify URL", type: "url" }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      role: "role",
      section: "section",
      year: "teamYear",
      media: "photo",
    },
    prepare({ title, role, section, year, media }) {
      const bits = [role, section, year].filter(Boolean);
      return { title, subtitle: bits.join(" · "), media };
    },
  },
  orderings: [
    {
      title: "Section, then order",
      name: "sectionOrder",
      by: [
        { field: "section", direction: "asc" },
        { field: "displayOrder", direction: "asc" },
      ],
    },
    {
      title: "Name",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
});
