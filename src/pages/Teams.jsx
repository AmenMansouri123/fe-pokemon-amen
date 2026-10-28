import { useEffect, useState } from "react";
import TeamCard from "../components/TeamCard";
import TeamEditor from "../components/TeamEditor";

const STORAGE_KEY = "pokemon-multiple-teams";

function Teams() {
  const [teams, setTeams] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  const [pokemons, setPokemons] = useState([]);
  const [editingTeam, setEditingTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const controller = new AbortController();

    async function loadPokemons() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("API error");
        }

        const data = await response.json();

        if (!controller.signal.aborted) {
          setPokemons(data.results);
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

    loadPokemons();

    return () => controller.abort();
  }, []);

  // Teams bewaren
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(teams)
    );
  }, [teams]);

 
  function createTeam() {
    const newTeam = {
      id: crypto.randomUUID(),
      name: "",
      pokemons: []
    };

    setEditingTeam(newTeam);
  }

  
  function saveTeam(updatedTeam) {
    if (!updatedTeam.name.trim()) {
      alert("Geef je team eerst een naam.");
      return;
    }

    setTeams((current) => {
      const exists = current.some(
        (team) => team.id === updatedTeam.id
      );

      if (exists) {
        return current.map((team) =>
          team.id === updatedTeam.id
            ? updatedTeam
            : team
        );
      }

      return [...current, updatedTeam];
    });

    setEditingTeam(null);
  }

  
  function deleteTeam(id) {
    const confirmed = window.confirm(
      "Weet je zeker dat je dit team wilt verwijderen?"
    );

    if (!confirmed) return;

    setTeams((current) =>
      current.filter((team) => team.id !== id)
    );
  }

  
  function cancelEdit() {
    setEditingTeam(null);
  }

  return (
    <div className="multiple-teams-page">

      <div className="multiple-teams-heading">
        <div>
          <p className="teams-eyebrow">
            🛡️ TEAM MANAGEMENT
          </p>

          <h1>My Pokémon Teams</h1>

          <p>
            Create, customize and manage your Pokémon squads.
          </p>
        </div>

        {!editingTeam && (
          <button
            type="button"
            className="create-team-btn"
            onClick={createTeam}
          >
            ➕ New Team
          </button>
        )}
      </div>

      {loading && (
        <p>Pokémon worden geladen...</p>
      )}

      {error && (
        <p role="alert">{error}</p>
      )}

      {/* Team aanmaken of bewerken */}
      {editingTeam !== null ? (
        <div className="team-editor-wrapper">
          <TeamEditor
            key={editingTeam.id}
            team={editingTeam}
            pokemons={pokemons}
            onSave={saveTeam}
            onCancel={cancelEdit}
          />
        </div>
      ) : (
        <>
          <p className="teams-counter">
            🏆 {teams.length} Teams Created
          </p>

          <div className="multiple-teams-grid">
            {teams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                onEdit={setEditingTeam}
                onDelete={deleteTeam}
              />
            ))}
          </div>

          {teams.length === 0 && (
            <div className="teams-empty">
              <h2>🎮 No Teams Yet</h2>

              <p>
                Create your first Pokémon team to get started!
              </p>

              <button
                type="button"
                className="create-team-btn"
                onClick={createTeam}
              >
                ➕ Create First Team
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Teams;
