import { Link } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";
import { useFavorites } from "../context/FavoritesContext";

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="favorites-page">
      <p className="pokedex-label">❤️ MY COLLECTION</p>
      <h1>Favorite Pokémon</h1>
      <p>Your personal Pokémon collection.</p>

      <div className="favorites-count">
        ❤️ {favorites.length} Favorites
      </div>

      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <h2>No Favorites Yet</h2>
          <p>Explore the Pokédex and save your favorite Pokémon.</p>
          <Link to="/list" className="home-button">
            Explore Pokémon
          </Link>
        </div>
      ) : (
        <div className="pokemon-grid">
          {favorites.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              image={pokemon.image}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
