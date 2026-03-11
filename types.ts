import { IconType } from "react-icons";

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  category: "AI/ML" | "Backend" | "Data Science" | "DevOps" | "System Design";
}

export interface Tool {
  id: string;
  slug: string;
  title: string;
  description: string;
  githubUrl?: string;
  demoUrl?: string;
  category: "Browser Extension" | "Automation" | "Utility" | "Web Tool";
  features: string[];
  installation: string;
  usage: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
  description?: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface TechStackItem {
  name: string;
  icon: IconType;
  category: "Language" | "Framework" | "Tool" | "Cloud";
}

export interface ChatMessage {
  role: "user" | "model";
  text: string;
  timestamp: Date;
}
