import React from "react";
import { Link } from "react-router-dom";
import { TOOLS } from "../constants";
import { FiGithub, FiExternalLink } from "react-icons/fi";

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
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                        Developer Utilities
                    </h2>
                    <p className="text-gray-500 dark:text-gray-500 max-w-lg">
                        Specialized scripts and automation tools designed to simplify complex workflows and web interactions.
                    </p>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {TOOLS.map((tool) => (
                        <Link
                            key={tool.id}
                            to={`/tools/${tool.slug}`}
                            className="group flex flex-col justify-between bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200/80 dark:border-white/[0.06] rounded-2xl p-6 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-none relative overflow-hidden"
                        >
                            {/* Decorative gradient overlay */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500" />

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-200/50 dark:border-white/10">
                                        {tool.category}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors duration-300">
                                    {tool.title}
                                </h3>

                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                                    {tool.description}
                                </p>
                            </div>

                            <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/[0.04] flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-3">
                                    {tool.githubUrl && (
                                        <div
                                            onClick={(e) => e.stopPropagation()}
                                            className="contents"
                                        >
                                            <a
                                                href={tool.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2.5 rounded-xl bg-white dark:bg-white/5 text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary border border-gray-200 dark:border-white/10 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-200"
                                                title="View Source"
                                            >
                                                <FiGithub className="text-lg" />
                                            </a>
                                        </div>
                                    )}
                                    {tool.demoUrl && (
                                        <div
                                            onClick={(e) => e.stopPropagation()}
                                            className="contents"
                                        >
                                            <a
                                                href={tool.demoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2.5 rounded-xl bg-white dark:bg-white/5 text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary border border-gray-200 dark:border-white/10 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-200"
                                                title="View Deployment / Release"
                                            >
                                                <FiExternalLink className="text-lg" />
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <div className="text-[10px] font-mono text-gray-400 dark:text-gray-600">
                                    ID: {tool.id.padStart(2, '0')}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Contribution/CTA */}
                <div className="mt-20 p-8 rounded-3xl bg-gray-900 dark:bg-primary/5 border border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h4 className="text-xl font-bold text-white mb-2">Want to collaborate?</h4>
                        <p className="text-gray-400 text-sm max-w-md">
                            All my tools are open source. Feel free to contribute or suggest new features on GitHub.
                        </p>
                    </div>
                    <a
                        href="https://github.com/attmhd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-all duration-300 shadow-lg shadow-white/5"
                    >
                        Visit GitHub Profile
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Tools;
