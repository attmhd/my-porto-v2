import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { clonePortfolioData, PortfolioData } from "../data/portfolio";
import { usePortfolio } from "../contexts/PortfolioContext";
import { getSupabaseClient, isSupabaseConfigured } from "../services/supabaseClient";
import CertificatesSection from "../components/admin/CertificatesSection";
import EducationSection from "../components/admin/EducationSection";
import ProfileSection from "../components/admin/ProfileSection";
import ProjectsSection from "../components/admin/ProjectsSection";
import SetupSection from "../components/admin/SetupSection";
import TechStackSection from "../components/admin/TechStackSection";
import ToolsSection from "../components/admin/ToolsSection";
import BlogSection from "../components/admin/BlogSection";
import { ToastProvider, useToast } from "../components/admin/ToastContext";

type TabKey =
  | "profile"
  | "setup"
  | "tech-stack"
  | "projects"
  | "tools"
  | "education"
  | "certificates"
  | "blog";

const tabs: { key: TabKey; label: string }[] = [
  { key: "profile", label: "Profile" },
  { key: "setup", label: "Setup" },
  { key: "tech-stack", label: "Tech Stack" },
  { key: "projects", label: "Projects" },
  { key: "tools", label: "Tools" },
  { key: "education", label: "Education" },
  { key: "certificates", label: "Certificates" },
  { key: "blog", label: "Blog" },
];

const cardClass =
  "rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/[0.08] dark:bg-surface-dark";

const AdminContent: React.FC = () => {
  const { data, setData, resetData, isReady, storageLabel } = usePortfolio();
  const [draft, setDraft] = useState<PortfolioData>(clonePortfolioData(data));
  const [activeTab, setActiveTab] = useState<TabKey>("profile");
  const [pages, setPages] = useState({
    techStack: 1,
    projects: 1,
    tools: 1,
    education: 1,
    certificates: 1,
  });
  const [status, setStatus] = useState<"idle" | "saved">("idle");
  
  const { showToast } = useToast();

  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const supabase = getSupabaseClient();

  useEffect(() => {
    if (!supabase) {
      setCheckingAuth(false);
      return;
    }

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setCheckingAuth(false);
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;

    setLoggingIn(true);
    setAuthError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAuthError(error.message);
        showToast(error.message, "error");
      } else {
        setUser(data.user);
        showToast("Logged in successfully!", "success");
      }
    } catch (err: any) {
      setAuthError(err.message ?? "An unexpected error occurred.");
      showToast(err.message ?? "An unexpected error occurred.", "error");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    showToast("Logged out successfully!", "info");
  };

  useEffect(() => {
    if (isReady) setDraft(clonePortfolioData(data));
  }, [data, isReady]);

  const showSaved = (message: string) => {
    setStatus("saved");
    showToast(message, "success");
    window.setTimeout(() => setStatus("idle"), 1800);
  };

  const save = () => {
    setData(clonePortfolioData(draft));
    showSaved("Portfolio changes saved successfully!");
  };

  const reset = () => {
    resetData();
    showSaved("Portfolio changes reset to database values.");
  };

  const sectionNote = useMemo(
    () => ({
      "tech-stack": `${draft.techStack.length} items`,
      projects: `${draft.projects.length} projects`,
      tools: `${draft.tools.length} tools`,
      education: `${draft.education.length} entries`,
      certificates: `${draft.certificates.length} certificates`,
    }),
    [draft],
  );

  if (checkingAuth || !isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-gray-900 dark:bg-background-dark dark:text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Loading admin panel...</div>
        </div>
      </div>
    );
  }

  // Render Login Card if Supabase is configured and user is not authenticated
  if (isSupabaseConfigured() && !user) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-background-dark">
        {/* Soft background glows */}
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/20 blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-[80px] pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl dark:border-white/[0.08] dark:bg-surface-dark sm:p-10">
          <div className="text-center font-mono">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">&gt; admin portal</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Sign in to manage your portfolio content</p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            {authError && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-center text-sm text-red-600 dark:text-red-400 font-mono">
                {authError}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-primary dark:border-white/[0.08] dark:bg-background-dark dark:focus:border-primary"
                placeholder="admin@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-primary dark:border-white/[0.08] dark:bg-background-dark dark:focus:border-primary"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-800 disabled:opacity-50 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              {loggingIn ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Verifying...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center font-mono text-[10px] text-gray-400 dark:text-gray-500 mt-2">
              Secured with Supabase Authentication
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-background-dark dark:text-white">
      <div className="container mx-auto max-w-7xl px-6 py-24">
        {/* Banner if Supabase not configured */}
        {!isSupabaseConfigured() && (
          <div className="mb-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-800 dark:text-amber-300 font-mono">
            ⚠️ <strong>Supabase is not configured.</strong> Portfolio data is currently loaded/saved using <strong>Local Storage fallback</strong>.
            Configure your <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> in `.env` to enable proper database tables and secure authentication.
          </div>
        )}

        <div className="mb-8 flex flex-col gap-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="font-mono text-sm text-primary tracking-wide">&gt; admin</span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                Portfolio Content Manager
              </h1>
              <p className="mt-3 max-w-2xl text-gray-500 dark:text-gray-400">
                Modular, readable, and section-based editing.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="rounded-full border border-gray-200 px-4 py-2 text-sm dark:border-white/[0.08]"
              >
                Back
              </Link>
              <button
                onClick={reset}
                className="rounded-full border border-gray-200 px-4 py-2 text-sm dark:border-white/[0.08]"
              >
                Reset
              </button>
              <button
                onClick={save}
                className="rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white dark:bg-white dark:text-gray-900"
              >
                Save
              </button>
              {user && (
                <button
                  onClick={handleLogout}
                  className="rounded-full border border-red-500 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-500 hover:text-white transition-colors dark:text-red-400"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className={cardClass}>
              <div className="text-sm font-semibold">Persistence</div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {storageLabel} matches active tables.
              </div>
            </div>
            <div className={cardClass}>
              <div className="text-sm font-semibold">Auth status</div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {user ? `Logged in as ${user.email}` : "Local Bypass Client (No Auth)"}
              </div>
            </div>
            <div className={cardClass}>
              <div className="text-sm font-semibold">Live preview</div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Public pages read from the same source.
              </div>
            </div>
          </div>
        </div>

        <div className="sticky top-4 z-10 mb-6 rounded-2xl border border-gray-200 bg-white/95 p-2 backdrop-blur-xl dark:border-white/[0.08] dark:bg-background-dark/95">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${activeTab === tab.key
                  ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  }`}
              >
                {tab.label}
              </button>
            ))}
            {status === "saved" && (
              <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm text-emerald-600 dark:text-emerald-400">
                Saved
              </span>
            )}
          </div>
        </div>

        <section className="space-y-5">
          {activeTab === "profile" && (
            <ProfileSection draft={draft} setDraft={setDraft} />
          )}
          {activeTab === "setup" && <SetupSection draft={draft} setDraft={setDraft} />}
          {activeTab === "tech-stack" && (
            <>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">Tech Stack</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {sectionNote["tech-stack"]}
                  </p>
                </div>
              </div>
              <TechStackSection
                draft={draft}
                setDraft={setDraft}
                page={pages.techStack}
                setPage={(updater) =>
                  setPages((prev) => ({
                    ...prev,
                    techStack: typeof updater === "function" ? updater(prev.techStack) : updater,
                  }))
                }
              />
            </>
          )}
          {activeTab === "projects" && (
            <>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">Projects</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {sectionNote.projects}
                  </p>
                </div>
              </div>
              <ProjectsSection
                draft={draft}
                setDraft={setDraft}
                page={pages.projects}
                setPage={(updater) =>
                  setPages((prev) => ({
                    ...prev,
                    projects: typeof updater === "function" ? updater(prev.projects) : updater,
                  }))
                }
              />
            </>
          )}
          {activeTab === "tools" && (
            <>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">Tools</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{sectionNote.tools}</p>
                </div>
              </div>
              <ToolsSection
                draft={draft}
                setDraft={setDraft}
                page={pages.tools}
                setPage={(updater) =>
                  setPages((prev) => ({
                    ...prev,
                    tools: typeof updater === "function" ? updater(prev.tools) : updater,
                  }))
                }
              />
            </>
          )}
          {activeTab === "education" && (
            <>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">Education</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {sectionNote.education}
                  </p>
                </div>
              </div>
              <EducationSection
                draft={draft}
                setDraft={setDraft}
                page={pages.education}
                setPage={(updater) =>
                  setPages((prev) => ({
                    ...prev,
                    education: typeof updater === "function" ? updater(prev.education) : updater,
                  }))
                }
              />
            </>
          )}
          {activeTab === "certificates" && (
            <>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">Certificates</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {sectionNote.certificates}
                  </p>
                </div>
              </div>
              <CertificatesSection
                draft={draft}
                setDraft={setDraft}
                page={pages.certificates}
                setPage={(updater) =>
                  setPages((prev) => ({
                    ...prev,
                    certificates:
                      typeof updater === "function" ? updater(prev.certificates) : updater,
                  }))
                }
              />
            </>
          )}
          {activeTab === "blog" && (
            <BlogSection />
          )}
        </section>
      </div>
    </main>
  );
};

const Admin: React.FC = () => {
  return (
    <ToastProvider>
      <AdminContent />
    </ToastProvider>
  );
};

export default Admin;
