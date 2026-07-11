import React, { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark text-gray-900 dark:text-white selection:bg-primary selection:text-white">
      {/* Navigation - hide on blog pages */}
      {!isBlogPage && !isAdminPage && <Navbar />}

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

      {/* Footer - hide on blog pages and tools page */}
      {!isBlogPage && !isToolsPage && !isAdminPage && <Footer />}

      {/* Chatbot - hide on blog and tools page */}
      {!isBlogPage && !isToolsPage && !isAdminPage && (
        <Suspense fallback={null}>
          <AIChat />
        </Suspense>
      )}
    </div>
  );
}

export default App;
