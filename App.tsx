import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Credentials from "./components/Credentials";
import Setup from "./components/Setup";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import Footer from "./components/Footer";
import AIChat from "./components/AIChat";
import Navbar from "./components/Navbar";
import Tools from "./components/Tools";

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
  const isBlogPage = location.pathname.startsWith("/writing");
  const isToolsPage = location.pathname === "/tools";

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark text-gray-900 dark:text-white selection:bg-primary selection:text-white">
      {/* Navigation - hide on blog pages */}
      {!isBlogPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/writing" element={<Blog />} />
        <Route path="/writing/:slug" element={<BlogPost />} />
      </Routes>

      {/* Footer - hide on blog pages and tools page */}
      {!isBlogPage && !isToolsPage && <Footer />}

      {/* Chatbot - hide on blog and tools page */}
      {!isBlogPage && !isToolsPage && <AIChat />}
    </div>
  );
}

export default App;
