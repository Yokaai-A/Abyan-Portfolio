import Link from "next/link";
import { Anchor, Compass, ArrowDown, ArrowRight, Monitor, Laptop, CodeXml } from "lucide-react";
import SkillsInventory from "@/components/sections/TechStack";

export default function SkillsPage() {
  return (
    <div className="relative isolate min-h-screen pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(6, 14, 26, 0.4) 0%, rgba(6, 14, 26, 0.55) 70%, #060e1a 100%), url('/assets/background/Background_Skills.png')",
          }}
        />
      <section className="pt-20 pb-8 sm:pt-24 sm:pb-12" aria-label="Developer skills">
        <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8 flow-root">
      <header className="mb-10 space-y-3 text-center">
        <div className="inline-flex items-center gap-2 border border-cyan-500/60 bg-[#0b1b30] px-3 py-1 font-pixel-mono text-[11px] text-cyan-300 pixel-box">
          <Anchor aria-hidden="true" className="h-3.5 w-3.5 text-amber-400" />
          CAPTAIN&apos;S TOOLKIT
        </div>
        <h1 className="text-lg sm:text-4xl font-extrabold font-['Press_Start_2P',monospace] text-white tracking-wide">
          DEV <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-300 to-sky-300">SKILLS</span>
        </h1>
        <p className="mx-auto max-w-2xl font-pixel-body text-sm text-slate-300 sm:text-base">
          Tools and technologies collected throughout the voyage.
        </p>
      </header>

      <SkillsInventory />
        <a
          href="#captains-workstation"
          className="pixel-box relative mx-auto mt-6 hidden w-fit flex-row items-center gap-3 border border-cyan-400/70 bg-[#071526] px-5 py-3 font-pixel-mono text-[10px] text-cyan-200 transition-[transform,border-color,color] duration-200 hover:-translate-y-0.5 hover:border-amber-300 hover:text-amber-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300 sm:flex"
        >
          <span>SCROLL DOWN TO CONTINUE</span>
          <ArrowDown aria-hidden="true" className="h-4 w-4 text-amber-300 motion-safe:animate-bounce motion-reduce:animate-none" />
        </a>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-3 pt-14 sm:px-6 sm:pt-20 lg:px-8">
      <section id="captains-workstation" aria-labelledby="workstation-heading" className="mb-12 scroll-mt-8 space-y-6">
        <header className="space-y-3 border-b border-cyan-900/60 pb-4">
          <h2 id="workstation-heading" className="flex items-center gap-3 font-pixel text-xs leading-loose text-amber-300 sm:text-sm">
            <Compass aria-hidden="true" className="h-5 w-5 shrink-0 text-cyan-300" />
            CAPTAIN&apos;S WORKSTATION
          </h2>
          <p className="text-sm text-slate-400">The setup behind the voyage.</p>
        </header>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <article className="border border-cyan-800/60 bg-[#071526]/90 p-5 pixel-box">
            <h3 className="mb-5 font-pixel-mono text-xs leading-relaxed text-cyan-300">[ SYSTEM / WORKSTATION ]</h3>
            <ul className="space-y-4 text-sm text-slate-200">
              <li className="flex items-center gap-3"><Monitor aria-hidden="true" className="h-5 w-5 text-cyan-400" />Windows</li>
              <li className="flex items-center gap-3"><Laptop aria-hidden="true" className="h-5 w-5 text-cyan-400" />macOS</li>
            </ul>
            <p className="mt-6 text-xs text-slate-400">Primary operating environments</p>
          </article>
          <article className="border border-cyan-800/60 bg-[#071526]/90 p-5 pixel-box">
            <h3 className="mb-5 font-pixel-mono text-xs leading-relaxed text-amber-300">[ HELM / EDITORS ]</h3>
            <ul className="space-y-4 text-sm text-slate-200">
              {["Visual Studio Code", "Kiro", "Antigravity"].map((editor) => (
                <li key={editor} className="flex items-center gap-3"><CodeXml aria-hidden="true" className="h-5 w-5 text-amber-400" />{editor}</li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-slate-400">Editors used across the voyage</p>
          </article>
        </div>
      </section>

      {/* Navigation Footer CTA */}
      <div className="text-center bg-[#071526]/90 border-2 border-cyan-500/60 p-6 pixel-box space-y-4">
        <p className="font-['Press_Start_2P',monospace] text-xs text-amber-300">
          SEE THESE TOOLS IN ACTION?
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
    </div>
  );
}
