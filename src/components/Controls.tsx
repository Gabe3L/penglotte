import type { FormEvent } from "react";

type ControlsProps = {
  activeTab: "discover" | "favorites";
  inputValue: string;
  onInputChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onTabChange: (tab: "discover" | "favorites") => void;
};

export function Controls({
  activeTab,
  inputValue,
  onInputChange,
  onSubmit,
  onTabChange,
}: ControlsProps) {
  return (
    <section className="control-panel">
      <form className="search-form" onSubmit={onSubmit}>
        <label className="search-label" htmlFor="gif-search">
          Search a vibe
        </label>
        <div className="search-row">
          <input
            id="gif-search"
            value={inputValue}
            onChange={(event) => onInputChange(event.target.value)}
            placeholder="dancing, sleepy, dramatic..."
            autoComplete="off"
          />
          <button type="submit">Find penguins</button>
        </div>
      </form>

      <div className="tab-row" role="tablist" aria-label="Sections">
        <button
          type="button"
          className={activeTab === "discover" ? "active" : ""}
          onClick={() => onTabChange("discover")}
        >
          Discover
        </button>
        <button
          type="button"
          className={activeTab === "favorites" ? "active" : ""}
          onClick={() => onTabChange("favorites")}
        >
          Favorites
        </button>
      </div>
    </section>
  );
}
