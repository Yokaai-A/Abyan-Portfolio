"use client";

import React, { useState } from "react";
import {
  Anchor,
  Compass,
  Radio,
  Mail,
  Send,
  CheckCircle2,
  Terminal,
  MessageSquare,
  Sparkles,
} from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("New Project / Fullstack Quest");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [transmissionSuccess, setTransmissionSuccess] = useState(false);

  // Morse / Radio Blip sound generator
  const playMorseSound = (freq = 700, duration = 0.08) => {
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
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Audio context restricted
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playMorseSound(880, 0.15);
    setIsSending(true);

    // Simulate telegraph transmission
    setTimeout(() => {
      setIsSending(false);
      setTransmissionSuccess(true);
      playMorseSound(1100, 0.2);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Background ambient glow */}
      <div className="absolute top-28 right-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Page Header */}
      <div className="mb-10 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0b1b30] border border-cyan-500/60 pixel-box text-[11px] font-['Silkscreen',monospace] text-cyan-300">
          <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>TELEGRAPH STATION // FREQUENCY: 142.800 MHz</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-['Press_Start_2P',monospace] text-white tracking-wide">
          CONTACT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300">CAPTAIN</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-['Pixelify_Sans',sans-serif]">
          Transmit a message directly to my station. Whether commissioning a new build, discussing architecture, or saying ahoy!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
        {/* Left Side: Communication Frequencies & Socials (2 cols) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#071526]/90 border-2 border-slate-700/90 p-6 pixel-box space-y-4 shadow-xl">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800 font-['Press_Start_2P',monospace] text-xs text-amber-300">
              <Anchor className="w-4 h-4 text-cyan-400" />
              <span>DIRECT CHANNELS</span>
            </div>

            <p className="text-xs text-slate-300 font-['Pixelify_Sans',sans-serif] leading-relaxed">
              Always listening on open frequencies for software quests, client collaborations, or full-time opportunities.
            </p>

            <div className="space-y-3 pt-2 font-['Silkscreen',monospace] text-xs">
              {/* Email */}
              <a
                href="mailto:abyanhanif@example.com"
                onClick={() => playMorseSound(600, 0.08)}
                className="flex items-center gap-3 p-3 bg-[#030a14] border border-cyan-500/40 pixel-box hover:border-cyan-300 hover:bg-[#07172b] transition-colors group"
              >
                <Mail className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-[9px] text-slate-400">ELECTRONIC DISPATCH</div>
                  <div className="text-cyan-200 text-xs">abyanhanif@example.com</div>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/abyanhanif"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMorseSound(700, 0.08)}
                className="flex items-center gap-3 p-3 bg-[#030a14] border border-slate-700 pixel-box hover:border-amber-400 hover:bg-[#07172b] transition-colors group"
              >
                <GithubIcon className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-[9px] text-slate-400">CODE REPOSITORIES</div>
                  <div className="text-slate-200 text-xs">github.com/abyanhanif</div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/abyanhanif"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMorseSound(800, 0.08)}
                className="flex items-center gap-3 p-3 bg-[#030a14] border border-slate-700 pixel-box hover:border-cyan-400 hover:bg-[#07172b] transition-colors group"
              >
                <LinkedinIcon className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-[9px] text-slate-400">CREW NETWORK</div>
                  <div className="text-slate-200 text-xs">linkedin.com/in/abyanhanif</div>
                </div>
              </a>
            </div>
          </div>

          {/* Station Status Telemetry */}
          <div className="bg-[#071526]/90 border border-slate-700 p-5 pixel-box font-['Silkscreen',monospace] text-xs space-y-2">
            <div className="flex items-center justify-between text-cyan-300 pb-1 border-b border-slate-800 text-[10px]">
              <span>[ TELEMETRY STATUS ]</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                ONLINE
              </span>
            </div>
            <div className="text-[11px] text-slate-300 space-y-1">
              <div>LATITUDE: 06° 12&apos; S</div>
              <div>LONGITUDE: 106° 48&apos; E</div>
              <div>RESPONSE TIME: &lt; 24 HOURS</div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Telegraph Dispatch Form (3 cols) */}
        <div className="md:col-span-3">
          <div className="bg-[#071526]/95 border-2 border-cyan-500/60 p-6 sm:p-8 pixel-box shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-cyan-900/60 font-['Press_Start_2P',monospace] text-xs text-amber-300">
              <span className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>TELEGRAPH_FORM.BAT</span>
              </span>
              <span className="text-[9px] text-slate-400">ENCRYPTED // SECURE</span>
            </div>

            {transmissionSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-[#040c17] border-2 border-emerald-400 pixel-box flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="font-['Press_Start_2P',monospace] text-sm text-emerald-300">
                  TRANSMISSION RECEIVED!
                </h3>
                <p className="text-slate-200 text-xs sm:text-sm max-w-md mx-auto font-['Pixelify_Sans',sans-serif]">
                  Your signal has reached Captain Abyan&apos;s desk. I will review your dispatch and transmit a reply promptly!
                </p>
                <button
                  onClick={() => {
                    setTransmissionSuccess(false);
                    setName("");
                    setEmail("");
                    setMessage("");
                  }}
                  className="px-4 py-2.5 bg-gradient-to-b from-cyan-600 to-blue-800 text-white font-['Press_Start_2P',monospace] text-[10px] pixel-box pixel-btn-primary"
                >
                  DISPATCH ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-['Silkscreen',monospace] text-cyan-300">
                    CALLSIGN / YOUR NAME:
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Captain Sailor"
                    className="w-full bg-[#030914] border-2 border-slate-700 focus:border-cyan-400 text-slate-100 px-3.5 py-2.5 text-sm font-['Pixelify_Sans',sans-serif] pixel-box outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-['Silkscreen',monospace] text-cyan-300">
                    RETURN FREQUENCY (EMAIL):
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. sailor@fleet.com"
                    className="w-full bg-[#030914] border-2 border-slate-700 focus:border-cyan-400 text-slate-100 px-3.5 py-2.5 text-sm font-['Pixelify_Sans',sans-serif] pixel-box outline-none transition-colors"
                  />
                </div>

                {/* Quest Category */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-['Silkscreen',monospace] text-cyan-300">
                    NATURE OF EXPEDITION:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#030914] border-2 border-slate-700 focus:border-cyan-400 text-slate-100 px-3.5 py-2.5 text-sm font-['Pixelify_Sans',sans-serif] pixel-box outline-none transition-colors"
                  >
                    <option value="New Project / Fullstack Quest">New Project / Web Application Quest</option>
                    <option value="Frontend & UI Architecture">Frontend & UI / Retro Interactive Experience</option>
                    <option value="Consulting or Architecture">Technical Consulting / Code Review</option>
                    <option value="General Ahoy">General Ahoy & Networking</option>
                  </select>
                </div>

                {/* Message Body */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-['Silkscreen',monospace] text-cyan-300">
                    TRANSMISSION CONTENT:
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your project scope, timeline, or idea..."
                    className="w-full bg-[#030914] border-2 border-slate-700 focus:border-cyan-400 text-slate-100 px-3.5 py-2.5 text-sm font-['Pixelify_Sans',sans-serif] pixel-box outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-b from-cyan-500 to-blue-700 text-white border-2 border-cyan-200 pixel-box pixel-btn-primary font-['Press_Start_2P',monospace] text-xs hover:brightness-110 active:translate-y-1 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSending ? "TRANSMITTING..." : "DISPATCH TELEGRAPH"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
