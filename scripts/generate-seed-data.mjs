#!/usr/bin/env node
/**
 * Reads the exported Google Sheets CSV of existing GDG Babcock members
 * and outputs a TypeScript lookup file (lib/member-seed-data.ts).
 *
 * When a member signs up via Firebase for the first time, the app checks
 * this lookup by email and auto-populates their profile — so they don't
 * have to re-enter everything.
 *
 * Usage:
 *   node scripts/generate-seed-data.mjs [path-to-csv]
 *   Default CSV path: public/gdgbabcock-members.csv
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createReadStream } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const CSV_PATH = process.argv[2]
  ? resolve(process.argv[2])
  : resolve(ROOT, "public/gdgbabcock-members.csv");

const OUTPUT_PATH = resolve(ROOT, "lib/member-seed-data.ts");

// ─── Month parsing ──────────────────────────────────────────────────────────

const MONTH_NAMES = {
  january: 1, jan: 1,
  february: 2, feb: 2,
  march: 3, mar: 3,
  april: 4, apr: 4, aprile: 4,
  may: 5,
  june: 6, jun: 6,
  july: 7, jul: 7,
  august: 8, aug: 8,
  september: 9, sep: 9, sept: 9,
  october: 10, oct: 10,
  november: 11, nov: 11,
  december: 12, dec: 12,
};

/**
 * Parse a messy birthday string into { day, month } or null.
 * Handles formats like:
 *   "22nd September", "November 11", "23/02", "28/11/2006",
 *   "August 26th, 2006", "9th March", "01/06", "3rd July",
 *   "5 July", "28/ March", "15th,January", "6, October.",
 *   "30th March 2005", "Aprile 30", "January 3rd", etc.
 */
function parseBirthday(raw) {
  if (!raw) return null;
  const s = raw.trim().replace(/[.]/g, "");
  if (!s || s.length < 2) return null;

  // Skip obvious junk
  if (/^[a-z]{1,3}$/i.test(s)) return null; // "Gu", "v"
  if (s.includes("jfds") || s.includes("fkdl")) return null; // junk entries

  // Try DD/MM or DD/MM/YYYY numeric patterns
  const numericMatch = s.match(/^(\d{1,2})[/\-](\d{1,2})(?:[/\-]\d{2,4})?$/);
  if (numericMatch) {
    let a = parseInt(numericMatch[1], 10);
    let b = parseInt(numericMatch[2], 10);
    // If first number > 12, it must be day; second is month
    if (a > 12 && b <= 12) return { day: a, month: b };
    // If second number > 12, it must be day; first is month
    if (b > 12 && a <= 12) return { day: b, month: a };
    // Both <= 12: assume DD/MM (the convention in Nigeria)
    if (a <= 31 && b <= 12) return { day: a, month: b };
    return null;
  }

  // Patterns with just a number and no month name (like "16/2006") — skip
  const weirdYear = s.match(/^(\d{1,2})[/\-](\d{4})$/);
  if (weirdYear) {
    // Could be month/year — extract month at least
    const m = parseInt(weirdYear[1], 10);
    if (m >= 1 && m <= 12) return { day: null, month: m };
    return null;
  }

  // Full date like "01/01/2008" or "13/03/2003"
  const fullDate = s.match(/^(\d{1,2})[/\-](\d{1,2})[/\-](\d{2,4})$/);
  if (fullDate) {
    let a = parseInt(fullDate[1], 10);
    let b = parseInt(fullDate[2], 10);
    if (a > 12 && b <= 12) return { day: a, month: b };
    if (b > 12 && a <= 12) return { day: b, month: a };
    if (a <= 31 && b <= 12) return { day: a, month: b };
    return null;
  }

  // Text-based: extract day number and month name
  const lower = s.toLowerCase();

  // Find month name
  let foundMonth = null;
  for (const [name, num] of Object.entries(MONTH_NAMES)) {
    if (lower.includes(name)) {
      foundMonth = num;
      break;
    }
  }

  if (!foundMonth) return null;

  // Find day number (1-31)
  // Remove month name first, then find any remaining number
  let withoutMonth = lower;
  for (const name of Object.keys(MONTH_NAMES)) {
    withoutMonth = withoutMonth.replace(name, "");
  }
  // Extract number from what's left
  const dayMatch = withoutMonth.match(/(\d{1,2})/);
  const day = dayMatch ? parseInt(dayMatch[1], 10) : null;

  if (day && day >= 1 && day <= 31) {
    return { day, month: foundMonth };
  }

  // Month only (like "January")
  return { day: null, month: foundMonth };
}

/**
 * Convert parsed birthday to ISO string "2000-MM-DD" for the API.
 */
function birthdayToISO(parsed) {
  if (!parsed || !parsed.month) return null;
  const mm = String(parsed.month).padStart(2, "0");
  const dd = parsed.day ? String(parsed.day).padStart(2, "0") : "01";
  return `2000-${mm}-${dd}`;
}

// ─── CSV parser (handles quoted fields with commas) ─────────────────────────

function parseCSVLine(line) {
  const fields = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      fields.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}

function readCSV(filePath) {
  const text = readFileSync(filePath, "utf-8");
  // Split by newline but handle multi-line quoted fields
  const rows = [];
  let currentLine = "";
  let inQuotes = false;

  for (const line of text.split("\n")) {
    // Count quotes in this line
    const quoteCount = (line.match(/"/g) || []).length;
    if (inQuotes) {
      currentLine += "\n" + line;
      if (quoteCount % 2 === 1) {
        inQuotes = false;
        rows.push(currentLine);
        currentLine = "";
      }
    } else {
      if (quoteCount % 2 === 1) {
        currentLine = line;
        inQuotes = true;
      } else {
        rows.push(line);
      }
    }
  }
  if (currentLine) rows.push(currentLine);

  const parsedRows = rows.filter((r) => r.trim()).map(parseCSVLine);
  if (parsedRows.length === 0) throw new Error("CSV is empty");

  const headers = parsedRows[0].map((h) => h.trim());
  return parsedRows.slice(1).map((cols) => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = (cols[i] || "").trim();
    });
    return obj;
  });
}

// ─── Normalize phone number ─────────────────────────────────────────────────

function normalizePhone(raw) {
  if (!raw) return null;
  let phone = raw.replace(/[\s\-().]/g, "").trim();
  if (!phone || phone.length < 7) return null;
  // Nigerian numbers: convert local to +234
  if (phone.startsWith("0") && phone.length === 11) {
    phone = "+234" + phone.slice(1);
  } else if (phone.startsWith("234") && !phone.startsWith("+")) {
    phone = "+" + phone;
  } else if (!phone.startsWith("+") && phone.length === 10) {
    // Might be missing leading 0
    phone = "+234" + phone;
  }
  return phone;
}

// ─── Map student status ─────────────────────────────────────────────────────

function mapStudentStatus(raw) {
  if (!raw) return null;
  const lower = raw.toLowerCase().trim();
  if (lower === "current student") return "Current Student";
  if (lower === "alumni") return "Alumni";
  if (lower === "joining for the first time") return "Current Student";
  if (lower === "none") return "Non-Student";
  return raw.trim();
}

// ─── Transform a CSV row into a profile payload ─────────────────────────────

function transformRow(row) {
  // Find the columns by partial header match
  let rawEmail = (row["Email Address"] || "").trim().toLowerCase();

  // Sanitize corrupted emails (e.g. "user@gmail.com..........")
  // Extract just the valid email part before any trailing dots/junk
  const emailMatch = rawEmail.match(/^([a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,})/);
  const email = emailMatch ? emailMatch[1] : rawEmail;

  if (!email || !email.includes("@") || email.length < 5) return null;

  const fullName = (
    row["Full name (First name first)"] || ""
  ).trim();

  // Skip junk entries
  if (!fullName || fullName.length < 3) return null;
  if (/^[a-z]{1,4}$/i.test(fullName)) return null;
  // Skip entries that are clearly test/junk data (random chars)
  if (/^[b-df-hj-np-tv-z]{3,}$/i.test(fullName)) return null;

  const gender = (row["Gender"] || "").trim();
  const phone = row["Whatsapp number"] || "";
  const birthdayRaw = row["Birthday\n(day and month only)"] || "";
  const tracksRaw = row["What Team(s) are you part of ? \nMaximum of 2 only."] || "";
  const studentStatus = row["Current Student or Alumni"] || "";
  const matricNo = row["Matriculation Number"] || "";
  const department = row["Department of Study"] || "";
  const faculty = row["Faculty/School"] || "";
  const skillLevel = row["Current Skill Level in Selected Tracks"] || "";

  // Parse tracks (first 2 only)
  const tracks = tracksRaw
    .split(",")
    .map((t) => t.trim())
    .filter((t) =>
      [
        "Software Development & Engineering",
        "Data & AI",
        "Infrastructure & Security",
        "Design & Management",
      ].includes(t)
    );

  const parsedBirthday = parseBirthday(birthdayRaw);
  const birthday = birthdayToISO(parsedBirthday);

  const profile = {};

  if (fullName) profile.full_name = fullName;
  if (gender === "Male" || gender === "Female") profile.gender = gender;
  
  const normalizedPhone = normalizePhone(phone);
  if (normalizedPhone) profile.whatsapp_number = normalizedPhone;

  if (birthday) profile.birthday = birthday;

  if (tracks[0]) profile.primary_track = tracks[0];
  if (tracks[1]) profile.secondary_track = tracks[1];

  const mappedStatus = mapStudentStatus(studentStatus);
  if (mappedStatus) profile.student_status = mappedStatus;

  if (matricNo && matricNo.length > 2 && !/^[a-z]+$/i.test(matricNo)) {
    profile.matric_no = matricNo;
  }

  if (department && department.length > 2) profile.department = department;
  if (faculty && faculty.length > 2) profile.faculty = faculty;

  const skill = parseInt(skillLevel, 10);
  if (skill >= 1 && skill <= 5) {
    profile.primary_skill_level = String(skill);
  }

  return { email, profile };
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
  console.log(`📋 Reading CSV: ${CSV_PATH}`);

  const rows = readCSV(CSV_PATH);
  console.log(`   Found ${rows.length} rows`);

  const lookup = {};
  let valid = 0;
  let skipped = 0;
  let duplicates = 0;

  for (const row of rows) {
    const result = transformRow(row);
    if (!result) {
      skipped++;
      continue;
    }

    if (lookup[result.email]) {
      // Keep the newer entry (later in spreadsheet = more recent)
      duplicates++;
    }

    lookup[result.email] = result.profile;
    valid++;
  }

  console.log(`   ✅ Valid entries: ${valid}`);
  console.log(`   ⏭  Skipped (no email/junk): ${skipped}`);
  console.log(`   🔄 Duplicates (kept latest): ${duplicates}`);

  // Generate TypeScript file
  const tsContent = `/**
 * Auto-generated member seed data from Google Sheets export.
 * Generated on: ${new Date().toISOString()}
 *
 * When a member signs up for the first time, we look up their email here
 * and auto-populate their profile with the data from the spreadsheet.
 *
 * DO NOT EDIT MANUALLY — regenerate with:
 *   node scripts/generate-seed-data.mjs
 */

export interface MemberSeedProfile {
  full_name?: string;
  gender?: string;
  whatsapp_number?: string;
  birthday?: string;
  primary_track?: string;
  secondary_track?: string;
  student_status?: string;
  matric_no?: string;
  department?: string;
  faculty?: string;
  primary_skill_level?: string;
}

/** Lookup by lowercase email → pre-filled profile fields */
export const MEMBER_SEED_DATA: Record<string, MemberSeedProfile> = ${JSON.stringify(lookup, null, 2)};

/** Check if an email has seed data available */
export function getMemberSeedData(email: string): MemberSeedProfile | null {
  return MEMBER_SEED_DATA[email.toLowerCase().trim()] ?? null;
}
`;

  writeFileSync(OUTPUT_PATH, tsContent, "utf-8");
  console.log(`\n✅ Generated: ${OUTPUT_PATH}`);
  console.log(`   ${Object.keys(lookup).length} members in lookup`);

  // Print a few samples for verification
  console.log("\n─── Samples ──────────────────────────────────");
  const entries = Object.entries(lookup);
  for (let i = 0; i < Math.min(5, entries.length); i++) {
    const [email, profile] = entries[i];
    console.log(`   ${email}: ${JSON.stringify(profile)}`);
  }
}

main();
