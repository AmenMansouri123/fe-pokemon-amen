
function ComparisonCard({ pokemon }) {
  if (!pokemon) {
    return <div className="comparison-card">Select a Pokémon</div>;
  }

  const image =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  return (
    <div className="comparison-card">
      <span>#{String(pokemon.id).padStart(3, "0")}</span>
      <img src={image} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>

      <div className="comparison-types">
        {pokemon.types.map((item) => (
          <span key={item.type.name}>
            {item.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ComparisonCard;
