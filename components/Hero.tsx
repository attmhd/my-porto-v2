import React, { useState, useEffect, useRef, useCallback } from "react";
import { USER_INFO, PROJECTS, TECH_STACK, EDUCATION } from "../constants";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
} from "react-icons/fa";
import { FaMedium, FaThreads, FaYoutube } from "react-icons/fa6";

const ROTATING_WORDS = [
  "scalable APIs",
  "RAG pipelines",
  "ML models",
  "clean architecture",
  "cloud infrastructure",
];

// ── Terminal logic ──────────────────────────────────────────────

interface TermLine {
  type: "input" | "output" | "system";
  text: string;
}

const PROMPT = "attmhd@portfolio:~$ ";

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    "Available commands:",
    "",
    "  whoami      — Who am I",
    "  about       — About me",
    "  skills      — Tech stack overview",
    "  projects    — Featured projects",
    "  education   — Education & experience",
    "  contact     — Get in touch",
    "  clear       — Clear terminal",
    "  help        — Show this message",
  ],
  whoami: () => [
    `${USER_INFO.name}`,
    `${USER_INFO.role}`,
    `📍 ${USER_INFO.location}`,
  ],
  about: () => {
    const words = USER_INFO.about.split(" ");
    const lines: string[] = [];
    let current = "";
    for (const w of words) {
      if ((current + " " + w).trim().length > 52) {
        lines.push(current.trim());
        current = w;
      } else {
        current = current ? current + " " + w : w;
      }
    }
    if (current) lines.push(current.trim());
    return lines;
  },
  skills: () => {
    const grouped: Record<string, string[]> = {};
    TECH_STACK.forEach((t) => {
      if (!grouped[t.category]) grouped[t.category] = [];
      grouped[t.category].push(t.name);
    });
    const lines: string[] = [];
    Object.entries(grouped).forEach(([cat, items]) => {
      lines.push(`  [${cat}]`);
      lines.push(`    ${items.join(", ")}`);
      lines.push("");
    });
    return lines;
  },
  projects: () => {
    const top = PROJECTS.slice(0, 8);
    const lines: string[] = [];
    top.forEach((p, i) => {
      lines.push(`  ${String(i + 1).padStart(2, " ")}. ${p.title}`);
      lines.push(
        `      ${p.category} — ${p.technologies.slice(0, 3).join(", ")}`,
      );
    });
    if (PROJECTS.length > 8) {
      lines.push("");
      lines.push(
        `  ... and ${PROJECTS.length - 8} more. Scroll down to explore.`,
      );
    }
    return lines;
  },
  education: () => {
    const lines: string[] = [];
    EDUCATION.forEach((e) => {
      lines.push(`  [${e.year}] ${e.institution}`);
      lines.push(`    ${e.degree}`);
      lines.push("");
    });
    return lines;
  },
  contact: () => [
    `  Email     ${USER_INFO.email}`,
    `  GitHub    github.com/attmhd`,
    `  LinkedIn  linkedin.com/in/attmhd`,
    "",
    "  Feel free to reach out!",
  ],
};

const BOOT_LINES: TermLine[] = [
  { type: "system", text: "Welcome to attmhd's portfolio terminal." },
  { type: "system", text: 'Type "help" to see available commands.' },
  { type: "system", text: "" },
];

// ── Terminal component ──────────────────────────────────────────

const Terminal: React.FC = () => {
  const [lines, setLines] = useState<TermLine[]>([...BOOT_LINES]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  const handleSubmit = () => {
    const trimmed = input.trim();
    const newLines: TermLine[] = [
      ...lines,
      { type: "input", text: `${PROMPT}${trimmed}` },
    ];

    if (trimmed === "") {
      setLines(newLines);
      setInput("");
      return;
    }

    if (trimmed === "clear") {
      setLines([...BOOT_LINES]);
      setInput("");
      setHistory((h) => [...h, trimmed]);
      setHistoryIdx(-1);
      return;
    }

    const cmd = COMMANDS[trimmed.toLowerCase()];
    if (cmd) {
      const output = cmd();
      output.forEach((line) => {
        newLines.push({ type: "output", text: line });
      });
      newLines.push({ type: "output", text: "" });
    } else {
      newLines.push({
        type: "output",
        text: `bash: ${trimmed}: command not found. Try "help".`,
      });
      newLines.push({ type: "output", text: "" });
    }

    setLines(newLines);
    setInput("");
    setHistory((h) => [...h, trimmed]);
    setHistoryIdx(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const newIdx =
        historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(newIdx);
      setInput(history[newIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const newIdx = historyIdx + 1;
      if (newIdx >= history.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([...BOOT_LINES]);
    }
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <div
      className="w-full rounded-xl border border-gray-200/60 dark:border-white/[0.08] bg-[#0d1117] shadow-2xl shadow-black/10 dark:shadow-black/30 overflow-hidden flex flex-col"
      style={{ height: "420px" }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/[0.06] shrink-0">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="flex-1 text-center text-[11px] font-mono text-gray-500 -ml-8">
          attmhd — portfolio
        </span>
      </div>

      {/* Terminal body */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed cursor-text"
        onClick={focusInput}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className="whitespace-pre-wrap break-words min-h-[1.375rem]"
          >
            {line.type === "input" ? (
              <>
                <span className="text-emerald-400">{PROMPT}</span>
                <span className="text-gray-200">
                  {line.text.slice(PROMPT.length)}
                </span>
              </>
            ) : line.type === "system" ? (
              <span className="text-gray-500 italic">{line.text}</span>
            ) : (
              <span className="text-gray-400">{line.text}</span>
            )}
          </div>
        ))}

        {/* Active prompt */}
        <div className="flex items-center min-h-[1.375rem]">
          <span className="text-emerald-400 shrink-0">{PROMPT}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-gray-200 caret-emerald-400 font-mono text-[13px] leading-relaxed"
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
          />
        </div>
      </div>
    </div>
  );
};

// ── Hero section ────────────────────────────────────────────────

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setIsFadingOut(false);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden pt-20 bg-dot-grid"
    >
      {/* Subtle gradient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.07] dark:bg-primary/[0.04] rounded-full filter blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* ── Left: text content ── */}
          <div className="max-w-xl lg:max-w-lg xl:max-w-xl shrink-0">
            {/* Monospace tag */}
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-sm text-primary tracking-wide">
                &gt; {USER_INFO.role.toLowerCase()}
              </span>
              <span className="h-px flex-1 bg-gray-200 dark:bg-white/10 max-w-[120px]" />
            </div>

            {/* Name */}
            <h1 className="text-5xl md:text-7xl lg:text-6xl xl:text-7xl font-display font-bold text-gray-900 dark:text-white mb-8 leading-[1.05] tracking-tight">
              {USER_INFO.name.split(" ")[0]}
              <br />
              <span className="text-gray-400 dark:text-gray-600">
                {USER_INFO.name.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            {/* Rotating description */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              I build{" "}
              <span
                className={`inline-block font-semibold text-gray-900 dark:text-white ${
                  isFadingOut ? "animate-fade-out" : "animate-fade-in"
                }`}
              >
                {ROTATING_WORDS[currentIndex]}
              </span>
            </p>
            <p className="text-gray-500 dark:text-gray-500 mb-8 leading-relaxed font-mono text-sm">
              with Python, Go, and modern tooling.
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-600 mb-8">
              <FaMapMarkerAlt className="text-xs" />
              <span>{USER_INFO.location}</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 items-center mb-10">
              <a
                href="#projects"
                className="px-7 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
              >
                View Projects
              </a>
              <a
                href={USER_INFO.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-full hover:border-gray-900 dark:hover:border-white hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Download CV
              </a>
              <a
                href={`mailto:${USER_INFO.email}`}
                className="px-7 py-3 text-gray-500 dark:text-gray-500 text-sm font-medium hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Contact Me →
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-6">
              <span className="text-xs font-mono text-gray-400 dark:text-gray-600 uppercase tracking-wider">
                Links
              </span>
              <span className="h-px w-8 bg-gray-200 dark:bg-white/10" />
              <div className="flex gap-5 text-lg text-gray-400 dark:text-gray-600">
                <a
                  href="https://github.com/attmhd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://linkedin.com/in/attmhd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://attmhd.medium.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <FaMedium />
                </a>
                <a
                  href="https://www.youtube.com/@attmhd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <FaYoutube />
                </a>
                <a
                  href="https://www.instagram.com/tany.series"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.threads.com/@attan_mhd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <FaThreads />
                </a>
              </div>
            </div>
          </div>

          {/* ── Right: terminal ── */}
          <div className="w-full lg:flex-1 min-w-0">
            <Terminal />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 dark:text-gray-600">
          scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-300 dark:from-gray-600 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
