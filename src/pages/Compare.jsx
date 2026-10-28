
import { useEffect, useState } from "react";
import ComparisonCard from "../components/ComparisonCard";
import ComparisonStats from "../components/ComparisonStats";

function Compare() {
  const [pokemons, setPokemons] = useState([]);
  const [firstName, setFirstName] = useState("charizard");
  const [secondName, setSecondName] = useState("blastoise");
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => setPokemons(data.results))
      .catch(() => setError("Pokemon list kon niet geladen worden."));
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadComparison() {
      setLoading(true);
      setError("");
      setFirst(null);
      setSecond(null);

      try {
        const urls = [firstName, secondName].map(
          (name) => `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`
        );

        const responses = await Promise.all(
          urls.map((url) => fetch(url, { signal: controller.signal }))
        );

        if (responses.some((response) => !response.ok)) {
          throw new Error("API error");
        }

        const [data1, data2] = await Promise.all(
          responses.map((response) => response.json())
        );

        if (!controller.signal.aborted) {
          setFirst(data1);
          setSecond(data2);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Vergelijking kon niet geladen worden.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadComparison();

    return () => controller.abort();
  }, [firstName, secondName]);

  return (
    <div className="comparison-page">
      <p className="pokedex-label">⚔️ BATTLE ANALYSIS</p>
      <h1>Pokémon Comparison</h1>
      <p>Compare your favorite Pokémon and discover their strengths.</p>

      <div className="comparison-selectors">
        <div>
          <label htmlFor="first-pokemon">Pokémon 1</label>
          <select
            id="first-pokemon"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          >
            {pokemons.length === 0 && (
              <option value={firstName}>{firstName}</option>
            )}
            {pokemons.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="second-pokemon">Pokémon 2</label>
          <select
            id="second-pokemon"
            value={secondName}
            onChange={(e) => setSecondName(e.target.value)}
          >
            {pokemons.length === 0 && (
              <option value={secondName}>{secondName}</option>
            )}
            {pokemons.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p>Pokémon worden geladen...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && first && second && (
        <>
          <div className="comparison-cards">
            <ComparisonCard pokemon={first} />
            <ComparisonCard pokemon={second} />
          </div>

          <ComparisonStats first={first} second={second} />
        </>
      )}
    </div>
  );
}

export default Compare;
