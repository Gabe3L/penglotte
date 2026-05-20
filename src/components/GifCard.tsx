import type { GifItem } from "../types/gif";

type GifCardProps = {
  gif: GifItem;
  actionLabel: string;
  actionState?: "saved" | "default";
  sourceLabel: string;
  onOpen: (gif: GifItem) => void;
  onAction: (gif: GifItem) => void;
  reorderControls?: {
    canMoveUp: boolean;
    canMoveDown: boolean;
    onMoveUp: () => void;
    onMoveDown: () => void;
  };
};

export function GifCard({
  gif,
  actionLabel,
  actionState = "default",
  sourceLabel,
  onOpen,
  onAction,
  reorderControls,
}: GifCardProps) {
  return (
    <article className={`gif-card ${reorderControls ? "favorite-card" : ""}`}>
      <button
        type="button"
        className="gif-button"
        onClick={() => onOpen(gif)}
        aria-label={`Open ${gif.title}`}
      >
        <img
          src={gif.previewUrl}
          alt={gif.title}
          loading="lazy"
          style={{ aspectRatio: `${gif.width} / ${gif.height}` }}
        />
      </button>
      <div className="gif-meta">
        <div>
          <h3>{gif.title}</h3>
          <p>{sourceLabel}</p>
        </div>
        <button
          type="button"
          className={actionState === "saved" ? "saved" : ""}
          onClick={() => onAction(gif)}
        >
          {actionLabel}
        </button>
      </div>
      {reorderControls ? (
        <div className="reorder-row">
          <button
            type="button"
            onClick={reorderControls.onMoveUp}
            disabled={!reorderControls.canMoveUp}
          >
            Up
          </button>
          <button
            type="button"
            onClick={reorderControls.onMoveDown}
            disabled={!reorderControls.canMoveDown}
          >
            Down
          </button>
        </div>
      ) : null}
    </article>
  );
}
