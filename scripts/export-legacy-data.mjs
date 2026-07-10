#!/usr/bin/env node
// One-time export: serializes the hardcoded team roster, the client-bundled
// member seed data, and the team-roster CSV's linking-email/consent columns
// to JSON for auth/scripts/import-legacy-data.js to load directly into
// Postgres. Run with:
//   node --experimental-strip-types scripts/export-legacy-data.mjs
//
// Assumes this repo and the `auth` repo are checked out as sibling
// directories (../auth) — override with AUTH_REPO_PATH if not.

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const AUTH_REPO_PATH = process.env.AUTH_REPO_PATH || resolve(__dirname, "../../auth");
const OUT_DIR = resolve(AUTH_REPO_PATH, "scripts/data");

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c === "\r") {
      // skip
    } else {
      field += c;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

// Matches names across word-order variants ("Bolujo Daniel" / "Daniel
// Bolujo") — exact-string comparison alone misses these.
function tokenKey(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .sort()
    .join(" ");
}

async function main() {
  const { teamMembers } = await import("../lib/team-data.ts");
  const { MEMBER_SEED_DATA } = await import("../lib/member-seed-data.ts");

  // --- CSV: linking email + consent, matched to the current roster ---
  const csvPath = resolve(
    __dirname,
    "../public/2025_2026 Website Data Form (Responses) - Form Responses 1.csv"
  );
  const csvRows = parseCSV(readFileSync(csvPath, "utf8"));
  const header = csvRows[0];
  const iName = header.indexOf("Full name");
  const iLinkEmail = header.indexOf("Email(for profile linking)");
  const iConsent = header.indexOf("Consent to display");

  const consented = csvRows
    .slice(1)
    .filter((r) => r.length > 1 && (r[iConsent] || "").trim().toLowerCase() === "i do");

  const csvByToken = new Map();
  for (const r of consented) {
    const name = (r[iName] || "").trim();
    const email = (r[iLinkEmail] || "").trim().toLowerCase();
    if (name && email) csvByToken.set(tokenKey(name), email);
  }

  const rosterTokens = new Set(teamMembers.map((m) => tokenKey(m.name)));
  const unmatchedCsvNames = [...csvByToken.keys()].filter((key) => !rosterTokens.has(key));

  // --- team_members.json — existing image_url etc. untouched, CSV never
  // contributes image data (its photo field is a Drive link, not a site
  // asset). linking_email is a transient field consumed only by the
  // importer to resolve user_id; it is not a team_members column. ---
  const teamMembersOut = teamMembers.map((m, i) => ({
    name: m.name,
    role: m.role,
    section: m.section || "core",
    subteam: m.subteam || null,
    is_lead: !!m.isLead,
    image_url: m.image || null,
    words_to_live_by: m.wordsToLiveBy || null,
    twitter_url: m.links?.twitter || null,
    linkedin_url: m.links?.linkedin || null,
    portfolio_url: m.links?.portfolio || null,
    spotify_track_name: m.music?.name || null,
    spotify_track_artist: m.music?.artist || null,
    spotify_track_url: m.music?.url || null,
    team_year: "current",
    display_order: i,
    linking_email: csvByToken.get(tokenKey(m.name)) || null,
  }));

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(
    resolve(OUT_DIR, "team-members.json"),
    JSON.stringify(teamMembersOut, null, 2)
  );
  writeFileSync(
    resolve(OUT_DIR, "member-seed-data.json"),
    JSON.stringify(MEMBER_SEED_DATA, null, 2)
  );

  const matchedCount = teamMembersOut.filter((m) => m.linking_email).length;
  console.log(`team_members: ${teamMembersOut.length} rows (source: lib/team-data.ts)`);
  console.log(`member_seed_data: ${Object.keys(MEMBER_SEED_DATA).length} rows (source: lib/member-seed-data.ts)`);
  console.log(
    `CSV consented rows: ${consented.length} (${csvByToken.size} unique names) — matched to roster: ${matchedCount}`
  );
  console.log(
    `CSV rows NOT matched to any current roster member (deliberately excluded — not auto-imported):`
  );
  for (const key of unmatchedCsvNames) {
    const row = consented.find((r) => tokenKey((r[iName] || "").trim()) === key);
    console.log(`  - ${row[iName].trim()} <${row[iLinkEmail].trim()}>`);
  }
  console.log(`\nWrote ${OUT_DIR}/team-members.json and member-seed-data.json`);
}

main().catch((err) => {
  console.error("Export failed:", err);
  process.exit(1);
});
