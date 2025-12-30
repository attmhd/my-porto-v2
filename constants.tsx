import {
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiFastapi,
  SiDocker,
  SiMlflow,
  SiKubernetes,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiAmazon,
  SiGooglecloud,
  SiGit,
  SiReact,
  SiTypescript,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiGo,
  SiDigitalocean,
  SiSupabase,
  SiLaravel,
  SiMysql,
  SiCplusplus,
} from "react-icons/si";
import { Project, Education, Certificate, TechStackItem } from "./types";

export const USER_INFO = {
  name: "Muhammad Attan",
  role: "Backend and AI Engineer",
  tagline: "Building scalable RAG pipelines and AI-driven backend systems.",
  about:
    "I am a final-year Informatics Engineering student specializing in Backend Development and Artificial Intelligence. Experienced in building RAG pipelines, developing ML models, and deploying backend services using FastAPI, Docker, and DigitalOcean. I bridge the gap between complex AI models and production-ready applications.",
  location: "Padang City, Indonesia",
  email: "attmhd2.work@gmail.com",
  cvUrl:
    "https://drive.google.com/file/d/1rAy-W5Iwpblkn9d4qyxdDuk1eABbZaZA/view?usp=sharing",
};

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Livia (Virtual Assistant)",
    description:
      "A RAG-based learning chatbot for video-based LMS. Features a video-to-text pipeline using Whisper for transcription, chunking, and embedding into a vector database.",
    technologies: [
      "FastAPI",
      "LangChain",
      "Qdrant",
      "Redis",
      "Gemini Flash 2.0",
      "Whisper",
    ],
    image: "https://picsum.photos/600/400?random=10",
    category: "AI/ML",
  },
  {
    id: "2",
    title: "Klop! Assessment Platform",
    description:
      "AI-driven assessment platform featuring an AI-based Assessment Generator and HOTS-based automated scoring system. Deployed on DigitalOcean.",
    technologies: [
      "FastAPI",
      "Kolosal AI",
      "Qwen 3",
      "Docker",
      "DigitalOcean",
      "GitHub Actions",
    ],
    image: "https://picsum.photos/600/400?random=11",
    category: "Backend",
  },
  {
    id: "3",
    title: "Lookin (Bangkit Capstone)",
    description:
      "End-to-end machine learning models using transfer learning with VGG16. Achieved 73% accuracy for face-shape and 91% for gender classification.",
    technologies: ["TensorFlow", "VGG16", "Python", "Transfer Learning"],
    image: "https://picsum.photos/600/400?random=12",
    category: "Data Science",
  },
  {
    id: "4",
    title: "Minang Language Dictionary",
    description:
      "Digital dictionary to preserve Minangkabau dialects with a gamification system. Winner of The Most Creative Idea on Firetech 2025 Hackathon.",
    technologies: ["Vite JS", "Supabase", "Gamification"],
    image: "https://picsum.photos/600/400?random=13",
    category: "Backend",
    demoUrl: "https://ml.natta.studio",
  },
];

export const TECH_STACK: TechStackItem[] = [
  // Language
  { name: "Python", icon: SiPython, category: "Language" },
  { name: "Go", icon: SiGo, category: "Language" },
  { name: "C++", icon: SiCplusplus, category: "Language" },

  // Framework
  { name: "FastAPI", icon: SiFastapi, category: "Framework" },
  { name: "TensorFlow", icon: SiTensorflow, category: "Framework" },
  { name: "Scikit-learn", icon: SiScikitlearn, category: "Framework" },

  // Tool
  { name: "MySQL", icon: SiMysql, category: "Tool" },
  { name: "PostgreSQL", icon: SiPostgresql, category: "Tool" },
  { name: "Redis", icon: SiRedis, category: "Tool" },
  { name: "Git", icon: SiGit, category: "Tool" },
  { name: "MLflow", icon: SiMlflow, category: "Tool" },
  { name: "Docker", icon: SiDocker, category: "Tool" },

  // Cloud
  { name: "DigitalOcean", icon: SiDigitalocean, category: "Cloud" },
  { name: "Supabase", icon: SiSupabase, category: "Cloud" },
];

export const EDUCATION: Education[] = [
  {
    id: "1",
    institution: "Natta Studio",
    degree: "Founder & Product Developer",
    year: "2025",
    description: "Building AI-powered applications and products.",
  },
  {
    id: "2",
    institution: "Appskep Indonesia",
    degree: "AI Intern",
    year: "2025",
    description:
      "Developed RAG-based learning chatbot and video-to-text pipelines using Whisper and Vector DBs.",
  },
  {
    id: "3",
    institution: "PT Telkomsel Indonesia",
    degree: "Indonesia NEXT Participant",
    year: "2025",
    description:
      "Top 1000 participant. Earned Golden Ticket and ITS Python Certification.",
  },
  {
    id: "4",
    institution: "Bangkit Academy",
    degree: "Machine Learning Cohort",
    year: "2024",
    description:
      "Selected as top 5 students for interaction. Built and deployed CNN models for classification.",
  },
  {
    id: "5",
    institution: "Padang Institute of Technology",
    degree: "Bachelor of Informatics Engineering",
    year: "2022 - 2026",
    description:
      "Final-year student. Lab Assistant for Basic Electronics Engineering (2023).",
  },
];

export const CERTIFICATES: Certificate[] = [
  {
    id: "1",
    name: "Dev Certified for ML with TensorFlow",
    issuer: "TensorFlow",
    date: "2024",
    url: "https://dev.id/certificate/verify/JE0P36LW75",
  },
  {
    id: "2",
    name: "Generative AI with Large Language Models",
    issuer: "Coursera",
    date: "2024",
    url: "https://www.coursera.org/account/accomplishments/verify/RVKFMTBY5JRZ?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
  },
  {
    id: "3",
    name: "ITS Python Certification",
    issuer: "Certiport",
    date: "2025",
    url: "https://www.certiport.com/portal/Pages/PrintTranscriptInfo.aspx?action=Cert&format=pdf&id=471",
  },
  {
    id: "4",
    name: "Meta x Hacktiv8",
    issuer: "Meta",
    date: "2024",
    url: "https://drive.google.com/file/d/1SOGBYdkDcCbplU8QIQl39bfZ6fyml4Tu/view",
  },
];
