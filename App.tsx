import React, { useState } from "react";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Credentials from "./components/Credentials";
import Footer from "./components/Footer";
import AIChat from "./components/AIChat";
// Tambahkan FaBars (Hamburger) dan FaTimes (Close)
import { FaDownload, FaBars, FaTimes } from "react-icons/fa";
import { USER_INFO } from "./constants";

function App() {
  // 1. State untuk mengatur buka/tutup menu di mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fungsi helper untuk menutup menu saat link diklik
  const handleLinkClick = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center pointer-events-none px-4">
        {/* Container Utama (Pill) */}
        <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 pointer-events-auto shadow-2xl shadow-primary/10 transition-all hover:border-white/20 w-full max-w-xs md:max-w-fit md:px-8 md:py-4">
          {/* A. Desktop Menu Layout (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
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

          {/* B. Mobile Header Layout (Visible only on Mobile) */}
          <div className="flex md:hidden items-center justify-between w-full">
            {/* Tombol Hamburger / Close */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-1 focus:outline-none"
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Tombol CV (Versi Mini untuk Mobile) */}
            <a
              href={USER_INFO.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white bg-white/10 px-4 py-1.5 rounded-full text-xs hover:bg-white hover:text-black transition-all"
            >
              <span>CV</span>
              <FaDownload className="text-[10px]" />
            </a>
          </div>
        </div>

        {/* C. Mobile Dropdown Menu (Muncul saat state Open) */}
        {isMobileMenuOpen && (
          <div className="mt-4 pointer-events-auto w-full max-w-xs md:hidden animate-in fade-in slide-in-from-top-5 duration-200">
            <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-4 text-center text-sm font-medium text-gray-300 shadow-2xl">
              <a
                href="#home"
                onClick={handleLinkClick}
                className="py-2 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                Home
              </a>
              <a
                href="#experience"
                onClick={handleLinkClick}
                className="py-2 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                Experience
              </a>
              <a
                href="#projects"
                onClick={handleLinkClick}
                className="py-2 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                Projects
              </a>
            </div>
          </div>
        )}
      </nav>

      <main>
        <Hero />
        <TechStack />
        <Projects />
        <Credentials />
      </main>

      <Footer />
      <AIChat />
    </div>
  );
}

export default App;
