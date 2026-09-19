"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Anchor,
  Sparkles,
  ArrowRight,
  Heart,
  Ship,
  Mail,
  Volume2,
} from "lucide-react";
import BackgroundVideo from "@/components/ui/BackgroundVideo";

// Natural, human, non-AI-slop nautical/developer dialogues
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

  // Character roaming state
  // Safe boundaries: 16% to 76% to account for the larger character width
  const [charPosition, setCharPosition] = useState<number>(38);
  const [movementState, setMovementState] = useState<"idle" | "left" | "right">("idle");
  const [walkDuration, setWalkDuration] = useState<number>(3);
  const isMovingRef = useRef(false);

  // Captain sound ref
  const captainAudioRef = useRef<HTMLAudioElement | null>(null);

  // 8-bit retro sound generator using native Web Audio API
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
        // Ship bell chime
        osc.type = "triangle";
        osc.frequency.setValueAtTime(659.25, now);
        osc.frequency.setValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch {
      // Audio context might require user interaction
    }
  };

  // Wandering AI: patrol the deck left and right randomly without touching corners
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const planNextMove = () => {
      const idleTime = Math.random() * 2200 + 2600;

      timeoutId = setTimeout(() => {
        // Bounds tailored for large character
        const minBound = 16;
        const maxBound = 76;
        let nextPos = Math.floor(Math.random() * (maxBound - minBound + 1)) + minBound;

        // Ensure noticeable movement distance
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
  }, [movementState, charPosition]);

  const handleWalkComplete = () => {
    setMovementState("idle");
    isMovingRef.current = false;
  };

  // Play the captain MP3 sound effect
  const playCaptainSound = useCallback(() => {
    try {
      if (!captainAudioRef.current) {
        captainAudioRef.current = new Audio("/assets/sound-effects/captain_sound.mp3");
      }
      // Reset so rapid clicks always replay from the start
      captainAudioRef.current.currentTime = 0;
      captainAudioRef.current.play().catch(() => {
        // Browser may block autoplay until first user gesture — silently ignore
      });
    } catch {
      // Audio not supported
    }
  }, []);

  const handleCharacterClick = () => {
    setIsJumping(true);
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
    if (movementState === "left") {
      return "/assets/characters/left.gif";
    }
    if (movementState === "right") {
      return "/assets/characters/right.gif";
    }
    return "/assets/characters/Idle_breathing-idle_south.gif";
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-20 sm:pt-24 pb-4 px-4 md:px-8 select-none"
    >
      {/* 
        PIXEL BACKGROUND VIDEO:
        Guaranteed continuous autoplaying & looping mp4 of ship deck overlooking the sea
      */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        {/* Ping-pong background: forward → reverse → forward → … */}
        <BackgroundVideo className="w-full h-full object-cover object-bottom pixelated scale-100" />

        {/* Ambient Sea Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060e1a]/85 via-[#07172b]/55 to-[#060e1a]/95" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#030a14]/35 to-[#020610]/85" />

        {/* Retro Scanlines */}
        <div className="absolute inset-0 scanlines opacity-30" />
      </div>

      {/* Gentle Floating Atmospheric Glow */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

      {/* 
        TOP / MIDDLE SECTION:
        Layered at z-30 with clean spacing so the walking character & chat never block buttons!
      */}
      <div className="relative max-w-4xl w-full mx-auto flex flex-col items-center text-center space-y-4 z-30 pt-2 sm:pt-4 pointer-events-auto">

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-[#0b1b30]/90 border border-cyan-500/60 pixel-box shadow-lg text-[11px] font-['Silkscreen',monospace] text-cyan-300"
        >
          <Anchor className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
          <span className="tracking-wider">S.S. CODECRAFT // MAIN DECK</span>
          <span className="w-2 h-2 bg-emerald-400 rounded-none animate-ping" />
        </motion.div>

        {/* Name & Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-2 w-full"
        >
          <div className="flex items-center justify-center gap-2 text-amber-300 font-['Press_Start_2P',monospace] text-[10px] sm:text-[11px] tracking-widest">
            <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "12s" }} />
            <span>AHOY, I&apos;M</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-wide font-['Press_Start_2P',monospace] text-white leading-tight drop-shadow-[0_4px_0_#020617]">
            MUHAMMAD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300">
              ABYAN HANIF
            </span>
          </h1>

          <div className="pt-0.5 flex items-center justify-center gap-2 font-['Silkscreen',monospace] text-cyan-200 text-xs sm:text-sm">
            <Ship className="w-3.5 h-3.5 text-cyan-400 inline" />
            <span>SOFTWARE ENGINEER & CREATIVE DEVELOPER</span>
          </div>
        </motion.div>

        {/* Clean, Non-AI-Slop Bio */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-200 text-sm sm:text-base max-w-xl leading-relaxed font-['Pixelify_Sans',sans-serif] bg-[#071526]/80 px-4 py-2.5 border-2 border-slate-700/80 pixel-box shadow-xl"
        >
          Building fast web apps, clean interfaces, and interactive retro experiences
          from the captain&apos;s deck. Open for projects, quests & collaborations.
        </motion.p>

        {/* 
          ACTION BUTTONS:
          Dedicated high z-index and isolated from the roaming zone below.
        */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-40 flex flex-wrap items-center justify-center gap-3 pt-1 font-['Press_Start_2P',monospace] text-[10px] sm:text-xs"
        >
          <a
            href="#projects"
            onClick={() => playRetroSound("bell")}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-b from-cyan-500 to-blue-700 text-white border-2 border-cyan-200 pixel-box pixel-btn-primary hover:brightness-110 active:translate-y-1"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>VIEW PROJECTS</span>
            <ArrowRight className="w-3 h-3" />
          </a>

          <a
            href="#contact"
            onClick={() => playRetroSound("bell")}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-b from-slate-800 to-slate-950 text-cyan-200 border-2 border-slate-600 pixel-box pixel-btn-wood hover:text-white hover:border-cyan-400 active:translate-y-1"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>GET IN TOUCH</span>
          </a>

          <button
            onClick={handleCharacterClick}
            className="inline-flex items-center justify-center gap-2 px-3.5 py-3 bg-gradient-to-b from-amber-600 to-amber-800 text-amber-100 border-2 border-amber-300 pixel-box pixel-btn-gold hover:brightness-110 active:translate-y-1"
            title="Interact with Captain Abyan"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            <span>POKE CAPTAIN</span>
          </button>
        </motion.div>
      </div>

      {/* 
        BOTTOM RUNWAY: ENLARGED (2X+) FREE-ROAMING CHARACTER
        Smart Side Speech Bubble:
        The chat box is anchored to the SIDE of the character (not on top of the head),
        so it never rises into the buttons area!
      */}
      <div className="relative w-full max-w-6xl mx-auto h-48 sm:h-56 md:h-64 z-20 pointer-events-none mt-2">
        <motion.div
          animate={{ left: `${charPosition}%` }}
          transition={{
            duration: movementState === "idle" ? 0 : walkDuration,
            ease: "linear",
          }}
          onAnimationComplete={handleWalkComplete}
          className="absolute bottom-1 -translate-x-1/2 flex flex-col items-center pointer-events-auto cursor-pointer select-none group"
          onClick={handleCharacterClick}
          title="Click the captain to interact!"
        >
          {/* Floating Heart Particles */}
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

          {/* 
            SMART SIDE SPEECH BUBBLE:
            Positioned at shoulder/side level (left or right depending on screen side).
            This guarantees it stays in the lower deck runway and NEVER blocks the action buttons above!
          */}
          <AnimatePresence>
            {showDialogue && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, x: charPosition > 50 ? 10 : -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.2 }}
                className={`absolute top-10 sm:top-12 z-30 px-3.5 py-2 bg-[#040a14]/95 border-2 border-cyan-400 text-cyan-100 pixel-box shadow-2xl text-xs w-52 sm:w-60 md:w-64 font-['Pixelify_Sans',sans-serif] pointer-events-auto ${charPosition > 50
                  ? "right-full mr-3 sm:mr-4"
                  : "left-full ml-3 sm:ml-4"
                  }`}
              >
                <div className="flex items-center justify-between pb-1 mb-1 border-b border-cyan-900/60 text-[9px] font-['Silkscreen',monospace] text-amber-400">
                  <span>[ CAPTAIN ABYAN ]</span>
                  <span className="text-slate-400 text-[8px]">● CHAT</span>
                </div>
                <p className="leading-snug text-slate-100 text-xs sm:text-sm">{SHIP_DIALOGUES[dialogueIndex]}</p>

                {/* Pointer Arrow pointing toward character side */}
                <div
                  className={`absolute top-4 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ${charPosition > 50
                    ? "-right-2 border-l-[8px] border-l-cyan-400"
                    : "-left-2 border-r-[8px] border-r-cyan-400"
                    }`}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 
            ENLARGED PIXEL CHARACTER SPRITE (2X+ SCALE):
            w-44 on mobile, w-56 on tablet, w-60 on desktop!
          */}
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
            {/* Ambient water glow under feet */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-32 h-6 bg-cyan-400/20 rounded-full blur-sm pointer-events-none" />

            <img
              src={getCharacterSprite()}
              alt="Captain Abyan Roaming"
              width={256}
              height={256}
              className="w-40 h-40 sm:w-52 sm:h-52 md:w-56 md:h-56 pixelated drop-shadow-[0_8px_0_rgba(0,0,0,0.65)] transition-transform group-hover:scale-105"
            />
          </motion.div>

          {/* Deck Ground Shadow */}
          <motion.div
            animate={
              isJumping
                ? { scale: [1, 0.4, 1], opacity: [0.7, 0.2, 0.7] }
                : { scale: [1, 0.88, 1], opacity: [0.7, 0.6, 0.7] }
            }
            transition={
              isJumping
                ? { duration: 0.44, ease: "easeInOut" }
                : { repeat: Infinity, duration: 2, ease: "easeInOut" }
            }
            className="w-28 sm:w-36 h-3 bg-black/85 rounded-none -mt-2 pixel-box"
          />

          {/* State Tag */}
          <div className="mt-1 px-2 py-0.5 bg-[#0b1b30]/90 border border-slate-700 text-[9px] font-['Silkscreen',monospace] text-amber-300 pixel-box">
            {movementState === "left" && "◄ PATROLLING"}
            {movementState === "right" && "PATROLLING ►"}
            {movementState === "idle" && "• CAPTAIN (ON WATCH) •"}
          </div>
        </motion.div>
      </div>

      {/* Subtle Bottom Horizon Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#060e1a] to-transparent pointer-events-none" />
    </section>
  );
}


