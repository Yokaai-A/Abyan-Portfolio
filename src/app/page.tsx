import Hero from "@/components/sections/Hero";
import Link from "next/link";
import { Anchor, Compass, User, Wrench, FolderGit2, Radio, ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  const PORTAL_SECTIONS = [
    {
      title: "CAPTAIN DOSSIER",
      label: "ABOUT ME",
      href: "/about",
      icon: User,
      color: "from-cyan-500 to-blue-700",
      accent: "text-cyan-300",
      border: "hover:border-cyan-400",
      description: "Background story, developer milestones, core philosophies, and career journey.",
    },
    {
      title: "SKILL INVENTORY",
      label: "TECH STACK",
      href: "/skills",
      icon: Wrench,
      color: "from-amber-500 to-amber-700",
      accent: "text-amber-300",
      border: "hover:border-amber-400",
      description: "Weapons & tools mastered across TypeScript, React, Next.js, and scalable backends.",
    },
    {
      title: "EXPEDITION LOG",
      label: "PROJECTS",
      href: "/projects",
      icon: FolderGit2,
      color: "from-sky-500 to-indigo-700",
      accent: "text-sky-300",
      border: "hover:border-sky-400",
      description: "Shipped voyages, interactive web apps, open source repos, and live demos.",
    },
    {
      title: "TELEGRAPH STATION",
      label: "CONTACT",
      href: "/contact",
      icon: Radio,
      color: "from-emerald-500 to-teal-700",
      accent: "text-emerald-300",
      border: "hover:border-emerald-400",
      description: "Transmit a direct signal to discuss quests, commissions, or fullstack voyages.",
    },
  ];

  return (
    <main className="w-full">

      <Hero />


      <section id="voyage-directory" className="relative max-w-6xl mx-auto scroll-mt-20 px-3 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0b1b30] border border-cyan-500/60 pixel-box text-[11px] font-['Silkscreen',monospace] text-cyan-300">
            <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "14s" }} />
            <span>COMMAND DECK // VOYAGE DIRECTORY</span>
          </div>
          <h2 className="text-base sm:text-3xl font-extrabold font-['Press_Start_2P',monospace] text-white">
            EXPLORE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-amber-300">SHIP</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-['Pixelify_Sans',sans-serif]">
            Select a cabin below to inspect the captain&apos;s records, weaponry, and active sea operations.
          </p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PORTAL_SECTIONS.map((portal) => {
            const Icon = portal.icon;
            return (
              <Link
                key={portal.href}
                href={portal.href}
                className={`bg-[#071526]/90 border-2 border-slate-700/80 ${portal.border} p-5 pixel-box flex flex-col justify-between transition-all duration-200 group hover:-translate-y-1 shadow-lg`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-[#030914] border border-cyan-500/40 pixel-box group-hover:scale-110 transition-transform">
                      <Icon className={`w-5 h-5 ${portal.accent}`} />
                    </div>
                    <span className="text-[9px] font-['Silkscreen',monospace] text-slate-400">
                      [ CABIN ]
                    </span>
                  </div>

                  <div>
                    <span className={`text-[10px] font-['Silkscreen',monospace] ${portal.accent} block`}>
                      {portal.title}
                    </span>
                    <h3 className="font-['Press_Start_2P',monospace] text-xs sm:text-sm text-white group-hover:text-cyan-200 transition-colors mt-1">
                      {portal.label}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 font-['Pixelify_Sans',sans-serif] leading-relaxed">
                    {portal.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800 font-['Press_Start_2P',monospace] text-[9px] text-cyan-300 group-hover:text-amber-300 transition-colors">
                  <span>ENTER CABIN</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
