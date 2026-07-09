import React from "react";
import { AdminDraftProps, fieldClass, sectionCardClass, textareaClass } from "./shared";

const fields = ["name", "role", "tagline", "location", "email", "cvUrl"] as const;

const ProfileSection: React.FC<AdminDraftProps> = ({ draft, setDraft }) => {
  const update = (field: (typeof fields)[number], value: string) => {
    setDraft((prev) => ({
      ...prev,
      userInfo: { ...prev.userInfo, [field]: value },
    }));
  };

  return (
    <div className={sectionCardClass}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field} className="block">
            <span className="mb-2 block text-sm capitalize text-gray-500 dark:text-gray-400">
              {field}
            </span>
            <input
              className={fieldClass}
              value={draft.userInfo[field]}
              onChange={(e) => update(field, e.target.value)}
            />
          </label>
        ))}
        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">about</span>
          <textarea
            className={textareaClass}
            value={draft.userInfo.about}
            onChange={(e) => update("about", e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

export default ProfileSection;
