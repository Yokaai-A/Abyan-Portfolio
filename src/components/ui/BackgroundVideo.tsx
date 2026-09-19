"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const FORWARD = "/assets/background/background.mp4";
const REVERSE = "/assets/background/background_reverse.mp4";

/** Seconds before clip end to start the crossfade */
const EARLY_SWAP_S = 1.5;
/** CSS crossfade duration in ms — must match the transition below */
const CROSSFADE_MS = 400;

/**
 * BackgroundVideo – flicker-free ping-pong via double-buffer + CSS crossfade.
 *
 * Both <video> elements stay in the DOM and are always composited by the GPU.
 * 1.5 s before the active clip ends, we start playing the standby clip and
 * crossfade between them. The old clip is still showing while the new one
 * fades in, so there is never a black frame.
 */
export default function BackgroundVideo({
  className,
}: {
  className?: string;
}) {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState<"a" | "b">("a");
  // Prevents re-triggering the swap within the same clip
  const swappedRef = useRef(false);

  // ── Init ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b) return;

    swappedRef.current = false;

    // Slot A: play forward immediately
    a.src = FORWARD;
    a.load();
    a.play().catch(() => {});

    // Slot B: preload reverse so its first frame is decoded before we need it
    b.src = REVERSE;
    b.load();
  }, []);

  // ── Resume on tab focus ───────────────────────────────────────────────────
  useEffect(() => {
    const activeRef = active === "a" ? videoARef : videoBRef;
    const onVis = () => {
      if (document.visibilityState === "visible") {
        activeRef.current?.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [active]);

  // Reset the swap guard each time a new clip becomes active
  useEffect(() => {
    swappedRef.current = false;
  }, [active]);

  // ── Early crossfade swap ──────────────────────────────────────────────────
  const handleTimeUpdate = useCallback((playing: "a" | "b") => {
    if (swappedRef.current) return;

    const activeEl =
      playing === "a" ? videoARef.current : videoBRef.current;
    const standbyEl =
      playing === "a" ? videoBRef.current : videoARef.current;
    if (!activeEl || !standbyEl) return;

    const { currentTime, duration } = activeEl;
    // Ignore first 0.5 s (avoid spurious triggers on load) and clips with no metadata yet
    if (!duration || currentTime < 0.5) return;
    if (duration - currentTime > EARLY_SWAP_S) return;

    // ── Swap ──────────────────────────────────────────────────────────────
    swappedRef.current = true;

    // Start the standby clip — it has been preloaded so first frame is ready
    standbyEl.play().catch(() => {});

    // React re-render flips the CSS opacity → CSS transition crossfades both
    setActive(playing === "a" ? "b" : "a");

    // After the crossfade is done, reload the now-hidden slot with the NEXT src
    // so it's preloaded for the cycle after this one
    const nextSrc = playing === "a" ? FORWARD : REVERSE;
    setTimeout(() => {
      activeEl.pause();
      activeEl.src = nextSrc;
      activeEl.load();
    }, CROSSFADE_MS + 100);
  }, []);

  // ── Slot style ────────────────────────────────────────────────────────────
  const slotStyle = (slot: "a" | "b"): React.CSSProperties => ({
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "bottom",
    // Crossfade: both clips overlap during the transition, never a black frame
    opacity: active === slot ? 1 : 0,
    transition: `opacity ${CROSSFADE_MS}ms ease-in-out`,
    pointerEvents: "none",
  });

  return (
    // Wrapper inherits layout classes (w-full h-full) from the parent's className
    <div className={`relative ${className ?? ""}`}>
      <video
        ref={videoARef}
        muted
        playsInline
        preload="auto"
        onTimeUpdate={() => active === "a" && handleTimeUpdate("a")}
        style={slotStyle("a")}
        className="pixelated scale-100"
      />
      <video
        ref={videoBRef}
        muted
        playsInline
        preload="auto"
        onTimeUpdate={() => active === "b" && handleTimeUpdate("b")}
        style={slotStyle("b")}
        className="pixelated scale-100"
      />
    </div>
  );
}
