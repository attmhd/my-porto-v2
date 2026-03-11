import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { TOOLS } from "../constants";
import { FiGithub, FiExternalLink, FiArrowLeft, FiCheckCircle, FiDownload, FiPlay } from "react-icons/fi";

const ToolDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const tool = TOOLS.find((t) => t.slug === slug);

    if (!tool) {
        return <Navigate to="/tools" replace />;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-background-dark pt-32 pb-24">
            <div className="container mx-auto px-6">
                {/* Back Link */}
                <Link
                    to="/tools"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-12 group"
                >
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-sm tracking-tight">&gt; back_to_tools</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Column: Info */}
                    <div className="lg:col-span-7">
                        <div className="mb-8">
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-6 inline-block">
                                {tool.category}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                                {tool.title}
                            </h1>
                            <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
                                {tool.description}
                            </p>
                        </div>

                        {/* Features Section */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                                <FiCheckCircle className="text-primary" />
                                Key Features
                            </h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {tool.features.map((feature, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05]"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 dark:text-gray-300 text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Installation Section */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                                <FiDownload className="text-primary" />
                                Installation
                            </h2>
                            <div className="p-6 rounded-2xl bg-gray-900 text-gray-300 font-mono text-sm leading-relaxed border border-white/10 whitespace-pre-line shadow-2xl">
                                {tool.installation}
                            </div>
                        </div>

                        {/* Usage Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                                <FiPlay className="text-primary" />
                                How to Use
                            </h2>
                            <div className="p-8 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05] text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                {tool.usage}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar / Links */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-40 space-y-6">
                            <div className="p-8 rounded-3xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05]">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Access Tool</h3>
                                <div className="space-y-4">
                                    {tool.githubUrl && (
                                        <a
                                            href={tool.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            <FiGithub className="text-xl" />
                                            View Source Code
                                        </a>
                                    )}
                                    {tool.demoUrl && (
                                        <a
                                            href={tool.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-primary text-white rounded-2xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            <FiExternalLink className="text-xl" />
                                            Download Now
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="p-8 rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-widest">About this tool</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-500 leading-loose">
                                    This utility is part of my personal collection of developer tools. It is maintained and updated periodically. If you encounter any issues or have feature requests, please open an issue on the GitHub repository.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolDetail;
