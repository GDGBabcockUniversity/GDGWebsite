# GDG Babcock — Main Website

The home of **Google Developer Group, Babcock University** on the web:
[gdgbabcock.com](https://gdgbabcock.com). The 2026 redesign turns the site
into the front door of the whole GDG Babcock ecosystem — members sign up
here, complete one profile, and that profile follows them across
[RADAR](https://radar.gdgbabcock.com), Wrapped, Orbit, event attendance, and
automatic certificates.

## What the site does

- **Marketing site** — who we are, galleries, programs (ORBIT, RADAR,
  THE 100, GDG WEEK), the team, and partner CTA.
- **Native membership registration** (replaces the old Google Form + Apps
  Script): sign in with Google or email → 3-step onboarding at `/onboarding`
  (contact, academics, tracks) → WhatsApp group-chat links for the member's
  chosen track(s).
- **Member profile** at `/profile` — editable, plus the member's track group
  chats.

Identity is handled by the shared **auth service**
([`GDGBabcockUniversity/auth`](https://github.com/GDGBabcockUniversity/auth),
deployed at `auth.gdgbabcock.com`): Firebase sign-in on the client, exchanged
for a platform JWT. First login auto-creates the user; onboarding fills the
profile with one `PUT /auth/profile`.

## Stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS v4 (tokens in
`app/globals.css`, no tailwind.config) · Firebase client auth · Vercel.

## Pages

| Route | What |
| --- | --- |
| `/` | Home — who we are, annual structure, products, member pathway, campus, partner, team, latest RADAR |
| `/about` | Institutional About — pillars, structure, what membership means |
| `/products` | Everything we've shipped (RADAR, ORBIT, Babcock 100, BabcockVotes, …) |
| `/team` | The team, browsable by year and organized into sections |
| `/onboarding` | Native membership registration (replaces the Google Form) |
| `/profile` | The linked member profile |

## Editing content (no code required)

| What | Where |
| --- | --- |
| Tracks + **WhatsApp group links** | `lib/tracks.ts` |
| Nav, socials, marquee, hero slides, Apply URL | `lib/content/site.ts` |
| Products (names, statuses, links) | `lib/content/products.ts` |
| Programs + descriptions | `lib/content/programs.ts` |
| Member pathway + key CTAs | `lib/content/engage.ts` |
| Across-campus cards | `lib/content/campus.ts` |
| Hero quote cards | `lib/content/quotes.ts` |
| Gallery strips | `lib/content/gallery.ts` |
| What-we-do polaroids | `lib/content/what-we-do.ts` |
| Partner pills | `lib/content/partner.ts` |
| Team roster + org structure | `lib/team-data.ts` |
| Photos | drop files per `public/images/README.md` |

Missing photos render as **labeled placeholders** on the live page describing
exactly what to shoot/crop — see `public/images/README.md`.

### Team page (`lib/team-data.ts`)

Member data (name, role, photo, music, links) lives in `roster2526Raw`. Their
org placement — **section**, **subteam**, whether they **lead** it — lives in
the `ASSIGNMENTS` table, keyed by name. To move someone or fix an inferred
placement (marked `// ?`), edit that one entry. Sections render in the order
declared in `TEAM_SECTIONS` (Core → Tracks → Dev → Media → Events); leads sort
to the first row; track subteams are color-coded to the four brand tracks.

**Backfill a past year:** add a `rosterYYYYRaw` array + its `ASSIGNMENTS` (or
reuse `enrich(...)`), then push `{ id, label, members: enrich(rosterYYYYRaw) }`
onto `TEAM_YEARS`. Empty years show an "archive being assembled" placeholder.

## Development

```bash
pnpm install
pnpm dev
```

Create `.env.local` with the Firebase web-app config (and optionally the auth
service URL):

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=…
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=…
NEXT_PUBLIC_FIREBASE_PROJECT_ID=…
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=…
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=…
NEXT_PUBLIC_FIREBASE_APP_ID=…
NEXT_PUBLIC_AUTH_API_URL=https://auth.gdgbabcock.com

# RADAR feed on the homepage + /products (same Sanity project as radar.gdgbabcock.com).
# Omit these and those sections fall back to an editorial "Read RADAR" card.
NEXT_PUBLIC_SANITY_PROJECT_ID=…
NEXT_PUBLIC_SANITY_DATASET=production
```

Without the Firebase keys the site renders but sign-in is disabled. Note that
the build skips type errors (`next.config.mjs`), so run `pnpm exec tsc --noEmit`
before shipping.

---

Built by students, for students. 💙❤️💛💚
