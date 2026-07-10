#!/usr/bin/env node
// Regenerates auth/scripts/data/member-seed-data.json from git history.
//
// lib/member-seed-data.ts was retired from the working tree once first-login
// prefill moved server-side, but the auth importer still needs its data as
// JSON — and that JSON is gitignored on the auth side because it contains
// member PII (WhatsApp numbers, birthdays). This script recovers the module
// from the last commit that carried it and writes the JSON locally.
//
// Run with:
//   node --experimental-strip-types scripts/regen-seed-json.mjs
//
// Assumes this repo and the `auth` repo are sibling directories (../auth) —
// override with AUTH_REPO_PATH. The output must never be committed anywhere.

import { execSync } from "child_process";
import { writeFileSync, mkdirSync, rmSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const AUTH_REPO_PATH = process.env.AUTH_REPO_PATH || resolve(REPO_ROOT, "../auth");
const OUT_DIR = resolve(AUTH_REPO_PATH, "scripts/data");

// Last commit that still contained lib/member-seed-data.ts (its child,
// c05f153, deleted the file). Git history is immutable, so this stays valid.
const SEED_DATA_COMMIT = "d2fa8d7";

async function main() {
  const source = execSync(`git show ${SEED_DATA_COMMIT}:lib/member-seed-data.ts`, {
    cwd: REPO_ROOT,
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });

  // Write the recovered module to a temp file and import it — same approach
  // export-legacy-data.mjs used, no hand-rolled TS parsing.
  const tempPath = resolve(__dirname, ".recovered-member-seed-data.ts");
  writeFileSync(tempPath, source);
  try {
    const { MEMBER_SEED_DATA } = await import(tempPath);
    mkdirSync(OUT_DIR, { recursive: true });
    const outPath = resolve(OUT_DIR, "member-seed-data.json");
    writeFileSync(outPath, JSON.stringify(MEMBER_SEED_DATA, null, 2));
    console.log(
      `Wrote ${Object.keys(MEMBER_SEED_DATA).length} seed profiles to ${outPath}`
    );
    console.log("This file contains PII — it is gitignored on the auth side; never commit it.");
  } finally {
    rmSync(tempPath, { force: true });
  }
}

main().catch((err) => {
  console.error("Regeneration failed:", err);
  process.exit(1);
});
