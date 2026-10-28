
import { Link } from "react-router-dom";

function DashboardCard({ icon, title, value, description, link }) {
  return (
    <Link to={link} className="dashboard-stat-card">
      <div className="dashboard-stat-top">
        <span className="dashboard-stat-icon">{icon}</span>
        <span className="dashboard-stat-arrow">↗</span>
      </div>

      <h2>{value}</h2>
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
}

export default DashboardCard;
