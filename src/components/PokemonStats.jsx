const statColors = {
  hp: "#22c55e",
  attack: "#f97316",
  defense: "#3b82f6",
  "special-attack": "#a855f7",
  "special-defense": "#06b6d4",
  speed: "#eab308"
};

const statLabels = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Attack",
  "special-defense": "Sp. Defense",
  speed: "Speed"
};

function PokemonStats({ stats }) {
  return (
    <div className="stats-container">
      <h2>⚔️ Battle Statistics</h2>

      {stats.map((item) => {
        const name = item.stat.name;
        const value = item.base_stat;
        const color = statColors[name] || "#a78bfa";

        return (
          <div className="stat-row" key={name}>
            <span className="stat-name">
              {statLabels[name] || name}
            </span>

            <div
              className="stat-track"
              role="progressbar"
              aria-label={statLabels[name] || name}
              aria-valuenow={value}
              aria-valuemin={0}
              aria-valuemax={255}
            >
              <div
                className="stat-fill"
                style={{
                  width: `${Math.min(value / 255 * 100, 100)}%`,
                  backgroundColor: color
                }}
              />
            </div>

            <span className="stat-value">{value}</span>
          </div>
        );
      })}
    </div>
  );
}

export default PokemonStats;
