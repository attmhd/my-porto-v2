import {
  DEFAULT_PORTFOLIO_DATA,
  PORTFOLIO_STORAGE_KEY,
  PortfolioData,
  clonePortfolioData,
  normalizePortfolioData,
  PortfolioUserInfo,
  PortfolioProject,
  PortfolioTool,
  PortfolioTechStackItem,
  PortfolioEducation,
  PortfolioCertificate,
  PortfolioSetup,
} from "../data/portfolio";
import {
  getSupabaseClient,
  isSupabaseConfigured,
} from "./supabaseClient";

let cachedPortfolioData: PortfolioData | null = null;
let inFlightLoad: Promise<PortfolioData> | null = null;

// --- Mappers to bridge DB snake_case with JS camelCase ---

function mapUserInfoFromDb(db: any): PortfolioUserInfo {
  return {
    name: db.name ?? "",
    role: db.role ?? "",
    tagline: db.tagline ?? "",
    about: db.about ?? "",
    location: db.location ?? "",
    email: db.email ?? "",
    cvUrl: db.cv_url ?? "",
  };
}

function mapUserInfoToDb(js: PortfolioUserInfo) {
  return {
    id: "current",
    name: js.name,
    role: js.role,
    tagline: js.tagline,
    about: js.about,
    location: js.location,
    email: js.email,
    cv_url: js.cvUrl,
  };
}

function mapProjectFromDb(db: any): PortfolioProject {
  return {
    id: db.id,
    title: db.title ?? "",
    description: db.description ?? "",
    technologies: db.technologies ?? [],
    githubUrl: db.github_url ?? undefined,
    demoUrl: db.demo_url ?? undefined,
    category: db.category ?? "",
  };
}

function mapProjectToDb(js: PortfolioProject) {
  return {
    id: js.id,
    title: js.title,
    description: js.description,
    technologies: js.technologies,
    github_url: js.githubUrl || null,
    demo_url: js.demoUrl || null,
    category: js.category,
  };
}

function mapToolFromDb(db: any): PortfolioTool {
  return {
    id: db.id,
    slug: db.slug ?? "",
    title: db.title ?? "",
    description: db.description ?? "",
    githubUrl: db.github_url ?? undefined,
    demoUrl: db.demo_url ?? undefined,
    category: db.category ?? "",
    features: db.features ?? [],
    installation: db.installation ?? "",
    usage: db.usage ?? "",
  };
}

function mapToolToDb(js: PortfolioTool) {
  return {
    id: js.id,
    slug: js.slug,
    title: js.title,
    description: js.description,
    github_url: js.githubUrl || null,
    demo_url: js.demoUrl || null,
    category: js.category,
    features: js.features,
    installation: js.installation,
    usage: js.usage,
  };
}

function mapTechStackFromDb(db: any): PortfolioTechStackItem {
  return {
    name: db.name ?? "",
    iconName: db.icon_name ?? "Python",
    category: db.category ?? "",
  };
}

function mapTechStackToDb(js: PortfolioTechStackItem) {
  return {
    name: js.name,
    icon_name: js.iconName,
    category: js.category,
  };
}

function mapEducationFromDb(db: any): PortfolioEducation {
  return {
    id: db.id,
    institution: db.institution ?? "",
    degree: db.degree ?? "",
    year: db.year ?? "",
    description: db.description ?? undefined,
  };
}

function mapEducationToDb(js: PortfolioEducation) {
  return {
    id: js.id,
    institution: js.institution,
    degree: js.degree,
    year: js.year,
    description: js.description || null,
  };
}

function mapCertificateFromDb(db: any): PortfolioCertificate {
  return {
    id: db.id,
    name: db.name ?? "",
    issuer: db.issuer ?? "",
    date: db.date ?? "",
    url: db.url ?? "",
  };
}

function mapCertificateToDb(js: PortfolioCertificate) {
  return {
    id: js.id,
    name: js.name,
    issuer: js.issuer,
    date: js.date,
    url: js.url,
  };
}

function mapSetupFromDb(db: any): PortfolioSetup {
  return {
    hardware: db.hardware ?? "",
    os: db.os ?? "",
    codeEditor: db.code_editor ?? "",
  };
}

function mapSetupToDb(js: PortfolioSetup) {
  return {
    id: "current",
    hardware: js.hardware,
    os: js.os,
    code_editor: js.codeEditor,
  };
}

// --- Local Storage Fallbacks ---

function loadFromLocalStorage(): PortfolioData {
  if (typeof window === "undefined") {
    return clonePortfolioData(DEFAULT_PORTFOLIO_DATA);
  }

  const raw = window.localStorage.getItem(PORTFOLIO_STORAGE_KEY);
  if (!raw) {
    return clonePortfolioData(DEFAULT_PORTFOLIO_DATA);
  }

  try {
    return normalizePortfolioData(JSON.parse(raw));
  } catch {
    return clonePortfolioData(DEFAULT_PORTFOLIO_DATA);
  }
}

function saveToLocalStorage(data: PortfolioData): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(data));
}

export function getPortfolioStorageLabel(): "Supabase" | "Local storage" {
  return isSupabaseConfigured() ? "Supabase" : "Local storage";
}

/**
 * Loads portfolio data dynamically from Supabase relational tables.
 * If Supabase is not configured, it falls back to local storage.
 */
export async function loadPortfolioData(): Promise<PortfolioData> {
  if (cachedPortfolioData) {
    return clonePortfolioData(cachedPortfolioData);
  }
  if (inFlightLoad) {
    return clonePortfolioData(await inFlightLoad);
  }

  inFlightLoad = (async () => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      const local = loadFromLocalStorage();
      cachedPortfolioData = clonePortfolioData(local);
      return local;
    }

    try {
      const [
        userInfoRes,
        projectsRes,
        toolsRes,
        techStackRes,
        educationRes,
        certificatesRes,
        setupRes,
      ] = await Promise.all([
        supabase.from("user_info").select("*").eq("id", "current").maybeSingle(),
        supabase.from("projects").select("*"),
        supabase.from("tools").select("*"),
        supabase.from("tech_stack").select("*"),
        supabase.from("education").select("*"),
        supabase.from("certificates").select("*"),
        supabase.from("setup").select("*").eq("id", "current").maybeSingle(),
      ]);

      const hasError =
        userInfoRes.error ||
        projectsRes.error ||
        toolsRes.error ||
        techStackRes.error ||
        educationRes.error ||
        certificatesRes.error ||
        setupRes.error;

      if (hasError) {
        console.error("Error loading portfolio data from Supabase, falling back to local:", {
          userInfo: userInfoRes.error,
          projects: projectsRes.error,
          tools: toolsRes.error,
          techStack: techStackRes.error,
          education: educationRes.error,
          certificates: certificatesRes.error,
          setup: setupRes.error,
        });
        const local = loadFromLocalStorage();
        cachedPortfolioData = clonePortfolioData(local);
        return local;
      }

      const hasDbData =
        userInfoRes.data ||
        (projectsRes.data && projectsRes.data.length > 0) ||
        (toolsRes.data && toolsRes.data.length > 0);

      if (!hasDbData) {
        // If no data exists in Supabase, seed from local storage/defaults
        const localData = loadFromLocalStorage();
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          try {
            await savePortfolioData(localData);
          } catch (seedErr) {
            console.error("Failed to seed database during load:", seedErr);
          }
        }
        cachedPortfolioData = clonePortfolioData(localData);
        return localData;
      }

      const portfolio: PortfolioData = {
        userInfo: userInfoRes.data
          ? mapUserInfoFromDb(userInfoRes.data)
          : loadFromLocalStorage().userInfo,
        projects: projectsRes.data ? projectsRes.data.map(mapProjectFromDb) : [],
        tools: toolsRes.data ? toolsRes.data.map(mapToolFromDb) : [],
        techStack: techStackRes.data
          ? techStackRes.data.map(mapTechStackFromDb)
          : [],
        education: educationRes.data
          ? educationRes.data.map(mapEducationFromDb)
          : [],
        certificates: certificatesRes.data
          ? certificatesRes.data.map(mapCertificateFromDb)
          : [],
        setup: setupRes.data
          ? mapSetupFromDb(setupRes.data)
          : loadFromLocalStorage().setup,
      };

      saveToLocalStorage(portfolio);
      cachedPortfolioData = clonePortfolioData(portfolio);
      return portfolio;
    } catch (err) {
      console.error("Unexpected error loading portfolio data:", err);
      const local = loadFromLocalStorage();
      cachedPortfolioData = clonePortfolioData(local);
      return local;
    }
  })();

  try {
    return clonePortfolioData(await inFlightLoad);
  } finally {
    inFlightLoad = null;
  }
}

/**
 * Saves portfolio data dynamically to Supabase.
 * Local storage is always updated; Supabase write runs only for authenticated users.
 */
export async function savePortfolioData(data: PortfolioData): Promise<void> {
  const payload = clonePortfolioData(data);
  saveToLocalStorage(payload);
  cachedPortfolioData = clonePortfolioData(payload);

  const supabase = getSupabaseClient();
  if (!supabase) {
    return;
  }

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError) {
    throw new Error(`Auth session error: ${sessionError.message}`);
  }
  if (!session?.user) {
    throw new Error("Session expired or unauthorized. Please sign in again.");
  }

  try {
    // 1. Single row tables: upsert
    const { error: userError } = await supabase
      .from("user_info")
      .upsert(mapUserInfoToDb(payload.userInfo));
    if (userError) throw userError;

    const { error: setupError } = await supabase
      .from("setup")
      .upsert(mapSetupToDb(payload.setup));
    if (setupError) throw setupError;

    // 2. Clear and Insert projects
    await supabase.from("projects").delete().neq("id", "_none_");
    if (payload.projects.length > 0) {
      const { error } = await supabase
        .from("projects")
        .insert(payload.projects.map(mapProjectToDb));
      if (error) throw error;
    }

    // 3. Clear and Insert tools
    await supabase.from("tools").delete().neq("id", "_none_");
    if (payload.tools.length > 0) {
      const { error } = await supabase
        .from("tools")
        .insert(payload.tools.map(mapToolToDb));
      if (error) throw error;
    }

    // 4. Clear and Insert tech_stack
    await supabase.from("tech_stack").delete().neq("name", "_none_");
    if (payload.techStack.length > 0) {
      const { error } = await supabase
        .from("tech_stack")
        .insert(payload.techStack.map(mapTechStackToDb));
      if (error) throw error;
    }

    // 5. Clear and Insert education
    await supabase.from("education").delete().neq("id", "_none_");
    if (payload.education.length > 0) {
      const { error } = await supabase
        .from("education")
        .insert(payload.education.map(mapEducationToDb));
      if (error) throw error;
    }

    // 6. Clear and Insert certificates
    await supabase.from("certificates").delete().neq("id", "_none_");
    if (payload.certificates.length > 0) {
      const { error } = await supabase
        .from("certificates")
        .insert(payload.certificates.map(mapCertificateToDb));
      if (error) throw error;
    }
  } catch (err: any) {
    console.error("Unexpected error saving portfolio data to Supabase relations:", err);
    throw new Error(err.message || "Failed to save portfolio data to Supabase.");
  }
}

/**
 * Resets portfolio data to defaults and syncs with Supabase.
 */
export async function resetPortfolioData(): Promise<PortfolioData> {
  const defaultData = clonePortfolioData(DEFAULT_PORTFOLIO_DATA);
  await savePortfolioData(defaultData);
  cachedPortfolioData = clonePortfolioData(defaultData);
  return defaultData;
}
