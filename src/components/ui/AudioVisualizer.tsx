"use client";

import React, { useEffect, useRef } from "react";

interface AudioVisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
}

export default function AudioVisualizer({
  audioRef,
  isPlaying,
  isMuted,
  volume,
}: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Peak hold state
  const BAR_COUNT = 16;
  const NUM_SEGMENTS = 10;
  const peakLevelsRef = useRef<number[]>(new Array(BAR_COUNT).fill(0));
  const peakFallSpeedRef = useRef<number[]>(new Array(BAR_COUNT).fill(0));
  const currentLevelsRef = useRef<number[]>(new Array(BAR_COUNT).fill(0));

  // Initialize Web Audio API safely on user gesture or playback
  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl || audioContextRef.current) return;

    const initAudioGraph = () => {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!AudioContextClass) return;

        const ctx = new AudioContextClass();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64; // 32 frequency bins
        analyser.smoothingTimeConstant = 0.75;

        // Try connecting element source
        const source = ctx.createMediaElementSource(audioEl);
        source.connect(analyser);
        analyser.connect(ctx.destination);

        audioContextRef.current = ctx;
        analyserRef.current = analyser;
        sourceRef.current = source;

        if (ctx.state === "suspended") {
          ctx.resume().catch(() => {});
        }
      } catch (err) {
        // Fallback procedural animation will be used if Web Audio is blocked/unavailable
        console.info("Using simulated retro audio visualizer fallback:", err);
      }
    };

    if (isPlaying) {
      initAudioGraph();
    }
  }, [audioRef, isPlaying]);


  // Resume audio context if suspended
  useEffect(() => {
    if (isPlaying && audioContextRef.current?.state === "suspended") {
      audioContextRef.current.resume().catch(() => {});
    }
  }, [isPlaying]);

  // Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    const dataArray = new Uint8Array(32);

    const render = () => {
      time += 0.05;
      const width = canvas.width;
      const height = canvas.height;

      // Clear with deep retro nautical background
      ctx.fillStyle = "#050d1a";
      ctx.fillRect(0, 0, width, height);

      // Draw subtle horizontal grid scanlines
      ctx.fillStyle = "rgba(2, 132, 199, 0.07)";
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1);
      }

      const active = isPlaying && !isMuted && volume > 0;
      let hasRealAudio = false;

      if (active && analyserRef.current) {
        analyserRef.current.getByteFrequencyData(dataArray);
        // Check if we have non-zero sound data
        const sum = dataArray.reduce((acc, v) => acc + v, 0);
        if (sum > 10) {
          hasRealAudio = true;
        }
      }

      // Bar layout configuration
      const paddingX = 4;
      const paddingY = 4;
      const usableWidth = width - paddingX * 2;
      const usableHeight = height - paddingY * 2;
      const barSpacing = 3;
      const barWidth = Math.floor(
        (usableWidth - (BAR_COUNT - 1) * barSpacing) / BAR_COUNT
      );

      const segmentGap = 1;
      const segmentHeight = Math.floor(
        (usableHeight - (NUM_SEGMENTS - 1) * segmentGap) / NUM_SEGMENTS
      );

      for (let i = 0; i < BAR_COUNT; i++) {
        let targetLevel = 0;

        if (active) {
          if (hasRealAudio) {
            // Map 16 bars across frequency spectrum (bass to treble)
            const binIndex = Math.min(
              dataArray.length - 1,
              Math.floor((i / BAR_COUNT) * 24)
            );
            const rawVal = dataArray[binIndex] / 255;
            // Boost treble slightly for visual balance
            const trebleBoost = 1 + (i / BAR_COUNT) * 0.4;
            targetLevel = Math.min(1, rawVal * trebleBoost);
          } else {
            // Procedural rhythmic wave simulation synced to beat
            const wave1 = Math.sin(time * 4 + i * 0.45) * 0.35 + 0.35;
            const wave2 = Math.cos(time * 2.5 - i * 0.3) * 0.25;
            const beat = Math.pow(Math.sin(time * 3), 4) * (i < 5 ? 0.3 : 0.15);
            targetLevel = Math.max(0.1, Math.min(0.95, (wave1 + wave2 + beat) * (volume / 0.5)));
          }
        } else {
          targetLevel = 0;
        }

        // Smooth transition for current level
        const currentLevel = currentLevelsRef.current[i] || 0;
        const lerpSpeed = active ? 0.35 : 0.2;
        const nextLevel = currentLevel + (targetLevel - currentLevel) * lerpSpeed;
        currentLevelsRef.current[i] = nextLevel;

        const activeSegments = Math.round(nextLevel * NUM_SEGMENTS);

        // Update Peak hold
        if (nextLevel >= peakLevelsRef.current[i]) {
          peakLevelsRef.current[i] = nextLevel;
          peakFallSpeedRef.current[i] = 0;
        } else {
          peakFallSpeedRef.current[i] += 0.008;
          peakLevelsRef.current[i] = Math.max(
            0,
            peakLevelsRef.current[i] - peakFallSpeedRef.current[i]
          );
        }

        const barX = paddingX + i * (barWidth + barSpacing);

        // Draw LED segments from bottom to top
        for (let s = 0; s < NUM_SEGMENTS; s++) {
          const segY =
            height -
            paddingY -
            (s + 1) * segmentHeight -
            s * segmentGap;

          const isSegmentActive = s < activeSegments;

          if (isSegmentActive) {
            // Color grading: Cyan (base) -> Sky Blue (mid) -> Gold (high) -> Red (peak)
            if (s >= NUM_SEGMENTS - 1) {
              ctx.fillStyle = "#ef4444"; // Red peak
            } else if (s >= NUM_SEGMENTS - 3) {
              ctx.fillStyle = "#facc15"; // Gold
            } else if (s >= NUM_SEGMENTS - 6) {
              ctx.fillStyle = "#38bdf8"; // Sky cyan
            } else {
              ctx.fillStyle = "#0284c7"; // Ocean blue
            }
          } else {
            // Dim inactive LED block
            ctx.fillStyle = "rgba(15, 30, 50, 0.4)";
          }

          ctx.fillRect(barX, segY, barWidth, segmentHeight);
        }

        // Draw Peak hold dot
        const peakSeg = Math.min(
          NUM_SEGMENTS - 1,
          Math.max(0, Math.round(peakLevelsRef.current[i] * NUM_SEGMENTS))
        );
        if (peakSeg > 0 && active) {
          const peakY =
            height -
            paddingY -
            (peakSeg + 1) * segmentHeight -
            peakSeg * segmentGap;
          ctx.fillStyle = peakSeg >= NUM_SEGMENTS - 2 ? "#ffffff" : "#fef08a";
          ctx.fillRect(barX, peakY, barWidth, segmentHeight);
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isPlaying, isMuted, volume]);

  return (
    <div className="w-full mb-3">
      {/* Visualizer header & frequency label */}
      <div className="flex items-center justify-between text-[6px] text-sky-400/80 mb-1 px-1">
        <span>EQ // SPECTRUM</span>
        <span className={isPlaying && !isMuted ? "text-amber-400 animate-pulse" : "text-slate-500"}>
          {isPlaying && !isMuted ? "LIVE" : "IDLE"}
        </span>
      </div>

      {/* Canvas container with retro pixel border */}
      <div
        style={{
          border: "2px solid #0284c7",
          boxShadow: `
            inset 0 0 10px rgba(2, 132, 199, 0.2),
            0 2px 0 0 #020617
          `,
          background: "#050d1a",
          padding: "3px",
          imageRendering: "pixelated",
        }}
      >
        <canvas
          ref={canvasRef}
          width={182}
          height={40}
          className="w-full h-10 block"
          style={{
            imageRendering: "pixelated",
          }}
        />
      </div>

      {/* Channel indicators at bottom */}
      <div className="flex justify-between text-[5px] text-slate-500 px-1 mt-1 font-mono">
        <span>LOW</span>
        <span>MID</span>
        <span>HIGH</span>
      </div>
    </div>
  );
}
