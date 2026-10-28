function TeamCard({ team, onEdit, onDelete }) {
  return (
    <div className="multi-team-card">
      <div className="multi-team-header">
        <h3>🛡️ {team.name}</h3>
        <span>{team.pokemons.length}/6</span>
      </div>

      <div className="multi-team-pokemon">
        {team.pokemons.map((pokemon) => (
          <div key={pokemon.id} className="multi-team-member">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
            />
            <span>{pokemon.name}</span>
          </div>
        ))}
      </div>

      {team.pokemons.length === 0 && (
        <p>No Pokémon added yet.</p>
      )}

      <div className="multi-team-actions">
        <button onClick={() => onEdit(team)}>
          ✏️ Edit Team
        </button>

        <button
          className="multi-team-delete"
          onClick={() => onDelete(team.id)}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default TeamCard;
