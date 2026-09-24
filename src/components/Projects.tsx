import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaExternalLinkAlt, FaGithub, FaTimes } from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";
import { usePortfolio } from "../contexts/PortfolioContext";
import { PortfolioProject } from "../data/portfolio";
import MotionReveal from "./MotionReveal";

export const Projects: React.FC = () => {
  const { data } = usePortfolio();
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const dialogRef = useRef<HTMLElement>(null);

  const categories = [
    "All",
    ...Array.from(new Set(data.projects.map((project) => project.category))),
  ];
  const filtered =
    activeCategory === "All"
      ? data.projects
      : data.projects.filter((project) => project.category === activeCategory);
  const visible = showAll ? filtered : filtered.slice(0, 6);

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <>
      <section id="projects" className="dn-section dn-projects" aria-labelledby="projects-title">
        <div className="dn-container">
          <MotionReveal className="dn-section-heading">
            <h2 id="projects-title">Selected systems and experiments.</h2>
            <p>
              Practical software shaped around real constraints, from backend
              services to applied machine learning.
            </p>
          </MotionReveal>

          {categories.length > 1 && (
            <MotionReveal className="dn-filter" delay={0.08}>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={activeCategory === category ? "is-active" : ""}
                  onClick={() => {
                    setActiveCategory(category);
                    setShowAll(false);
                  }}
                >
                  {category}
                </button>
              ))}
            </MotionReveal>
          )}

          {visible.length ? (
            <div className="dn-project-grid">
              {visible.map((project, index) => (
                <motion.article
                  key={project.id}
                  className={`dn-project-card dn-project-card--${index % 3}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -48 : 48, y: 18 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.14 }}
                  transition={{
                    duration: 0.76,
                    delay: (index % 3) * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <button
                    type="button"
                    className={`dn-project-card__visual dn-project-art--${index % 4}`}
                    onClick={() => setSelectedProject(project)}
                    aria-label={`Open details for ${project.title}`}
                  >
                    <span>{project.category}</span>
                  </button>
                  <div className="dn-project-card__body">
                    <div className="dn-project-card__index">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3>
                        <button type="button" onClick={() => setSelectedProject(project)}>
                          {project.title}
                        </button>
                      </h3>
                      <p>{project.description}</p>
                      <ul aria-label={`Technologies used in ${project.title}`}>
                        {project.technologies.slice(0, 4).map((technology) => (
                          <li key={technology}>{technology}</li>
                        ))}
                      </ul>
                      <div className="dn-project-card__actions">
                        <button type="button" onClick={() => setSelectedProject(project)}>
                          View project <FaArrowRight aria-hidden="true" />
                        </button>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} source on GitHub`}
                          >
                            <FaGithub aria-hidden="true" />
                          </a>
                        )}
                        {project.demoUrl && project.demoUrl !== "#" && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} live demo`}
                          >
                            <FaExternalLinkAlt aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="dn-empty-state">
              <h3>No projects in this category yet.</h3>
              <p>Choose another filter to explore the current portfolio.</p>
            </div>
          )}

          {filtered.length > 6 && (
            <button
              type="button"
              className="dn-button dn-button--outline dn-projects__more"
              onClick={() => setShowAll((current) => !current)}
            >
              {showAll ? "Show selected work" : `View all ${filtered.length} projects`}
            </button>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="dn-dialog-backdrop"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedProject(null);
            }}
          >
            <motion.article
              ref={dialogRef}
              className="dn-project-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              tabIndex={-1}
              initial={{ opacity: 0, y: 28, scale: 0.975 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
            >
              <div className="dn-project-dialog__art" aria-hidden="true" />
              <div className="dn-project-dialog__content">
                <div className="dn-dialog-header">
                  <div>
                    <p className="dn-dialog-label">{selectedProject.category}</p>
                    <h2 id="project-dialog-title">{selectedProject.title}</h2>
                  </div>
                  <button
                    type="button"
                    className="dn-icon-button"
                    onClick={() => setSelectedProject(null)}
                    aria-label="Close project details"
                  >
                    <FaTimes aria-hidden="true" />
                  </button>
                </div>
                <p className="dn-project-dialog__description">{selectedProject.description}</p>
                <ul className="dn-project-dialog__tech" aria-label="Technologies used">
                  {selectedProject.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
                <div className="dn-project-dialog__actions">
                  {selectedProject.githubUrl && (
                    <a
                      className="dn-button dn-button--outline"
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub aria-hidden="true" /> Source
                    </a>
                  )}
                  {selectedProject.demoUrl && selectedProject.demoUrl !== "#" && (
                    <a
                      className="dn-button dn-button--primary"
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live demo <FaExternalLinkAlt aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;
