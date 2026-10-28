
const labels = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Attack",
  "special-defense": "Sp. Defense",
  speed: "Speed"
};

function ComparisonStats({ first, second }) {
  if (!first || !second) return null;

  return (
    <div className="comparison-stats">
      <h2>📊 Stats Comparison</h2>

      {first.stats.map((item) => {
        const name = item.stat.name;
        const value1 = item.base_stat;
        const value2 = second.stats.find(
          (stat) => stat.stat.name === name
        )?.base_stat ?? 0;

        return (
          <div className="comparison-stat-row" key={name}>
            <h3>{labels[name] || name}</h3>

            <div className="comparison-bars">
              <div className="comparison-bar-item">
                <div className="comparison-track">
                  <div
                    className={`comparison-fill ${
                      value1 >= value2 ? "winner" : "loser"
                    }`}
                    style={{ width: `${Math.min(value1 / 255 * 100, 100)}%` }}
                  />
                </div>
                <strong>{value1}</strong>
              </div>

              <div className="comparison-bar-item">
                <div className="comparison-track">
                  <div
                    className={`comparison-fill ${
                      value2 >= value1 ? "winner" : "loser"
                    }`}
                    style={{ width: `${Math.min(value2 / 255 * 100, 100)}%` }}
                  />
                </div>
                <strong>{value2}</strong>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ComparisonStats;
