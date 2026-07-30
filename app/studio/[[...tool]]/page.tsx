"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

// The Studio is a client-side single page app that owns its own routing under
// /studio, hence the catch-all segment. Route metadata lives in the layout,
// which stays a server component.
export default function StudioPage() {
  return <NextStudio config={config} />;
}
