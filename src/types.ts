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

export interface PortfolioTechStackItem {
  name: string;
  iconName: string;
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
  techStack: PortfolioTechStackItem[];
  education: PortfolioEducation[];
  certificates: PortfolioCertificate[];
  setup: PortfolioSetup;
}
