import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";

// Studio for gdgbabcock.com, mounted at /studio.
//
// It points at the same project and dataset RADAR uses. Each Studio declares
// its own schema list, so this one shows the team roster, GICIP and galleries
// while RADAR's shows the publication, and neither sees the other's types.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "gdgbabcock",
  title: "GDG Babcock",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
});
