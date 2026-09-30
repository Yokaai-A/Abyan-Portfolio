import { Compass } from "lucide-react";
import { experiences, voyageCategories } from "@/data/experiences";
import VoyageRow from "@/components/ui/VoyageRow";
import type { VoyageCategory } from "@/types";

const categories: VoyageCategory[] = ["leadership", "community", "academic"];

export default function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="voyage-heading" className="mb-16 min-w-0 scroll-mt-24 pt-10 sm:pt-14">
      <header className="mb-12 space-y-3">
        <div className="flex items-start gap-3">
          <Compass aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
          <h2 id="voyage-heading" className="font-pixel text-xs leading-loose text-white sm:text-base">
            VOYAGE LOGBOOK <span className="text-cyan-300">{"// MY JOURNEY"}</span>
          </h2>
        </div>
        <p className="text-sm text-slate-300 sm:text-base">
          A collection of experiences gathered along the journey.
        </p>
      </header>
      <div className="space-y-14 sm:space-y-16">
        {categories.map((category) => (
          <VoyageRow key={category} category={category} title={voyageCategories[category].label}
            direction={voyageCategories[category].direction}
            experiences={experiences.filter((experience) => experience.category === category)} />
        ))}
      </div>
    </section>
  );
}
