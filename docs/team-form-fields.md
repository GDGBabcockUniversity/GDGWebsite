# Team member form — fields to collect

Use this form to gather everything the `/team` page needs for each member.
Each field maps to `lib/team-data.ts` (`TeamMember` + the `ASSIGNMENTS` table).
`*` = required.

| # | Field | Type | Maps to | Notes |
| --- | --- | --- | --- | --- |
| 1 | Full name* | text | `name` | As it should display |
| 2 | Role / title* | text | `role` | e.g. "Frontend Developer", "Photographer", "Cybersecurity Specialist" |
| 3 | Section* | single-select | `ASSIGNMENTS.section` | Core Team · Tracks · Dev Team · Media Team · Events Planning · Logistics |
| 4 | Sub-team | single-select (conditional on §3) | `ASSIGNMENTS.subteam` | **Tracks:** Software Development & Engineering · Data & AI · Infrastructure & Security · Design & Management. **Dev:** Frontend · Backend · Product Design. **Media:** Photographers · Content Creators · Graphic Designers · Video Editors · RADAR. (Core/Events: leave blank) |
| 5 | Position* | single-select | `ASSIGNMENTS.isLead` | Lead / Co-Lead → `isLead: true`; Member → omit. (Leads render first, in the top row.) |
| 6 | Headshot photo* | image upload | `image` | Portrait, ~800×1000, well-lit, plain-ish background. ≤400 KB |
| 7 | Words to live by | short text | `wordsToLiveBy` | A one-line motto (shown on the card) |
| 8 | Favourite song — title | text | `music.name` | |
| 9 | Favourite song — artist | text | `music.artist` | |
| 10 | Favourite song — Spotify link | url | `music.url` | Spotify **track** share link; the card embeds it |
| 11 | X / Twitter URL | url | `links.twitter` | Optional |
| 12 | LinkedIn URL | url | `links.linkedin` | Optional |
| 13 | Portfolio / website URL | url | `links.portfolio` | Optional |
| 14 | Team year* | single-select | `TEAM_YEARS[].id` | e.g. 2025/26 (current). Determines which year tab they appear under |
| 15 | School email | email | (identity) | Optional — used to link the card to their platform profile later |
| 16 | Consent to display publicly* | yes/no | — | Only publish cards with consent |

## Turning responses into data

For each response, add a `TeamMember` object to the year's roster (name, role,
image path, wordsToLiveBy, links, music) and one `ASSIGNMENTS[name]` entry
(`section`, `subteam?`, `isLead?`). Backfilling a past year = a new roster
array + assignment table pushed onto `TEAM_YEARS`. See the repo README's
"Team page" section.
