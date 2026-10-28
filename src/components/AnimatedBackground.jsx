import "./AnimatedBackground.css";

function AnimatedBackground() {
  return (
    <div className="animated-background" aria-hidden="true">
      <div className="glow glow-blue"></div>
      <div className="glow glow-pink"></div>
      <div className="glow glow-cyan"></div>
      <div className="glow glow-purple"></div>
      <div className="background-grid"></div>
    </div>
  );
}

export default AnimatedBackground;
