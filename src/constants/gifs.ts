import type { GifItem } from "../types/gif";

export const STORAGE_KEY = "penglotte:favorites";
export const PAGE_SIZE = 18;
export const TRENDING_TERMS = ["dancing", "sleepy", "hug", "chaos", "happy"];
export const RANDOM_OFFSET_WINDOW = 120;

export const fallbackGifs: GifItem[] = [
  {
    id: "fallback-1",
    title: "Dancing penguin",
    url: "https://media4.giphy.com/media/l0ErFafpUCQTQFMSk/giphy.gif",
    previewUrl: "https://media4.giphy.com/media/l0ErFafpUCQTQFMSk/giphy.gif",
    width: 498,
    height: 373,
    source: "GIPHY fallback",
  },
  {
    id: "fallback-2",
    title: "Happy penguin hop",
    url: "https://media1.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif",
    previewUrl: "https://media1.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif",
    width: 498,
    height: 280,
    source: "GIPHY fallback",
  },
  {
    id: "fallback-3",
    title: "Penguin wave",
    url: "https://media0.giphy.com/media/xUA7b4arnbo3THfzi0/giphy.gif",
    previewUrl: "https://media0.giphy.com/media/xUA7b4arnbo3THfzi0/giphy.gif",
    width: 220,
    height: 220,
    source: "GIPHY fallback",
  },
  {
    id: "fallback-4",
    title: "Tiny penguin slide",
    url: "https://media2.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",
    previewUrl: "https://media2.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",
    width: 498,
    height: 280,
    source: "GIPHY fallback",
  },
  {
    id: "fallback-5",
    title: "Sleepy penguin",
    url: "https://media3.giphy.com/media/l2JHRhAtnJSDNJ2py/giphy.gif",
    previewUrl: "https://media3.giphy.com/media/l2JHRhAtnJSDNJ2py/giphy.gif",
    width: 498,
    height: 372,
    source: "GIPHY fallback",
  },
  {
    id: "fallback-6",
    title: "Penguin squad",
    url: "https://media1.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif",
    previewUrl: "https://media1.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif",
    width: 498,
    height: 280,
    source: "GIPHY fallback",
  },
];
