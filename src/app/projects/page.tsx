"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Anchor,
  Compass,
  ExternalLink,
  Star,
  Sparkles,
  ArrowRight,
  FolderGit2,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { projects } from "@/data/projects";

function GithubIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

type ProjectCategoryFilter =
  | "All"
  | "Fullstack"
  | "Frontend"
  | "Mobile & Game"
  | "Tools & AI";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategoryFilter>("All");

  const playClickSound = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;
      osc.type = "triangle";
      osc.frequency.setValueAtTime(587.33, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch {

    }
  };

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="relative isolate min-h-screen pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] max-h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(6, 14, 26, 0.2) 0%, rgba(6, 14, 26, 0.3) 65%, #060e1a 100%), url('/assets/background/Background_Projects.png')",
        }}
      />
      <div className="mx-auto max-w-6xl px-3 pt-20 sm:px-6 sm:pt-24 lg:px-8">


      <div className="mb-10 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0b1b30] border border-cyan-500/60 pixel-box text-[11px] font-['Silkscreen',monospace] text-cyan-300">
          <Anchor className="w-3.5 h-3.5 text-amber-400" />
          <span>EXPEDITION LOGBOOK // SHIPPED VOYAGES</span>
        </div>
        <h1 className="text-lg sm:text-4xl font-extrabold font-['Press_Start_2P',monospace] text-white tracking-wide">
          FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300">PROJECTS</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-['Pixelify_Sans',sans-serif]">
          A curated harbor of applications, interactive web experiences, and developer tools crafted across the digital seas.
        </p>
      </div>


      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 font-['Silkscreen',monospace] text-xs">
        {(
          [
            "All",
            "Frontend",
            "Fullstack",
            "Mobile & Game",
            "Tools & AI",
          ] as const
        ).map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => {
                playClickSound();
                setActiveCategory(category);
              }}
              className={`cursor-pointer px-3 sm:px-4 py-2 pixel-box transition-all ${
                isActive
                  ? "bg-cyan-500/25 text-cyan-300 border-2 border-cyan-400 font-bold shadow-[0_0_12px_rgba(6,182,212,0.35)]"
                  : "bg-[#071526]/80 text-slate-300 border border-slate-700 hover:text-cyan-300 hover:border-cyan-500"
              }`}
            >
              {isActive ? `▶ [ ${category.toUpperCase()} ]` : `[ ${category.toUpperCase()} ]`}
            </button>
          );
        })}
      </div>


      <div className="grid grid-cols-1 gap-6 sm:gap-8 mb-14">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-[#071526]/90 border-2 border-slate-700/90 hover:border-cyan-400/90 p-4 pixel-box grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 transition-all group shadow-xl relative"
          >
            <div className="min-w-0">
            <div className="space-y-3">

              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-[#030914] border border-cyan-500/40 text-[10px] font-['Silkscreen',monospace] text-cyan-300">
                      {project.category ?? "Expedition"}
                    </span>
                    {project.featured && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-500/20 border border-amber-400/80 text-[10px] font-['Silkscreen',monospace] text-amber-300">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>FLAGSHIP</span>
                      </span>
                    )}
                  </div>

                      <h2 className="font-['Press_Start_2P',monospace] text-xs sm:text-sm text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h2>
                </div>

                <div className="p-2 bg-[#040c17] border border-slate-700 pixel-box">
                  <FolderGit2 className="w-5 h-5 text-cyan-400" />
                </div>
              </div>


              <p className="text-slate-200 text-[11px] sm:text-xs leading-relaxed font-['Pixelify_Sans',sans-serif]">
                {project.description}
              </p>


              {project.highlights && project.highlights.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-['Silkscreen',monospace] text-amber-300 tracking-wider">
                    KEY ACHIEVEMENTS:
                  </span>
                  <ul className="space-y-1">
                    {project.highlights.map((h, i) => (
                      <li
                        key={i}
                    className="text-[11px] text-slate-300 flex items-start gap-2 font-['Pixelify_Sans',sans-serif]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}


              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 bg-[#030a14] border border-cyan-500/30 text-[9px] font-['Silkscreen',monospace] text-cyan-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>


            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-4 mt-3 border-t border-slate-800 font-['Press_Start_2P',monospace] text-[8px] sm:text-[9px]">
              {project.demoUrl && project.demoUrl !== "#" ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2.5 bg-gradient-to-b from-cyan-500 to-blue-700 text-white border border-cyan-200 pixel-box pixel-btn-primary"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>LIVE DEMO</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 px-3 py-2.5 bg-slate-800/60 text-slate-400 border border-slate-700 pixel-box cursor-not-allowed">
                  <span>INTERNAL / DEMO READY</span>
                </span>
              )}

              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2.5 bg-gradient-to-b from-slate-800 to-slate-950 text-cyan-200 border border-slate-600 pixel-box pixel-btn-wood hover:text-white hover:border-cyan-400"
                >
                  <GithubIcon className="w-3 h-3 text-amber-400" />
                  <span>VIEW REPO</span>
                </a>
              )}
            </div>
            </div>

            <div className="relative h-44 sm:h-64 self-center overflow-hidden border-2 border-cyan-800/70 bg-[#030c18] pixel-box">
              {project.image ? (
                <Image src={project.image} alt={`${project.title} product screenshot`} fill
                  sizes="(max-width: 1024px) 100vw, 42vw" className="object-contain p-3" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-cyan-800/80">
                  <ImageIcon aria-hidden="true" className="h-10 w-10" />
                  <span className="font-['Silkscreen',monospace] text-[10px]">PRODUCT IMAGE</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>


      <div className="mt-14 text-center bg-[#071526]/90 border-2 border-cyan-500/60 p-6 sm:mt-32 sm:p-8 lg:mt-72 pixel-box space-y-4">
        <div className="flex items-center justify-center gap-2 text-amber-300 font-['Press_Start_2P',monospace] text-xs">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>HAVE A CUSTOM EXPEDITION IN MIND?</span>
        </div>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-['Pixelify_Sans',sans-serif]">
          I build custom web applications, creative interactive portals, and robust architectures. Let&apos;s chart the next route together!
        </p>
        <div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-b from-cyan-500 to-blue-700 text-white border-2 border-cyan-200 pixel-box pixel-btn-primary font-['Press_Start_2P',monospace] text-xs"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>DISPATCH TRANSMISSION</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
