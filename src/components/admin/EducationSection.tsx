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
  textareaClass,
  updateAt,
} from "./shared";

type Props = AdminDraftProps & {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const EducationSection: React.FC<Props> = ({ draft, setDraft, page, setPage }) => {
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(draft.education.length / pageSize.education)),
    [draft.education.length],
  );
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize.education;
  const items = draft.education.slice(start, start + pageSize.education);

  return (
    <div className="space-y-4">
      <button
        onClick={() =>
          setDraft((prev) => ({
            ...prev,
            education: [
              {
                id: createId("edu"),
                institution: "",
                degree: "",
                year: "",
                description: "",
              },
              ...prev.education,
            ],
          }))
        }
        className="rounded-full border border-gray-200 px-4 py-2 text-sm dark:border-white/[0.08]"
      >
        Add entry
      </button>

      {draft.education.length === 0 ? (
        <EmptyState
          title="No education entries"
          description="Add a record to show it in the timeline."
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
            {items.map((item, index) => {
              const absoluteIndex = start + index;
              return (
                <div key={item.id} className={sectionCardClass}>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                        Institution
                      </span>
                      <input
                        className={fieldClass}
                        value={item.institution}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            education: updateAt(prev.education, absoluteIndex, (edu) => ({
                              ...edu,
                              institution: e.target.value,
                            })),
                          }))
                        }
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                        Year
                      </span>
                      <input
                        className={fieldClass}
                        value={item.year}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            education: updateAt(prev.education, absoluteIndex, (edu) => ({
                              ...edu,
                              year: e.target.value,
                            })),
                          }))
                        }
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                        Degree
                      </span>
                      <input
                        className={fieldClass}
                        value={item.degree}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            education: updateAt(prev.education, absoluteIndex, (edu) => ({
                              ...edu,
                              degree: e.target.value,
                            })),
                          }))
                        }
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                        Description
                      </span>
                      <textarea
                        className={textareaClass}
                        value={item.description ?? ""}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            education: updateAt(prev.education, absoluteIndex, (edu) => ({
                              ...edu,
                              description: e.target.value,
                            })),
                          }))
                        }
                      />
                    </label>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-400">ID: {item.id}</span>
                    <button
                      onClick={() =>
                        setDraft((prev) => ({
                          ...prev,
                          education: removeAt(prev.education, absoluteIndex),
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

export default EducationSection;
