"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX, Volume1, Music } from "lucide-react";
import AudioVisualizer from "./AudioVisualizer";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [isExpanded, setIsExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const audio = new Audio("/assets/music/Salt_and_Morning_Gold.mp3");
    audio.loop = true;
    audio.volume = 0.25;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);



  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded]);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Playback failed:", err);
      }
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseFloat(e.target.value);
      setVolume(val);
      if (val > 0 && isMuted) setIsMuted(false);
      if (val === 0) setIsMuted(true);
    },
    [isMuted]
  );

  const VolumeIcon =
    isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  const volumePercent = Math.round((isMuted ? 0 : volume) * 100);

  return (
    <div
      ref={panelRef}
      className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2"
      style={{ fontFamily: "'Press Start 2P', monospace" }}
    >

      {isExpanded && (
        <div
          style={{
            background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #091422 100%)",
            border: "3px solid #0284c7",
            boxShadow: `
              -3px 0 0 0 #020617,
              3px 0 0 0 #020617,
              0 -3px 0 0 #020617,
              0 3px 0 0 #020617,
              inset 0 1px 0 rgba(2,132,199,0.3),
              0 0 20px rgba(2,132,199,0.25),
              0 0 40px rgba(2,132,199,0.1)
            `,
            padding: "16px",
            minWidth: "200px",
            imageRendering: "pixelated" as const,
          }}
        >

          <div
            className="flex items-center gap-2 mb-3 pb-2"
            style={{ borderBottom: "2px solid #0284c7" }}
          >
            <Music size={10} style={{ color: "#facc15" }} />
            <span
              style={{ fontSize: "7px", color: "#94a3b8", letterSpacing: "0.05em" }}
            >
              NOW PLAYING
            </span>
          </div>


          <div className="mb-3 overflow-hidden" style={{ maxWidth: "180px" }}>
            <p
              style={{
                fontSize: "7px",
                color: "#e2e8f0",
                whiteSpace: "nowrap",
                margin: 0,
              }}
            >
              🎵 Salt and Morning Gold
            </p>
          </div>



          <AudioVisualizer
            audioRef={audioRef}
            isPlaying={isPlaying}
            isMuted={isMuted}
            volume={volume}
          />


          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={toggleMute}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "2px",
                color: isMuted ? "#ef4444" : "#38bdf8",
                display: "flex",
                alignItems: "center",
              }}
            >
              <VolumeIcon size={12} />
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="pixel-slider"
              style={{
                flex: 1,
                height: "8px",
                appearance: "none" as const,
                background: `linear-gradient(to right, #0284c7 ${volumePercent}%, #1e3a5f ${volumePercent}%)`,
                border: "1px solid #0369a1",
                cursor: "pointer",
                outline: "none",
              }}
            />
            <span
              style={{
                fontSize: "6px",
                color: "#64748b",
                minWidth: "24px",
                textAlign: "right",
              }}
            >
              {volumePercent}%
            </span>
          </div>


          <div className="flex gap-2">
            <button
              onClick={togglePlay}
              style={{
                flex: 1,
                background: isPlaying ? "#0c2744" : "#0369a1",
                border: `2px solid ${isPlaying ? "#0284c7" : "#38bdf8"}`,
                color: "#e2e8f0",
                fontSize: "7px",
                padding: "6px 8px",
                cursor: "pointer",
                letterSpacing: "0.05em",
                boxShadow: isPlaying
                  ? "0 2px 0 0 #0284c7"
                  : "0 3px 0 0 #0369a1, 0 5px 0 0 #020617",
                transition: "all 0.1s ease",
                fontFamily: "'Press Start 2P', monospace",
              }}
            >
              {isPlaying ? "⏸ PAUSE" : "▶ PLAY"}
            </button>
            <button
              onClick={toggleMute}
              style={{
                background: isMuted ? "#2d0a0a" : "#0c2744",
                border: `2px solid ${isMuted ? "#ef4444" : "#0284c7"}`,
                color: isMuted ? "#ef4444" : "#94a3b8",
                fontSize: "7px",
                padding: "6px 8px",
                cursor: "pointer",
                letterSpacing: "0.05em",
                boxShadow: isMuted
                  ? "0 3px 0 0 #7f1d1d, 0 5px 0 0 #020617"
                  : "0 3px 0 0 #0369a1, 0 5px 0 0 #020617",
                transition: "all 0.1s ease",
                fontFamily: "'Press Start 2P', monospace",
              }}
            >
              {isMuted ? "🔇" : "🔊"}
            </button>
          </div>
        </div>
      )}


      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        title={isPlaying ? "Music: Playing" : "Music: Stopped"}
        style={{
          width: "52px",
          height: "52px",
          background: isExpanded
            ? "linear-gradient(135deg, #0369a1, #0284c7)"
            : "linear-gradient(135deg, #0a1628, #0d1f3c)",
          border: `3px solid ${isPlaying && !isMuted ? "#facc15" : "#0284c7"}`,
          boxShadow:
            isPlaying && !isMuted
              ? `0 4px 0 0 #b45309, 0 6px 0 0 #020617, 0 0 16px rgba(250,204,21,0.4), 0 0 32px rgba(250,204,21,0.15)`
              : `0 4px 0 0 #0369a1, 0 6px 0 0 #020617, 0 0 16px rgba(2,132,199,0.3)`,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.15s ease",
          position: "relative",
          overflow: "hidden",
          imageRendering: "pixelated" as const,
        }}
      >

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
            pointerEvents: "none",
          }}
        />
        <span
          style={{
            fontSize: "20px",
            lineHeight: 1,
            filter:
              isPlaying && !isMuted ? "drop-shadow(0 0 4px #facc15)" : "none",
            animation:
              isPlaying && !isMuted ? "pixelBop 0.5s steps(2) infinite" : "none",
            position: "relative",
            zIndex: 1,
          }}
        >
          {isMuted ? "🔇" : isPlaying ? "🎵" : "🎶"}
        </span>
      </button>


      {!isExpanded && (
        <div
          style={{
            fontSize: "5px",
            color: "#64748b",
            textAlign: "center",
            letterSpacing: "0.05em",
            fontFamily: "'Press Start 2P', monospace",
          }}
        >
          {isPlaying && !isMuted ? "♪ ON" : isMuted ? "MUTED" : "OFF"}
        </div>
      )}
    </div>
  );
}
