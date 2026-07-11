import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaMedium, FaThreads, FaYoutube } from "react-icons/fa6";
import { usePortfolio } from "../contexts/PortfolioContext";
import Terminal from "./hero/Terminal";

const ROTATING_WORDS = [
  "scalable APIs",
  "RAG pipelines",
  "ML models",
  "clean architecture",
  "cloud infrastructure",
];

const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIsFadingOut(true);
      window.setTimeout(() => {
        setCurrentIndex((value) => (value + 1) % ROTATING_WORDS.length);
        setIsFadingOut(false);
      }, 500);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-dot-grid pt-20"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.07] blur-[120px] dark:bg-primary/[0.04]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:gap-16">
          <div className="max-w-xl shrink-0 lg:max-w-lg xl:max-w-xl">
            <div className="mb-8 flex items-center gap-3">
              <span className="font-mono text-sm tracking-wide text-primary">
                &gt; {data.userInfo.role.toLowerCase()}
              </span>
              <span className="h-px max-w-[120px] flex-1 bg-gray-200 dark:bg-white/10" />
            </div>

            <h1 className="mb-8 text-5xl font-display font-bold leading-[1.05] tracking-tight text-gray-900 dark:text-white md:text-7xl lg:text-6xl xl:text-7xl">
              {data.userInfo.name.split(" ")[0]}
              <br />
              <span className="text-gray-400 dark:text-gray-600">
                {data.userInfo.name.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            <p className="mb-4 text-lg leading-relaxed text-gray-600 dark:text-gray-400 md:text-xl">
              I build{" "}
              <span
                className={`inline-block min-w-[18ch] font-semibold text-gray-900 dark:text-white ${
                  isFadingOut ? "animate-fade-out" : "animate-fade-in"
                }`}
              >
                {ROTATING_WORDS[currentIndex]}
              </span>
            </p>
            <p className="mb-8 font-mono text-sm leading-relaxed text-gray-500 dark:text-gray-500">
              with Python, Go, and modern tooling.
            </p>

            <div className="mb-8 flex items-center gap-2 text-sm text-gray-400 dark:text-gray-600">
              <span>{data.userInfo.location}</span>
            </div>

            <div className="mb-10 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="rounded-full bg-gray-900 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                View Projects
              </a>
              <a
                href={data.userInfo.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-gray-300 px-7 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-900 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-white dark:hover:text-white"
              >
                Download CV
              </a>
              <a
                href={`mailto:${data.userInfo.email}`}
                className="px-7 py-3 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
              >
                Contact Me →
              </a>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-xs font-mono uppercase tracking-wider text-gray-400 dark:text-gray-600">
                Links
              </span>
              <span className="h-px w-8 bg-gray-200 dark:bg-white/10" />
              <div className="flex gap-5 text-lg text-gray-400 dark:text-gray-600">
                <a href="https://github.com/attmhd" target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com/in/attmhd" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
                <a href="https://attmhd.medium.com/" target="_blank" rel="noopener noreferrer">
                  <FaMedium />
                </a>
                <a href="https://www.youtube.com/@attmhd" target="_blank" rel="noopener noreferrer">
                  <FaYoutube />
                </a>
                <a
                  href="https://www.instagram.com/tany.series"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
                <a href="https://www.threads.com/@attan_mhd" target="_blank" rel="noopener noreferrer">
                  <FaThreads />
                </a>
              </div>
            </div>
          </div>

          <div className="min-w-0 w-full lg:flex-1">
            <Terminal />
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 dark:text-gray-600">
          scroll
        </span>
        <div className="h-8 w-px bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-600" />
      </div>
    </section>
  );
};

export default Hero;
