import { NextResponse } from "next/server";
import {
  fallbackMusic,
  normalizeRecentTracks,
  type MusicData,
} from "@/data/music";

// Run per request so now-playing stays fresh and missing-env is detected at
// request time, not build time. Freshness is paced by the client poll interval.
export const dynamic = "force-dynamic";

const ENDPOINT = "https://ws.audioscrobbler.com/2.0/";

function fallback(): NextResponse {
  return NextResponse.json(fallbackMusic, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function GET() {
  const apiKey = process.env.LASTFM_API_KEY;
  const user = process.env.LASTFM_USERNAME;

  // No credentials yet — serve the static fallback so the page still renders.
  if (!apiKey || !user) return fallback();

  try {
    const url =
      `${ENDPOINT}?method=user.getrecenttracks` +
      `&user=${encodeURIComponent(user)}` +
      `&api_key=${encodeURIComponent(apiKey)}` +
      `&format=json&limit=8`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Last.fm responded ${res.status}`);

    const data: MusicData = normalizeRecentTracks(await res.json());
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    // Network error, bad key, or unparseable body — degrade quietly.
    return fallback();
  }
}
