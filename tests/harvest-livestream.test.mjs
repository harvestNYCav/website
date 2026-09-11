import test from "node:test";
import assert from "node:assert/strict";
import { parseStreamsPage, serviceDateFromTitle } from "../lib/harvest-livestream.mjs";

// Minimal imitation of the YouTube streams page's initial data: each video
// "lockup" lists its title before its content ID, and the tab is ordered
// newest first with any in-progress stream at the top.
function lockup({ videoId, title, status }) {
  return (
    // YouTube escapes "&" as "\u0026" inside its embedded JSON.
    `{"lockupViewModel":{"metadata":{"lockupMetadataViewModel":{"title":{"content":${JSON.stringify(title).replace(/&/g, "\\u0026")}},` +
    `"metadata":{"contentMetadataViewModel":{"metadataRows":[{"metadataParts":[{"text":{"content":"45 views"}},` +
    `{"text":{"content":${JSON.stringify(status)}}}]}]}}}},"contentId":${JSON.stringify(videoId)},` +
    `"contentType":"LOCKUP_CONTENT_TYPE_VIDEO"}}`
  );
}

const page = [
  lockup({ videoId: "LIVE0000001", title: "Harvest Sunday Service | 09/13/2026 | Live & Now", status: "312 watching" }),
  lockup({ videoId: "SPECIAL0001", title: "Harvest Special | Father's Day Performance (2026)", status: "Streamed 2 months ago" }),
  lockup({ videoId: "SUNDAY00001", title: "Harvest Sunday Service | 8/23/2026 | Warnings", status: "Streamed 2 weeks ago" }),
].join(",");

test("parseStreamsPage pairs each video ID with its own title and status", () => {
  const entries = parseStreamsPage(page);
  assert.deepEqual(
    entries.map(({ videoId, title, streamedText, isLive }) => ({ videoId, title, streamedText, isLive })),
    [
      { videoId: "LIVE0000001", title: "Harvest Sunday Service | 09/13/2026 | Live & Now", streamedText: "312 watching", isLive: true },
      { videoId: "SPECIAL0001", title: "Harvest Special | Father's Day Performance (2026)", streamedText: "Streamed 2 months ago", isLive: false },
      { videoId: "SUNDAY00001", title: "Harvest Sunday Service | 8/23/2026 | Warnings", streamedText: "Streamed 2 weeks ago", isLive: false },
    ],
  );
});

test("parseStreamsPage falls back to bare video IDs when lockups are missing", () => {
  const entries = parseStreamsPage('{"videoId":"AAAAAAAAAAA"},{"videoId":"BBBBBBBBBBB"},{"videoId":"AAAAAAAAAAA"}');
  assert.deepEqual(entries.map((e) => e.videoId), ["AAAAAAAAAAA", "BBBBBBBBBBB"]);
  assert.equal(entries[0].title, "");
});

test("serviceDateFromTitle handles two- and four-digit years", () => {
  assert.equal(serviceDateFromTitle("Harvest Sunday Service | 09/06/2026 | New Things"), "2026-09-06");
  assert.equal(serviceDateFromTitle("Harvest Sunday Service | 4/5/26 | Easter"), "2026-04-05");
  assert.equal(serviceDateFromTitle("Harvest Special | Father's Day Performance (2026)"), "");
});
