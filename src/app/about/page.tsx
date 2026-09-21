import type { Metadata } from "next";
import Link from "next/link";
import { Anchor, Compass, Award, Clock, MapPin, Sparkles, Terminal, ArrowRight, ShieldCheck } from "lucide-react";
import { experiences } from "@/data/experiences";

export const metadata: Metadata = {
  title: "About Captain Abyan | Pixel Portfolio ⚓",
  description: "Learn more about Muhammad Abyan Hanif - journey, background, and developer experience.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Background ambient glow */}
      <div className="absolute top-20 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Page Header */}
      <div className="mb-10 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0b1b30] border border-cyan-500/60 pixel-box text-[11px] font-['Silkscreen',monospace] text-cyan-300">
          <Anchor className="w-3.5 h-3.5 text-amber-400" />
          <span>CAPTAIN&apos;S QUARTERS // LOGBOOK</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-['Press_Start_2P',monospace] text-white tracking-wide">
          ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-amber-300">ABYAN</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-['Pixelify_Sans',sans-serif]">
          A deep dive into my journey, dev stack philosophies, and the nautical voyages that forged my engineering skills.
        </p>
      </div>

      {/* Captain Profile Card & Stats HUD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Profile Avatar & Class Box */}
        <div className="bg-[#071526]/90 border-2 border-cyan-500/50 p-6 pixel-box flex flex-col items-center text-center space-y-4 shadow-xl">
          <div className="relative w-36 h-36 bg-[#040c17] border-2 border-cyan-400/80 pixel-box flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />
            <img
              src="/assets/characters/Idle_breathing-idle_south.gif"
              alt="Captain Abyan Pixel"
              className="w-28 h-28 pixelated transition-transform group-hover:scale-110"
            />
          </div>

          <div>
            <h2 className="font-['Press_Start_2P',monospace] text-sm text-amber-300">
              ABYAN HANIF
            </h2>
            <p className="text-xs font-['Silkscreen',monospace] text-cyan-300 mt-1">
              LV. 24 FULLSTACK NAVIGATOR
            </p>
          </div>

          <div className="w-full pt-3 border-t border-cyan-900/60 text-left text-xs font-['Pixelify_Sans',sans-serif] space-y-2">
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-400">Class:</span>
              <span className="font-semibold text-cyan-200">Creative Engineer</span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-400">Home Port:</span>
              <span className="font-semibold text-cyan-200">Indonesia</span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-400">Focus:</span>
              <span className="font-semibold text-cyan-200">React • Next.js • TS</span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-400">Status:</span>
              <span className="text-emerald-400 font-semibold">Ready for Quests</span>
            </div>
          </div>
        </div>

        {/* Narrative Biography & Story */}
        <div className="md:col-span-2 bg-[#071526]/90 border-2 border-slate-700/80 p-6 pixel-box flex flex-col justify-between shadow-xl">
          <div className="space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed">
            <div className="flex items-center gap-2 font-['Silkscreen',monospace] text-xs text-amber-400 pb-2 border-b border-slate-800">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>CAPTAIN_DOSSIER.MD</span>
            </div>

            <p>
              Ahoy! I&apos;m <strong className="text-cyan-300">Muhammad Abyan Hanif</strong>, a software engineer with an unwavering passion for building fast, intuitive, and visually memorable digital products.
            </p>

            <p>
              I treat every project like preparing a sturdy ship before sailing out to the open ocean: solid architectural foundations, reliable type safety with TypeScript, crisp pixel-precise styling, and seamless user experiences that keep visitors engaged.
            </p>

            <p>
              Whether crafting dynamic Next.js web applications, building custom Web Audio synthesizers, or fine-tuning database schemas, I combine engineering rigor with playful retro aesthetics.
            </p>
          </div>

          {/* Quick HUD Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-4 border-t border-slate-800 font-['Silkscreen',monospace] text-center">
            <div className="p-2.5 bg-[#030a14] border border-cyan-500/40 pixel-box">
              <div className="text-base sm:text-lg font-bold text-amber-300">3+</div>
              <div className="text-[10px] text-slate-400">YEARS SAILING</div>
            </div>
            <div className="p-2.5 bg-[#030a14] border border-cyan-500/40 pixel-box">
              <div className="text-base sm:text-lg font-bold text-cyan-300">20+</div>
              <div className="text-[10px] text-slate-400">EXPEDITIONS</div>
            </div>
            <div className="p-2.5 bg-[#030a14] border border-cyan-500/40 pixel-box">
              <div className="text-base sm:text-lg font-bold text-emerald-300">100%</div>
              <div className="text-[10px] text-slate-400">QUEST FINISH</div>
            </div>
            <div className="p-2.5 bg-[#030a14] border border-cyan-500/40 pixel-box">
              <div className="text-base sm:text-lg font-bold text-rose-300">99+</div>
              <div className="text-[10px] text-slate-400">COFFEE RUNS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Experience & Voyage Milestones Timeline */}
      <div className="mb-14 space-y-6">
        <div className="flex items-center gap-3 pb-2 border-b-2 border-cyan-700/50">
          <Compass className="w-5 h-5 text-amber-400" />
          <h2 className="font-['Press_Start_2P',monospace] text-sm sm:text-base text-white">
            VOYAGE LOGBOOK // EXPERIENCE
          </h2>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="relative pl-6 sm:pl-8 border-l-2 border-cyan-500/50 space-y-3 group"
            >
              {/* Anchor milestone flag on the timeline */}
              <div className="absolute -left-[9px] top-1 w-4 h-4 bg-[#060e1a] border-2 border-amber-400 rounded-none flex items-center justify-center group-hover:bg-amber-400 transition-colors">
                <span className="w-1.5 h-1.5 bg-cyan-300 inline-block" />
              </div>

              <div className="bg-[#071526]/85 border border-slate-700 p-5 pixel-box space-y-3 hover:border-cyan-400 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="font-['Press_Start_2P',monospace] text-xs sm:text-sm text-cyan-200">
                      {exp.role}
                    </h3>
                    <p className="text-xs font-['Silkscreen',monospace] text-amber-300 mt-1">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-['Silkscreen',monospace] text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <ul className="space-y-1.5 text-slate-300 text-xs sm:text-sm list-disc list-inside">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {desc}
                    </li>
                  ))}
                </ul>

                {exp.skills && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-[#030914] border border-cyan-500/30 text-[10px] font-['Silkscreen',monospace] text-cyan-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Voyage Core Philosophies */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="bg-[#071526]/80 border border-slate-700 p-4 pixel-box space-y-2">
          <div className="flex items-center gap-2 text-cyan-300 font-['Press_Start_2P',monospace] text-[10px]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>CLEAN CODE</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-['Pixelify_Sans',sans-serif]">
            Codebases built to endure rough waters: maintainable, type-safe, and self-documenting.
          </p>
        </div>

        <div className="bg-[#071526]/80 border border-slate-700 p-4 pixel-box space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-['Press_Start_2P',monospace] text-[10px]">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>RETRO CHARM</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-['Pixelify_Sans',sans-serif]">
            Blending modern web performance with authentic nostalgic game aesthetics and rich audio.
          </p>
        </div>

        <div className="bg-[#071526]/80 border border-slate-700 p-4 pixel-box space-y-2">
          <div className="flex items-center gap-2 text-cyan-300 font-['Press_Start_2P',monospace] text-[10px]">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>NEW HORIZONS</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-['Pixelify_Sans',sans-serif]">
            Constantly adopting newer frameworks, performance patterns, and creative capabilities.
          </p>
        </div>
      </div>

      {/* Navigation Footer CTA */}
      <div className="text-center bg-[#071526]/90 border-2 border-cyan-500/60 p-6 pixel-box space-y-4">
        <p className="font-['Press_Start_2P',monospace] text-xs text-amber-300">
          READY TO INSPECT MY ARSENAL?
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 font-['Press_Start_2P',monospace] text-[10px]">
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-b from-cyan-500 to-blue-700 text-white border-2 border-cyan-200 pixel-box pixel-btn-primary"
          >
            <span>VIEW SKILLS INVENTORY</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-b from-slate-800 to-slate-950 text-cyan-200 border-2 border-slate-600 pixel-box pixel-btn-wood"
          >
            <span>SEND TELEGRAPH</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
