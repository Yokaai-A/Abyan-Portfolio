import { Experience } from "@/types";

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="border-l-2 border-zinc-700 pl-4 py-2">
      <h3 className="text-lg font-bold">{experience.role}</h3>
      <p className="text-sm text-zinc-400">
        {experience.company} • {experience.period}
      </p>
    </div>
  );
}
