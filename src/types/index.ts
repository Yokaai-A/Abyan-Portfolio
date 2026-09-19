export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface TechStackItem {
  name: string;
  category: "frontend" | "backend" | "tools" | "other";
  icon?: string;
}
