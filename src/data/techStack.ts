import { TechStackItem } from "@/types";

export const techStack: TechStackItem[] = [
  // Frontend
  { name: "TypeScript", category: "frontend", level: 92, description: "Type-safe robust frontend & backend applications" },
  { name: "React", category: "frontend", level: 95, description: "Component-driven interfaces & modern hooks architecture" },
  { name: "Next.js", category: "frontend", level: 90, description: "Server components, App Router, SSR, and ISR" },
  { name: "Tailwind CSS", category: "frontend", level: 95, description: "Modern utility-first responsive styling and animations" },
  { name: "Framer Motion", category: "frontend", level: 85, description: "Smooth micro-interactions, spring physics & transitions" },
  { name: "HTML5 / Canvas", category: "frontend", level: 88, description: "Pixel rendering, Web Audio visualizers & 2D graphics" },

  // Backend
  { name: "Node.js", category: "backend", level: 88, description: "Event-driven asynchronous backend runtime" },
  { name: "Express.js", category: "backend", level: 85, description: "RESTful API services and middleware architecture" },
  { name: "NestJS", category: "backend", level: 80, description: "Enterprise scalable modular architecture with TypeScript" },
  { name: "REST / GraphQL", category: "backend", level: 84, description: "Clean API contract design & client querying" },

  // Database
  { name: "PostgreSQL", category: "database", level: 85, description: "Relational database modeling, indexing & optimization" },
  { name: "Prisma ORM", category: "database", level: 88, description: "Type-safe database client and automated migrations" },
  { name: "Redis", category: "database", level: 78, description: "In-memory caching and session management" },
  { name: "MongoDB", category: "database", level: 80, description: "Document-oriented database for flexible schemas" },

  // Tools & DevOps
  { name: "Git & GitHub", category: "tools", level: 92, description: "Version control, branching strategies, and CI/CD actions" },
  { name: "Docker", category: "tools", level: 78, description: "Containerization and reproducible environments" },
  { name: "Linux / Bash", category: "tools", level: 82, description: "Server administration, scripting, and deployment" },
  { name: "Vite / Webpack", category: "tools", level: 85, description: "Bundler configuration, optimization, and hot reload" },
];
