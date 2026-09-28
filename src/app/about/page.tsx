import type { Metadata } from "next";
import Link from "next/link";
import { Anchor, Compass, Sparkles, Terminal, ArrowRight, ShieldCheck } from "lucide-react";
import ExperienceSection from "@/components/sections/Experience";
import ProfilePhoto from "@/components/ui/ProfilePhoto";

export const metadata: Metadata = {
  title: "About Captain Abyan | Pixel Portfolio ⚓",
  description: "Learn more about Muhammad Abyan Hanif - journey, background, and developer experience.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen pb-20">
      <section className="relative isolate px-4 pt-24 pb-12 sm:px-6 lg:px-8" aria-label="About Abyan">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(6, 14, 26, 0.45) 0%, rgba(6, 14, 26, 0.55) 70%, #060e1a 100%), url('/assets/background/About_Me_Background.png')",
          }}
        />
        <div className="max-w-5xl mx-auto">

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
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6">
        {/* Profile Avatar & Class Box */}
        <div className="bg-[#071526]/90 border-2 border-cyan-500/50 p-6 pixel-box flex flex-col items-center text-center space-y-4 shadow-xl">
          <ProfilePhoto />

          <div>
            <h2 className="font-['Press_Start_2P',monospace] text-sm text-amber-300">
              MUHAMMAD ABYAN HANIF
            </h2>
            <p className="text-xs font-['Silkscreen',monospace] text-cyan-300 mt-1">
              CS STUDENT // SOFTWARE ENGINEER
            </p>
          </div>

          <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-2 w-full pt-3 border-t border-cyan-900/60 text-left text-xs leading-relaxed font-['Pixelify_Sans',sans-serif]">
            <dt className="text-slate-400">University:</dt>
            <dd className="font-semibold text-cyan-200">BINUS University</dd>

            <dt className="text-slate-400">Interests:</dt>
            <dd className="font-semibold text-cyan-200">
              <span className="block">Software Engineering</span>
              <span className="block">Full-Stack Development</span>
            </dd>

            <dt className="text-slate-400">Focus:</dt>
            <dd className="font-semibold text-cyan-200">Web &amp; Mobile Development</dd>

            <dt className="text-slate-400">Based in:</dt>
            <dd className="font-semibold text-cyan-200">Indonesia</dd>

            <dt className="text-slate-400">Status:</dt>
            <dd className="text-emerald-400 font-semibold">Ready for Quests</dd>
          </dl>
        </div>

        {/* Narrative Biography & Story */}
        <div className="bg-[#071526]/90 border-2 border-slate-700/80 p-6 pixel-box flex flex-col justify-between shadow-xl">
          <div className="space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed">
            <div className="flex items-center gap-2 font-['Silkscreen',monospace] text-xs text-amber-400 pb-2 border-b border-slate-800">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>CAPTAIN_DOSSIER.MD</span>
            </div>

            <p>
              Ahoy! I&apos;m <strong className="text-cyan-300">Muhammad Abyan Hanif</strong>, a Computer Science student at Bina Nusantara University with a strong interest in Software Engineering and Full-Stack Development. I focus on building web and mobile applications that are functional, intuitive, and designed around real user needs.
            </p>

            <p>
              I enjoy working across different layers of development, from crafting responsive user interfaces to designing application logic and backend systems. I approach each project with an emphasis on clean, readable, and maintainable code, while keeping scalability and good software architecture in mind.
            </p>

            <p>
              I&apos;m constantly exploring new technologies and improving the way I build software. For me, development isn&apos;t just about making things work—it&apos;s about creating reliable and meaningful digital experiences while continuously growing as an engineer.
            </p>
          </div>

          {/* Quick HUD Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-4 border-t border-slate-800 font-['Silkscreen',monospace] text-center">
            <div className="p-2.5 bg-[#030a14] border border-cyan-500/40 pixel-box">
              <div className="text-base sm:text-lg font-bold text-amber-300">2.5+</div>
              <div className="text-[10px] text-slate-400">YEARS SAILING</div>
            </div>
            <div className="p-2.5 bg-[#030a14] border border-cyan-500/40 pixel-box">
              <div className="text-base sm:text-lg font-bold text-cyan-300">7+</div>
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

        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <ExperienceSection />

      {/* Captain's Code: development principles */}
      <section aria-labelledby="captains-code-heading" className="mb-14 pt-4 sm:mb-16 sm:pt-6">
        <header className="mb-6 space-y-3 border-b border-cyan-800/60 pb-5">
          <div className="flex items-center gap-3">
            <Anchor aria-hidden="true" className="h-5 w-5 shrink-0 text-amber-400" />
            <h2 id="captains-code-heading" className="font-pixel text-xs leading-loose text-amber-300 sm:text-base">
              CAPTAIN&apos;S CODE
            </h2>
          </div>
          <p className="font-pixel-body text-sm text-slate-400 sm:text-base">
            Principles that guide the way I build and explore.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="group min-w-0 space-y-3 border border-slate-700 bg-[#071526]/80 p-4 shadow-[3px_3px_0_#020617] transition-[transform,border-color,box-shadow] duration-200 hover:border-cyan-400/80 hover:shadow-[3px_3px_0_#020617,0_0_12px_#22d3ee14] motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none">
            <h3 className="flex items-center gap-2 font-pixel text-[10px] leading-relaxed text-cyan-300">
              <ShieldCheck aria-hidden="true" className="h-4 w-4 shrink-0 text-cyan-400 transition-colors duration-200 group-hover:text-cyan-200 motion-reduce:transition-none" />
              CLEAN CODE
            </h3>
            <p className="font-pixel-body text-sm leading-relaxed text-slate-300">
              Building maintainable, structured, and self-documenting code.
            </p>
          </article>

          <article className="group min-w-0 space-y-3 border border-slate-700 bg-[#071526]/80 p-4 shadow-[3px_3px_0_#020617] transition-[transform,border-color,box-shadow] duration-200 hover:border-amber-400/80 hover:shadow-[3px_3px_0_#020617,0_0_12px_#fbbf2414] motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none">
            <h3 className="flex items-center gap-2 font-pixel text-[10px] leading-relaxed text-amber-300">
              <Sparkles aria-hidden="true" className="h-4 w-4 shrink-0 text-amber-400 transition-colors duration-200 group-hover:text-amber-200 motion-reduce:transition-none" />
              USER FOCUSED
            </h3>
            <p className="font-pixel-body text-sm leading-relaxed text-slate-300">
              Creating intuitive experiences around real user needs.
            </p>
          </article>

          <article className="group min-w-0 space-y-3 border border-slate-700 bg-[#071526]/80 p-4 shadow-[3px_3px_0_#020617] transition-[transform,border-color,box-shadow] duration-200 hover:border-cyan-400/80 hover:shadow-[3px_3px_0_#020617,0_0_12px_#22d3ee14] motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none">
            <h3 className="flex items-center gap-2 font-pixel text-[10px] leading-relaxed text-cyan-300">
              <Compass aria-hidden="true" className="h-4 w-4 shrink-0 text-cyan-400 transition-colors duration-200 group-hover:text-cyan-200 motion-reduce:transition-none" />
              NEW HORIZONS
            </h3>
            <p className="font-pixel-body text-sm leading-relaxed text-slate-300">
              Continuously learning new technologies, patterns, and approaches.
            </p>
          </article>
        </div>
      </section>

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
    </div>
  );
}
