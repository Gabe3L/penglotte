import type { RefObject } from "react";
import { GifCard } from "./GifCard";
import type { GifItem } from "../types/gif";

type DiscoverSectionProps = {
  gifs: GifItem[];
  discoverTitle: string;
  favoriteIds: Set<string>;
  isLoading: boolean;
  nextCursor: string | null;
  loaderRef: RefObject<HTMLDivElement | null>;
  onOpenGif: (gif: GifItem) => void;
  onToggleFavorite: (gif: GifItem) => void;
};

export function DiscoverSection({
  gifs,
  discoverTitle,
  favoriteIds,
  isLoading,
  nextCursor,
  loaderRef,
  onOpenGif,
  onToggleFavorite,
}: DiscoverSectionProps) {
  return (
    <section className="feed-section">
      <div className="section-heading">
        <div>
          <p className="mini-label">Discovery feed</p>
          <h2>{discoverTitle}</h2>
        </div>
      </div>

      <div className="gif-grid">
        {gifs.map((gif) => (
          <GifCard
            key={gif.id}
            gif={gif}
            actionLabel={favoriteIds.has(gif.id) ? "Saved" : "Save"}
            actionState={favoriteIds.has(gif.id) ? "saved" : "default"}
            sourceLabel={gif.source}
            onOpen={onOpenGif}
            onAction={onToggleFavorite}
          />
        ))}
      </div>

      <div ref={loaderRef} className="load-state">
        {isLoading
          ? "Gathering more penguins..."
          : nextCursor
            ? "Scroll for more"
            : "End of the ice floe"}
      </div>
    </section>
  );
}
