
import { useEffect, useState } from "react";

import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import TypeFilter from "../components/TypeFilter";
import LoadingScreen from "../components/LoadingScreen";
import ErrorMessage from "../components/ErrorMessage";

function List() {
  const [pokemons, setPokemons] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [typeNames, setTypeNames] = useState(null);

  const [loading, setLoading] = useState(true);
  const [typeLoading, setTypeLoading] = useState(false);

  const [error, setError] = useState("");
  const [typeError, setTypeError] = useState("");

  const [retryCount, setRetryCount] = useState(0);
  const [typeRetryCount, setTypeRetryCount] = useState(0);

  
  useEffect(() => {
    const controller = new AbortController();

    async function fetchPokemons() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("API fout");
        }

        const data = await response.json();

        if (!controller.signal.aborted) {
          setPokemons(data.results);
          setError("");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Pokemon konden niet geladen worden.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPokemons();

    return () => controller.abort();
  }, [retryCount]);

  
  useEffect(() => {
    if (selectedType === "all") {
      return;
    }

    const controller = new AbortController();

    async function fetchType() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/type/${selectedType}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Type API fout");
        }

        const data = await response.json();

        const names = data.pokemon.map(
          (item) => item.pokemon.name
        );

        if (!controller.signal.aborted) {
          setTypeNames(new Set(names));
          setTypeError("");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setTypeError("Type kon niet geladen worden.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setTypeLoading(false);
        }
      }
    }

    fetchType();

    return () => controller.abort();
  }, [selectedType, typeRetryCount]);

  // Type wijzigen
  function changeType(type) {
    setSelectedType(type);
    setTypeError("");
    setTypeNames(null);

    if (type === "all") {
      setTypeLoading(false);
    } else {
      setTypeLoading(true);
    }
  }

  
  function retryPokemons() {
    setError("");
    setLoading(true);
    setRetryCount((current) => current + 1);
  }

  
  function retryType() {
    setTypeError("");
    setTypeNames(null);
    setTypeLoading(true);
    setTypeRetryCount((current) => current + 1);
  }

  
  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesType =
      selectedType === "all" ||
      (typeNames !== null && typeNames.has(pokemon.name));

    return matchesSearch && matchesType;
  });

  return (
    <div className="pokedex-page">

      <div className="pokedex-header">
        <p className="pokedex-label">
          📖 POKÉDEX DATABASE
        </p>

        <h1>Explore Pokémon</h1>

        <p>
          Discover Pokémon and build your dream team.
        </p>
      </div>

      {}
      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {}
      <TypeFilter
        selectedType={selectedType}
        setSelectedType={changeType}
      />

      {}
      {(loading || typeLoading) && (
        <LoadingScreen message="Loading Pokémon..." />
      )}

      {}
      {!loading && error && (
        <ErrorMessage
          message={error}
          onRetry={retryPokemons}
        />
      )}

      {}
      {!typeLoading && typeError && !error && (
        <ErrorMessage
          message={typeError}
          onRetry={retryType}
        />
      )}

      {}
      {!loading && !typeLoading && !error && !typeError && (
        <>
          <p className="results-count">
            {filteredPokemons.length} Pokémon gevonden
          </p>

          <div className="pokemon-grid">
            {filteredPokemons.map((pokemon) => {
              const id = pokemon.url
                .split("/")
                .filter(Boolean)
                .pop();

              const image =
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

              return (
                <PokemonCard
                  key={pokemon.name}
                  name={pokemon.name}
                  image={image}
                />
              );
            })}
          </div>

          {filteredPokemons.length === 0 && (
            <p className="no-results">
              🔍 Geen Pokémon gevonden.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default List;
