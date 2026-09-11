// Shared logic for finding the latest Harvest Sunday livestream on YouTube.
//
// YouTube's public channel RSS feed (/feeds/videos.xml) started returning 404
// in 2026, so the channel's public "Live" tab is now the primary source. The
// page embeds each stream's video ID and title in its initial data, newest
// first, with any in-progress stream at the top. If the page markup changes and
// titles can't be found, the public oEmbed endpoint (no API key) fills them in.

export const CHANNEL_ID = "UCgWXzSt9GyMkmYnzII75SGA";
export const STREAMS_URL = "https://www.youtube.com/@harvestinthecity/streams";
export const TITLE_NEEDLE = "harvest sunday service";

const MAX_CANDIDATES = 12;
const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
};

/**
 * @typedef {object} HarvestLivestream
 * @property {string} videoId
 * @property {string} title
 * @property {string} url
 * @property {string} channelUrl
 * @property {string} matchedTitleWords
 * @property {string} source
 * @property {string} serviceDate ISO date parsed from the title, or "" if none.
 * @property {string} updatedAt ISO timestamp of when this record was produced.
 * @property {boolean} [isLive] True when YouTube reports the stream in progress.
 * @property {string} [streamedText] YouTube's relative label, e.g. "Streamed 4 days ago".
 */

function decodeJsonString(raw) {
  try {
    return JSON.parse(`"${raw}"`);
  } catch {
    return raw;
  }
}

export function serviceDateFromTitle(title) {
  const match = title.match(/\b(\d{1,2})\/(\d{1,2})\/(\d{2,4})\b/);
  if (!match) return "";

  const month = Number(match[1]);
  const day = Number(match[2]);
  const rawYear = Number(match[3]);
  const year = rawYear < 100 ? 2000 + rawYear : rawYear;
  if (!month || !day || month > 12 || day > 31) return "";

  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function unique(items) {
  return [...new Set(items)];
}

/**
 * Pull `{ videoId, title, streamedText, isLive }` entries out of the streams
 * page HTML, in page order. Each video "lockup" in YouTube's initial data
 * carries its title shortly before its content ID, so we pair every content ID
 * with the closest preceding title that hasn't already been claimed.
 *
 * @param {string} html
 */
export function parseStreamsPage(html) {
  const titlePattern =
    /"lockupMetadataViewModel":\{"title":\{"content":"((?:[^"\\]|\\.)*)"/g;
  const idPattern = /"contentId":"([A-Za-z0-9_-]{11})"/g;
  const statusPattern =
    /"content":"((?:Streamed|Started|Scheduled|Premiered?)[^"]*|[\d,.]+[^"]*watching[^"]*)"/g;

  const titles = [...html.matchAll(titlePattern)].map((m) => ({
    index: m.index ?? 0,
    title: decodeJsonString(m[1]),
  }));
  const statuses = [...html.matchAll(statusPattern)].map((m) => ({
    index: m.index ?? 0,
    text: decodeJsonString(m[1]),
  }));

  const entries = [];
  const seen = new Set();
  let cursor = 0;
  for (const match of html.matchAll(idPattern)) {
    const videoId = match[1];
    const index = match.index ?? 0;
    if (seen.has(videoId)) continue;

    const title = titles.filter((t) => t.index >= cursor && t.index < index).at(-1);
    const status = statuses
      .filter((s) => s.index >= (title?.index ?? cursor) && s.index < index + 6000)
      .at(0);
    cursor = index;
    seen.add(videoId);

    const streamedText = status?.text ?? "";
    entries.push({
      videoId,
      title: title?.title ?? "",
      streamedText,
      isLive: /watching/i.test(streamedText),
    });
  }

  // If the page no longer includes any recognizable lockups, fall back to the
  // raw video IDs in page order so oEmbed can still fill in the titles.
  if (entries.length === 0) {
    const ids = unique([...html.matchAll(/"videoId":"([A-Za-z0-9_-]{11})"/g)].map((m) => m[1]));
    return ids.map((videoId) => ({ videoId, title: "", streamedText: "", isLive: false }));
  }

  return entries;
}

async function fetchOembedTitle(videoId, fetchOptions) {
  const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(
    `https://www.youtube.com/watch?v=${videoId}`,
  )}&format=json`;
  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) return "";
    const data = await response.json();
    return typeof data.title === "string" ? data.title : "";
  } catch {
    return "";
  }
}

/**
 * Find the newest Harvest Sunday service stream (live or completed).
 *
 * @param {{ fetchOptions?: RequestInit }} [options] Extra fetch options, e.g. Next.js
 *   revalidation hints.
 * @returns {Promise<HarvestLivestream>}
 */
export async function fetchLatestLivestream(options = {}) {
  const fetchOptions = { ...options.fetchOptions, headers: FETCH_HEADERS };

  const response = await fetch(STREAMS_URL, fetchOptions);
  if (!response.ok) {
    throw new Error(`YouTube streams page returned ${response.status}`);
  }

  const candidates = parseStreamsPage(await response.text()).slice(0, MAX_CANDIDATES);
  if (candidates.length === 0) {
    throw new Error("No videos found on the YouTube streams page");
  }

  let source = "youtube-streams-page";
  for (const candidate of candidates) {
    if (!candidate.title) {
      candidate.title = await fetchOembedTitle(candidate.videoId, fetchOptions);
      source = "youtube-streams-page+oembed";
    }
    if (!candidate.title.toLowerCase().includes(TITLE_NEEDLE)) continue;

    return {
      videoId: candidate.videoId,
      title: candidate.title,
      url: `https://www.youtube.com/watch?v=${candidate.videoId}`,
      channelUrl: STREAMS_URL,
      matchedTitleWords: TITLE_NEEDLE,
      source,
      serviceDate: serviceDateFromTitle(candidate.title),
      updatedAt: new Date().toISOString(),
      isLive: candidate.isLive,
      streamedText: candidate.streamedText,
    };
  }

  throw new Error(
    `None of the first ${candidates.length} streams had a title containing "${TITLE_NEEDLE}"`,
  );
}
