"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const FORWARD = "/assets/background/background.mp4";
const REVERSE = "/assets/background/background_reverse.mp4";
const CROSSFADE_MS = 600;
const EARLY_SWAP_S = CROSSFADE_MS / 1000 + 0.25;

const slotStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "bottom",
  pointerEvents: "none",
};

export default function BackgroundVideo({
  className,
}: {
  className?: string;
}) {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b) return;

    let active = a;
    let swapping = false;
    let disposed = false;
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;


    b.style.opacity = "0";
    a.play().catch(() => {});

    const swap = async () => {
      if (disposed || swapping || document.visibilityState === "hidden") return;
      if (!Number.isFinite(active.duration)) return;
      if (active.duration - active.currentTime > EARLY_SWAP_S) return;

      swapping = true;
      const outgoing = active;
      const incoming = active === a ? b : a;

      try {


        await incoming.play();
      } catch {
        swapping = false;
        return;
      }
      if (disposed) return;

      b.style.opacity = incoming === b ? "1" : "0";
      active = incoming;

      fadeTimer = setTimeout(() => {


        outgoing.pause();
        outgoing.currentTime = 0;
        swapping = false;
      }, CROSSFADE_MS + 100);
    };

    const onProgress = (event: Event) => {
      if (event.currentTarget === active) void swap();
    };
    const onReady = () => void swap();
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        active.play().catch(() => {});
        void swap();
      }
    };

    for (const video of [a, b]) {
      video.addEventListener("timeupdate", onProgress);
      video.addEventListener("ended", onProgress);
      video.addEventListener("canplay", onReady);
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      disposed = true;
      clearTimeout(fadeTimer);
      for (const video of [a, b]) {
        video.removeEventListener("timeupdate", onProgress);
        video.removeEventListener("ended", onProgress);
        video.removeEventListener("canplay", onReady);
        video.pause();
      }
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className={`relative ${className ?? ""}`}>
      <video
        ref={videoARef}
        src={FORWARD}
        muted
        playsInline
        preload="auto"
        style={slotStyle}
        className="pixelated scale-100"
      />
      <video
        ref={videoBRef}
        src={REVERSE}
        muted
        playsInline
        preload="auto"
        style={{
          ...slotStyle,
          opacity: 0,
          transition: `opacity ${CROSSFADE_MS}ms ease-in-out`,
        }}
        className="pixelated scale-100"
      />
    </div>
  );
}
