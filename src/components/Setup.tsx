import React from "react";
import { usePortfolio } from "../contexts/PortfolioContext";

const Setup: React.FC = () => {
  const { data } = usePortfolio();
  return (
    <section id="setup" className="py-24 bg-white dark:bg-surface-dark/50">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-sm text-primary tracking-wide">
              &gt; setup
            </span>
            <span className="h-px flex-1 bg-gray-200 dark:bg-white/10 max-w-[120px]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            My Setup
          </h2>
          <p className="text-gray-500 dark:text-gray-500 max-w-lg">
            The hardware, operating system, and tools I use for development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-gray-50/80 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Hardware
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-600">
              {data.setup.hardware}
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-gray-50/80 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Operating System
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-600">
              {data.setup.os}
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-gray-50/80 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Code Editor
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-600">
              {data.setup.codeEditor}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Setup;
