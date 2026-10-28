
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import PokemonStats from "../components/PokemonStats";
import LoadingScreen from "../components/LoadingScreen";
import ErrorMessage from "../components/ErrorMessage";

function Detail() {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  // Pokemon ophalen uit PokéAPI
  useEffect(() => {
    const controller = new AbortController();

    async function fetchPokemon() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(id)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Pokemon niet gevonden");
        }

        const data = await response.json();

        if (!controller.signal.aborted) {
          setPokemon(data);
          setError("");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Pokemon kon niet geladen worden.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPokemon();

    return () => controller.abort();
  }, [id, retryCount]);

  // Opnieuw proberen
  function retryPokemon() {
    setPokemon(null);
    setError("");
    setLoading(true);
    setRetryCount((current) => current + 1);
  }

  // Loading animation
  if (loading) {
    return (
      <div className="detail-page">
        <LoadingScreen message="Loading Pokémon details..." />
      </div>
    );
  }

  // Error message
  if (error) {
    return (
      <div className="detail-page">
        <Link to="/list" className="detail-back">
          ← Back to Pokédex
        </Link>

        <ErrorMessage
          message={error}
          onRetry={retryPokemon}
        />
      </div>
    );
  }

  if (!pokemon) {
    return <p>Pokemon niet gevonden.</p>;
  }

  // Pokemon afbeelding
  const image =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default;

  // Total base stats berekenen
  const totalStats = pokemon.stats.reduce(
    (total, item) => total + item.base_stat,
    0
  );

  return (
    <div className="detail-page">

      {/* Back Button */}
      <Link to="/list" className="detail-back">
        ← Back to Pokédex
      </Link>

      <div className="detail-layout">

        {/* Pokemon Profile */}
        <section className="detail-profile">
          <p className="detail-number">
            POKÉMON #{String(pokemon.id).padStart(3, "0")}
          </p>

          <h1>{pokemon.name}</h1>

          <img
            className="detail-image"
            src={image}
            alt={pokemon.name}
          />

          {/* Pokemon Types */}
          <div className="detail-types">
            {pokemon.types.map((item) => (
              <span
                key={item.type.name}
                className="detail-type"
              >
                {item.type.name}
              </span>
            ))}
          </div>

          {/* Height and Weight */}
          <div className="detail-info">
            <div>
              <span>Height</span>
              <strong>{pokemon.height / 10} m</strong>
            </div>

            <div>
              <span>Weight</span>
              <strong>{pokemon.weight / 10} kg</strong>
            </div>
          </div>
        </section>

        {/* Battle Statistics */}
        <section className="detail-stat-card">
          <PokemonStats stats={pokemon.stats} />

          <div className="stat-total">
            <span>Total Base Stats</span>
            <strong>{totalStats}</strong>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Detail;
