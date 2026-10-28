import { useState } from "react";

function TeamEditor({ team, pokemons, onSave, onCancel }) {
  const [name, setName] = useState(team.name);
  const [members, setMembers] = useState(team.pokemons);
  const [selected, setSelected] = useState("");

  function addPokemon() {
    if (!selected || members.length >= 6) return;

    const pokemon = pokemons.find((p) => p.name === selected);
    if (!pokemon) return;

    const id = Number(
      pokemon.url.split("/").filter(Boolean).pop()
    );

    if (members.some((p) => p.id === id)) return;

    setMembers([...members, { id, name: pokemon.name }]);
    setSelected("");
  }

  function removePokemon(id) {
    setMembers(members.filter((p) => p.id !== id));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) return;

    onSave({
      ...team,
      name: name.trim(),
      pokemons: members
    });
  }

  return (
    <form className="team-editor" onSubmit={handleSubmit}>
      <h2>⚔️ Team Editor</h2>

      <label htmlFor="team-name">Team Name</label>
      <input
        id="team-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter team name..."
        maxLength={40}
        required
      />

      <label htmlFor="team-pokemon">Choose Pokémon</label>

      <div className="team-editor-controls">
        <select
          id="team-pokemon"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">Select Pokémon</option>

          {pokemons.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={addPokemon}
          disabled={!selected || members.length >= 6}
        >
          + Add
        </button>
      </div>

      <p>{members.length}/6 Pokémon selected</p>

      <div className="team-editor-members">
        {members.map((p) => (
          <div key={p.id} className="team-editor-member">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
              alt={p.name}
            />
            <span>{p.name}</span>
            <button
              type="button"
              onClick={() => removePokemon(p.id)}
              aria-label={`Remove ${p.name}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="team-editor-actions">
        <button type="submit">💾 Save Team</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TeamEditor;
