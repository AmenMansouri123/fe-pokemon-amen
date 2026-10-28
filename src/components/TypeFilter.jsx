const types = [
  { name: "all", label: "All", emoji: "🌐" },
  { name: "fire", label: "Fire", emoji: "🔥" },
  { name: "water", label: "Water", emoji: "💧" },
  { name: "grass", label: "Grass", emoji: "🌿" },
  { name: "electric", label: "Electric", emoji: "⚡" },
  { name: "psychic", label: "Psychic", emoji: "🔮" },
  { name: "ice", label: "Ice", emoji: "❄️" },
  { name: "rock", label: "Rock", emoji: "🪨" },
  { name: "normal", label: "Normal", emoji: "⭐" },
  { name: "poison", label: "Poison", emoji: "☠️" },
  { name: "fighting", label: "Fighting", emoji: "🥊" },
  { name: "ground", label: "Ground", emoji: "🌍" },
  { name: "flying", label: "Flying", emoji: "🪽" },
  { name: "bug", label: "Bug", emoji: "🐛" },
  { name: "ghost", label: "Ghost", emoji: "👻" },
  { name: "dragon", label: "Dragon", emoji: "🐉" }
];

function TypeFilter({ selectedType, setSelectedType }) {
  return (
    <div className="type-filters">
      {types.map((type) => (
        <button
          key={type.name}
          type="button"
          className={`type-button ${
            selectedType === type.name ? "selected" : ""
          }`}
          onClick={() => setSelectedType(type.name)}
        >
          {type.emoji} {type.label}
        </button>
      ))}
    </div>
  );
}

export default TypeFilter;
