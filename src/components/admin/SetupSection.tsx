import React from "react";
import { AdminDraftProps, fieldClass, sectionCardClass } from "./shared";

const SetupSection: React.FC<AdminDraftProps> = ({ draft, setDraft }) => {
  const fields = ["hardware", "os", "codeEditor"] as const;
  return (
    <div className={sectionCardClass}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {fields.map((field) => (
          <label key={field} className="block">
            <span className="mb-2 block text-sm capitalize text-gray-500 dark:text-gray-400">
              {field}
            </span>
            <input
              className={fieldClass}
              value={draft.setup[field]}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  setup: { ...prev.setup, [field]: e.target.value },
                }))
              }
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default SetupSection;
