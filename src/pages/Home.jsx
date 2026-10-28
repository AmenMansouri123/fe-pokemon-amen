
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardCard from "../components/DashboardCard";
import QuickActions from "../components/QuickActions";
import { useFavorites } from "../context/FavoritesContext";

function Home() {
  const { favorites } = useFavorites();

  const [teamCount, setTeamCount] = useState(0);
  const [pokemonCount, setPokemonCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    try {
      const saved = JSON.parse(
        localStorage.getItem("pokemon-multiple-teams") || "[]"
      );

      setTeamCount(Array.isArray(saved) ? saved.length : 0);
    } catch {
      setTeamCount(0);
    }

    
    const controller = new AbortController();

    fetch("https://pokeapi.co/api/v2/pokemon?limit=1", {
      signal: controller.signal
    })
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        // We show only the first 151 in our Pokédex
        setPokemonCount(Math.min(data.count, 151));
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setPokemonCount(null);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="gaming-dashboard">
      <div className="dashboard-hero">
        <div>
          <p className="dashboard-eyebrow">
            🎮 WELCOME TO YOUR COMMAND CENTER
          </p>

          <h1>
            Pokémon <span>Dashboard</span>
          </h1>

          <p className="dashboard-description">
            Explore Pokémon, collect your favorites,
            compare battle stats and build your dream team.
          </p>

          <Link to="/list" className="dashboard-hero-button">
            Explore Pokémon →
          </Link>
        </div>

        <div className="dashboard-hero-decoration" aria-hidden="true">
          ⚡
        </div>
      </div>

      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <h2>📊 Your Overview</h2>
          <p>Your Pokémon adventure at a glance.</p>
        </div>

        <div className="dashboard-stats-grid">
          <DashboardCard
            icon="📖"
            title="Pokédex"
            value={loading ? "..." : pokemonCount ?? "—"}
            description="Pokémon in your Pokédex"
            link="/list"
          />

          <DashboardCard
            icon="🛡️"
            title="My Teams"
            value={teamCount}
            description="Teams created"
            link="/teams"
          />

          <DashboardCard
            icon="❤️"
            title="Favorites"
            value={favorites.length}
            description="Saved Pokémon"
            link="/favorites"
          />

          <DashboardCard
            icon="⚔️"
            title="Comparison"
            value="VS"
            description="Compare battle statistics"
            link="/compare"
          />
        </div>
      </section>

      <QuickActions />
    </div>
  );
}

export default Home;
