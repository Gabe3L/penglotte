import type { GifItem } from "../types/gif";

type GifModalProps = {
  gif: GifItem;
  isSaved: boolean;
  onClose: () => void;
  onShare: (gif: GifItem) => void;
  onToggleFavorite: (gif: GifItem) => void;
};

export function GifModal({
  gif,
  isSaved,
  onClose,
  onShare,
  onToggleFavorite,
}: GifModalProps) {
  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={gif.title}
      onClick={onClose}
    >
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <img src={gif.url} alt={gif.title} />
        <div className="modal-actions">
          <div>
            <h3>{gif.title}</h3>
            <p>Share it, save it, or just appreciate the penguin commitment.</p>
          </div>
          <div className="button-stack">
            <button type="button" onClick={() => onShare(gif)}>
              Share
            </button>
            <button type="button" onClick={() => onToggleFavorite(gif)}>
              {isSaved ? "Unsave" : "Save"}
            </button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
