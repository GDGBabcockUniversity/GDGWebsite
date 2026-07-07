# Site imagery — what to drop where

Every photo slot on the site renders through `SmartImage`
(`components/placeholder-image.tsx`). While a file is missing, the live page
shows a labeled placeholder describing exactly what photo belongs there — so
you can browse the site itself as a shot list.

**To swap a placeholder for a real photo:**

1. Export/crop the photo to roughly the size below (see notes on weight).
2. Save it at the path below.
3. Set the `src` field for that slot in the matching `lib/content/*.ts` file
   (each slot has a `// drop in /images/...` comment next to it).

> ⚠️ `next.config.mjs` sets `images.unoptimized: true`, so Next.js will NOT
> resize these. Pre-compress to **≤ 400 KB** and **≤ 1920 px** on the long
> edge (hero/partner) or ≤ 1000 px (gallery/polaroids), or pages get heavy.

| File | Subject | Orientation / size |
| --- | --- | --- |
| `hero/hero-01.png` … `hero-04.png` | Event photos for the hero carousel (audience close-up, speaker on stage, members collaborating, crowd at ORBIT/GDG Week) | landscape, 1920×1080 |
| `gallery/orbit/01.png` … `05.png` | ORBIT summit gallery strip | portrait-ish, ~800×1000 |
| `gallery/field-trip/01.png` … `04.png` | Field trip / company visit strip | portrait-ish, ~800×1000 |
| `gallery/monthly-meetup/01.png` … `04.png` | Monthly meetup strip | portrait-ish, ~800×1000 |
| `story/founding-photo.png` | Group shot of early members ("Founded to close the gap" polaroid) | landscape, ~1200×900 |
| `what-we-do/workshops.png` | Member presenting/teaching | portrait, ~900×1100 |
| `what-we-do/tech-talks.png` | Seated audience at a talk | portrait, ~900×1100 |
| `what-we-do/community.png` | Members networking/mingling | portrait, ~900×1100 |
| `what-we-do/hackathons.png` | Build-day cohort group photo | portrait, ~900×1100 |
| `events/orbit-circle.png` | Square group shot (shown in a circle crop next to "Our Events") | square, ~600×600 |
| `partner/group-photo.png` | Big outdoor community group photo ("Let's build together" background) | landscape, 1920×1080 |

Content data files that reference these paths:

- `lib/content/site.ts` — hero slides
- `lib/content/gallery.ts` — the three gallery strips
- `lib/content/what-we-do.ts` — program polaroids
- `lib/content/partner.ts` — partner background
- `components/sections/story.tsx` and `components/sections/events.tsx` — the
  story polaroid and events circle photo (src set inline)

## Housekeeping (future chore)

Team headshots currently live at the `public/` root with spaces in their
filenames (e.g. `/Chukwuneku Akpotohwo - Organizer.png`) and are referenced
from `lib/team-data.ts`. They work as-is — if you ever tidy them into
`public/team/`, update the `image` paths in `lib/team-data.ts` in the same
commit.
