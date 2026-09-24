import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaArrowRight,
  FaBars,
  FaMoon,
  FaSearch,
  FaSun,
  FaTimes,
} from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";
import { usePortfolio } from "../contexts/PortfolioContext";

interface SearchResult {
  id: string;
  title: string;
  meta: string;
  href: string;
}

export const Navbar: React.FC = () => {
  const { data } = usePortfolio();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      } else if (event.key === "/" && !isTyping) {
        event.preventDefault();
        setSearchOpen(true);
      } else if (event.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  const results = useMemo<SearchResult[]>(() => {
    const normalized = query.trim().toLowerCase();
    const allResults: SearchResult[] = [
      ...data.projects.map((project) => ({
        id: `project-${project.id}`,
        title: project.title,
        meta: project.category,
        href: "/#projects",
      })),
      ...data.tools.map((tool) => ({
        id: `tool-${tool.id}`,
        title: tool.title,
        meta: tool.category,
        href: `/tools/${tool.slug}`,
      })),
      ...data.techStack.map((tech) => ({
        id: `tech-${tech.name}`,
        title: tech.name,
        meta: tech.category,
        href: "/#stack",
      })),
    ];

    if (!normalized) return allResults.slice(0, 6);
    return allResults
      .filter((item) =>
        `${item.title} ${item.meta}`.toLowerCase().includes(normalized),
      )
      .slice(0, 8);
  }, [data.projects, data.techStack, data.tools, query]);

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  const navLinks = [
    { label: "Projects", href: "/#projects", anchor: true },
    { label: "Stack", href: "/#stack", anchor: true },
    { label: "Setup", href: "/#setup", anchor: true },
    { label: "Experience", href: "/#experience", anchor: true },
  ];

  return (
    <>
      <header className="dn-navbar">
        <div className="dn-container dn-navbar__inner">
          <Link className="dn-wordmark" to="/" aria-label="Muhammad Attan home">
            attmhd<span>.</span>
          </Link>

          <nav className="dn-navbar__links" aria-label="Primary navigation">
            {navLinks.map((item) =>
              item.anchor ? (
                <a key={item.label} href={item.href}>
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  aria-current={
                    location.pathname.startsWith(item.href) ? "page" : undefined
                  }
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="dn-navbar__actions">
            <button
              type="button"
              className="dn-search-trigger"
              onClick={() => setSearchOpen(true)}
              aria-label="Search portfolio"
            >
              <FaSearch aria-hidden="true" />
              <span>Search</span>
              <kbd>Ctrl K</kbd>
            </button>
            <button
              type="button"
              className="dn-icon-button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Use light theme" : "Use dark theme"}
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>
            <button
              type="button"
              className="dn-icon-button dn-menu-trigger"
              onClick={() => setMenuOpen((current) => !current)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label="Toggle navigation"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-navigation" className="dn-mobile-nav" aria-label="Mobile navigation">
            {navLinks.map((item) =>
              item.anchor ? (
                <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} to={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        )}
      </header>

      {searchOpen && (
        <div
          className="dn-command-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeSearch();
          }}
        >
          <section
            className="dn-command"
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-title"
          >
            <h2 id="search-title" className="sr-only">
              Search portfolio
            </h2>
            <div className="dn-command__input">
              <FaSearch aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects, tools, or technology"
                aria-label="Search projects, tools, or technology"
              />
              <button type="button" onClick={closeSearch} aria-label="Close search">
                <FaTimes aria-hidden="true" />
              </button>
            </div>
            <div className="dn-command__results">
              {results.length ? (
                results.map((result) => (
                  <a key={result.id} href={result.href} onClick={closeSearch}>
                    <span>
                      <strong>{result.title}</strong>
                      <small>{result.meta}</small>
                    </span>
                    <FaArrowRight aria-hidden="true" />
                  </a>
                ))
              ) : (
                <p className="dn-command__empty">No matching work found.</p>
              )}
            </div>
            <p className="dn-command__hint">Press Esc to close</p>
          </section>
        </div>
      )}
    </>
  );
};

export default Navbar;
