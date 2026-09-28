"use client";

import { useRef, useState, type CSSProperties } from "react";
import { Code, Database, Layers, PackageOpen, Wrench } from "lucide-react";
import { techStack } from "@/data/techStack";
import type { SkillCategory } from "@/types";
import styles from "./TechStack.module.css";

const categories = [
  { id: "frontend", label: "FRONTEND", icon: Code, accent: "#22d3ee" },
  { id: "backend", label: "BACKEND", icon: Layers, accent: "#fbbf24" },
  { id: "database", label: "DATABASE", icon: Database, accent: "#34d399" },
  { id: "tools", label: "TOOLS", icon: Wrench, accent: "#a78bfa" },
] as const;

export default function SkillsInventory() {
  const [category, setCategory] = useState<SkillCategory>("frontend");
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeCategory = categories.find((item) => item.id === category)!;
  const skills = techStack.filter((skill) => skill.category === category);

  return (
    <section aria-label="Skills toolkit" className={`${styles.inventory} pixel-box`}
      style={{ "--skill-accent": activeCategory.accent } as CSSProperties}>
      <div role="group" aria-label="Skill categories" className={styles.categories}>
        {categories.map(({ id, label, icon: Icon, accent }) => (
          <button key={id} type="button" aria-pressed={category === id} aria-controls="skills-toolkit"
            onClick={() => { setCategory(id); scrollRef.current?.scrollTo({ top: 0 }); }}
            style={{ "--skill-accent": accent } as CSSProperties}
            className={styles.category}>
            {category === id && <span aria-hidden="true" className={styles.indicator} />}
            <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
            {label}
          </button>
        ))}
      </div>
      <h2 id="toolkit-heading" className={styles.heading}>
        <PackageOpen aria-hidden="true" className="h-4 w-4 shrink-0" />
        {activeCategory.label} TOOLKIT
      </h2>
      <div ref={scrollRef} id="skills-toolkit" role="region" aria-labelledby="toolkit-heading" tabIndex={0} className={styles.scrollArea}>
        <ul className={styles.grid}>
          {skills.map((skill) => (
            <li key={skill.name} className={styles.card}>
              {skill.icon ? (
                <span aria-hidden="true" className={styles.logo} style={{
                  maskImage: `url("${skill.icon}")`,
                  WebkitMaskImage: `url("${skill.icon}")`,
                }} />
              ) : <Code aria-hidden="true" className={styles.logoFallback} />}
              <span className="text-center font-pixel-body text-sm leading-relaxed text-slate-200">{skill.name}</span>
            </li>
          ))}
        </ul>
        {!skills.length && <p className="py-6 text-sm text-slate-400">New tools will be added along the voyage.</p>}
      </div>
    </section>
  );
}
