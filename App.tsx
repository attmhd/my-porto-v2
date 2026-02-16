import React from "react";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Credentials from "./components/Credentials";
import Footer from "./components/Footer";
import AIChat from "./components/AIChat";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-background dark:bg-background-dark text-gray-900 dark:text-white selection:bg-primary selection:text-white">
      {/* Navigation */}
      <Navbar />

      <main>
        <Hero />
        <Projects />
        <TechStack />
        <Credentials />
      </main>

      <Footer />
      <AIChat />
    </div>
  );
}

export default App;
