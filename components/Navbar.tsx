import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaDownload, FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { USER_INFO } from "../constants";
import { useTheme } from "../contexts/ThemeContext";

const navLinks = [
  { href: "/#home", label: "Home", isAnchor: true },
  { href: "/#projects", label: "Projects", isAnchor: true },
  { href: "/tools", label: "Tools", isAnchor: false },
  { href: "/writing", label: "Writing", isAnchor: false },
  { href: "/#experience", label: "Experience", isAnchor: true },
];

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setIsMobileMenuOpen(false);

  const linkProps = (link: (typeof navLinks)[0]) =>
    link ? { rel: "noopener noreferrer" } : {};

  return (
    <nav className="fixed top-5 left-0 right-0 z-50 flex flex-col items-center pointer-events-none px-4">
      {/* Pill */}
      <div
        className={`pointer-events-auto rounded-full px-5 py-2.5 md:px-6 md:py-2.5 transition-all duration-300 w-full max-w-xs md:max-w-fit ${scrolled
          ? "bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-gray-200/60 dark:border-white/[0.08] shadow-sm"
          : "bg-white/50 dark:bg-black/50 backdrop-blur-md border border-gray-200/30 dark:border-white/[0.04]"
          }`}
      >
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 text-[13px] font-medium text-gray-500 dark:text-gray-500">
          {navLinks.map((link) =>
            link.isAnchor ? (
              <a
                key={link.label}
                href={link.href}
                {...linkProps(link)}
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ),
          )}

          <span className="h-3.5 w-px bg-gray-200 dark:bg-white/10" />

          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <FaSun className="text-sm" />
            ) : (
              <FaMoon className="text-sm" />
            )}
          </button>

          <a
            href={USER_INFO.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-white/[0.08] px-4 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-white/[0.15] transition-colors"
          >
            CV
            <FaDownload className="text-[10px]" />
          </a>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center justify-between w-full">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-500 dark:text-gray-400 p-1 focus:outline-none hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-400 dark:text-gray-500"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <FaSun className="text-sm" />
              ) : (
                <FaMoon className="text-sm" />
              )}
            </button>

            <a
              href={USER_INFO.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-white/[0.08] px-3 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-white/[0.15] transition-colors"
            >
              CV
              <FaDownload className="text-[9px]" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMobileMenuOpen && (
        <div className="mt-3 pointer-events-auto w-full max-w-xs md:hidden">
          <div className="bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-gray-200/60 dark:border-white/[0.08] rounded-2xl p-2 flex flex-col text-[13px] font-medium text-gray-500 dark:text-gray-400">
            {navLinks.map((link) =>
              link.isAnchor ? (
                <a
                  key={link.label}
                  href={link.href}
                  {...linkProps(link)}
                  onClick={closeMobile}
                  className="py-2.5 px-4 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/[0.05] rounded-xl transition-all"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={closeMobile}
                  className="py-2.5 px-4 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/[0.05] rounded-xl transition-all"
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
