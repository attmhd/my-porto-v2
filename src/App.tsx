import React, { Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "motion/react";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Credentials from "./components/Credentials";
import Setup from "./components/Setup";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const Blog = React.lazy(() => import("./pages/BlogPage"));
const BlogPost = React.lazy(() => import("./pages/BlogPostPage"));
const Tools = React.lazy(() => import("./pages/ToolsPage"));
const ToolDetail = React.lazy(() => import("./pages/ToolDetailPage"));
const Admin = React.lazy(() => import("./pages/AdminPage"));
const AIChat = React.lazy(() => import("./components/AIChat"));

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
  const isToolsPage = location.pathname.startsWith("/tools");
  const isAdminPage = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (!location.hash) return;
    const targetId = location.hash.slice(1);
    const timer = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: "start" });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [location.hash, location.pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="site-shell min-h-screen bg-background dark:bg-background-dark text-gray-900 dark:text-white selection:bg-primary selection:text-white">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {/* Navigation - hide on blog pages */}
        {!isBlogPage && !isAdminPage && <Navbar />}

        <div id="main-content">
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/tools/:slug" element={<ToolDetail />} />
              <Route path="/writing" element={<Blog />} />
              <Route path="/writing/:slug" element={<BlogPost />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Suspense>
        </div>

        {/* Footer - hide on blog pages and tools page */}
        {!isBlogPage && !isToolsPage && !isAdminPage && <Footer />}

        {/* Chatbot - hide on blog and tools page */}
        {/*{!isBlogPage && !isToolsPage && !isAdminPage && (
        <Suspense fallback={null}>
          <AIChat />
        </Suspense>
      )}*/}
      </div>
    </MotionConfig>
  );
}

export default App;
