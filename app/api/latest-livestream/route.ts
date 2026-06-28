import fallbackLivestream from "@/data/harvest_livestream.json";

const CHANNEL_ID = "UCgWXzSt9GyMkmYnzII75SGA";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const STREAMS_URL = "https://www.youtube.com/@harvestinthecity/streams";
const TITLE_NEEDLE = "harvest sunday service";
const REVALIDATE_SECONDS = 15 * 60;

type HarvestLivestream = {
  videoId: string;
  title: string;
  url: string;
  channelUrl: string;
  matchedTitleWords: string;
  source: string;
  serviceDate: string;
  updatedAt: string;
  publishedAt?: string;
};

export const revalidate = 900;

function decodeXml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function textBetween(xml: string, tag: string) {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return match ? decodeXml(match[1].trim()) : "";
}

function serviceDateFromTitle(title: string) {
  const match = title.match(/\b(\d{1,2})\/(\d{1,2})\/(\d{2,4})\b/);
  if (!match) return "";

  const month = Number(match[1]);
  const day = Number(match[2]);
  const rawYear = Number(match[3]);
  const year = rawYear < 100 ? 2000 + rawYear : rawYear;
  if (!month || !day || month > 12 || day > 31) return "";

  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseEntries(feed: string): HarvestLivestream[] {
  return [...feed.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    .map(([, entry]) => {
      const videoId = textBetween(entry, "yt:videoId");
      const title = textBetween(entry, "title");
      const updatedAt = textBetween(entry, "updated");
      const publishedAt = textBetween(entry, "published");
      return {
        videoId,
        title,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        channelUrl: STREAMS_URL,
        matchedTitleWords: TITLE_NEEDLE,
        source: "youtube-feed",
        serviceDate: serviceDateFromTitle(title),
        updatedAt,
        publishedAt,
      };
    })
    .filter((entry) => {
      return entry.videoId && entry.title.toLowerCase().includes(TITLE_NEEDLE);
    });
}

function sortKey(entry: HarvestLivestream) {
  return entry.serviceDate || entry.publishedAt || entry.updatedAt || "";
}

function unique(items: string[]) {
  return [...new Set(items)];
}

function parseStreamsPageOrder(html: string) {
  return unique([...html.matchAll(/"videoId":"([^"]+)"/g)].map(([, videoId]) => videoId));
}

async function fetchLatestLivestream() {
  const feedResponse = await fetch(FEED_URL, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!feedResponse.ok) {
    throw new Error(`YouTube feed returned ${feedResponse.status}`);
  }

  const feed = await feedResponse.text();
  const entries = parseEntries(feed);
  const byVideoId = new Map(entries.map((entry) => [entry.videoId, entry]));

  const streamsResponse = await fetch(STREAMS_URL, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  const streamsPage = streamsResponse.ok ? await streamsResponse.text() : "";
  const orderedVideoIds = parseStreamsPageOrder(streamsPage);

  const latestFromPage = orderedVideoIds
    .map((videoId) => byVideoId.get(videoId))
    .find(Boolean);

  const latest =
    latestFromPage || entries.sort((a, b) => sortKey(b).localeCompare(sortKey(a)))[0];
  if (!latest) throw new Error(`No video title contained "${TITLE_NEEDLE}"`);

  return latest;
}

export async function GET() {
  try {
    const latest = await fetchLatestLivestream();
    return Response.json(latest, {
      headers: {
        "Cache-Control": `s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
      },
    });
  } catch {
    return Response.json(
      { ...fallbackLivestream, source: `${fallbackLivestream.source || "fallback"}-fallback` },
      {
        headers: {
          "Cache-Control": "s-maxage=300, stale-while-revalidate=3600",
        },
      },
    );
  }
}
