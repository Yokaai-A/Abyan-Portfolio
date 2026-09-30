"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Anchor, Compass, Ship, Sparkles, Volume2, VolumeX } from "lucide-react";

const LOADING_STEPS = [
  { threshold: 0, text: "Preparing the hull of S.S. CODECRAFT...", captain: "Ahoy traveler! Getting things ready..." },
  { threshold: 20, text: "Calibrating compass & celestial star charts...", captain: "Checking the ocean winds..." },
  { threshold: 45, text: "Loading visual assets & pixel sprites...", captain: "Straightening the captain's cap..." },
  { threshold: 70, text: "Tuning 8-bit synthesizer & deck audio...", captain: "Engines humming to life!" },
  { threshold: 90, text: "Weighing anchor, voyage imminent...", captain: "All systems running smooth!" },
  { threshold: 100, text: "VOYAGE READY! WELCOME ABOARD THE DECK ⚓", captain: "Welcome aboard my ship! ⚓" },
];

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(LOADING_STEPS[0].text);
  const [captainDialogue, setCaptainDialogue] = useState(LOADING_STEPS[0].captain);
  const [isReady, setIsReady] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastBeepProgressRef = useRef<number>(0);


  const playRetroTone = useCallback((freq: number, duration: number = 0.08, type: OscillatorType = "square") => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {

    }
  }, [soundEnabled]);


  const playVictoryChime = useCallback(() => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, i) => {
        setTimeout(() => {
          playRetroTone(freq, 0.14, "triangle");
        }, i * 90);
      });
    } catch {

    }
  }, [soundEnabled, playRetroTone]);


  const handleEnter = useCallback(() => {
    playRetroTone(880, 0.12, "triangle");
    setIsLoading(false);
  }, [playRetroTone]);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.code === "Space") {
        handleEnter();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleEnter]);


  useEffect(() => {

    const keyImages = [
      "/assets/characters/Idle_breathing-idle_south.gif",
      "/assets/characters/left.gif",
      "/assets/characters/right.gif",
      "/assets/background/background_steady.png",
    ];

    keyImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    let current = 0;
    const interval = setInterval(() => {

      const increment = Math.max(1, Math.floor(Math.random() * 4) + 1);
      current = Math.min(100, current + increment);

      setProgress(current);


      if (current - lastBeepProgressRef.current >= 20) {
        lastBeepProgressRef.current = current;
        playRetroTone(280 + current * 3.5, 0.04, "square");
      }


      const matched = [...LOADING_STEPS].reverse().find((step) => current >= step.threshold);
      if (matched) {
        setStatusText(matched.text);
        setCaptainDialogue(matched.captain);
      }

      if (current >= 100) {
        clearInterval(interval);
        setIsReady(true);
        playVictoryChime();


        const autoDismiss = setTimeout(() => {
          setIsLoading(false);
        }, 1200);

        return () => clearTimeout(autoDismiss);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [playRetroTone, playVictoryChime]);


  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="retro-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: "blur(6px)",
            transition: { duration: 0.65, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#060e1a] text-slate-100 select-none overflow-hidden"
        >

          <div className="absolute inset-0 bg-radial from-[#0c2444]/60 via-[#060e1a]/95 to-[#020610] pointer-events-none" />
          <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />


          <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />


          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 max-w-4xl mx-auto text-[10px] font-['Silkscreen',monospace] text-slate-400">
            <div className="flex items-center gap-2 px-3 py-1 bg-[#071526]/90 border border-slate-700/80 pixel-box">
              <span className="w-2 h-2 bg-emerald-400 animate-ping inline-block rounded-none" />
              <span className="text-cyan-300">PRE-VOYAGE BUFFER</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSoundEnabled((prev) => !prev)}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-[#071526]/90 border border-slate-700/80 hover:border-cyan-400 pixel-box text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Toggle retro audio"
              >
                {soundEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>SFX: ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                    <span>SFX: OFF</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleEnter}
                className="px-2.5 py-1 bg-[#0b1b30] border border-cyan-500/60 hover:border-amber-400 pixel-box text-cyan-300 hover:text-amber-300 transition-colors cursor-pointer"
              >
                SKIP [ESC]
              </button>
            </div>
          </div>


          <div className="relative z-10 w-full max-w-lg px-6 flex flex-col items-center text-center">


            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#0b1b30]/90 border border-cyan-500/60 pixel-box text-[10px] sm:text-[11px] font-['Silkscreen',monospace] text-cyan-300 mb-6 shadow-lg"
            >
              <Anchor className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span>S.S. CODECRAFT // HARBOR DOCK</span>
              <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: "10s" }} />
            </motion.div>


            <div className="relative flex flex-col items-center mb-6">


              <motion.div
                key={captainDialogue}
                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="relative mb-3 px-4 py-2 bg-[#040a14]/95 border-2 border-cyan-400 pixel-box shadow-xl max-w-xs font-['Pixelify_Sans',sans-serif] text-xs sm:text-sm text-cyan-100"
              >
                <div className="flex items-center justify-between pb-1 mb-1 border-b border-cyan-900/60 text-[9px] font-['Silkscreen',monospace] text-amber-400">
                  <span>[ CAPTAIN ABYAN ]</span>
                  <span>⚓ READY</span>
                </div>
                <p className="leading-snug text-slate-100">{captainDialogue}</p>


                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-cyan-400" />
              </motion.div>


              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >

                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-cyan-400/25 rounded-full blur-sm" />

                <img
                  src="/assets/characters/Idle_breathing-idle_south.gif"
                  alt="Captain Abyan Loading"
                  width={140}
                  height={140}
                  className="w-28 h-28 sm:w-32 sm:h-32 pixelated drop-shadow-[0_8px_0_rgba(0,0,0,0.6)]"
                />
              </motion.div>
            </div>


            <h1 className="text-sm sm:text-base font-['Press_Start_2P',monospace] text-white tracking-wider mb-2">
              MUHAMMAD <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300">ABYAN HANIF</span>
            </h1>
            <p className="text-[11px] font-['Silkscreen',monospace] text-cyan-200/80 mb-6 flex items-center justify-center gap-1.5">
              <Ship className="w-3 h-3 text-amber-400" />
              <span>PIXEL SEA VOYAGE PORTFOLIO</span>
            </p>


            <div className="w-full bg-[#030914] p-2 border-2 border-slate-700 pixel-box shadow-2xl relative mb-3">

              <div className="relative h-6 sm:h-7 bg-[#061220] border border-cyan-900/80 overflow-hidden flex items-center px-1">

                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-amber-400 relative"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                >

                  <div
                    className="absolute inset-0 opacity-25"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, #000 0px, #000 4px, transparent 4px, transparent 8px)",
                    }}
                  />

                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/70 shadow-[0_0_8px_#fff]" />
                </motion.div>


                <div className="absolute inset-0 flex items-center justify-center font-['Press_Start_2P',monospace] text-[10px] text-white drop-shadow-[0_2px_0_#000]">
                  <span>{progress}%</span>
                </div>
              </div>
            </div>


            <div className="w-full flex items-center justify-between text-[10px] font-['Silkscreen',monospace] text-slate-300 px-1 mb-6">
              <div className="flex items-center gap-1.5 text-cyan-300 truncate text-left max-w-[85%]">
                <span className="text-amber-400 font-bold">&gt;</span>
                <span className="truncate">{statusText}</span>
              </div>
              <span className="text-slate-500 shrink-0">[{progress}/100]</span>
            </div>


            {isReady ? (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleEnter}
                type="button"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-b from-cyan-500 to-blue-700 text-white border-2 border-cyan-200 pixel-box pixel-btn-primary font-['Press_Start_2P',monospace] text-xs cursor-pointer shadow-xl animate-pulse"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>SET SAIL / ENTER SHIP ▶</span>
              </motion.button>
            ) : (
              <div className="inline-flex items-center gap-2 font-['Silkscreen',monospace] text-[10px] text-slate-500">
                <span className="w-1.5 h-1.5 bg-cyan-400 animate-ping" />
                <span>LOADING RETRO EXPERIENCE...</span>
              </div>
            )}
          </div>


          <div className="absolute bottom-4 text-center font-['Silkscreen',monospace] text-[9px] text-slate-500 z-10">
            <span>PRESS SPACE OR ESC TO SKIP • S.S. CODECRAFT V2.0</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
