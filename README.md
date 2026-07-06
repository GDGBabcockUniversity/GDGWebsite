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

## Editing content (no code required)

| What | Where |
| --- | --- |
| Tracks + **WhatsApp group links** | `lib/tracks.ts` |
| Nav, socials, marquee, hero slides | `lib/content/site.ts` |
| Hero quote cards | `lib/content/quotes.ts` |
| Gallery strips | `lib/content/gallery.ts` |
| Programs + descriptions | `lib/content/programs.ts` |
| What-we-do polaroids | `lib/content/what-we-do.ts` |
| Partner pills | `lib/content/partner.ts` |
| Team roster | `lib/team-data.ts` |
| Photos | drop files per `public/images/README.md` |

Missing photos render as **labeled placeholders** on the live page describing
exactly what to shoot/crop — see `public/images/README.md`.

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
```

Without these the site renders but sign-in is disabled. Note that the build
skips type errors (`next.config.mjs`), so run `pnpm exec tsc --noEmit` before
shipping.

---

Built by students, for students. 💙❤️💛💚
