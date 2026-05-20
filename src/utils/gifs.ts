import {
  fallbackGifs,
  PAGE_SIZE,
  RANDOM_OFFSET_WINDOW,
  TRENDING_TERMS,
} from "../constants/gifs";
import type { GifItem, GiphyResponse } from "../types/gif";

export function shuffleItems<T>(items: T[]) {
  const next = [...items];

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }

  return next;
}

export function getRandomPenguinTerm() {
  return TRENDING_TERMS[Math.floor(Math.random() * TRENDING_TERMS.length)];
}

export function normalizeGif(item: GiphyResponse["data"][number]): GifItem | null {
  const images = item.images;
  if (!images) {
    return null;
  }

  const preferred = images.original ?? images.downsized ?? images.fixed_width;
  const preview =
    images.fixed_width ??
    images.fixed_height ??
    images.preview_gif ??
    preferred;

  if (!preferred?.url || !preview?.url) {
    return null;
  }

  const width = Number(preferred.width ?? preview.width ?? "320");
  const height = Number(preferred.height ?? preview.height ?? "320");

  return {
    id: item.id,
    title: item.title?.replace(/[-_]/g, " ").trim() || "Penguin energy",
    url: preferred.url,
    previewUrl: preview.url,
    width,
    height,
    source: item.source_tld || item.bitly_url || item.url || "GIPHY",
  };
}

export async function fetchPenguinBatch(options: {
  apiKey?: string;
  requestedTerm: string;
  cursor?: string | null;
  randomSeedTerm?: string;
}) {
  const { apiKey, requestedTerm, cursor, randomSeedTerm } = options;

  if (!apiKey) {
    const base = requestedTerm
      ? fallbackGifs.filter((gif) =>
          `${gif.title} ${gif.source}`
            .toLowerCase()
            .includes(requestedTerm.toLowerCase()),
        )
      : fallbackGifs;
    const rotated = requestedTerm
      ? base
      : shuffleItems([...base, ...base]).slice(0, PAGE_SIZE);

    return {
      incoming: rotated,
      nextCursor: null,
      notice:
        "Using the built-in GIPHY penguin stash until a GIPHY API key is added.",
    };
  }

  const term = requestedTerm || randomSeedTerm || getRandomPenguinTerm();
  const offset = cursor
    ? Number(cursor)
    : requestedTerm
      ? 0
      : Math.floor(Math.random() * RANDOM_OFFSET_WINDOW);
  const params = new URLSearchParams({
    api_key: apiKey,
    limit: String(PAGE_SIZE),
    offset: String(offset),
    rating: "g",
    bundle: "messaging_non_clips",
  });

  const endpoint = "https://api.giphy.com/v1/gifs/search";
  params.set("q", `${requestedTerm || term} penguin`.trim());

  const response = await fetch(`${endpoint}?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`GIPHY request failed with ${response.status}`);
  }

  const data = (await response.json()) as GiphyResponse;
  const nextOffset =
    (data.pagination?.offset ?? offset) + (data.pagination?.count ?? 0);
  const totalCount = data.pagination?.total_count ?? nextOffset;

  return {
    incoming: data.data
      .map(normalizeGif)
      .filter((gif): gif is GifItem => Boolean(gif)),
    nextCursor: nextOffset < totalCount ? String(nextOffset) : null,
    notice: "",
  };
}
