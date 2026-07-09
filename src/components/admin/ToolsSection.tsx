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

const ToolsSection: React.FC<Props> = ({ draft, setDraft, page, setPage }) => {
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(draft.tools.length / pageSize.tools)),
    [draft.tools.length],
  );
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize.tools;
  const items = draft.tools.slice(start, start + pageSize.tools);

  return (
    <div className="space-y-4">
      <button
        onClick={() =>
          setDraft((prev) => ({
            ...prev,
            tools: [
              {
                id: createId("tool"),
                slug: "",
                title: "",
                description: "",
                category: "Automation",
                features: [],
                installation: "",
                usage: "",
                githubUrl: "",
                demoUrl: "",
              },
              ...prev.tools,
            ],
          }))
        }
        className="rounded-full border border-gray-200 px-4 py-2 text-sm dark:border-white/[0.08]"
      >
        Add tool
      </button>

      {draft.tools.length === 0 ? (
        <EmptyState
          title="No tools"
          description="Add a tool to display it on the public tools page."
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
            {items.map((tool, index) => {
              const absoluteIndex = start + index;
              return (
                <div key={tool.id} className={sectionCardClass}>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                        Slug
                      </span>
                      <input
                        className={fieldClass}
                        value={tool.slug}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            tools: updateAt(prev.tools, absoluteIndex, (item) => ({
                              ...item,
                              slug: e.target.value,
                            })),
                          }))
                        }
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                        Title
                      </span>
                      <input
                        className={fieldClass}
                        value={tool.title}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            tools: updateAt(prev.tools, absoluteIndex, (item) => ({
                              ...item,
                              title: e.target.value,
                            })),
                          }))
                        }
                      />
                    </label>
                  </div>
                  <label className="mt-4 block">
                    <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                      Description
                    </span>
                    <textarea
                      className={textareaClass}
                      value={tool.description}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          tools: updateAt(prev.tools, absoluteIndex, (item) => ({
                            ...item,
                            description: e.target.value,
                          })),
                        }))
                      }
                    />
                  </label>
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                        Category
                      </span>
                      <input
                        className={fieldClass}
                        value={tool.category}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            tools: updateAt(prev.tools, absoluteIndex, (item) => ({
                              ...item,
                              category: e.target.value,
                            })),
                          }))
                        }
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                        Features
                      </span>
                      <textarea
                        className={textareaClass}
                        value={tool.features.join("\n")}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            tools: updateAt(prev.tools, absoluteIndex, (item) => ({
                              ...item,
                              features: splitLines(e.target.value),
                            })),
                          }))
                        }
                      />
                    </label>
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                        Installation
                      </span>
                      <textarea
                        className={textareaClass}
                        value={tool.installation}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            tools: updateAt(prev.tools, absoluteIndex, (item) => ({
                              ...item,
                              installation: e.target.value,
                            })),
                          }))
                        }
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                        Usage
                      </span>
                      <textarea
                        className={textareaClass}
                        value={tool.usage}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            tools: updateAt(prev.tools, absoluteIndex, (item) => ({
                              ...item,
                              usage: e.target.value,
                            })),
                          }))
                        }
                      />
                    </label>
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                        GitHub URL
                      </span>
                      <input
                        className={fieldClass}
                        value={tool.githubUrl ?? ""}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            tools: updateAt(prev.tools, absoluteIndex, (item) => ({
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
                        value={tool.demoUrl ?? ""}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            tools: updateAt(prev.tools, absoluteIndex, (item) => ({
                              ...item,
                              demoUrl: e.target.value,
                            })),
                          }))
                        }
                      />
                    </label>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-400">ID: {tool.id}</span>
                    <button
                      onClick={() =>
                        setDraft((prev) => ({
                          ...prev,
                          tools: removeAt(prev.tools, absoluteIndex),
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

export default ToolsSection;
