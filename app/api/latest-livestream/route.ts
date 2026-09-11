import fallbackLivestream from "@/data/harvest_livestream.json";
import { fetchLatestLivestream } from "@/lib/harvest-livestream.mjs";

const REVALIDATE_SECONDS = 15 * 60;

export const revalidate = 900;

export async function GET() {
  try {
    const latest = await fetchLatestLivestream({
      fetchOptions: { next: { revalidate: REVALIDATE_SECONDS } },
    });
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
