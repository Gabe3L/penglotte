import type { GifItem } from "../types/gif";

export const STORAGE_KEY = "penglotte:favorites";
export const PAGE_SIZE = 18;
export const TRENDING_TERMS = ["dancing", "sleepy", "hug", "chaos", "happy"];
export const RANDOM_OFFSET_WINDOW = 120;

export const fallbackGifs: GifItem[] = [
  {
    id: "fallback-1",
    title: "Dancing Penguin",
    url: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHByaWFwajBzeDhhY2I0ZzJmcmRueGUxZnBqcmRsOGoyd2tjeHYzbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tsMAPZ96MHPlvP6OtE/giphy.gif",
    source: "GIPHY fallback",
  },
  {
    id: "fallback-2",
    title: "Jumping Penguin",
    url: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHVnZHpuZWhjZmx5bmdiYWhld3ppcmZqNTVjajRrZXZjaTc5NG80MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LLN09WTdU0bu8moHGj/giphy.gif",
    source: "GIPHY fallback",
  },
  {
    id: "fallback-3",
    title: "Surfing Penguin",
    url: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWkxdHFueW1mMDRlczlleXJlcjRoeXM0ZTVwYjE1cTk4amg3N2JnciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/79EYtuJvBO3HeWvy4V/giphy.gif",
    source: "GIPHY fallback",
  },
  {
    id: "fallback-4",
    title: "Summer Penguin",
    url: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXE3MnVwcXd5N2N5NXRxeGJkMXQxNngxcWF1cmk4YTl5YXlnemhrMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/meyjaCxY7XAqkzlmsb/giphy.gif",
    source: "GIPHY fallback",
  },
  {
    id: "fallback-5",
    title: "Sleepy Penguin",
    url: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExampjMnZrcW9wOW9wbnNyaDVkM2lhanQxN21yZmptdWNzZ3pkbWk1biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HVdw81rJf5ynn05MEQ/giphy.gif",
    source: "GIPHY fallback",
  },
  {
    id: "fallback-6",
    title: "Team Penguin",
    url: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXVsYTNqOHJsNXZ3eWZsb3M2MG14cnBybm1jZWNieGswb29nMDBjeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BNB5ckWQ00JTTYZjIQ/giphy.gif",
    source: "GIPHY fallback",
  },
];
