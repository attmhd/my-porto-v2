import React from "react";
import { TOOLS } from "../constants";


const Tools: React.FC = () => {
    return (
        <section id="tools" className="py-24 pt-32 bg-white dark:bg-background-dark/50 min-h-screen">
            <div className="container mx-auto px-6">
                {/* Section header */}
                <div className="max-w-3xl mb-14">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono text-sm text-primary tracking-wide">
                            &gt; tools
                        </span>
                        <span className="h-px flex-1 bg-gray-200 dark:bg-white/10 max-w-[120px]" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-3">
                        Developer Utilities
                    </h2>
                    <p className="text-gray-500 dark:text-gray-500 max-w-lg">
                        Small tools and automation scripts built to streamline repetitive tasks and browser interactions.
                    </p>
                </div>

                {/* Coming Soon State */}
                <div className="flex flex-col items-center justify-center py-20 px-6 bg-gray-50/50 dark:bg-white/[0.02] border border-dashed border-gray-300 dark:border-white/10 rounded-3xl">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                        <span className="text-3xl text-primary animate-pulse">⚡</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                        Tools are Under Construction
                    </h3>
                    <p className="text-gray-500 dark:text-gray-500 text-center max-w-md mx-auto">
                        I'm currently polishing my favorite scripts and utilities for public release.
                        Stay tuned for some handy developer tools!
                    </p>
                    <div className="mt-8 flex gap-2">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full">
                            Developing
                        </span>
                        <span className="px-3 py-1 bg-gray-100 dark:bg-white/5 text-gray-500 text-[10px] font-bold uppercase tracking-wider rounded-full">
                            Q2 2026
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tools;
