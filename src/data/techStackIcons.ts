import type { IconType } from "react-icons";
import {
  SiPython,
  SiGo,
  SiFastapi,
  SiGin,
  SiScikitlearn,
  SiPostgresql,
  SiRedis,
  SiGit,
  SiMlflow,
  SiDocker,
  SiPrometheus,
  SiGrafana,
  SiRabbitmq,
  SiDigitalocean,
  SiPandas,
} from "react-icons/si";

export const TECH_STACK_ICONS = {
  Python: SiPython,
  Go: SiGo,
  FastAPI: SiFastapi,
  "Gin Gonic": SiGin,
  "Scikit-learn": SiScikitlearn,
  PostgreSQL: SiPostgresql,
  Redis: SiRedis,
  Git: SiGit,
  MLflow: SiMlflow,
  Docker: SiDocker,
  Prometheus: SiPrometheus,
  Grafana: SiGrafana,
  RabbitMQ: SiRabbitmq,
  DigitalOcean: SiDigitalocean,
  Pandas: SiPandas,
} as const;

export function getTechStackIcon(iconName: string): IconType {
  return TECH_STACK_ICONS[iconName as keyof typeof TECH_STACK_ICONS] ?? SiPython;
}
