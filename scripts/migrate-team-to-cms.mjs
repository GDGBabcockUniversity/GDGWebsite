#!/usr/bin/env node
// Moves the team roster from the auth service into the CMS.
//
// Reads the public roster endpoint, uploads each photograph to the content
// dataset, and writes one teamMemberProfile document per person. Run once when
// the roster moves; safe to re-run afterwards.
//
// Idempotent: each document gets a deterministic id built from the person's
// name and team year, so a second run updates in place. Photographs already
// uploaded are matched by their original filename and reused rather than
// duplicated.
//
// Usage:
//   NEXT_PUBLIC_SANITY_PROJECT_ID=... NEXT_PUBLIC_SANITY_DATASET=production \
//   SANITY_WRITE_TOKEN=... node scripts/migrate-team-to-cms.mjs [--commit]
//
// The write token needs Editor permission and is only used by this script.

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_WRITE_TOKEN;
const AUTH_API_URL =
  process.env.NEXT_PUBLIC_AUTH_API_URL || "https://auth.gdgbabcock.com";
const API_VERSION = "2024-01-01";

const commit = process.argv.includes("--commit");

function slugify(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Deterministic document id, so re-running updates rather than duplicates. */
function documentId(member) {
  return `teamMemberProfile-${slugify(member.team_year || "current")}-${slugify(
    member.name
  )}`;
}

async function sanity(path, init = {}) {
  const res = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/${path}`,
    {
      ...init,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        ...(init.headers || {}),
      },
    }
  );
  if (!res.ok) {
    throw new Error(`${path} failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

/** Uploads an image by URL, reusing an identical upload when one exists. */
async function uploadImage(url, filename) {
  const existing = await sanity(
    `data/query/${DATASET}?query=${encodeURIComponent(
      `*[_type == "sanity.imageAsset" && originalFilename == ${JSON.stringify(
        filename
      )}][0]._id`
    )}`
  );
  if (existing.result) return existing.result;

  const source = await fetch(url);
  if (!source.ok) throw new Error(`could not fetch image ${url}`);
  const body = Buffer.from(await source.arrayBuffer());
  const type = source.headers.get("content-type") || "image/jpeg";

  const uploaded = await sanity(
    `assets/images/${DATASET}?filename=${encodeURIComponent(filename)}`,
    { method: "POST", headers: { "Content-Type": type }, body }
  );
  return uploaded.document._id;
}

function toDocument(member, imageAssetId) {
  return {
    _id: documentId(member),
    _type: "teamMemberProfile",
    name: member.name,
    role: member.role,
    section: member.section || "core",
    subteam: member.subteam || undefined,
    isLead: !!member.is_lead,
    teamYear: member.team_year || "current",
    displayOrder: member.display_order ?? 0,
    isPublic: true,
    wordsToLiveBy: member.words_to_live_by || undefined,
    ...(imageAssetId
      ? {
          photo: {
            _type: "image",
            asset: { _type: "reference", _ref: imageAssetId },
          },
        }
      : {}),
    links: {
      twitter: member.twitter_url || undefined,
      linkedin: member.linkedin_url || undefined,
      portfolio: member.portfolio_url || undefined,
    },
    music: {
      name: member.spotify_track_name || undefined,
      artist: member.spotify_track_artist || undefined,
      url: member.spotify_track_url || undefined,
    },
  };
}

async function main() {
  if (!PROJECT_ID) {
    console.error("NEXT_PUBLIC_SANITY_PROJECT_ID is not set.");
    process.exit(1);
  }
  if (commit && !TOKEN) {
    console.error("SANITY_WRITE_TOKEN is required to commit.");
    process.exit(1);
  }
  if (!commit) console.log("DRY RUN. Re-run with --commit to write.\n");

  const res = await fetch(`${AUTH_API_URL}/team`);
  if (!res.ok) {
    console.error(`Could not read the roster: ${res.status}`);
    process.exit(1);
  }
  const payload = await res.json();
  const roster = payload.members || payload.data?.members || payload.data || [];
  console.log(`${roster.length} members on the roster.`);

  const withoutPhoto = roster.filter((m) => !m.image_url).map((m) => m.name);
  if (withoutPhoto.length > 0) {
    console.log(
      `\nNo photograph (the team page requires one):\n  ${withoutPhoto.join("\n  ")}`
    );
  }

  if (!commit) {
    console.log("\nWould write:");
    for (const m of roster) {
      console.log(`  ${documentId(m)}  ${m.name} (${m.role}, ${m.team_year})`);
    }
    console.log("\n(dry run, nothing written)");
    return;
  }

  const mutations = [];
  for (const member of roster) {
    let assetId;
    if (member.image_url) {
      try {
        assetId = await uploadImage(
          member.image_url,
          `${slugify(member.name)}.jpg`
        );
      } catch (err) {
        console.error(`  image failed for ${member.name}: ${err.message}`);
      }
    }
    mutations.push({ createOrReplace: toDocument(member, assetId) });
    console.log(`  prepared ${member.name}`);
  }

  await sanity(`data/mutate/${DATASET}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mutations }),
  });
  console.log(`\nWrote ${mutations.length} documents.`);
}

main().catch((err) => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});
