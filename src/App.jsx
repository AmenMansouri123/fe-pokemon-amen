import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { FavoritesProvider } from "./context/FavoritesContext";

import AnimatedBackground from "./components/AnimatedBackground";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import List from "./pages/List";
import Detail from "./pages/Detail";
import Teams from "./pages/Teams";
import Favorites from "./pages/Favorites";
import Compare from "./pages/Compare";
import Quiz from "./pages/Quiz";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <FavoritesProvider>
        <AnimatedBackground />

        <div className={`app-layout ${!sidebarOpen ? "sidebar-collapsed" : ""}`}>
          <Navbar />

          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
            aria-expanded={sidebarOpen}
            title={sidebarOpen ? "Hide menu" : "Show menu"}
          >
            ⋯
          </button>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/list" element={<List />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/quiz" element={<Quiz />} />
            </Routes>
          </main>
        </div>
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;
