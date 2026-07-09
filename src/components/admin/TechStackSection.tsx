import React from "react";
import { getTechStackIcon, TECH_STACK_ICON_OPTIONS } from "../../data/portfolio";
import {
  AdminDraftProps,
  EmptyState,
  Pagination,
  fieldClass,
  pageSize,
  removeAt,
  sectionCardClass,
  updateAt,
} from "./shared";

type Props = AdminDraftProps & {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const TechStackSection: React.FC<Props> = ({ draft, setDraft, page, setPage }) => {
  const totalPages = Math.max(1, Math.ceil(draft.techStack.length / pageSize.techStack));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize.techStack;
  const items = draft.techStack.slice(start, start + pageSize.techStack);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() =>
            setDraft((prev) => ({
              ...prev,
              techStack: [{ name: "", iconName: "Python", category: "Language" }, ...prev.techStack],
            }))
          }
          className="rounded-full border border-gray-200 px-4 py-2 text-sm dark:border-white/[0.08]"
        >
          Add item
        </button>
      </div>

      {draft.techStack.length === 0 ? (
        <EmptyState
          title="No tech stack items"
          description="Add items to show them on the public site."
          action={null}
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
              const Icon = getTechStackIcon(item.iconName);
              return (
                <div key={`${item.name}-${absoluteIndex}`} className={sectionCardClass}>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <label className="block">
                      <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                        Name
                      </span>
                      <input
                        className={fieldClass}
                        value={item.name}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            techStack: updateAt(prev.techStack, absoluteIndex, (tech) => ({
                              ...tech,
                              name: e.target.value,
                            })),
                          }))
                        }
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                        Icon
                      </span>
                      <select
                        className={fieldClass}
                        value={item.iconName}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            techStack: updateAt(prev.techStack, absoluteIndex, (tech) => ({
                              ...tech,
                              iconName: e.target.value as typeof item.iconName,
                            })),
                          }))
                        }
                      >
                        {TECH_STACK_ICON_OPTIONS.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                        Category
                      </span>
                      <select
                        className={fieldClass}
                        value={item.category}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            techStack: updateAt(prev.techStack, absoluteIndex, (tech) => ({
                              ...tech,
                              category: e.target.value,
                            })),
                          }))
                        }
                      >
                        <option value="Language">Language</option>
                        <option value="Framework">Framework</option>
                        <option value="Tool">Tool</option>
                        <option value="Cloud">Cloud</option>
                      </select>
                    </label>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-gray-400">
                      <Icon className="text-sm" /> Item {absoluteIndex + 1}
                    </span>
                    <button
                      onClick={() =>
                        setDraft((prev) => ({
                          ...prev,
                          techStack: removeAt(prev.techStack, absoluteIndex),
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

export default TechStackSection;
