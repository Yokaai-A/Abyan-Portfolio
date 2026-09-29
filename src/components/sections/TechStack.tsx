"use client";

import { useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Code, Compass, Database, Layers, PackageOpen, Sparkles, Terminal, Wrench } from "lucide-react";
import { techStack } from "@/data/techStack";
import type { SkillCategory } from "@/types";
import styles from "./TechStack.module.css";

const categories = [
  { id: "frontend", label: "FRONTEND", icon: Code, accent: "#22d3ee", title: "Crafting the experience.", description: "From the first pixel to the final interaction. The tools I use to build responsive interfaces and bring ideas to life.", tag: "INTERFACE & INTERACTION", dossierTitle: <>Shape the<br /><span>first impression.</span></>, dossierText: "The visual craft behind clear, responsive experiences.", emblemLabel: "DESIGN · BUILD · REFINE", emblemRotation: "0deg", logNote: "A good voyage starts with a clear view." },
  { id: "backend", label: "BACKEND", icon: Layers, accent: "#fbbf24", title: "Powering the journey.", description: "Behind every interface is a working engine. My toolkit for application logic, APIs, and connected experiences.", tag: "LOGIC & APPLICATIONS", dossierTitle: <>Build the<br /><span>engine room.</span></>, dossierText: "The logic and services that keep each experience moving.", emblemLabel: "CONNECT · PROCESS · SERVE", emblemRotation: "45deg", logNote: "Reliable systems keep the voyage moving." },
  { id: "database", label: "DATABASE", icon: Database, accent: "#34d399", title: "Keeping things anchored.", description: "A solid foundation for every application. The technologies I use to organize, store, and work with data.", tag: "DATA & STRUCTURE", dossierTitle: <>Keep data<br /><span>well anchored.</span></>, dossierText: "Structured foundations for information worth keeping.", emblemLabel: "STORE · QUERY · GROW", emblemRotation: "90deg", logNote: "Every discovery needs a place to land." },
  { id: "tools", label: "TOOLS", icon: Wrench, accent: "#a78bfa", title: "Equipped for the voyage.", description: "From early sketches to version control. The everyday tools that help me design, collaborate, and build.", tag: "DESIGN & WORKFLOW", dossierTitle: <>Ready for<br /><span>the next build.</span></>, dossierText: "The practical kit for turning plans into progress.", emblemLabel: "PLAN · MAKE · SHIP", emblemRotation: "135deg", logNote: "The right tool makes room for better ideas." },
] as const;

export default function SkillsInventory() {
  const [category, setCategory] = useState<SkillCategory>("frontend");
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeCategory = categories.find((item) => item.id === category)!;
  const skills = techStack.filter((skill) => skill.category === category);
  const ActiveIcon = activeCategory.icon;

  return (
    <section aria-label="Skills toolkit" className={styles.inventory}
      style={{ "--skill-accent": activeCategory.accent, "--emblem-turn": activeCategory.emblemRotation } as CSSProperties}>
      <aside className={`${styles.dossier} pixel-box`}>
        <div className={styles.eyebrow}><Compass size={15} aria-hidden="true" /> THE DEVELOPER&apos;S ARSENAL</div>
        <div className={styles.emblem} aria-hidden="true">
          <span className={styles.north}>N</span>
          <span className={styles.orbit} />
          <span className={styles.emblemCore}><ActiveIcon size={42} strokeWidth={1.5} /></span>
          <span className={styles.emblemLabel}>{activeCategory.emblemLabel}</span>
        </div>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>{activeCategory.tag}</p>
          <h2>{activeCategory.dossierTitle}</h2>
          <p>{activeCategory.dossierText}</p>
        </div>
        <dl className={styles.metrics}>
          <div><dt>TECHNOLOGIES</dt><dd>{String(techStack.length).padStart(2, "0")}</dd></div>
          <div><dt>CATEGORIES</dt><dd>{String(categories.length).padStart(2, "0")}</dd></div>
        </dl>
        <p className={styles.logNote}><Sparkles size={14} aria-hidden="true" /> {activeCategory.logNote}</p>
      </aside>
      <div className={`${styles.toolkit} pixel-box`}>
      <div className={styles.windowBar}>
        <span><Terminal size={14} aria-hidden="true" /> SKILLS_INVENTORY</span>
        <span className={styles.windowDots} aria-hidden="true"><i /><i /><i /></span>
      </div>
      <div role="group" aria-label="Skill categories" className={styles.categories}>
        {categories.map(({ id, label, icon: Icon, accent }) => (
          <button key={id} type="button" aria-pressed={category === id} aria-controls="skills-toolkit"
            onClick={() => { setCategory(id); scrollRef.current?.scrollTo({ top: 0 }); }}
            style={{ "--skill-accent": accent } as CSSProperties}
            className={styles.category}>
            {category === id && <span aria-hidden="true" className={styles.indicator} />}
            <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
            <span>{label}</span>
            <span className={styles.categoryCount}>{String(techStack.filter((skill) => skill.category === id).length).padStart(2, "0")}</span>
          </button>
        ))}
      </div>
      <div className={styles.categoryIntro}>
        <div className={styles.eyebrow}><PackageOpen size={14} aria-hidden="true" /> {activeCategory.tag}</div>
        <h2 id="toolkit-heading" className={styles.heading}>{activeCategory.title}</h2>
        <p>{activeCategory.description}</p>
      </div>
      <div ref={scrollRef} id="skills-toolkit" role="region" aria-labelledby="toolkit-heading" tabIndex={0} className={styles.scrollArea}>
        <ul key={category} className={styles.grid}>
          {skills.map((skill, index) => (
            <li key={skill.name} className={styles.card} style={{ "--card-index": index } as CSSProperties}>
              <span className={styles.slotNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.logoFrame}>
              {skill.icon ? (
                <span aria-hidden="true" className={styles.logo} style={{
                  maskImage: `url("${skill.icon}")`,
                  WebkitMaskImage: `url("${skill.icon}")`,
                }} />
              ) : <Code aria-hidden="true" className={styles.logoFallback} />}
              </span>
              <span className="text-center font-pixel-body text-xs sm:text-sm leading-relaxed text-slate-200">{skill.name}</span>
              <span className={styles.cardAccent} aria-hidden="true" />
            </li>
          ))}
        </ul>
        {!skills.length && <p className="py-6 text-sm text-slate-400">New tools will be added along the voyage.</p>}
      </div>
      <div className={styles.inventoryFooter}>
        <span aria-live="polite">{String(skills.length).padStart(2, "0")} TOOLS IN THIS COLLECTION</span>
        <ArrowUpRight size={15} aria-hidden="true" />
      </div>
      </div>
    </section>
  );
}
