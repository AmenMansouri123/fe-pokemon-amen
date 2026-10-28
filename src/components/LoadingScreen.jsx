
import "./LoadingScreen.css";

function LoadingScreen({ message = "Loading Pokémon..." }) {
  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <div className="loading-pokeball"></div>

      <h2>{message}</h2>

      <p>Fetching data from PokéAPI...</p>

      <div className="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default LoadingScreen;
