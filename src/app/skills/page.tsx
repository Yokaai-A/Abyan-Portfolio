"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Anchor, Compass, Code, Database, Wrench, Layers, Sparkles, ArrowRight, Shield } from "lucide-react";
import { techStack } from "@/data/techStack";

type CategoryFilter = "all" | "frontend" | "backend" | "database" | "tools";

export default function SkillsPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");

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
      osc.type = "square";
      osc.frequency.setValueAtTime(520, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // Audio context may be restricted
    }
  };

  const filteredSkills =
    selectedCategory === "all"
      ? techStack
      : techStack.filter((s) => s.category === selectedCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "frontend":
        return <Code className="w-4 h-4 text-cyan-400" />;
      case "backend":
        return <Layers className="w-4 h-4 text-amber-400" />;
      case "database":
        return <Database className="w-4 h-4 text-emerald-400" />;
      case "tools":
        return <Wrench className="w-4 h-4 text-sky-400" />;
      default:
        return <Shield className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Background ambient glow */}
      <div className="absolute top-24 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Page Header */}
      <div className="mb-10 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0b1b30] border border-cyan-500/60 pixel-box text-[11px] font-['Silkscreen',monospace] text-cyan-300">
          <Anchor className="w-3.5 h-3.5 text-amber-400" />
          <span>CAPTAIN&apos;S ARSENAL // SKILL INVENTORY</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-['Press_Start_2P',monospace] text-white tracking-wide">
          DEV <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-300 to-sky-300">SKILLS</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-['Pixelify_Sans',sans-serif]">
          Inspect my weapon loadout, technologies mastered across sea trials, and specialized developer craftsmanship.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 font-['Silkscreen',monospace] text-xs">
        {(
          [
            { id: "all", label: "ALL GEAR" },
            { id: "frontend", label: "FRONTEND" },
            { id: "backend", label: "BACKEND" },
            { id: "database", label: "DATABASE" },
            { id: "tools", label: "TOOLS & DEVOPS" },
          ] as const
        ).map((tab) => {
          const isActive = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playClickSound();
                setSelectedCategory(tab.id);
              }}
              className={`px-3 sm:px-4 py-2 pixel-box transition-all ${
                isActive
                  ? "bg-cyan-500/25 text-amber-300 border-2 border-amber-400 font-bold shadow-[0_0_12px_rgba(251,191,36,0.3)]"
                  : "bg-[#071526]/80 text-slate-300 border border-slate-700 hover:text-cyan-300 hover:border-cyan-500"
              }`}
            >
              {isActive ? `▶ [ ${tab.label} ]` : `[ ${tab.label} ]`}
            </button>
          );
        })}
      </div>

      {/* Skills Inventory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-14">
        {filteredSkills.map((skill) => {
          const level = skill.level ?? 80;
          return (
            <div
              key={skill.name}
              className="bg-[#071526]/90 border-2 border-slate-700/80 p-5 pixel-box flex flex-col justify-between hover:border-cyan-400 transition-all group shadow-lg"
            >
              <div className="space-y-3">
                {/* Header: Icon + Name */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-[#030914] border border-cyan-500/40 pixel-box">
                      {getCategoryIcon(skill.category)}
                    </div>
                    <div>
                      <h2 className="font-['Press_Start_2P',monospace] text-xs text-white group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h2>
                      <span className="text-[10px] font-['Silkscreen',monospace] text-slate-400 uppercase">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  <span className="font-['Press_Start_2P',monospace] text-[10px] text-amber-300">
                    {level}%
                  </span>
                </div>

                {/* Description */}
                {skill.description && (
                  <p className="text-xs text-slate-300 font-['Pixelify_Sans',sans-serif] leading-relaxed">
                    {skill.description}
                  </p>
                )}
              </div>

              {/* Retro Stepped Progress Bar */}
              <div className="mt-4 pt-3 border-t border-slate-800">
                <div className="w-full bg-[#020610] h-3 border border-slate-700 p-0.5 pixel-box flex items-center">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-amber-400 transition-all duration-500"
                    style={{ width: `${level}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Gear & Captain's Workshop Deck */}
      <div className="bg-[#071526]/90 border-2 border-slate-700/80 p-6 pixel-box mb-12 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800 font-['Press_Start_2P',monospace] text-xs text-amber-300">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>CAPTAIN&apos;S HARDWARE & RIGGING GEAR</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-['Pixelify_Sans',sans-serif]">
          <div className="p-3 bg-[#030914] border border-cyan-500/30 pixel-box space-y-1">
            <span className="font-['Silkscreen',monospace] text-cyan-300 block text-[10px]">
              [ RIG / WORKSTATION ]
            </span>
            <p className="text-slate-200">High-power UNIX & Windows hybrid environment</p>
          </div>

          <div className="p-3 bg-[#030914] border border-cyan-500/30 pixel-box space-y-1">
            <span className="font-['Silkscreen',monospace] text-cyan-300 block text-[10px]">
              [ HELM / EDITOR ]
            </span>
            <p className="text-slate-200">VS Code & Neovim with customized pixel shortcuts</p>
          </div>

          <div className="p-3 bg-[#030914] border border-cyan-500/30 pixel-box space-y-1">
            <span className="font-['Silkscreen',monospace] text-cyan-300 block text-[10px]">
              [ SHELL & TERMINAL ]
            </span>
            <p className="text-slate-200">Zsh / PowerShell with starship prompt & git automation</p>
          </div>

          <div className="p-3 bg-[#030914] border border-cyan-500/30 pixel-box space-y-1">
            <span className="font-['Silkscreen',monospace] text-cyan-300 block text-[10px]">
              [ AUDIO FREQUENCY ]
            </span>
            <p className="text-slate-200">Custom Web Audio synthesizer & 8-bit chip tunes</p>
          </div>
        </div>
      </div>

      {/* Navigation Footer CTA */}
      <div className="text-center bg-[#071526]/90 border-2 border-cyan-500/60 p-6 pixel-box space-y-4">
        <p className="font-['Press_Start_2P',monospace] text-xs text-amber-300">
          SEE THESE WEAPONS IN ACTION?
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 font-['Press_Start_2P',monospace] text-[10px]">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-b from-cyan-500 to-blue-700 text-white border-2 border-cyan-200 pixel-box pixel-btn-primary"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>EXPLORE EXPEDITIONS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-b from-slate-800 to-slate-950 text-cyan-200 border-2 border-slate-600 pixel-box pixel-btn-wood"
          >
            <span>COMMISSION A QUEST</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
