"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Anchor,
  ArrowRight,
  Heart,
  Ship,
  Mail,
} from "lucide-react";
import BackgroundVideo from "@/components/ui/BackgroundVideo";


const SHIP_DIALOGUES = [
  "Scanning the horizon for new pull requests.",
  "Full sails on Next.js and TypeScript!",
  "Hot coffee on deck, zero console errors.",
  "Low latency, calm seas. Ready to ship!",
  "Looking for new quests. Let's build together!",
  "Click me if you want to see a jump!",
  "Writing clean code from the captain's deck.",
];

export default function Hero() {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [characterHearts, setCharacterHearts] = useState<{ id: number; x: number }[]>([]);
  const [showDialogue, setShowDialogue] = useState(true);


  const [charPosition, setCharPosition] = useState<number>(38);
  const [movementState, setMovementState] = useState<"idle" | "left" | "right">("idle");
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isNarrowMobile, setIsNarrowMobile] = useState(false);
  const [walkDuration, setWalkDuration] = useState<number>(3);
  const isMovingRef = useRef(false);


  const captainAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 639px)");
    const updateViewport = () => setIsMobileViewport(mobileQuery.matches);
    updateViewport();
    mobileQuery.addEventListener("change", updateViewport);
    return () => mobileQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    const narrowQuery = window.matchMedia("(max-width: 425px)");
    const updateViewport = () => setIsNarrowMobile(narrowQuery.matches);
    updateViewport();
    narrowQuery.addEventListener("change", updateViewport);
    return () => narrowQuery.removeEventListener("change", updateViewport);
  }, []);


  const playRetroSound = (type: "jump" | "bell" = "jump") => {
    if (typeof window === "undefined") return;

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

      if (type === "jump") {
        osc.type = "square";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else {

        osc.type = "triangle";
        osc.frequency.setValueAtTime(659.25, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch {

    }
  };


  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isMobileViewport) {
      if (movementState !== "idle") setMovementState("idle");
      if (charPosition !== 66) setCharPosition(66);
      return;
    }

    const planNextMove = () => {
      const idleTime = Math.random() * 2400 + 2600;

      timeoutId = setTimeout(() => {
        const minBound = 18;
        const maxBound = 76;
        let nextPos = Math.floor(Math.random() * (maxBound - minBound + 1)) + minBound;


        if (Math.abs(nextPos - charPosition) < 18) {
          if (charPosition > 46) {
            nextPos = Math.max(minBound, charPosition - 28);
          } else {
            nextPos = Math.min(maxBound, charPosition + 28);
          }
        }

        const distance = Math.abs(nextPos - charPosition);
        const calculatedDuration = Math.max(2.4, distance / 8.5);

        if (nextPos > charPosition) {
          setMovementState("right");
        } else {
          setMovementState("left");
        }

        setWalkDuration(calculatedDuration);
        setCharPosition(nextPos);
        isMovingRef.current = true;
      }, idleTime);
    };

    if (movementState === "idle") {
      planNextMove();
    }

    return () => clearTimeout(timeoutId);
  }, [movementState, charPosition, isMobileViewport]);

  const handleWalkComplete = () => {
    setMovementState("idle");
    isMovingRef.current = false;
  };


  const playCaptainSound = useCallback(() => {
    try {
      if (!captainAudioRef.current) {
        captainAudioRef.current = new Audio("/assets/sound-effects/captain_sound.mp3");
      }
      captainAudioRef.current.currentTime = 0;
      captainAudioRef.current.play().catch(() => {});
    } catch {

    }
  }, []);

  const handleCharacterClick = () => {
    setIsJumping(true);
    playRetroSound("jump");
    setTimeout(() => setIsJumping(false), 500);

    setDialogueIndex((prev) => (prev + 1) % SHIP_DIALOGUES.length);
    setShowDialogue(true);
    playCaptainSound();

    const id = Date.now();
    const randomOffset = (Math.random() - 0.5) * 40;
    setCharacterHearts((prev) => [...prev, { id, x: randomOffset }]);
    setTimeout(() => {
      setCharacterHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1200);
  };

  const getCharacterSprite = () => {
    if (movementState === "left" || movementState === "right") {
      return "/assets/characters/left.gif";
    }
    return "/assets/characters/Idle_breathing-idle_south.gif";
  };

  const scrollToCabins = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    playRetroSound("bell");
    const target = document.getElementById("voyage-directory");
    if (target) {
      const navOffset = 70;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Main deck hero section"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-16 sm:pt-24 lg:pt-24 pb-4 sm:pb-6 px-3 sm:px-4 md:px-8 select-none"
    >

      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <BackgroundVideo className="w-full h-full object-cover object-bottom pixelated scale-100" />


        <div className="absolute inset-0 bg-gradient-to-b from-[#060e1a]/85 via-[#07172b]/55 to-[#060e1a]/95" />


        <div className="absolute inset-0 bg-radial from-transparent via-[#030a14]/35 to-[#020610]/85" />


        <div className="absolute inset-0 scanlines opacity-30" />
      </div>


      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />


      <div className="relative max-w-4xl w-full mx-auto my-auto flex flex-col items-center text-center space-y-4 sm:space-y-4 z-30 pt-1 sm:pt-4 pointer-events-auto">


        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 bg-[#0b1b30]/90 border border-cyan-500/60 pixel-box shadow-lg text-[10px] sm:text-[10px] lg:text-[11px] font-['Silkscreen',monospace] text-cyan-300"
        >
          <Anchor className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          <span className="tracking-wider">S.S. CODECRAFT // MAIN DECK</span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-emerald-400 opacity-75" />
            <span className="relative inline-flex w-2 h-2 bg-emerald-400" />
          </span>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-1.5 sm:space-y-2 w-full"
        >
          <div className="flex items-center justify-center gap-2 text-amber-300 font-['Press_Start_2P',monospace] text-[10px] min-[400px]:text-[11px] sm:text-[10px] lg:text-[11px] tracking-widest">
            <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "12s" }} />
            <span>AHOY, I&apos;M</span>
          </div>

          <h1 className="text-lg min-[380px]:text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-5xl font-extrabold tracking-wide font-['Press_Start_2P',monospace] text-white leading-tight drop-shadow-[0_4px_0_#020617]">
            MUHAMMAD <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300">
              ABYAN HANIF
            </span>
          </h1>

          <div className="pt-0.5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 font-['Silkscreen',monospace] text-cyan-200 text-[10px] min-[380px]:text-[11px] min-[400px]:text-xs sm:text-xs lg:text-sm">
            <Ship className="w-3.5 h-3.5 text-amber-400 inline" />
            <span>SOFTWARE ENGINEER & FULLSTACK DEVELOPER</span>
          </div>
        </motion.div>


        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs min-[400px]:text-sm sm:text-sm lg:text-base max-w-xl leading-relaxed font-['Pixelify_Sans',sans-serif] bg-[#071526]/85 px-4 py-2.5 min-[400px]:px-5 min-[400px]:py-3 sm:px-5 sm:py-3 border-2 border-slate-700/80 pixel-box shadow-xl text-center"
        >
          Building clean, intuitive, and reliable web & mobile applications from the
          captain&apos;s deck, with a focus on thoughtful engineering, maintainable code, and
          meaningful digital experiences built to sail beyond the horizon.
        </motion.p>


        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-40 flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1 font-['Press_Start_2P',monospace] text-[10px] min-[400px]:text-[11px] sm:text-[10px] lg:text-xs"
        >
          <Link
            href="/projects"
            onClick={() => playRetroSound("bell")}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 min-[400px]:px-4 sm:px-4 py-3 sm:py-3 bg-gradient-to-b from-cyan-500 to-blue-700 text-white border-2 border-cyan-200 pixel-box pixel-btn-primary hover:brightness-110 active:translate-y-1 transition-all"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>VIEW PROJECTS</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          <Link
            href="/contact"
            onClick={() => playRetroSound("bell")}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 min-[400px]:px-4 sm:px-4 py-3 sm:py-3 bg-gradient-to-b from-slate-800 to-slate-950 text-cyan-200 border-2 border-slate-600 pixel-box pixel-btn-wood hover:text-white hover:border-cyan-400 active:translate-y-1 transition-all"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>GET IN TOUCH</span>
          </Link>

        </motion.div>
      </div>


      <div className="relative w-full max-w-6xl mx-auto h-56 max-sm:h-[280px] sm:h-56 md:h-64 xl:h-64 2xl:h-72 z-20 pointer-events-none mt-2">
        <motion.div
          animate={{ left: `${charPosition}%` }}
          transition={{
            duration: movementState === "idle" ? 0 : walkDuration,
            ease: "linear",
          }}
          onAnimationComplete={handleWalkComplete}
          className="absolute bottom-3 sm:bottom-4 xl:bottom-8 -translate-x-1/2 flex flex-col items-center pointer-events-auto cursor-pointer select-none group"
          onClick={handleCharacterClick}
          title="Click the captain to interact!"
        >

          <AnimatePresence>
            {characterHearts.map((heart) => (
              <motion.div
                key={heart.id}
                initial={{ opacity: 1, y: 0, scale: 0.7 }}
                animate={{ opacity: 0, y: -80, scale: 1.3, x: heart.x }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute -top-6 pointer-events-none z-30"
              >
                <Heart className="w-7 h-7 fill-rose-500 text-rose-400 drop-shadow-[0_2px_0_#000]" />
              </motion.div>
            ))}
          </AnimatePresence>


          <AnimatePresence>
            {showDialogue && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 4 }}
                transition={{ duration: 0.2 }}
                style={{
                  width: "min(75vw, 216px)",
                  bottom: isNarrowMobile ? "calc(100% - 24px)" : undefined,
                }}
                className={`z-30 px-3 py-2 bg-[#040a14]/95 border-2 border-cyan-400 text-cyan-100 pixel-box shadow-2xl text-[10px] sm:text-xs sm:!w-60 md:!w-64 font-['Pixelify_Sans',sans-serif] pointer-events-auto absolute bottom-full mb-1.5 top-auto left-1/2 -translate-x-1/2 sm:bottom-auto sm:top-10 sm:mb-0 sm:translate-x-0 sm:left-auto ${
                  charPosition > 50
                    ? "sm:right-full sm:mr-4"
                    : "sm:left-full sm:ml-4"
                }`}
              >
                <div className="flex items-center justify-between pb-1 mb-1 border-b border-cyan-900/60 text-[8px] sm:text-[9px] font-['Silkscreen',monospace] text-amber-400">
                  <span>[ CAPTAIN ABYAN ]</span>
                  <span className="text-slate-400 text-[7px] sm:text-[8px]">● CHAT</span>
                </div>
                <p className="leading-snug text-slate-100 text-[11px] sm:text-sm">
                  {SHIP_DIALOGUES[dialogueIndex]}
                </p>


                <div
                  className={`hidden sm:block absolute top-4 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ${
                    charPosition > 50
                      ? "-right-2 border-l-[8px] border-l-cyan-400"
                      : "-left-2 border-r-[8px] border-r-cyan-400"
                  }`}
                />

                <div className="sm:hidden absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-cyan-400" />
              </motion.div>
            )}
          </AnimatePresence>


          <motion.div
            animate={
              isJumping
                ? { y: [0, -42, 0], scale: [1, 1.12, 1] }
                : { y: [0, -4, 0] }
            }
            transition={
              isJumping
                ? { duration: 0.44, ease: "easeInOut" }
                : { repeat: Infinity, duration: 2, ease: "easeInOut" }
            }
            className="relative"
          >

            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-32 h-6 bg-cyan-400/20 rounded-full blur-sm pointer-events-none" />

            <img
              src={getCharacterSprite()}
              alt="Captain Abyan Roaming"
              style={{
                transform: movementState === "right" ? "scaleX(-1)" : "scaleX(1)",
              }}
              className="shrink-0 w-[208px] h-[208px] object-contain pixelated drop-shadow-[0_8px_0_rgba(0,0,0,0.65)]"
            />
          </motion.div>


          <div className="mt-1 px-1.5 py-0.5 bg-[#0b1b30]/90 border border-slate-700 text-[7px] sm:px-2 sm:text-[9px] font-['Silkscreen',monospace] text-amber-300 pixel-box">
            {movementState === "left" && "◄ PATROLLING"}
            {movementState === "right" && "PATROLLING ►"}
            {movementState === "idle" && "• CAPTAIN (ON WATCH) •"}
          </div>
        </motion.div>
      </div>


      <div className="relative z-30 hidden justify-center pb-1 sm:flex">
        <button
          type="button"
          onClick={scrollToCabins}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#071526]/90 border border-slate-700/80 hover:border-cyan-400 active:border-amber-400 pixel-box font-['Silkscreen',monospace] text-[10px] text-slate-300 hover:text-amber-300 active:translate-y-0.5 transition-all cursor-pointer shadow-md group"
          title="Scroll down to cabin directory"
          aria-label="Explore cabins"
        >
          <span className="tracking-wider">EXPLORE CABINS</span>
          <span className="text-amber-400 group-hover:translate-y-0.5 transition-transform animate-bounce">↓</span>
        </button>
      </div>


      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#060e1a] to-transparent pointer-events-none" />
    </section>
  );
}
