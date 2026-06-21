// Music data layer. The /api/music route fetches Last.fm server-side (where the
// API key lives) and hands normalized data to the frontend through this module.
// Everything here is isomorphic (no secrets, no node-only APIs).

export type Track = {
  title: string;
  artist: string;
  album?: string;
  url?: string;
};

export type NowPlaying =
  | { isPlaying: true; track: Track; image?: string }
  | { isPlaying: false; track: Track; image?: string; playedAt: number }; // unix seconds; 0 = unknown

export type MusicData = {
  nowPlaying: NowPlaying;
  recent: Track[];
};

/* ----------------------------------------------------- Last.fm raw shapes */

type LfmText = { "#text"?: string };
type LfmImage = { size?: string; "#text"?: string };
type LfmTrack = {
  name?: string;
  url?: string;
  artist?: LfmText;
  album?: LfmText;
  image?: LfmImage[];
  date?: { uts?: string; "#text"?: string };
  "@attr"?: { nowplaying?: string };
};
export type LfmRecentTracks = {
  recenttracks?: { track?: LfmTrack | LfmTrack[] };
};

/* ------------------------------------------------------------ normalize */

function pickImage(images?: LfmImage[]): string | undefined {
  if (!images) return undefined;
  const best =
    images.find((i) => i.size === "extralarge") ??
    images.find((i) => i.size === "large");
  const url = best?.["#text"]?.trim();
  return url ? url : undefined;
}

function toTrack(t: LfmTrack): Track {
  const album = t.album?.["#text"]?.trim();
  const url = t.url?.trim();
  return {
    title: t.name?.trim() ?? "",
    artist: t.artist?.["#text"]?.trim() ?? "",
    ...(album ? { album } : {}),
    ...(url ? { url } : {}),
  };
}

/**
 * Map a `user.getRecentTracks` response to {@link MusicData}.
 *
 * The first track is the headline: live when it carries `@attr.nowplaying`,
 * otherwise the last played track (with a `date.uts` timestamp). The remaining
 * tracks become `recent`, so the headline is never duplicated in the list.
 *
 * Throws on a missing/empty track list so the caller can fall back.
 */
export function normalizeRecentTracks(raw: LfmRecentTracks): MusicData {
  const rawTracks = raw?.recenttracks?.track;
  const tracks = Array.isArray(rawTracks)
    ? rawTracks
    : rawTracks
      ? [rawTracks]
      : [];

  if (tracks.length === 0) {
    throw new Error("Last.fm response contained no recent tracks");
  }

  const [head, ...rest] = tracks;
  const track = toTrack(head);
  const image = pickImage(head.image);

  const nowPlaying: NowPlaying =
    head["@attr"]?.nowplaying === "true"
      ? { isPlaying: true, track, ...(image ? { image } : {}) }
      : {
          isPlaying: false,
          track,
          ...(image ? { image } : {}),
          playedAt: Number(head.date?.uts ?? 0) || 0,
        };

  return { nowPlaying, recent: rest.map(toTrack) };
}

/* ------------------------------------------------------------- fallback */

/** Shown when Last.fm is unavailable (missing key, network error) and as the
 *  page's initial server-render state before the client fetches live data. */
export const fallbackMusic: MusicData = {
  nowPlaying: {
    isPlaying: false,
    track: { title: "not connected", artist: "add a Last.fm key to go live" },
    playedAt: 0,
  },
  recent: [
    { title: "first favorite", artist: "some artist", album: "an album" },
    { title: "on repeat lately", artist: "another artist", album: "self-titled" },
    { title: "late-night coding", artist: "a producer", album: "after hours" },
    { title: "focus pick", artist: "ambient act", album: "drift" },
    { title: "throwback", artist: "old favorite", album: "the classic one" },
    { title: "newest find", artist: "fresh discovery", album: "debut" },
  ],
};

/* ----------------------------------------------------- client data access */

/** Client helper: fetch normalized music data from the server route. */
export async function fetchMusic(signal?: AbortSignal): Promise<MusicData> {
  const res = await fetch("/api/music", { signal });
  if (!res.ok) throw new Error(`/api/music responded ${res.status}`);
  return (await res.json()) as MusicData;
}
