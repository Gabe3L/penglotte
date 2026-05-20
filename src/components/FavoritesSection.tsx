import { GifCard } from "./GifCard";
import type { GifItem } from "../types/gif";

type FavoritesSectionProps = {
  favorites: GifItem[];
  onOpenGif: (gif: GifItem) => void;
  onToggleFavorite: (gif: GifItem) => void;
  onMoveFavorite: (id: string, direction: "up" | "down") => void;
};

export function FavoritesSection({
  favorites,
  onOpenGif,
  onToggleFavorite,
  onMoveFavorite,
}: FavoritesSectionProps) {
  return (
    <section className="feed-section">
      <div className="section-heading">
        <div>
          <p className="mini-label">Saved Penguins</p>
          <h2>Your Favorites:</h2>
        </div>
        <span className="status-chip">{favorites.length} saved</span>
      </div>

      {favorites.length ? (
        <div className="gif-grid">
          {favorites.map((gif, index) => (
            <GifCard
              key={gif.id}
              gif={gif}
              actionLabel="Remove"
              actionState="saved"
              sourceLabel="Saved for later"
              onOpen={onOpenGif}
              onAction={onToggleFavorite}
              reorderControls={{
                canMoveUp: index > 0,
                canMoveDown: index < favorites.length - 1,
                onMoveUp: () => onMoveFavorite(gif.id, "up"),
                onMoveDown: () => onMoveFavorite(gif.id, "down"),
              }}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No favorites yet.</p>
          <span>Save a couple cute penguins and they’ll hangout here.</span>
        </div>
      )}
    </section>
  );
}
