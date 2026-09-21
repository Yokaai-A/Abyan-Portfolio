"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Anchor, Menu, X, Ship, Zap } from "lucide-react";

const NAV_ITEMS = [
  { name: "ABOUT",    href: "/about"    },
  { name: "SKILLS",   href: "/skills"   },
  { name: "PROJECTS", href: "/projects" },
  { name: "CONTACT",  href: "/contact"  },
];

// Blink helper
const BLINK_INTERVAL = 600;

export default function Navbar() {
  const pathname  = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node))
        setMobileOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const playBeep = () => {
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;
      osc.type = "square";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(660, now + 0.05);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch { /* blocked */ }
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#020810]/95 backdrop-blur-2xl"
          : "bg-[#060e1a]/80 backdrop-blur-md"
      }`}
      style={{
        borderBottom: scrolled
          ? "1px solid rgba(6,182,212,0.35)"
          : "1px solid rgba(6,182,212,0.15)",
        boxShadow: scrolled
          ? "0 4px 40px rgba(6,182,212,0.08), 0 1px 0 rgba(6,182,212,0.12) inset"
          : "none",
      }}
    >
      {/* Animated gradient bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.6) 30%, rgba(251,191,36,0.5) 50%, rgba(6,182,212,0.6) 70%, transparent 100%)",
          opacity: scrolled ? 1 : 0.4,
          transition: "opacity 0.4s",
        }}
      />

      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">

        {/* ══ LOGO — flashy left brand ══ */}
        <Link
          href="/"
          onClick={playBeep}
          className="flex items-center gap-3 group select-none"
        >
          {/* Pixel emblem: glowing anchor badge with scanlines */}
          <div
            className="relative flex items-center justify-center w-9 h-9 shrink-0 transition-all duration-300 group-hover:scale-110 pixel-box"
            style={{
              background: "linear-gradient(145deg, #0e2d4d 0%, #061526 100%)",
              border: "2px solid #fbbf24",
              boxShadow:
                "0 0 0 2px #020810, 0 0 14px rgba(251,191,36,0.55), inset 0 0 8px rgba(251,191,36,0.08)",
            }}
          >
            {/* scanline overlay inside badge */}
            <span className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
            <Anchor
              className="w-4 h-4 relative z-10 group-hover:rotate-[20deg] transition-transform duration-300"
              style={{ color: "#fbbf24", filter: "drop-shadow(0 0 4px rgba(251,191,36,0.9))" }}
            />
          </div>

          {/* Brand text block */}
          <div className="flex flex-col leading-none gap-1">
            {/* Main title — amber glow, Press Start 2P */}
            <span
              className="font-['Press_Start_2P',monospace] text-[11px] sm:text-[13px] tracking-widest"
              style={{
                color: "#fbbf24",
                textShadow: "0 0 8px rgba(251,191,36,0.8), 0 0 20px rgba(251,191,36,0.4), 0 2px 0 #000",
              }}
            >
              ABYAN.DEV
            </span>

            {/* Sub-badge — retro pixel-box tag */}
            <span
              className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 font-['Silkscreen',monospace] text-[8px] tracking-widest pixel-box"
              style={{
                background: "rgba(6,182,212,0.08)",
                border: "1px solid rgba(6,182,212,0.4)",
                color: "#67e8f9",
                boxShadow: "0 0 6px rgba(6,182,212,0.2)",
              }}
            >
              <Zap className="w-2 h-2" style={{ color: "#fbbf24" }} />
              S.S. CODECRAFT
            </span>
          </div>
        </Link>

        {/* ── Desktop Links — match footer bracket style ── */}
        <div className="hidden md:flex items-center gap-1 font-['Silkscreen',monospace] text-[11px]">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={playBeep}
                className="relative px-3 py-1.5 tracking-wider transition-all duration-200 group pixel-box"
                style={{
                  background: active
                    ? "rgba(6,182,212,0.10)"
                    : "transparent",
                  border: active
                    ? "1px solid rgba(6,182,212,0.55)"
                    : "1px solid transparent",
                  color: active ? "#67e8f9" : "#94a3b8",
                  boxShadow: active ? "0 0 10px rgba(6,182,212,0.18)" : "none",
                }}
              >
                {/* Amber left accent on active */}
                {active && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-3/4"
                    style={{
                      background: "linear-gradient(180deg, #fbbf24, #f59e0b)",
                      boxShadow: "0 0 6px rgba(251,191,36,0.8)",
                    }}
                  />
                )}

                {/* Sliding bottom line on hover */}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px transition-all duration-300 ${
                    active ? "w-3/4 opacity-100" : "w-0 opacity-0 group-hover:w-2/3 group-hover:opacity-60"
                  }`}
                  style={{
                    background: "linear-gradient(90deg, transparent, #67e8f9, transparent)",
                  }}
                />

                <span className="relative z-10 group-hover:text-cyan-200 transition-colors duration-200">
                  {active ? `▶ [ ${item.name} ]` : `[ ${item.name} ]`}
                </span>
              </Link>
            );
          })}
        </div>

        {/* ── Right cluster ── */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Status badge */}
          <div
            className="hidden sm:flex items-center gap-2 px-2.5 py-1 font-['Silkscreen',monospace] text-[10px]"
            style={{
              background: "rgba(6,17,32,0.9)",
              border: "1px solid rgba(52,211,153,0.35)",
              boxShadow: "0 0 10px rgba(52,211,153,0.08)",
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex w-1.5 h-1.5 bg-emerald-400" />
            </span>
            <span style={{ color: "#6ee7b7", letterSpacing: "0.1em" }}>VOYAGE: ACTIVE</span>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => { playBeep(); setMobileOpen(!mobileOpen); }}
            aria-label="Toggle menu"
            className="md:hidden flex items-center justify-center w-8 h-8 transition-all duration-200"
            style={{
              background: "rgba(11,27,48,0.9)",
              border: mobileOpen
                ? "1px solid rgba(251,191,36,0.6)"
                : "1px solid rgba(6,182,212,0.4)",
              color: mobileOpen ? "#fbbf24" : "#67e8f9",
              boxShadow: mobileOpen
                ? "0 0 8px rgba(251,191,36,0.2)"
                : "0 0 8px rgba(6,182,212,0.08)",
            }}
          >
            {mobileOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: mobileOpen ? "320px" : "0px", opacity: mobileOpen ? 1 : 0 }}
      >
        <div
          className="px-4 pt-3 pb-4 space-y-1.5 font-['Silkscreen',monospace] text-xs"
          style={{
            background: "rgba(2,8,16,0.98)",
            borderTop: "1px solid rgba(6,182,212,0.2)",
          }}
        >
          {/* Home */}
          <Link
            href="/"
            onClick={() => { playBeep(); setMobileOpen(false); }}
            className="flex items-center gap-2 px-3.5 py-2.5 transition-all duration-200"
            style={{
              background: pathname === "/" ? "rgba(6,182,212,0.1)" : "rgba(6,14,26,0.6)",
              border: pathname === "/"
                ? "1px solid rgba(251,191,36,0.6)"
                : "1px solid rgba(30,58,100,0.8)",
              color: pathname === "/" ? "#fbbf24" : "#94a3b8",
              boxShadow: pathname === "/" ? "0 0 8px rgba(251,191,36,0.1)" : "none",
            }}
          >
            {pathname === "/" && <span className="text-amber-400">▶</span>}
            BRIDGE (HOME)
          </Link>

          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => { playBeep(); setMobileOpen(false); }}
                className="flex items-center gap-2 px-3.5 py-2.5 transition-all duration-200"
                style={{
                  background: active ? "rgba(6,182,212,0.1)" : "rgba(6,14,26,0.6)",
                  border: active
                    ? "1px solid rgba(6,182,212,0.55)"
                    : "1px solid rgba(30,58,100,0.8)",
                  color: active ? "#67e8f9" : "#94a3b8",
                  boxShadow: active ? "0 0 10px rgba(6,182,212,0.12)" : "none",
                }}
              >
                {active && <span style={{ color: "#fbbf24" }}>▶</span>}
                {item.name}
              </Link>
            );
          })}

          {/* Footer row */}
          <div
            className="flex items-center justify-between pt-2 mt-1 text-[9px]"
            style={{ borderTop: "1px solid rgba(30,58,100,0.5)", color: "#4b6080" }}
          >
            <span className="flex items-center gap-1.5">
              <Ship className="w-2.5 h-2.5" style={{ color: "#1d4f7a" }} />
              S.S. CODECRAFT
            </span>
            <span className="flex items-center gap-1" style={{ color: "#34d399" }}>
              <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse inline-block" />
              ONLINE
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
