import {
  SiAnsible,
  SiApachekafka,
  SiCplusplus,
  SiDigitalocean,
  SiDocker,
  SiFastapi,
  SiGit,
  SiGo,
  SiGrafana,
  SiGin,
  SiKubernetes,
  SiMlflow,
  SiMysql,
  SiPandas,
  SiPostgresql,
  SiPrometheus,
  SiPython,
  SiPytorch,
  SiRabbitmq,
  SiRedis,
  SiScikitlearn,
  SiSupabase,
  SiTerraform,
  SiTensorflow,
  SiTypescript,
  SiAmazonwebservices,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { DEFAULT_SETUP } from "./defaultSetup";

export type PortfolioIconName = keyof typeof TECH_STACK_ICONS;

export interface PortfolioUserInfo {
  name: string;
  role: string;
  tagline: string;
  about: string;
  location: string;
  email: string;
  cvUrl: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  category: string;
}

export interface PortfolioTool {
  id: string;
  slug: string;
  title: string;
  description: string;
  githubUrl?: string;
  demoUrl?: string;
  category: string;
  features: string[];
  installation: string;
  usage: string;
}

export interface PortfolioTechStackItem {
  name: string;
  iconName: PortfolioIconName;
  category: string;
}

export interface PortfolioEducation {
  id: string;
  institution: string;
  degree: string;
  year: string;
  description?: string;
}

export interface PortfolioCertificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface PortfolioSetup {
  hardware: string;
  os: string;
  codeEditor: string;
}

export interface PortfolioData {
  userInfo: PortfolioUserInfo;
  projects: PortfolioProject[];
  tools: PortfolioTool[];
  techStack: PortfolioTechStackItem[];
  education: PortfolioEducation[];
  certificates: PortfolioCertificate[];
  setup: PortfolioSetup;
}

export const TECH_STACK_ICONS = {
  Python: SiPython,
  Go: SiGo,
  "C++": SiCplusplus,
  Typescript: SiTypescript,
  FastAPI: SiFastapi,
  "Gin Gonic": SiGin,
  TensorFlow: SiTensorflow,
  "Scikit-learn": SiScikitlearn,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  Redis: SiRedis,
  Git: SiGit,
  MLflow: SiMlflow,
  Docker: SiDocker,
  Prometheus: SiPrometheus,
  Grafana: SiGrafana,
  Kafka: SiApachekafka,
  RabbitMQ: SiRabbitmq,
  Ansible: SiAnsible,
  Kubernetes: SiKubernetes,
  Terraform: SiTerraform,
  AWS: SiAmazonwebservices,
  DigitalOcean: SiDigitalocean,
  Supabase: SiSupabase,
  Pandas: SiPandas,
  PyTorch: SiPytorch,
} as const;

export const TECH_STACK_ICON_OPTIONS = Object.keys(
  TECH_STACK_ICONS,
) as PortfolioIconName[];

export const PORTFOLIO_STORAGE_KEY = "my-porto-v2:portfolio-data";

const DEFAULT_ICON_NAME = "Python";

function cloneProjects(projects: PortfolioProject[]): PortfolioProject[] {
  return projects.map((project) => ({
    ...project,
    technologies: [...project.technologies],
  }));
}

function cloneTools(tools: PortfolioTool[]): PortfolioTool[] {
  return tools.map((tool) => ({
    ...tool,
    features: [...tool.features],
  }));
}

function cloneEducation(items: PortfolioEducation[]): PortfolioEducation[] {
  return items.map((item) => ({ ...item }));
}

function cloneCertificates(items: PortfolioCertificate[]): PortfolioCertificate[] {
  return items.map((item) => ({ ...item }));
}

function cloneTechStack(items: PortfolioTechStackItem[]): PortfolioTechStackItem[] {
  return items.map((item) => ({ ...item }));
}

export function clonePortfolioData(data: PortfolioData): PortfolioData {
  return {
    userInfo: { ...data.userInfo },
    projects: cloneProjects(data.projects),
    tools: cloneTools(data.tools),
    techStack: cloneTechStack(data.techStack),
    education: cloneEducation(data.education),
    certificates: cloneCertificates(data.certificates),
    setup: { ...data.setup },
  };
}

export function createDefaultPortfolioData(): PortfolioData {
  return {
    userInfo: {
      name: "",
      role: "",
      tagline: "",
      about: "",
      location: "",
      email: "",
      cvUrl: "",
    },
    projects: [],
    tools: [],
    techStack: [],
    education: [],
    certificates: [],
    setup: { ...DEFAULT_SETUP },
  };
}

export const DEFAULT_PORTFOLIO_DATA = createDefaultPortfolioData();

export function isPortfolioIconName(value: string): value is PortfolioIconName {
  return value in TECH_STACK_ICONS;
}

function parseArray<T>(value: unknown, fallback: T[]): T[] {
  return Array.isArray(value) ? value : fallback;
}

export function normalizePortfolioData(value: unknown): PortfolioData {
  const raw = value && typeof value === "object" ? (value as Partial<PortfolioData>) : {};

  const userInfo = {
    ...DEFAULT_PORTFOLIO_DATA.userInfo,
    ...(raw.userInfo ?? {}),
  };

  const projects = parseArray(raw.projects, DEFAULT_PORTFOLIO_DATA.projects).map(
    (project) => ({
      ...project,
      technologies: Array.isArray(project.technologies)
        ? project.technologies.filter(Boolean)
        : [],
    }),
  );

  const tools = parseArray(raw.tools, DEFAULT_PORTFOLIO_DATA.tools).map((tool) => ({
    ...tool,
    features: Array.isArray(tool.features) ? tool.features.filter(Boolean) : [],
  }));

  const techStack = parseArray(raw.techStack, DEFAULT_PORTFOLIO_DATA.techStack).map(
    (item) => ({
      name: item.name ?? "",
      iconName:
        item.iconName && isPortfolioIconName(item.iconName)
          ? item.iconName
          : DEFAULT_ICON_NAME,
      category: item.category ?? "",
    }),
  );

  const education = parseArray(raw.education, DEFAULT_PORTFOLIO_DATA.education).map(
    (item) => ({ ...item }),
  );

  const certificates = parseArray(
    raw.certificates,
    DEFAULT_PORTFOLIO_DATA.certificates,
  ).map((item) => ({ ...item }));

  const setup = {
    ...DEFAULT_PORTFOLIO_DATA.setup,
    ...(raw.setup ?? {}),
  };

  return {
    userInfo,
    projects,
    tools,
    techStack,
    education,
    certificates,
    setup,
  };
}

export function loadPortfolioData(): PortfolioData {
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

export function savePortfolioData(data: PortfolioData): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(data));
}

export function buildPortfolioSystemInstruction(data: PortfolioData): string {
  return `
You are an AI assistant for the portfolio website of ${data.userInfo.name}.
Your goal is to represent ${data.userInfo.name} professionally and answer questions about their background, skills, and projects.

Role: ${data.userInfo.role}
About: ${data.userInfo.about}
Location: ${data.userInfo.location}
Contact: ${data.userInfo.email}

Tech Stack: ${data.techStack.map((t) => t.name).join(", ")}.
Projects: ${data.projects
      .map((p) => `${p.title} (${p.category}): ${p.description}`)
      .join("; ")}.
Education: ${data.education
      .map((e) => `${e.degree} from ${e.institution}`)
      .join("; ")}.
Certificates: ${data.certificates.map((c) => c.name).join(", ")}.

Tone: Professional, enthusiastic, concise, and helpful.
If asked about hiring, encourage them to contact via email.
If asked about something outside this context, politely steer the conversation back to ${data.userInfo.name}'s professional profile.
Do not hallucinate projects that are not listed.
`.trim();
}

export function getTechStackIcon(iconName: PortfolioIconName): IconType {
  return TECH_STACK_ICONS[iconName] ?? SiPython;
}
