import { NavLink } from "react-router-dom";
import PokemonLogo from "./PokemonLogo";

function Navbar() {
  return (
    <aside className="gaming-sidebar">
      <NavLink to="/" className="sidebar-brand">
        <PokemonLogo />

        <div className="sidebar-brand-text">
          <strong>POKÉMON</strong>
          <span>MANAGER</span>
        </div>
      </NavLink>

      <div className="sidebar-menu">
        <p className="sidebar-label">MAIN MENU</p>

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span>🏠</span> Dashboard
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span>📖</span> Pokédex
        </NavLink>

        <NavLink
          to="/teams"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span>🛡️</span> My Teams
        </NavLink>

        
<NavLink
  to="/favorites"
  className={({ isActive }) =>
    `sidebar-link ${isActive ? "active" : ""}`
  }
>
  <span>❤️</span> Favorites
</NavLink>

<NavLink
  to="/compare"
  className={({ isActive }) =>
    `sidebar-link ${isActive ? "active" : ""}`
  }
>
  <span>⚔️</span> Comparison
</NavLink>


<NavLink
  to="/quiz"
  className={({ isActive }) =>
    `sidebar-link ${isActive ? "active" : ""}`
  }
>
  <span>❓</span> Pokémon Quiz
</NavLink>


      </div>

      <div className="sidebar-footer">
        <span className="sidebar-online-dot"></span>
        SYSTEM READY
      </div>
    </aside>
  );
}

export default Navbar;
