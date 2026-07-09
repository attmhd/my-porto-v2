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
  updateAt,
} from "./shared";

type Props = AdminDraftProps & {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const CertificatesSection: React.FC<Props> = ({ draft, setDraft, page, setPage }) => {
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(draft.certificates.length / pageSize.certificates)),
    [draft.certificates.length],
  );
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize.certificates;
  const items = draft.certificates.slice(start, start + pageSize.certificates);

  return (
    <div className="space-y-4">
      <button
        onClick={() =>
          setDraft((prev) => ({
            ...prev,
            certificates: [
              { id: createId("cert"), name: "", issuer: "", date: "", url: "" },
              ...prev.certificates,
            ],
          }))
        }
        className="rounded-full border border-gray-200 px-4 py-2 text-sm dark:border-white/[0.08]"
      >
        Add certificate
      </button>

      {draft.certificates.length === 0 ? (
        <EmptyState
          title="No certificates"
          description="Add one to show it in the credentials panel."
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
                        Name
                      </span>
                      <input
                        className={fieldClass}
                        value={item.name}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            certificates: updateAt(prev.certificates, absoluteIndex, (cert) => ({
                              ...cert,
                              name: e.target.value,
                            })),
                          }))
                        }
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                        Issuer
                      </span>
                      <input
                        className={fieldClass}
                        value={item.issuer}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            certificates: updateAt(prev.certificates, absoluteIndex, (cert) => ({
                              ...cert,
                              issuer: e.target.value,
                            })),
                          }))
                        }
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                        Date
                      </span>
                      <input
                        className={fieldClass}
                        value={item.date}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            certificates: updateAt(prev.certificates, absoluteIndex, (cert) => ({
                              ...cert,
                              date: e.target.value,
                            })),
                          }))
                        }
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                        URL
                      </span>
                      <input
                        className={fieldClass}
                        value={item.url}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            certificates: updateAt(prev.certificates, absoluteIndex, (cert) => ({
                              ...cert,
                              url: e.target.value,
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
                          certificates: removeAt(prev.certificates, absoluteIndex),
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

export default CertificatesSection;
