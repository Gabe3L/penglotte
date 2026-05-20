import { useEffect, useState } from "react";
import { STORAGE_KEY } from "../constants/gifs";
import type { GifItem } from "../types/gif";

function readFavorites() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as GifItem[]) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<GifItem[]>(() => readFavorites());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(gif: GifItem) {
    let message = "";

    setFavorites((current) => {
      if (current.some((item) => item.id === gif.id)) {
        message = "Removed from favorites.";
        return current.filter((item) => item.id !== gif.id);
      }

      message = "Saved to favorites.";
      return [gif, ...current];
    });

    return message;
  }

  function moveFavorite(id: string, direction: "up" | "down") {
    setFavorites((current) => {
      const index = current.findIndex((item) => item.id === id);
      if (index === -1) {
        return current;
      }

      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= current.length) {
        return current;
      }

      const next = [...current];
      const [item] = next.splice(index, 1);
      next.splice(target, 0, item);
      return next;
    });
  }

  return {
    favorites,
    moveFavorite,
    toggleFavorite,
  };
}
