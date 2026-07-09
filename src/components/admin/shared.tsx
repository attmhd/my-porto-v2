import React from "react";
import { PortfolioData } from "../../data/portfolio";

export const fieldClass =
  "w-full rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] px-4 py-3 text-sm text-gray-900 outline-none focus:border-primary/50 dark:text-white";

export const textareaClass =
  "w-full min-h-28 rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] px-4 py-3 text-sm text-gray-900 outline-none focus:border-primary/50 dark:text-white";

export const sectionCardClass =
  "rounded-2xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-surface-dark p-5";

export const createId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export function updateAt<T>(items: T[], index: number, updater: (item: T) => T): T[] {
  return items.map((item, itemIndex) => (itemIndex === index ? updater(item) : item));
}

export function removeAt<T>(items: T[], index: number): T[] {
  return items.filter((_, itemIndex) => itemIndex !== index);
}

export const pageSize = {
  techStack: 8,
  projects: 4,
  tools: 4,
  education: 4,
  certificates: 4,
} as const;

export type AdminDraftProps = {
  draft: PortfolioData;
  setDraft: React.Dispatch<React.SetStateAction<PortfolioData>>;
};

export type PaginationProps = {
  page: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
};

export function Pagination({ page, total, onPrev, onNext }: PaginationProps) {
  const totalPages = Math.max(1, total);
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
      <span className="text-xs text-gray-500 dark:text-gray-400">
        Page {page} of {totalPages}
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={page <= 1}
          className="rounded-full border border-gray-200 px-3 py-1.5 text-xs disabled:opacity-40 dark:border-white/[0.08]"
        >
          Prev
        </button>
        <button
          onClick={onNext}
          disabled={page >= totalPages}
          className="rounded-full border border-gray-200 px-3 py-1.5 text-xs disabled:opacity-40 dark:border-white/[0.08]"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-500 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-gray-400">
      <div className="font-semibold text-gray-900 dark:text-white">{title}</div>
      <p className="mt-1">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
