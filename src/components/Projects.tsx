import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaExternalLinkAlt, FaGithub, FaTimes } from "react-icons/fa";
import { PORTFOLIO_CONTENT as data, UI_CONTENT } from "../data/portfolioContent";
import type { PortfolioProject } from "../types";
import Reveal from "./Reveal";

export const Projects: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState(UI_CONTENT.projects.allCategory);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const dialogRef = useRef<HTMLElement>(null);

  const categories = [
    UI_CONTENT.projects.allCategory,
    ...Array.from(new Set(data.projects.map((project) => project.category))),
  ];
  const filtered =
    activeCategory === UI_CONTENT.projects.allCategory
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
          <Reveal className="dn-section-heading">
            <h2 id="projects-title">{UI_CONTENT.projects.title}</h2>
            <p>
              {UI_CONTENT.projects.description}
            </p>
          </Reveal>

          {categories.length > 1 && (
            <Reveal className="dn-filter" delay={0.08}>
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
            </Reveal>
          )}

          {visible.length ? (
            <div className="dn-project-grid">
              {visible.map((project, index) => (
                <article
                  key={project.id}
                  className={`dn-project-card dn-project-card--${index % 3}`}
                >
                  <button
                    type="button"
                    className={`dn-project-card__visual dn-project-art--${index % 4}`}
                    onClick={() => setSelectedProject(project)}
                    aria-label={`${UI_CONTENT.projects.openDetailsLabel} ${project.title}`}
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
                      <ul aria-label={`${UI_CONTENT.projects.technologiesLabel} ${project.title}`}>
                        {project.technologies.slice(0, 4).map((technology) => (
                          <li key={technology}>{technology}</li>
                        ))}
                      </ul>
                      <div className="dn-project-card__actions">
                        <button type="button" onClick={() => setSelectedProject(project)}>
                          {UI_CONTENT.projects.details} <FaArrowRight aria-hidden="true" />
                        </button>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} ${UI_CONTENT.projects.sourceLabel}`}
                          >
                            <FaGithub aria-hidden="true" />
                          </a>
                        )}
                        {project.demoUrl && project.demoUrl !== "#" && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} ${UI_CONTENT.projects.demoLabel}`}
                          >
                            <FaExternalLinkAlt aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="dn-empty-state">
              <h3>{UI_CONTENT.projects.emptyTitle}</h3>
              <p>{UI_CONTENT.projects.emptyDescription}</p>
            </div>
          )}

          {filtered.length > 6 && (
            <button
              type="button"
              className="dn-button dn-button--outline dn-projects__more"
              onClick={() => setShowAll((current) => !current)}
            >
              {showAll ? UI_CONTENT.projects.showSelected : `${UI_CONTENT.projects.viewAll} ${filtered.length} ${UI_CONTENT.projects.countLabel}`}
            </button>
          )}
        </div>
      </section>

      {selectedProject && (
          <div
            className="dn-dialog-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedProject(null);
            }}
          >
            <article
              ref={dialogRef}
              className="dn-project-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              tabIndex={-1}
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
                    aria-label={UI_CONTENT.projects.closeDetails}
                  >
                    <FaTimes aria-hidden="true" />
                  </button>
                </div>
                <p className="dn-project-dialog__description">{selectedProject.description}</p>
                <ul className="dn-project-dialog__tech" aria-label={UI_CONTENT.projects.dialogTechnologiesLabel}>
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
                      <FaGithub aria-hidden="true" /> {UI_CONTENT.projects.source}
                    </a>
                  )}
                  {selectedProject.demoUrl && selectedProject.demoUrl !== "#" && (
                    <a
                      className="dn-button dn-button--primary"
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {UI_CONTENT.projects.demo} <FaExternalLinkAlt aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          </div>
      )}
    </>
  );
};

export default Projects;
