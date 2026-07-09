import type { IconType } from "react-icons";
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
} from "react-icons/si";
import type { TechStackItem } from "../types";

type TechStackSeed = {
  name: string;
  icon: IconType;
  category: TechStackItem["category"];
};

export const DEFAULT_TECH_STACK: TechStackSeed[] = [
  { name: "Python", icon: SiPython, category: "Language" },
  { name: "Go", icon: SiGo, category: "Language" },
  { name: "C++", icon: SiCplusplus, category: "Language" },
  { name: "Typescript", icon: SiTypescript, category: "Language" },
  { name: "FastAPI", icon: SiFastapi, category: "Framework" },
  { name: "Gin Gonic", icon: SiGin, category: "Framework" },
  { name: "TensorFlow", icon: SiTensorflow, category: "Framework" },
  { name: "Scikit-learn", icon: SiScikitlearn, category: "Framework" },
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
  { name: "DigitalOcean", icon: SiDigitalocean, category: "Cloud" },
  { name: "Supabase", icon: SiSupabase, category: "Cloud" },
  { name: "Pandas", icon: SiPandas, category: "Tool" },
  { name: "PyTorch", icon: SiPytorch, category: "Framework" },
];
