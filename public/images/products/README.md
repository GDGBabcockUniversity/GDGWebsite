# Product site previews

Drop a screenshot of each product's live site here and it appears behind that
product's card on the homepage (and, once wired, the /products page). Until a
file exists, the card just renders without a preview — nothing breaks.

Filenames are mapped in `lib/content/products.ts` (`preview` field):

| Product      | File                | Site                       |
| ------------ | ------------------- | -------------------------- |
| RADAR        | `radar.png`         | radar.gdgbabcock.com       |
| ORBIT        | `orbit.png`         | orbit.gdgbabcock.com       |
| Babcock 100  | `babcock-100.png`   | babcock100.com             |
| BabcockVotes | `babcockvotes.png`  | babcockvotes.com           |
| GDG Website  | `gdg-website.png`   | gdgbabcock.com             |

**Recommended:** ~1200×750 (16:10), the top / hero of each page, PNG or JPG.
The card crops from the top, so frame the shot with the site's header in view.
