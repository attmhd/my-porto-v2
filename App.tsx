import React from "react";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Credentials from "./components/Credentials";
import Footer from "./components/Footer";
import AIChat from "./components/AIChat";
import { FaDownload } from "react-icons/fa";
import { USER_INFO } from "./constants";

function App() {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-white">
      {/* Navigation - Minimalist floating */}
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4 pointer-events-auto shadow-2xl shadow-primary/10 transition-all hover:scale-105 hover:border-white/20">
          <div className="flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#home" className="hover:text-white transition-colors">
              Home
            </a>
            <a
              href="#experience"
              className="hover:text-white transition-colors"
            >
              Experience
            </a>
            <a href="#projects" className="hover:text-white transition-colors">
              Projects
            </a>
            <a
              href={USER_INFO.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white bg-white/10 px-4 py-1.5 rounded-full hover:bg-white hover:text-black transition-all group"
            >
              <span>Download CV</span>
              <FaDownload className="text-xs group-hover:animate-bounce" />
            </a>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <TechStack />
        <Projects />
        <Credentials />
      </main>

      <Footer />

      {/* Floating AI Chat - Key feature for an AI Engineer */}
      <AIChat />
    </div>
  );
}

export default App;
