"use client";

import {
  Anchor,
  Radio,
  Mail,
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

    }
  };

  return (
    <div className="relative isolate min-h-screen pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] max-h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(6, 14, 26, 0.3) 0%, rgba(6, 14, 26, 0.4) 65%, #060e1a 100%), url('/assets/background/Background_Contacts.png')",
        }}
      />
      <div className="mx-auto w-full max-w-5xl min-w-0 px-3 pt-20 sm:px-6 sm:pt-24 lg:px-8">


      <div className="mb-10 min-w-0 space-y-3 text-center">
        <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 px-3 py-1 bg-[#0b1b30] border border-cyan-500/60 pixel-box text-[9px] sm:text-[11px] font-['Silkscreen',monospace] text-cyan-300">
          <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="min-w-0 [overflow-wrap:anywhere]">TELEGRAPH STATION // FREQUENCY: 142.800 MHz</span>
        </div>
        <h1 className="text-lg sm:text-4xl font-extrabold font-['Press_Start_2P',monospace] text-white tracking-wide">
          CONTACT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300">CAPTAIN</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-['Pixelify_Sans',sans-serif]">
          Transmit a message directly to my station. Whether commissioning a new build, discussing architecture, or saying ahoy!
        </p>
      </div>

      <div className="mb-12 grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">

        <div className="min-w-0 space-y-6">
          <div className="bg-[#071526]/90 border-2 border-slate-700/90 p-6 pixel-box space-y-4 shadow-xl">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800 font-['Press_Start_2P',monospace] text-xs text-amber-300">
              <Anchor className="w-4 h-4 text-cyan-400" />
              <span>DIRECT CHANNELS</span>
            </div>

            <p className="text-xs text-slate-300 font-['Pixelify_Sans',sans-serif] leading-relaxed">
              Always listening on open frequencies for software quests, client collaborations, or full-time opportunities.
            </p>

            <div className="space-y-3 pt-2 font-['Silkscreen',monospace] text-xs">

              <a
                href="mailto:abyanhanif41@gmail.com"
                onClick={() => playMorseSound(600, 0.08)}
                className="group flex min-w-0 items-center gap-3 p-3 bg-[#030a14] border border-cyan-500/40 pixel-box hover:border-cyan-300 hover:bg-[#07172b] transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0 text-cyan-400 group-hover:scale-110 transition-transform" />
                <div className="min-w-0 flex-1 [overflow-wrap:anywhere]">
                  <div className="text-[9px] text-slate-400">ELECTRONIC DISPATCH</div>
                  <div className="text-cyan-200 text-xs [overflow-wrap:anywhere]">abyanhanif41@gmail.com</div>
                </div>
              </a>


              <a
                href="https://github.com/Yokaai-A"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMorseSound(700, 0.08)}
                className="group flex min-w-0 items-center gap-3 p-3 bg-[#030a14] border border-slate-700 pixel-box hover:border-amber-400 hover:bg-[#07172b] transition-colors"
              >
                <GithubIcon className="w-4 h-4 shrink-0 text-amber-400 group-hover:scale-110 transition-transform" />
                <div className="min-w-0 flex-1 [overflow-wrap:anywhere]">
                  <div className="text-[9px] text-slate-400">CODE REPOSITORIES</div>
                  <div className="text-slate-200 text-xs [overflow-wrap:anywhere]">github.com/Yokaai-A</div>
                </div>
              </a>


              <a
                href="https://www.linkedin.com/in/muhammad-abyan-hanif-42217b326/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMorseSound(800, 0.08)}
                className="group flex w-full min-w-0 items-center gap-3 p-3 bg-[#030a14] border border-slate-700 pixel-box hover:border-cyan-400 hover:bg-[#07172b] transition-colors"
              >
                <LinkedinIcon className="w-4 h-4 shrink-0 text-sky-400 group-hover:scale-110 transition-transform" />
                <div className="w-0 min-w-0 flex-1">
                  <div className="text-[9px] text-slate-400">CREW NETWORK</div>
                  <div
                    className="block w-full text-slate-200 text-xs leading-relaxed"
                    style={{ overflowWrap: "anywhere", wordBreak: "break-all" }}
                  >
                    linkedin.com/in/muhammad-abyan-hanif-42217b326
                  </div>
                </div>
              </a>
            </div>
          </div>


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


        <div className="min-w-0">
          <div className="relative flex h-full min-h-[340px] min-w-0 flex-col justify-between overflow-hidden border-2 border-cyan-500/60 bg-[#071526]/95 p-4 sm:p-8 pixel-box shadow-2xl">
            <div className="relative min-w-0">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-cyan-900/60 pb-4 font-['Press_Start_2P',monospace] text-[9px] sm:text-[10px] text-amber-300">
                <span className="flex min-w-0 items-center gap-2"><MessageSquare className="h-4 w-4 shrink-0 text-cyan-400" /><span className="[overflow-wrap:anywhere]">OPEN CHANNEL</span></span>
                <span className="flex shrink-0 items-center gap-2 text-[9px] text-emerald-400"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />AVAILABLE</span>
              </div>

              <Sparkles aria-hidden="true" className="mb-4 h-6 w-6 text-amber-300" />
              <h2 className="max-w-full font-['Press_Start_2P',monospace] text-sm leading-relaxed text-white [overflow-wrap:anywhere] sm:max-w-xl sm:text-2xl">
                LET&apos;S BUILD SOMETHING <span className="text-cyan-300">GREAT.</span>
              </h2>
              <p className="mt-4 max-w-full text-sm leading-relaxed text-slate-300 font-['Pixelify_Sans',sans-serif] sm:max-w-lg sm:text-base">
                Have a project in mind, want to collaborate, or just want to say hello? Send me an email and I&apos;ll get back to you.
              </p>
            </div>

            <div className="relative mt-8 flex flex-wrap items-center gap-4 border-t border-slate-800 pt-5">
              <a href="mailto:abyanhanif41@gmail.com?subject=Hello%20Abyan" onClick={() => playMorseSound(880, 0.15)}
                className="inline-flex items-center gap-3 border-2 border-cyan-200 bg-gradient-to-b from-cyan-500 to-blue-700 px-5 py-3 text-white pixel-box pixel-btn-primary transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300">
                <Mail aria-hidden="true" className="h-4 w-4" />
                <span className="font-['Press_Start_2P',monospace] text-[10px]">SEND AN EMAIL</span>
              </a>
              <span className="font-['Silkscreen',monospace] text-[10px] text-slate-400">TYPICAL REPLY: WITHIN 24 HOURS</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
