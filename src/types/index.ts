export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  category?: "Fullstack" | "Frontend" | "Mobile & Game" | "Tools & AI";
  featured?: boolean;
  demoUrl?: string;
  repoUrl?: string;
  highlights?: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string[];
  skills?: string[];
}

export interface TechStackItem {
  name: string;
  category: "frontend" | "backend" | "tools" | "other" | "database";
  level?: number; // 0 to 100
  icon?: string;
  description?: string;
}

