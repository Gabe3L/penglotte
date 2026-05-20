type HeroSectionProps = {
  gifCount: number;
  favoritesCount: number;
};

export function HeroSection({
  gifCount,
  favoritesCount,
}: HeroSectionProps) {
  return (
    <header className="hero-panel">
      <div className="hero-copy">
        <p className="eyebrow">Penglotte</p>
        <h1>PENGLOTTE</h1>
        <p className="hero-text pt-2">The Best Penguin GIF App of ALL TIME!</p>
      </div>

      <div className="hero-card">
        <div className="iceberg">
          <div className="penguin-avatar" aria-hidden="true">
            <span className="eye left"></span>
            <span className="eye right"></span>
            <span className="beak"></span>
            <span className="belly"></span>
          </div>
        </div>
        <div className="hero-stats">
          <div>
            <strong>{gifCount}</strong>
            <span>on deck</span>
          </div>
          <div>
            <strong>{favoritesCount}</strong>
            <span>favorites</span>
          </div>
        </div>
      </div>
    </header>
  );
}
