import { IconType } from 'react-icons';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  image: string;
  category: 'AI/ML' | 'Backend' | 'Data Science';
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
  category: 'Language' | 'Framework' | 'Tool' | 'Cloud';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
