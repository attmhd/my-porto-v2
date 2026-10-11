import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Credentials from "./components/Credentials";
import Setup from "./components/Setup";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { UI_CONTENT } from "./data/portfolioContent";

const Home: React.FC = () => (
  <main>
    <Hero />
    <Projects />
    <TechStack />
    <Credentials />
    <Setup />
  </main>
);

function App() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const targetId = location.hash.slice(1);
    const timer = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: "start" });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [location.hash, location.pathname]);

  return (
    <div
      style={{ "--dn-project-image": `url("${UI_CONTENT.projects.image}")` } as React.CSSProperties}
      className="site-shell min-h-screen bg-background dark:bg-background-dark text-gray-900 dark:text-white selection:bg-primary selection:text-white"
    >
      <a className="skip-link" href="#main-content">
        {UI_CONTENT.skipLink}
      </a>
      <Navbar />

      <div id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
