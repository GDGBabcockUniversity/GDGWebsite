import type { Metadata, Viewport } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "GDG Babcock Studio",
  robots: { index: false, follow: false },
};

// The Studio manages its own scrolling and needs the full viewport.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
