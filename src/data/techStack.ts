import type { TechStackItem } from "@/types";

// Add a name, category, and optional local SVG icon path. No ratings or detail panel fields.
export const techStack: TechStackItem[] = [
  // Frontend
  { name: "TypeScript", icon: "/assets/icons/skills/typescript.svg", category: "frontend" },
  { name: "React", icon: "/assets/icons/skills/react.svg", category: "frontend" },
  { name: "Next.js", icon: "/assets/icons/skills/nextdotjs.svg", category: "frontend" },
  { name: "Tailwind CSS", icon: "/assets/icons/skills/tailwindcss.svg", category: "frontend" },
  { name: "Framer Motion", icon: "/assets/icons/skills/framer.svg", category: "frontend" },
  { name: "HTML5 / Canvas", icon: "/assets/icons/skills/html5.svg", category: "frontend" },
  { name: "JavaScript", icon: "/assets/icons/skills/javascript.svg", category: "frontend" },

  // Backend
  { name: "Node.js", icon: "/assets/icons/skills/nodedotjs.svg", category: "backend" },
  { name: "NestJS", icon: "/assets/icons/skills/nestjs.svg", category: "backend" },

  // Database
  { name: "PostgreSQL", icon: "/assets/icons/skills/postgresql.svg", category: "database" },

  // Tools & DevOps
  { name: "Git & GitHub", icon: "/assets/icons/skills/git.svg", category: "tools" },
  { name: "Docker", icon: "/assets/icons/skills/docker.svg", category: "tools" },
  { name: "Figma", icon: "/assets/icons/skills/figma.svg", category: "tools" },
  { name: "Canva", icon: "/assets/icons/skills/canva.svg", category: "tools" },
];
