import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { usePortfolio } from "../contexts/PortfolioContext";
import { PortfolioProject } from "../data/portfolio";

const Projects: React.FC = () => {
  const { data } = usePortfolio();
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const categories = [
    "All",
    ...Array.from(new Set(data.projects.map((p) => p.category))),
  ];

  const filtered =
    activeCategory === "All"
      ? data.projects
      : data.projects.filter((p) => p.category === activeCategory);

  const visible = showAll ? filtered : filtered.slice(0, 6);

  return (
    <>
      <section
        id="projects"
        className="py-24 bg-gray-50/80 dark:bg-background-dark"
      >
        <div className="container mx-auto px-6">
          {/* Section header */}
          <div className="max-w-3xl mb-14">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-sm text-primary tracking-wide">
                &gt; projects
              </span>
              <span className="h-px flex-1 bg-gray-200 dark:bg-white/10 max-w-[120px]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
              Featured Projects
            </h2>
            <p className="text-gray-500 dark:text-gray-500 max-w-lg">
              Selected works demonstrating end-to-end engineering capabilities.
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setShowAll(false);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors border ${activeCategory === cat
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
                    : "bg-transparent text-gray-500 dark:text-gray-500 border-gray-200 dark:border-white/[0.08] hover:border-gray-400 dark:hover:border-white/20 hover:text-gray-900 dark:hover:text-white"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visible.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col justify-between bg-white dark:bg-white/[0.02] border border-gray-200/80 dark:border-white/[0.06] rounded-2xl p-6 hover:border-gray-300 dark:hover:border-white/[0.12] transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-none"
              >
                <div>
                  {/* Category */}
                  <span className="text-[11px] font-mono text-gray-400 dark:text-gray-600 mb-3 block">
                    {project.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-base font-display font-bold text-gray-900 dark:text-white mb-2 leading-snug group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 dark:text-gray-500 leading-relaxed mb-5 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono text-gray-500 dark:text-gray-600 bg-gray-50 dark:bg-white/[0.03] border border-gray-200/60 dark:border-white/[0.06] px-2 py-0.5 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[11px] font-mono text-gray-400 dark:text-gray-700 px-1 py-0.5">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action links */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/[0.04]">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors flex items-center gap-1.5 group/btn"
                  >
                    Details
                    <span className="group-hover/btn:translate-x-0.5 transition-transform duration-200">
                      →
                    </span>
                  </button>
                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-all duration-200"
                        title="View Source Code"
                      >
                        <FiGithub className="text-lg" />
                      </a>
                    )}
                    {project.demoUrl && project.demoUrl !== "#" && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-all duration-200"
                        title="Live Demo"
                      >
                        <FiExternalLink className="text-lg" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show more / less */}
          {filtered.length > 6 && !showAll && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAll(true)}
                className="px-6 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/[0.08] rounded-full hover:border-gray-400 dark:hover:border-white/20 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Show all {filtered.length} projects
              </button>
            </div>
          )}
          {showAll && filtered.length > 6 && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAll(false)}
                className="px-6 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/[0.08] rounded-full hover:border-gray-400 dark:hover:border-white/20 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Show less
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Detail modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white dark:bg-surface-dark border border-gray-200/60 dark:border-white/[0.08] rounded-t-2xl md:rounded-2xl w-full md:max-w-lg max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-sm px-6 pt-6 pb-4 border-b border-gray-100 dark:border-white/[0.06] flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-gray-400 dark:text-gray-600 mb-2 block">
                  {selectedProject.category}
                </span>
                <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white tracking-tight leading-snug">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="shrink-0 p-1.5 rounded-lg text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors mt-0.5"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-5">
              {/* Full description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {selectedProject.description}
              </p>

              {/* All tech tags */}
              <div>
                <span className="text-[11px] font-mono text-gray-400 dark:text-gray-600 uppercase tracking-wider mb-2.5 block">
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-white/[0.03] border border-gray-200/60 dark:border-white/[0.06] px-2.5 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              {(selectedProject.demoUrl && selectedProject.demoUrl !== "#") ||
                selectedProject.githubUrl ? (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/[0.08] rounded-xl hover:border-gray-400 dark:hover:border-white/20 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <FiGithub className="text-base" />
                      Source Code
                    </a>
                  )}
                  {selectedProject.demoUrl &&
                    selectedProject.demoUrl !== "#" && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors shadow-lg shadow-gray-900/10 dark:shadow-white/10"
                      >
                        <FiExternalLink className="text-base" />
                        Live Demo
                      </a>
                    )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
