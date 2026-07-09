import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePortfolio } from "../../contexts/PortfolioContext";
import { PortfolioData } from "../../data/portfolio";

interface TermLine {
  type: "input" | "output" | "system";
  text: string;
}

const PROMPT = "attmhd@portfolio:~$ ";

const BOOT_LINES: TermLine[] = [
  { type: "system", text: "Welcome to attmhd's portfolio terminal." },
  { type: "system", text: 'Type "help" to see available commands.' },
  { type: "system", text: "" },
];

function createCommands(data: PortfolioData): Record<string, () => string[]> {
  return {
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
    whoami: () => [data.userInfo.name, data.userInfo.role, `📍 ${data.userInfo.location}`],
    about: () => {
      const words = data.userInfo.about.split(" ");
      const lines: string[] = [];
      let current = "";
      for (const word of words) {
        if ((current + " " + word).trim().length > 52) {
          lines.push(current.trim());
          current = word;
        } else {
          current = current ? `${current} ${word}` : word;
        }
      }
      if (current) lines.push(current.trim());
      return lines;
    },
    skills: () => {
      const grouped: Record<string, string[]> = {};
      data.techStack.forEach((item) => {
        if (!grouped[item.category]) grouped[item.category] = [];
        grouped[item.category].push(item.name);
      });
      const lines: string[] = [];
      Object.entries(grouped).forEach(([category, items]) => {
        lines.push(`  [${category}]`);
        lines.push(`    ${items.join(", ")}`);
        lines.push("");
      });
      return lines;
    },
    projects: () => {
      const top = data.projects.slice(0, 8);
      const lines: string[] = [];
      top.forEach((project, index) => {
        lines.push(`  ${String(index + 1).padStart(2, " ")}. ${project.title}`);
        lines.push(
          `      ${project.category} — ${project.technologies.slice(0, 3).join(", ")}`,
        );
      });
      if (data.projects.length > 8) {
        lines.push("");
        lines.push(`  ... and ${data.projects.length - 8} more. Scroll down to explore.`);
      }
      return lines;
    },
    education: () => {
      const lines: string[] = [];
      data.education.forEach((item) => {
        lines.push(`  [${item.year}] ${item.institution}`);
        lines.push(`    ${item.degree}`);
        lines.push("");
      });
      return lines;
    },
    contact: () => [
      `  Email     ${data.userInfo.email}`,
      `  GitHub    github.com/attmhd`,
      `  LinkedIn  linkedin.com/in/attmhd`,
      "",
      "  Feel free to reach out!",
    ],
  };
}

const Terminal: React.FC = () => {
  const { data } = usePortfolio();
  const [lines, setLines] = useState<TermLine[]>([...BOOT_LINES]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  const handleSubmit = () => {
    const trimmed = input.trim();
    const nextLines: TermLine[] = [...lines, { type: "input", text: `${PROMPT}${trimmed}` }];

    if (!trimmed) {
      setLines(nextLines);
      setInput("");
      return;
    }

    if (trimmed === "clear") {
      setLines([...BOOT_LINES]);
      setInput("");
      setHistory((items) => [...items, trimmed]);
      setHistoryIdx(-1);
      return;
    }

    const cmd = createCommands(data)[trimmed.toLowerCase()];
    if (cmd) {
      cmd().forEach((line) => nextLines.push({ type: "output", text: line }));
      nextLines.push({ type: "output", text: "" });
    } else {
      nextLines.push({
        type: "output",
        text: `bash: ${trimmed}: command not found. Try "help".`,
      });
      nextLines.push({ type: "output", text: "" });
    }

    setLines(nextLines);
    setInput("");
    setHistory((items) => [...items, trimmed]);
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

  return (
    <div
      className="w-full overflow-hidden flex flex-col rounded-xl border border-gray-200/60 bg-[#0d1117] shadow-2xl shadow-black/10 dark:border-white/[0.08] dark:shadow-black/30"
      style={{ height: "420px" }}
    >
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#161b22] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="flex-1 -ml-8 text-center text-[11px] font-mono text-gray-500">
          attmhd — portfolio
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 cursor-text overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, index) => (
          <div key={index} className="min-h-[1.375rem] whitespace-pre-wrap break-words">
            {line.type === "input" ? (
              <>
                <span className="text-emerald-400">{PROMPT}</span>
                <span className="text-gray-200">{line.text.slice(PROMPT.length)}</span>
              </>
            ) : line.type === "system" ? (
              <span className="italic text-gray-500">{line.text}</span>
            ) : (
              <span className="text-gray-400">{line.text}</span>
            )}
          </div>
        ))}
        <div className="flex min-h-[1.375rem] items-center">
          <span className="shrink-0 text-emerald-400">{PROMPT}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent font-mono text-[13px] leading-relaxed text-gray-200 outline-none caret-emerald-400"
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

export default Terminal;
