import React from "react";
import { TECH_STACK } from "../constants";
import { TechStackItem } from "../types";

const TechStack: React.FC = () => {
  const midpoint = Math.ceil(TECH_STACK.length / 2);
  const row1 = TECH_STACK.slice(0, midpoint);
  const row2 = TECH_STACK.slice(midpoint);

  const MarqueeRow: React.FC<{ items: TechStackItem[]; reverse?: boolean }> = ({
    items,
    reverse = false,
  }) => {
    const duplicated = [...items, ...items];

    return (
      <div className="group relative overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-r from-surface dark:from-surface-dark/50 to-transparent pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-l from-surface dark:from-surface-dark/50 to-transparent pointer-events-none" />

        <div
          className={`flex gap-6 md:gap-10 w-max ${
            reverse ? "animate-marquee-reverse" : "animate-marquee"
          } group-hover:[animation-play-state:paused]`}
        >
          {duplicated.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex flex-col items-center justify-center gap-3 px-5 py-4 min-w-[100px] md:min-w-[120px] rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/[0.06] backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-white dark:hover:bg-white/[0.07] hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 cursor-default select-none"
            >
              <tech.icon className="text-2xl md:text-3xl text-gray-500 dark:text-gray-400 transition-colors duration-300 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              <span className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-24 bg-surface dark:bg-surface-dark/50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-sm text-primary tracking-wide">
              &gt; tech_stack
            </span>
            <span className="h-px flex-1 bg-gray-200 dark:bg-white/10 max-w-[120px]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            Tech Stack
          </h2>
          <p className="text-gray-500 dark:text-gray-500 max-w-lg">
            Tools and technologies I use to build intelligent and scalable
            systems.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:gap-8">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
};

export default TechStack;
