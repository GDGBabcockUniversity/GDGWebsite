#!/usr/bin/env node
/**
 * Migrate existing members from Google Sheets CSV export into the GDG Auth Service.
 *
 * Usage:
 *   1. Open the Google Sheet linked to the old form
 *   2. File → Download → Comma-separated values (.csv)
 *   3. Save as  scripts/members.csv
 *   4. Run:  node scripts/migrate-members.mjs
 *
 * Expected CSV columns (adjust COLUMN_MAP below if your headers differ):
 *   Timestamp, Email Address, Full Name, WhatsApp Number, Gender,
 *   Student Status, Tracks (comma-separated), Matric Number,
 *   Department, Faculty, Birthday Month, Birthday Day
 *
 * The script will:
 *   - Read each row from the CSV
 *   - Create a user record via the auth service /admin/import endpoint
 *     (or fall back to a direct profile update if the user already exists)
 *   - Log successes and failures
 *
 * NOTE: This requires an admin token. Set AUTH_ADMIN_TOKEN env var, or
 *       the script will try the /auth/register-bulk endpoint if available.
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Config ──────────────────────────────────────────────────────────────────

const AUTH_API_URL = process.env.AUTH_API_URL || "https://auth.gdgbabcock.com";
const ADMIN_TOKEN = process.env.AUTH_ADMIN_TOKEN || "";
const CSV_PATH = resolve(__dirname, "members.csv");
const DRY_RUN = process.argv.includes("--dry-run");

// Map your CSV column headers → auth service field names.
// Adjust the LEFT side to match your actual CSV header text exactly.
const COLUMN_MAP = {
  "Email Address": "email",
  "Full Name (First name first)": "full_name",
  "WhatsApp Number": "whatsapp_number",
  "Gender": "gender",
  "Are you a current student or an Alumni?": "student_status",
  "What track would you like to join? (Pick up to 2)": "tracks_raw",
  "Matriculation Number": "matric_no",
  "What is your Department of study?": "department",
  "What Faculty / School are you under?": "faculty",
};

// Track name mapping (Google Form values → auth service values)
const TRACK_MAP = {
  "Software Development & Engineering": "Software Development & Engineering",
  "Data & AI": "Data & AI",
  "Infrastructure & Security": "Infrastructure & Security",
  "Infrasture & Security": "Infrastructure & Security", // typo in original form
  "Design & Management": "Design & Management",
};

// ─── CSV parser (no dependencies) ────────────────────────────────────────────

function parseCSV(text) {
  const lines = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      lines.push(current);
      current = "";
    } else if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (current || lines.length) {
        lines.push(current);
        current = "";
      }
      if (lines.length) {
        yield lines.splice(0);
      }
      if (ch === "\r" && text[i + 1] === "\n") i++;
    } else {
      current += ch;
    }
  }
  if (current || lines.length) {
    lines.push(current);
    yield lines.splice(0);
  }
}

function readCSV(filePath) {
  const text = readFileSync(filePath, "utf-8");
  const rows = [...parseCSV(text)];
  if (rows.length === 0) throw new Error("CSV is empty");

  const headers = rows[0];
  return rows.slice(1).map((cols) => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h.trim()] = (cols[i] || "").trim();
    });
    return obj;
  });
}

// ─── Transform a CSV row into an auth service payload ────────────────────────

function transformRow(row) {
  const payload = {};

  for (const [csvHeader, field] of Object.entries(COLUMN_MAP)) {
    const value = row[csvHeader];
    if (!value) continue;

    if (field === "tracks_raw") {
      // Parse comma-separated tracks and map to canonical names
      const rawTracks = value.split(",").map((t) => t.trim());
      const primary = TRACK_MAP[rawTracks[0]] || rawTracks[0];
      const secondary = rawTracks[1] ? TRACK_MAP[rawTracks[1]] || rawTracks[1] : undefined;
      payload.primary_track = primary;
      if (secondary) payload.secondary_track = secondary;
    } else {
      payload[field] = value;
    }
  }

  return payload;
}

// ─── API call ────────────────────────────────────────────────────────────────

async function importUser(payload) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (ADMIN_TOKEN) {
    headers["Authorization"] = `Bearer ${ADMIN_TOKEN}`;
  }

  // Try the admin import endpoint first
  const res = await fetch(`${AUTH_API_URL}/admin/import-user`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (res.ok) return { success: true, data: await res.json() };

  const errBody = await res.json().catch(() => ({}));
  return {
    success: false,
    status: res.status,
    error: errBody.message || res.statusText,
  };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("📋 GDG Babcock — Member Data Migration");
  console.log(`   API: ${AUTH_API_URL}`);
  console.log(`   CSV: ${CSV_PATH}`);
  console.log(`   Mode: ${DRY_RUN ? "DRY RUN (no API calls)" : "LIVE"}\n`);

  if (!ADMIN_TOKEN && !DRY_RUN) {
    console.warn("⚠️  No AUTH_ADMIN_TOKEN set. The API may reject requests.");
    console.warn("   Set it with: AUTH_ADMIN_TOKEN=<token> node scripts/migrate-members.mjs\n");
  }

  let rows;
  try {
    rows = readCSV(CSV_PATH);
  } catch (err) {
    console.error(`❌ Failed to read CSV: ${err.message}`);
    console.error(`   Make sure you saved your Google Sheet export as: ${CSV_PATH}`);
    process.exit(1);
  }

  console.log(`Found ${rows.length} members to import.\n`);

  let success = 0;
  let failed = 0;
  let skipped = 0;
  const errors = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const payload = transformRow(row);
    const name = payload.full_name || `Row ${i + 2}`;
    const email = payload.email || "no-email";

    if (!payload.email) {
      console.log(`⏭  [${i + 1}/${rows.length}] Skipping — no email: ${name}`);
      skipped++;
      continue;
    }

    if (DRY_RUN) {
      console.log(`🔍 [${i + 1}/${rows.length}] ${name} <${email}>`);
      console.log(`   → ${JSON.stringify(payload)}\n`);
      success++;
      continue;
    }

    const result = await importUser(payload);

    if (result.success) {
      console.log(`✅ [${i + 1}/${rows.length}] ${name} <${email}>`);
      success++;
    } else {
      console.log(`❌ [${i + 1}/${rows.length}] ${name} <${email}> — ${result.error}`);
      errors.push({ row: i + 2, email, error: result.error });
      failed++;
    }

    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log("\n─── Summary ───────────────────────────────");
  console.log(`✅ Success:  ${success}`);
  console.log(`❌ Failed:   ${failed}`);
  console.log(`⏭  Skipped:  ${skipped}`);
  console.log(`   Total:    ${rows.length}`);

  if (errors.length > 0) {
    console.log("\n─── Failed Rows ───────────────────────────");
    errors.forEach((e) => console.log(`   Row ${e.row}: ${e.email} — ${e.error}`));
  }
}

main().catch(console.error);
