"use client";

import React from "react";
import { Anchor, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#030811] border-t-2 border-cyan-800/40 text-slate-400 font-['Silkscreen',monospace] text-xs mt-auto">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">

        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 font-['Press_Start_2P',monospace] text-[11px] text-cyan-300">
            <Anchor className="w-3.5 h-3.5 text-amber-400" />
            <span>S.S. CODECRAFT // PORT ABYAN</span>
          </div>
          <p className="text-[10px] text-slate-500">
            LAT 06° 12&apos; S / LONG 106° 48&apos; E • BREEZE: 12 KNOTS • ALL SEAS CLEAR
          </p>
        </div>


        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-300">
          <a
            href="https://www.linkedin.com/in/muhammad-abyan-hanif-42217b326/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-300 transition-colors"
          >
            [ LINKEDIN ]
          </a>
          <a
            href="https://github.com/Yokaai-A"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-300 transition-colors"
          >
            [ GITHUB ]
          </a>
          <a href="mailto:abyanhanif41@gmail.com" className="hover:text-cyan-300 transition-colors">
            [ EMAIL ]
          </a>
        </div>


        <div className="flex items-center gap-4">
          <span className="text-[10px] text-slate-400">
            &copy; {new Date().getFullYear()} MUHAMMAD ABYAN HANIF
          </span>
          <button
            onClick={scrollToTop}
            className="p-2 bg-[#081526] border border-cyan-500/40 pixel-box text-cyan-300 hover:text-white hover:border-amber-400 transition-colors"
            title="Return to deck surface"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
