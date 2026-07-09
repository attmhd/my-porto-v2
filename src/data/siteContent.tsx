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
  SiGin,
  SiPrometheus,
  SiGrafana,
  SiApachekafka,
  SiRabbitmq,
  SiAnsible,
  SiTerraform,
} from "react-icons/si";
import { Project, Education, Certificate, TechStackItem, Tool } from "../types";
import { DEFAULT_TECH_STACK } from "./defaultTechStack";
import { DEFAULT_SETUP } from "./defaultSetup";

export const USER_INFO = {
  name: "Muhammad Attan",
  role: "Software Engineer",
  tagline: "Building scalable RAG pipelines and AI-driven backend systems.",
  about:
    "I am a final-year Informatics Engineering student specializing in Backend Development and Artificial Intelligence, with a focus on business-driven development, clean architecture, and scalable system design.",
  location: "Padang, Indonesia",
  email: "attmhd2.work@gmail.com",
  cvUrl:
    "https://drive.google.com/file/d/1QFcuFLTajoP_eNEJ7nOI3P_KRey7BzdD/view?usp=drive_link",
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
    category: "Backend",
    githubUrl: "https://github.com/attmhd/klop-ai-be",
  },
  {
    id: "3",
    title: "Lookin (Bangkit Capstone)",
    description:
      "End-to-end machine learning models using transfer learning with VGG16. Achieved 73% accuracy for face-shape and 91% for gender classification.",
    technologies: ["TensorFlow", "VGG16", "Python", "Transfer Learning"],
    category: "Data Science",
    githubUrl: "https://github.com/CP-Lookin/Machine-Learning",
  },
  {
    id: "4",
    title: "Minang Language Dictionary",
    description:
      "Digital dictionary to preserve Minangkabau dialects with a gamification system. Winner of The Most Creative Idea on Firetech 2025 Hackathon.",
    technologies: ["Vite JS", "Supabase", "Gamification"],
    category: "Backend",
    demoUrl: "https://ml.natta.studio",
    githubUrl: "https://github.com/attmhd/minang-language",
  },
  {
    id: "5",
    title: "Baso.AI",
    description: "AI-powered platform for learning Minang Language.",
    technologies: ["Vibe Coding", "Gemini"],
    category: "AI/ML",
  },
  {
    id: "6",
    title: "Onlyfriends",
    description: "Chat web-based to talk with random people.",
    technologies: ["Golang", "Web Socket", "LLM"],
    category: "Backend",
  },
  {
    id: "7",
    title: "FamGPS",
    description: "GPS-based platform for tracking family members.",
    technologies: ["Golang", "Kafka"],
    category: "Backend",
    githubUrl: "https://github.com/attmhd/fam-gps",
  },
  {
    id: "8",
    title: "Order Processing Microservices",
    description:
      "Distributed backend with gRPC-based service-to-service communication and RabbitMQ as an event bus for order, payment, and inventory workflows. Ensures reliable processing with dead-letter queues and retry policies.",
    technologies: [
      "Golang",
      "gRPC",
      "RabbitMQ",
      "Docker",
      "PostgreSQL",
      "Redis",
    ],
    category: "Backend",
  },
  {
    id: "9",
    title: "Realtime Notification Service",
    description:
      "Notification aggregator that consumes events from RabbitMQ and dispatches messages via WebSocket and email. Uses gRPC for internal RPC between gateway and notifier services.",
    technologies: ["Golang", "FastAPI", "gRPC", "RabbitMQ", "Redis", "Docker"],
    category: "Backend",
  },
  {
    id: "10",
    title: "Media Processing Pipeline",
    description:
      "Asynchronous image/video processing pipeline. Upload service publishes jobs to RabbitMQ; worker services expose gRPC endpoints for transcoding, thumbnailing, and metadata extraction.",
    technologies: [
      "Python",
      "gRPC",
      "RabbitMQ",
      "MLflow",
      "Docker",
      "PostgreSQL",
    ],
    category: "Backend",
  },
  {
    id: "11",
    title: "CI/CD Pipeline with Jenkins",
    description:
      "Design and implement a simple CI/CD pipeline for a microservice. Uses Jenkins to run build, test, and Docker image publishing steps, then deploys to a staging server. Includes branch-based pipelines and webhook integrations.",
    technologies: ["Jenkins", "GitHub Actions", "Docker", "FastAPI", "Redis"],
    category: "DevOps",
  },
  {
    id: "12",
    title: "Infrastructure as Code with Terraform",
    description:
      "Provision cloud infrastructure using Terraform. Automates creation of VPC, compute instances, security groups, and managed databases. Supports multiple environments (dev/staging) with reusable modules.",
    technologies: ["Terraform", "DigitalOcean", "AWS", "PostgreSQL", "Docker"],
    category: "DevOps",
  },
  {
    id: "13",
    title: "Configuration Management with Ansible",
    description:
      "Use Ansible to automate server configuration and application deployment. Playbooks set up users, firewall rules, Docker runtime, and deploy a FastAPI service with environment templating and rolling updates.",
    technologies: ["Ansible", "FastAPI", "Docker", "Nginx", "Ubuntu Server"],
    category: "DevOps",
  },
  {
    id: "14",
    title: "API Gateway with Rate Limiting & Auth",
    description:
      "Design and implement an API gateway that centralizes authentication, authorization, request throttling, and request/response transformation. Supports JWT-based auth, per-tenant rate limits, and circuit breakers for downstream services.",
    technologies: ["Golang", "Envoy", "Redis", "JWT", "Docker", "OpenAPI"],
    category: "System Design",
  },
  {
    id: "15",
    title: "CQRS + Event Sourcing Order System",
    description:
      "Split read/write paths using CQRS, persist business events, and rebuild read models asynchronously. Includes idempotent command handling, snapshotting, and eventual consistency guarantees.",
    technologies: ["Golang", "PostgreSQL", "Kafka", "Protobuf", "Docker"],
    category: "System Design",
  },
  {
    id: "16",
    title: "Distributed Caching Layer",
    description:
      "Design a multi-tier cache (in-memory + Redis) with cache-aside and write-through strategies. Includes cache invalidation, TTL policies, and hot-key mitigation via sharding.",
    technologies: ["Golang", "Redis", "Nginx", "Docker", "Prometheus"],
    category: "System Design",
  },
  {
    id: "17",
    title: "Observability Stack: Metrics, Logs, Traces",
    description:
      "Unified observability for microservices using OpenTelemetry. Exposes RED/USE metrics, structured logs, and distributed traces. Includes SLO dashboards and alerting on latency/availability.",
    technologies: [
      "OpenTelemetry",
      "Prometheus",
      "Grafana",
      "Loki",
      "Tempo",
      "Golang",
    ],
    category: "DevOps",
  },
  {
    id: "18",
    title: "Resilient Message Processing",
    description:
      "Design a robust consumer that handles poison messages with dead-letter queues, retries with backoff, and exactly-once processing using deduplication keys and transactional outbox pattern.",
    technologies: ["RabbitMQ", "PostgreSQL", "Golang", "Docker"],
    category: "System Design",
  },
  {
    id: "19",
    title: "Multi-tenant SaaS Architecture",
    description:
      "Build a SaaS backend supporting both pooled and siloed tenancy. Includes tenant-aware routing, per-tenant rate limits, data isolation, and billing events.",
    technologies: ["Golang", "PostgreSQL", "Redis", "Nginx", "Docker"],
    category: "Backend",
  },
  {
    id: "20",
    title: "Search Service with Sharding & Replication",
    description:
      "Design a search cluster that shards indexes by tenant and replicates for high availability. Implements leader election, read/write routing, and failover.",
    technologies: ["Elasticsearch", "Golang", "ZooKeeper", "Docker"],
    category: "System Design",
  },
  {
    id: "21",
    title: "Media CDN with Edge Caching",
    description:
      "Edge-optimized media delivery pipeline. Origin server signs URLs, edge proxies cache content, and invalidation propagates via pub/sub. Includes rate limiting and token-based access.",
    technologies: ["Nginx", "Redis", "Golang", "RabbitMQ", "Docker"],
    category: "System Design",
  },
];

export const TOOLS: Tool[] = [
  {
    id: "1",
    slug: "universal-video-downloader",
    title: "Universal Video Downloader",
    description:
      "Multi-platform high-speed downloader for YouTube, TikTok, and Instagram. Supports high-quality downloads and batch processing.",
    githubUrl: "https://github.com/attmhd/yt-downloader",
    demoUrl: "https://github.com/attmhd/yt-downloader/releases/",
    category: "Automation",
    features: [
      "Support YouTube, TikTok, and Instagram",
      "High-speed downloading",
      "Multiple format support (MP4, MP3)",
      "Batch processing",
      "Clean and intuitive CLI/GUI interface",
    ],
    installation:
      "1. Download the latest release from GitHub.\n2. Extract the archive.\n3. Run the executable file.",
    usage:
      "1. Copy the video URL.\n2. Paste into the downloader.\n3. Select quality and format.\n4. Click Download.",
  },
];

export const TECH_STACK: TechStackItem[] = DEFAULT_TECH_STACK.map((item) => ({
  name: item.name,
  icon: item.icon,
  category: item.category,
}));

export const EDUCATION: Education[] = [

   {
    id: "0",
    institution: "Datatalks.club",
    degree: "LLM Zoomcamp Cohort",
    year: "2026",
    description:
      "Learn LLM Engineering and Production ready.",
  },
  {
    id: "1",
    institution: "AWS re/Start Batch 14",
    degree: "Cloud Computing Cohort",
    year: "2026",
    description:
      "Learn cloud computing fundamentals and best practices on AWS platform.",
  },
  {
    id: "2",
    institution: "Natta Std",
    degree: "Founder",
    year: "2025",
    description:
      "A mini studio to develop some projects and products that meet user needs.",
  },
  {
    id: "3",
    institution: "Appskep Indonesia",
    degree: "AI Intern",
    year: "2025",
    description:
      "Developed RAG-based learning chatbot and video-to-text pipelines using Whisper and Vector DBs.",
  },
  {
    id: "4",
    institution: "PT Telkomsel Indonesia",
    degree: "Indonesia NEXT Batch 9 Participant",
    year: "2025",
    description:
      "Top 1000 participant. Earned Golden Ticket and ITS Python Certification.",
  },
  {
    id: "5",
    institution: "Bangkit Academy",
    degree: "Machine Learning Cohort",
    year: "2024",
    description:
      "Selected as top 5 students for interaction. Built and deployed CNN models for classification.",
  },
  {
    id: "6",
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
    issuer: "dev.cert by dev.id",
    date: "2025",
    url: "https://dev.id/certificate/verify/JE0P36LW75",
  },
  {
    id: "2",
    name: "Generative AI with Large Language Models",
    issuer: "Coursera",
    date: "2025",
    url: "https://www.coursera.org/account/accomplishments/verify/RVKFMTBY5JRZ?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
  },
  {
    id: "3",
    name: "ITS Python Certification",
    issuer: "Certiport",
    date: "2025",
    url: "https://drive.google.com/file/d/1vxQaQQuCfa3g8Bnui-Zp7feS2vshnhJj/view?usp=sharing",
  },
  {
    id: "4",
    name: "Science and Technology Track Cloud, Machine Learning, & Security Academy",
    issuer: "US-ASEAN STIC",
    date: "2025",
    url: "https://drive.google.com/file/d/1shmtEq9bOZTBAaI6owuFXpdk5N-BCK1Z/view",
  },
  {
    id: "5",
    name: "Meta x Hacktiv8",
    issuer: "Meta",
    date: "2024",
    url: "https://drive.google.com/file/d/1SOGBYdkDcCbplU8QIQl39bfZ6fyml4Tu/view",
  },
];

export const SETUP = DEFAULT_SETUP;
