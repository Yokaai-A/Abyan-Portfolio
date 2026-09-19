import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 p-4">
      <h3 className="text-xl font-bold">{project.title}</h3>
      <p className="text-zinc-400 mt-2">{project.description}</p>
    </div>
  );
}
