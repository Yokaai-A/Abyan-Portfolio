"use client";

import React from "react";
import { Anchor, Compass, Terminal } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#060e1a]/85 border-b-2 border-cyan-600/40 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Pixel Brand Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 font-['Press_Start_2P',monospace] text-xs sm:text-sm text-cyan-300 hover:text-amber-300 transition-colors"
        >
          <Anchor className="w-4 h-4 text-amber-400" />
          <span className="tracking-wider">ABYAN.DEV</span>
        </a>

        {/* Pixel Navigation Links */}
        <div className="hidden md:flex items-center gap-6 font-['Silkscreen',monospace] text-xs text-slate-300">
          <a
            href="#about"
            className="hover:text-cyan-300 transition-colors tracking-wide hover:underline decoration-cyan-400 underline-offset-4"
          >
            [ ABOUT ]
          </a>
          <a
            href="#techstack"
            className="hover:text-cyan-300 transition-colors tracking-wide hover:underline decoration-cyan-400 underline-offset-4"
          >
            [ SKILLS ]
          </a>
          <a
            href="#projects"
            className="hover:text-cyan-300 transition-colors tracking-wide hover:underline decoration-cyan-400 underline-offset-4"
          >
            [ PROJECTS ]
          </a>
          <a
            href="#contact"
            className="hover:text-cyan-300 transition-colors tracking-wide hover:underline decoration-cyan-400 underline-offset-4"
          >
            [ CONTACT ]
          </a>
        </div>

        {/* Voyage Status Indicator */}
        <div className="flex items-center gap-2 px-2.5 py-1 bg-[#0b1b30] border border-cyan-500/50 pixel-box text-[10px] font-['Silkscreen',monospace] text-cyan-300">
          <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse inline-block" />
          <span className="hidden sm:inline">VOYAGE: ACTIVE</span>
          <span className="sm:hidden">ACTIVE</span>
        </div>
      </nav>
    </header>
  );
}
