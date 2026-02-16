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
import { Project, Education, Certificate, TechStackItem } from "./types";

export const USER_INFO = {
  name: "Muhammad Attan",
  role: "Backend and AI Engineer",
  tagline: "Building scalable RAG pipelines and AI-driven backend systems.",
  about:
    "I am a final-year Informatics Engineering student specializing in Backend Development and Artificial Intelligence. Experienced in building RAG pipelines, developing ML models, and deploying backend services using FastAPI, Docker, and DigitalOcean. I bridge the gap between complex AI models and production-ready applications.",
  location: "Padang, Indonesia",
  email: "attmhd2.work@gmail.com",
  cvUrl:
    "https://drive.google.com/file/d/1y06mSJHPdsBTOWoLf3dHDKhRPYwJ4JPu/view?usp=sharing",
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
  {
    id: "5",
    title: "Baso.AI",
    description: "AI-powered platform for learning Minang Language.",
    technologies: ["Vibe Coding", "Gemini"],
    image: "https://picsum.photos/600/400?random=14",
    category: "AI/ML",
    demoUrl: "#",
  },
  {
    id: "6",
    title: "Onlyfriends",
    description: "Chat web-based to talk with random people.",
    technologies: ["Golang", "Web Socket", "LLM"],
    image: "https://picsum.photos/600/400?random=15",
    category: "Backend",
    demoUrl: "https://ml.natta.studio",
  },
  {
    id: "7",
    title: "FamGPS",
    description: "GPS-based platform for tracking family members.",
    technologies: ["Golang", "Kafka"],
    image: "https://picsum.photos/600/400?random=16",
    category: "Backend",
    demoUrl: "https://ml.natta.studio",
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
    image: "https://picsum.photos/600/400?random=17",
    category: "Backend",
    demoUrl: "#",
  },
  {
    id: "9",
    title: "Realtime Notification Service",
    description:
      "Notification aggregator that consumes events from RabbitMQ and dispatches messages via WebSocket and email. Uses gRPC for internal RPC between gateway and notifier services.",
    technologies: ["Golang", "FastAPI", "gRPC", "RabbitMQ", "Redis", "Docker"],
    image: "https://picsum.photos/600/400?random=18",
    category: "Backend",
    demoUrl: "#",
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
    image: "https://picsum.photos/600/400?random=19",
    category: "Backend",
    demoUrl: "#",
  },
  {
    id: "11",
    title: "CI/CD Pipeline with Jenkins",
    description:
      "Design and implement a simple CI/CD pipeline for a microservice. Uses Jenkins to run build, test, and Docker image publishing steps, then deploys to a staging server. Includes branch-based pipelines and webhook integrations.",
    technologies: ["Jenkins", "GitHub Actions", "Docker", "FastAPI", "Redis"],
    image: "https://picsum.photos/600/400?random=20",
    category: "DevOps",
    demoUrl: "#",
  },
  {
    id: "12",
    title: "Infrastructure as Code with Terraform",
    description:
      "Provision cloud infrastructure using Terraform. Automates creation of VPC, compute instances, security groups, and managed databases. Supports multiple environments (dev/staging) with reusable modules.",
    technologies: ["Terraform", "DigitalOcean", "AWS", "PostgreSQL", "Docker"],
    image: "https://picsum.photos/600/400?random=21",
    category: "DevOps",
    demoUrl: "#",
  },
  {
    id: "13",
    title: "Configuration Management with Ansible",
    description:
      "Use Ansible to automate server configuration and application deployment. Playbooks set up users, firewall rules, Docker runtime, and deploy a FastAPI service with environment templating and rolling updates.",
    technologies: ["Ansible", "FastAPI", "Docker", "Nginx", "Ubuntu Server"],
    image: "https://picsum.photos/600/400?random=22",
    category: "DevOps",
    demoUrl: "#",
  },
  {
    id: "14",
    title: "API Gateway with Rate Limiting & Auth",
    description:
      "Design and implement an API gateway that centralizes authentication, authorization, request throttling, and request/response transformation. Supports JWT-based auth, per-tenant rate limits, and circuit breakers for downstream services.",
    technologies: ["Golang", "Envoy", "Redis", "JWT", "Docker", "OpenAPI"],
    image: "https://picsum.photos/600/400?random=23",
    category: "System Design",
    demoUrl: "#",
  },
  {
    id: "15",
    title: "CQRS + Event Sourcing Order System",
    description:
      "Split read/write paths using CQRS, persist business events, and rebuild read models asynchronously. Includes idempotent command handling, snapshotting, and eventual consistency guarantees.",
    technologies: ["Golang", "PostgreSQL", "Kafka", "Protobuf", "Docker"],
    image: "https://picsum.photos/600/400?random=24",
    category: "System Design",
    demoUrl: "#",
  },
  {
    id: "16",
    title: "Distributed Caching Layer",
    description:
      "Design a multi-tier cache (in-memory + Redis) with cache-aside and write-through strategies. Includes cache invalidation, TTL policies, and hot-key mitigation via sharding.",
    technologies: ["Golang", "Redis", "Nginx", "Docker", "Prometheus"],
    image: "https://picsum.photos/600/400?random=25",
    category: "System Design",
    demoUrl: "#",
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
    image: "https://picsum.photos/600/400?random=26",
    category: "DevOps",
    demoUrl: "#",
  },
  {
    id: "18",
    title: "Resilient Message Processing",
    description:
      "Design a robust consumer that handles poison messages with dead-letter queues, retries with backoff, and exactly-once processing using deduplication keys and transactional outbox pattern.",
    technologies: ["RabbitMQ", "PostgreSQL", "Golang", "Docker"],
    image: "https://picsum.photos/600/400?random=27",
    category: "System Design",
    demoUrl: "#",
  },
  {
    id: "19",
    title: "Multi-tenant SaaS Architecture",
    description:
      "Build a SaaS backend supporting both pooled and siloed tenancy. Includes tenant-aware routing, per-tenant rate limits, data isolation, and billing events.",
    technologies: ["Golang", "PostgreSQL", "Redis", "Nginx", "Docker"],
    image: "https://picsum.photos/600/400?random=28",
    category: "Backend",
    demoUrl: "#",
  },
  {
    id: "20",
    title: "Search Service with Sharding & Replication",
    description:
      "Design a search cluster that shards indexes by tenant and replicates for high availability. Implements leader election, read/write routing, and failover.",
    technologies: ["Elasticsearch", "Golang", "ZooKeeper", "Docker"],
    image: "https://picsum.photos/600/400?random=29",
    category: "System Design",
    demoUrl: "#",
  },
  {
    id: "21",
    title: "Media CDN with Edge Caching",
    description:
      "Edge-optimized media delivery pipeline. Origin server signs URLs, edge proxies cache content, and invalidation propagates via pub/sub. Includes rate limiting and token-based access.",
    technologies: ["Nginx", "Redis", "Golang", "RabbitMQ", "Docker"],
    image: "https://picsum.photos/600/400?random=30",
    category: "System Design",
    demoUrl: "#",
  },
];

export const TECH_STACK: TechStackItem[] = [
  // Language
  { name: "Python", icon: SiPython, category: "Language" },
  { name: "Go", icon: SiGo, category: "Language" },
  { name: "C++", icon: SiCplusplus, category: "Language" },
  { name: "Typescript", icon: SiTypescript, category: "Language" },

  // Framework
  { name: "FastAPI", icon: SiFastapi, category: "Framework" },
  { name: "Gin Gonic", icon: SiGin, category: "Framework" },
  { name: "TensorFlow", icon: SiTensorflow, category: "Framework" },
  { name: "Scikit-learn", icon: SiScikitlearn, category: "Framework" },

  // Tool
  { name: "MySQL", icon: SiMysql, category: "Tool" },
  { name: "PostgreSQL", icon: SiPostgresql, category: "Tool" },
  { name: "Redis", icon: SiRedis, category: "Tool" },
  { name: "Git", icon: SiGit, category: "Tool" },
  { name: "MLflow", icon: SiMlflow, category: "Tool" },
  { name: "Docker", icon: SiDocker, category: "Tool" },
  { name: "Prometheus", icon: SiPrometheus, category: "Tool" },
  { name: "Grafana", icon: SiGrafana, category: "Tool" },
  { name: "Kafka", icon: SiApachekafka, category: "Tool" },
  { name: "RabbitMQ", icon: SiRabbitmq, category: "Tool" },
  { name: "Ansible", icon: SiAnsible, category: "Tool" },
  { name: "Kubernetes", icon: SiKubernetes, category: "Tool" },
  { name: "Terraform", icon: SiTerraform, category: "Tool" },

  // Cloud
  { name: "AWS", icon: SiAmazon, category: "Cloud" },
  { name: "DigitalOcean", icon: SiDigitalocean, category: "Cloud" },
  { name: "Supabase", icon: SiSupabase, category: "Cloud" },
];

export const EDUCATION: Education[] = [
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
