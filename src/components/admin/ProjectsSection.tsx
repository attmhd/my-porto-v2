import React, { useMemo } from "react";
import {
  AdminDraftProps,
  EmptyState,
  Pagination,
  createId,
  fieldClass,
  pageSize,
  removeAt,
  sectionCardClass,
  splitLines,
  textareaClass,
  updateAt,
} from "./shared";

type Props = AdminDraftProps & {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const PROJECT_CATEGORIES = [
  "Backend",
  "DevOps",
  "System Design",
  "AI/ML",
  "Data Science",
  "Frontend",
  "Fullstack",
  "Mobile",
];

interface TechInputProps {
  technologies: string[];
  onChange: (techs: string[]) => void;
}

const TechInput: React.FC<TechInputProps> = ({ technologies, onChange }) => {
  const [inputVal, setInputVal] = React.useState("");

  const processAndAdd = (rawText: string) => {
    const parts = rawText
      .split(/[;,]/)
      .map((t) => t.trim())
      .filter((t) => t && !technologies.includes(t));
    if (parts.length > 0) {
      onChange([...technologies, ...parts]);
    }
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      processAndAdd(inputVal);
    } else if (e.key === "Backspace" && !inputVal && technologies.length > 0) {
      e.preventDefault();
      onChange(technologies.slice(0, -1));
    }
  };

  const handleBlur = () => {
    processAndAdd(inputVal);
  };

  const handleRemove = (index: number) => {
    onChange(technologies.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] px-4 py-2 flex flex-wrap gap-2 items-start focus-within:border-primary/50 outline-none min-h-28 align-top">
      {technologies.map((tech, i) => (
        <span
          key={`${tech}-${i}`}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-white/[0.06] text-gray-800 dark:text-gray-200 rounded-full border border-gray-200 dark:border-white/[0.08] transition-all hover:bg-gray-200 dark:hover:bg-white/[0.12] select-none"
        >
          {tech}
          <button
            type="button"
            onClick={() => handleRemove(i)}
            className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 font-bold focus:outline-none transition-colors leading-[1]"
          >
            &times;
          </button>
        </span>
      ))}
      <input
        type="text"
        className="flex-1 min-w-[120px] bg-transparent text-sm text-gray-900 dark:text-white border-0 p-0.5 focus:ring-0 focus:outline-none placeholder-gray-400 dark:placeholder-gray-600"
        value={inputVal}
        placeholder={technologies.length === 0 ? "Type tech and press Enter..." : "Add tech..."}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
    </div>
  );
};

const ProjectsSection: React.FC<Props> = ({ draft, setDraft, page, setPage }) => {
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(draft.projects.length / pageSize.projects)),
    [draft.projects.length],
  );
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize.projects;
  const items = draft.projects.slice(start, start + pageSize.projects);

  return (
    <div className="space-y-4">
      <button
        onClick={() =>
          setDraft((prev) => ({
            ...prev,
            projects: [
              {
                id: createId("project"),
                title: "",
                description: "",
                technologies: [],
                category: "Backend",
                githubUrl: "",
                demoUrl: "",
              },
              ...prev.projects,
            ],
          }))
        }
        className="rounded-full border border-gray-200 px-4 py-2 text-sm dark:border-white/[0.08]"
      >
        Add project
      </button>

      {draft.projects.length === 0 ? (
        <EmptyState
          title="No projects"
          description="Create a project to display it on the public site."
        />
      ) : (
        <>
          <Pagination
            page={safePage}
            total={totalPages}
            onPrev={() => setPage((value) => Math.max(1, value - 1))}
            onNext={() => setPage((value) => Math.min(totalPages, value + 1))}
          />
          <div className="grid gap-4">
            {items.map((project, index) => {
              const absoluteIndex = start + index;
              return (
                <div key={project.id} className={sectionCardClass}>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                        Title
                      </span>
                      <input
                        className={fieldClass}
                        value={project.title}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            projects: updateAt(prev.projects, absoluteIndex, (item) => ({
                              ...item,
                              title: e.target.value,
                            })),
                          }))
                        }
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                        Category
                      </span>
                      <select
                        className={`${fieldClass} dark:bg-[#18181b]`}
                        value={project.category}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            projects: updateAt(prev.projects, absoluteIndex, (item) => ({
                              ...item,
                              category: e.target.value,
                            })),
                          }))
                        }
                      >
                        {!PROJECT_CATEGORIES.includes(project.category) && (
                          <option className="bg-white dark:bg-[#18181b] text-gray-900 dark:text-white" value={project.category}>
                            {project.category}
                          </option>
                        )}
                        {PROJECT_CATEGORIES.map((cat) => (
                          <option className="bg-white dark:bg-[#18181b] text-gray-900 dark:text-white" key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label className="mt-4 block">
                    <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                      Description
                    </span>
                    <textarea
                      className={textareaClass}
                      value={project.description}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          projects: updateAt(prev.projects, absoluteIndex, (item) => ({
                            ...item,
                            description: e.target.value,
                          })),
                        }))
                      }
                    />
                  </label>
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="block">
                      <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                        Technologies
                      </span>
                      <TechInput
                        technologies={project.technologies}
                        onChange={(techs) =>
                          setDraft((prev) => ({
                            ...prev,
                            projects: updateAt(prev.projects, absoluteIndex, (item) => ({
                              ...item,
                              technologies: techs,
                            })),
                          }))
                        }
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <label className="block">
                        <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                          GitHub URL
                        </span>
                        <input
                          className={fieldClass}
                          value={project.githubUrl ?? ""}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              projects: updateAt(prev.projects, absoluteIndex, (item) => ({
                                ...item,
                                githubUrl: e.target.value,
                              })),
                            }))
                          }
                        />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                          Demo URL
                        </span>
                        <input
                          className={fieldClass}
                          value={project.demoUrl ?? ""}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              projects: updateAt(prev.projects, absoluteIndex, (item) => ({
                                ...item,
                                demoUrl: e.target.value,
                              })),
                            }))
                          }
                        />
                      </label>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-400">ID: {project.id}</span>
                    <button
                      onClick={() =>
                        setDraft((prev) => ({
                          ...prev,
                          projects: removeAt(prev.projects, absoluteIndex),
                        }))
                      }
                      className="text-sm text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectsSection;
