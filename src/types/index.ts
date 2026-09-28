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

export type VoyageCategory = "leadership" | "community" | "academic" | "personal";

export interface VoyageMemory {
  src: string;
  caption: string;
  alt?: string;
}

export interface Experience {
  id: string;
  title: string;
  category: VoyageCategory;
  organization: string;
  division?: string;
  period: string;
  caption: string;
  image?: string;
  imageAlt?: string;
  scholarship?: string;
  description: string[];
  tags: string[];
  gallery?: VoyageMemory[];
}

export type SkillCategory = "frontend" | "backend" | "database" | "tools";

export interface TechStackItem {
  name: string;
  category: SkillCategory;
  icon?: string;
}

