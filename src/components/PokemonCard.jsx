import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import { useFavorites } from "../context/FavoritesContext";

function PokemonCard({ name, image }) {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="pokemon-card">

      <FavoriteButton
        pokemon={{ name, image }}
        favorites={favorites}
        onToggle={toggleFavorite}
      />

      <Link to={`/detail/${name}`}>
        <img src={image} alt={name} />
        <h3>{name}</h3>
      </Link>

    </div>
  );
}

export default PokemonCard;
