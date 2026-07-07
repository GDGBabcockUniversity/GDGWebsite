/**
 * Gallery strips — full-width horizontal photo rows on the home page.
 * Designer spec: all images colored until one is hovered, then every other
 * image in the strip goes black & white.
 */

import type { GdgColor } from "@/lib/tracks";
import type { SlideImage } from "./site";

export interface GalleryStrip {
  title: string;
  seeMoreHref: string;
  /** Divider line colors cycle through these */
  dividerColors: GdgColor[];
  images: SlideImage[];
}

export const GALLERY_STRIPS: GalleryStrip[] = [
  {
    title: "ORBIT",
    seeMoreHref: "https://www.instagram.com/gdgbabcock/", // TODO: ORBIT gallery/album link
    dividerColors: ["green", "red", "yellow", "blue"],
    images: [
      {
        src: undefined, // drop in /images/gallery/orbit/01.png
        label: "ORBIT gallery 1 — attendees listening, portrait/square crop ~800×1000",
        alt: "Attendees at ORBIT summit",
      },
      {
        src: undefined, // drop in /images/gallery/orbit/02.png
        label: "ORBIT gallery 2 — panel or roundtable discussion, ~800×1000",
        alt: "Panel discussion at ORBIT",
      },
      {
        src: undefined, // drop in /images/gallery/orbit/03.png
        label: "ORBIT gallery 3 — audience mid-session, ~800×1000",
        alt: "Audience at ORBIT",
      },
      {
        src: undefined, // drop in /images/gallery/orbit/04.png
        label: "ORBIT gallery 4 — member wearing GDG merch, ~800×1000",
        alt: "GDG Babcock member at ORBIT",
      },
      {
        src: undefined, // drop in /images/gallery/orbit/05.png
        label: "ORBIT gallery 5 — speaker or demo moment, ~800×1000",
        alt: "Speaker at ORBIT",
      },
    ],
  },
  {
    title: "FIELD TRIP.",
    seeMoreHref: "https://www.instagram.com/gdgbabcock/", // TODO: field trip album link
    dividerColors: ["blue", "green", "red", "yellow"],
    images: [
      {
        src: undefined, // drop in /images/gallery/field-trip/01.png
        label: "Field trip 1 — members at an office/company visit, ~800×1000",
        alt: "GDG Babcock field trip",
      },
      {
        src: undefined, // drop in /images/gallery/field-trip/02.png
        label: "Field trip 2 — group conversation around a table, ~800×1000",
        alt: "Members in discussion on a field trip",
      },
      {
        src: undefined, // drop in /images/gallery/field-trip/03.png
        label: "Field trip 3 — candid walking/tour shot, ~800×1000",
        alt: "Members touring on a field trip",
      },
      {
        src: undefined, // drop in /images/gallery/field-trip/04.png
        label: "Field trip 4 — group photo at the visited company, ~800×1000",
        alt: "Group photo on a field trip",
      },
    ],
  },
  {
    title: "MONTHLY MEETUP",
    seeMoreHref: "https://www.instagram.com/gdgbabcock/", // TODO: meetup album link
    dividerColors: ["yellow", "blue", "green", "red"],
    images: [
      {
        src: undefined, // drop in /images/gallery/monthly-meetup/01.png
        label: "Monthly meetup 1 — smiling members in session (like mockup's peace-sign shot), ~800×1000",
        alt: "Members at a monthly meetup",
      },
      {
        src: undefined, // drop in /images/gallery/monthly-meetup/02.png
        label: "Monthly meetup 2 — members laughing/reacting, ~800×1000",
        alt: "Members reacting at a meetup",
      },
      {
        src: undefined, // drop in /images/gallery/monthly-meetup/03.png
        label: "Monthly meetup 3 — wide shot of the room, ~800×1000",
        alt: "Wide shot of a monthly meetup",
      },
      {
        src: undefined, // drop in /images/gallery/monthly-meetup/04.png
        label: "Monthly meetup 4 — Q&A or hands raised, ~800×1000",
        alt: "Q&A at a monthly meetup",
      },
    ],
  },
];
