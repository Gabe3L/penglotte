import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import "./App.css";
import { Controls } from "./components/Controls";
import { DiscoverSection } from "./components/DiscoverSection";
import { FavoritesSection } from "./components/FavoritesSection";
import { GifModal } from "./components/GifModal";
import { HeroSection } from "./components/HeroSection";
import { useFavorites } from "./hooks/useFavorites";
import type { GifItem } from "./types/gif";
import { fetchPenguinBatch, getRandomPenguinTerm } from "./utils/gifs";

function App() {
  const apiKey = import.meta.env.VITE_GIPHY_API_KEY?.trim();
  const [activeTab, setActiveTab] = useState<"discover" | "favorites">(
    "discover",
  );
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [gifs, setGifs] = useState<GifItem[]>([]);
  const { favorites, moveFavorite, toggleFavorite } = useFavorites();
  const [selectedGif, setSelectedGif] = useState<GifItem | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const hasBootedRef = useRef(false);

  const favoriteIds = useMemo(
    () => new Set(favorites.map((gif) => gif.id)),
    [favorites],
  );
  const discoverTitle = searchTerm
    ? `${searchTerm} penguin`
    : "Random Penguin GIFs";

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  useEffect(() => {
    if (hasBootedRef.current) {
      return;
    }

    hasBootedRef.current = true;
    const timeout = window.setTimeout(() => {
      void (async () => {
        setIsLoading(true);
        setError("");

        try {
          const result = await fetchPenguinBatch({
            apiKey,
            requestedTerm: "",
            randomSeedTerm: getRandomPenguinTerm(),
          });
          setGifs(result.incoming);
          setNextCursor(result.nextCursor);
          if (result.notice) {
            setNotice(result.notice);
          }
        } catch (fetchError) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : "The penguins hit some rough weather.",
          );
        } finally {
          setIsLoading(false);
        }
      })();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [apiKey]);

  useEffect(() => {
    const node = loaderRef.current;
    if (!node || activeTab !== "discover") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && nextCursor && !isLoading) {
          void (async () => {
            setIsLoading(true);
            setError("");

            try {
              const result = await fetchPenguinBatch({
                apiKey,
                requestedTerm: searchTerm,
                cursor: nextCursor,
              });
              setGifs((current) => [...current, ...result.incoming]);
              setNextCursor(result.nextCursor);
            } catch (fetchError) {
              setError(
                fetchError instanceof Error
                  ? fetchError.message
                  : "The penguins hit some rough weather.",
              );
            } finally {
              setIsLoading(false);
            }
          })();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [activeTab, apiKey, isLoading, nextCursor, searchTerm]);

  useEffect(() => {
    if (!notice) {
      return;
    }

    const timeout = window.setTimeout(() => setNotice(""), 2200);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  function handleToggleFavorite(gif: GifItem) {
    setNotice(toggleFavorite(gif));
  }

  async function shareGif(gif: GifItem) {
    try {
      if (navigator.share) {
        await navigator.share({
          title: gif.title,
          text: "A penguin GIF for you",
          url: gif.url,
        });
        return;
      }

      await navigator.clipboard.writeText(gif.url);
      setNotice("GIF link copied.");
    } catch {
      setNotice("Share was cancelled.");
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextTerm = inputValue.trim();
    setSearchTerm(nextTerm);
    void (async () => {
      setIsLoading(true);
      setError("");

      try {
        const result = await fetchPenguinBatch({
          apiKey,
          requestedTerm: nextTerm,
        });
        setGifs(result.incoming);
        setNextCursor(result.nextCursor);
        if (result.notice) {
          setNotice(result.notice);
        } else if (!result.incoming.length) {
          setNotice("The colony is scouting...");
        }
      } catch (fetchError) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "The penguins hit some rough weather.",
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }

  return (
    <div className="app-shell">
      <HeroSection gifCount={gifs.length} favoritesCount={favorites.length} />

      <main className="content-shell">
        <Controls
          activeTab={activeTab}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSubmit={onSubmit}
          onTabChange={setActiveTab}
        />

        {notice ? <p className="notice-banner">{notice}</p> : null}
        {error ? <p className="error-banner">{error}</p> : null}

        {activeTab === "discover" ? (
          <DiscoverSection
            gifs={gifs}
            discoverTitle={discoverTitle}
            favoriteIds={favoriteIds}
            isLoading={isLoading}
            nextCursor={nextCursor}
            loaderRef={loaderRef}
            onOpenGif={setSelectedGif}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : (
          <FavoritesSection
            favorites={favorites}
            onOpenGif={setSelectedGif}
            onToggleFavorite={handleToggleFavorite}
            onMoveFavorite={moveFavorite}
          />
        )}
      </main>

      {selectedGif ? (
        <GifModal
          gif={selectedGif}
          isSaved={favoriteIds.has(selectedGif.id)}
          onClose={() => setSelectedGif(null)}
          onShare={shareGif}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : null}
    </div>
  );
}

export default App;
