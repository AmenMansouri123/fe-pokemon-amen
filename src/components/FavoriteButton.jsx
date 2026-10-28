
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const FavoritesContext = createContext(null);
const STORAGE_KEY = "pokemon-favorites";

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(favorites)
    );
  }, [favorites]);

  function toggleFavorite(pokemon) {
    setFavorites((current) => {
      const exists = current.some(
        (item) => item.name === pokemon.name
      );

      if (exists) {
        return current.filter(
          (item) => item.name !== pokemon.name
        );
      }

      return [...current, pokemon];
    });
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites requires FavoritesProvider");
  }

  return context;
}


function FavoriteButton({ pokemon, favorites, onToggle }) {
  const isFavorite = favorites.some(
    (item) => item.name === pokemon.name
  );

  return (
    <button
      type="button"
      className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onToggle(pokemon);
      }}
      aria-label={
        isFavorite
          ? `Remove ${pokemon.name} from favorites`
          : `Add ${pokemon.name} to favorites`
      }
      aria-pressed={isFavorite}
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}

export default FavoriteButton;
