import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fetchLatestLivestream, STREAMS_URL, TITLE_NEEDLE } from "../lib/harvest-livestream.mjs";

const OUT_FILE = new URL("../data/harvest_livestream.json", import.meta.url);
const FALLBACK = {
  videoId: "D2WL9ARHLcg",
  title: "Harvest Sunday Service | 09/06/2026 | New Things",
  url: "https://www.youtube.com/watch?v=D2WL9ARHLcg",
  channelUrl: STREAMS_URL,
  matchedTitleWords: TITLE_NEEDLE,
  source: "fallback",
  serviceDate: "2026-09-06",
  updatedAt: "2026-09-11T00:00:00.000Z",
};

async function currentOrFallback() {
  try {
    return JSON.parse(await readFile(OUT_FILE, "utf8"));
  } catch {
    return FALLBACK;
  }
}

async function main() {
  await mkdir(new URL("../data", import.meta.url), { recursive: true });

  try {
    const latest = await fetchLatestLivestream();
    await writeFile(OUT_FILE, `${JSON.stringify(latest, null, 2)}\n`);
    console.log(`Selected Harvest livestream: ${latest.title} (${latest.videoId})`);
  } catch (error) {
    const fallback = await currentOrFallback();
    const source = String(fallback.source || "cached").replace(/-cached$/, "");
    await writeFile(
      OUT_FILE,
      `${JSON.stringify({ ...fallback, source: `${source}-cached` }, null, 2)}\n`,
    );
    console.warn(`Could not refresh Harvest livestream: ${error.message}`);
  }
}

await main();
