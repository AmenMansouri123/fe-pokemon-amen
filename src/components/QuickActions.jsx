
import { Link } from "react-router-dom";

function QuickActions() {
  const actions = [
    {
      icon: "🔍",
      title: "Explore Pokédex",
      description: "Discover Pokémon",
      link: "/list"
    },
    {
      icon: "🛡️",
      title: "Create a Team",
      description: "Build your squad",
      link: "/teams"
    },
    {
      icon: "⚔️",
      title: "Compare Pokémon",
      description: "Analyze battle stats",
      link: "/compare"
    },
    {
      icon: "❤️",
      title: "View Favorites",
      description: "Your saved collection",
      link: "/favorites"
    }
  ];

  return (
    <section className="dashboard-section">
      <h2>⚡ Quick Actions</h2>

      <div className="quick-actions-grid">
        {actions.map((action) => (
          <Link
            to={action.link}
            key={action.title}
            className="quick-action-card"
          >
            <span className="quick-action-icon">{action.icon}</span>

            <div>
              <h3>{action.title}</h3>
              <p>{action.description}</p>
            </div>

            <span className="quick-action-arrow">→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;
