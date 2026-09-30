"use client";

import { Anchor, BookOpen, ChevronLeft, ChevronRight, Compass, Pause, Play, Users } from "lucide-react";
import { useRef, useState, type CSSProperties } from "react";
import { flushSync } from "react-dom";
import type { Experience, VoyageCategory } from "@/types";
import ExperienceCard from "./ExperienceCard";
import VoyageMemories from "./VoyageMemories";
import styles from "./VoyageRow.module.css";

const markers = { leadership: Anchor, community: Users, academic: BookOpen, personal: Compass };

export default function VoyageRow({ category, title, direction, experiences }: {
  category: VoyageCategory;
  title: string;
  direction: "left" | "right";
  experiences: Experience[];
}) {
  const [manual, setManual] = useState(false);
  const [selected, setSelected] = useState<Experience | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const Marker = markers[category];

  const looping = experiences.length > 2;
  const repetitions = looping ? Math.ceil(4 / experiences.length) : experiences.length ? 1 : 0;
  const cards = Array.from({ length: repetitions }, () => experiences).flat();
  const groups = looping ? [0, 1] : [0];
  const duration = Math.max(60, cards.length * 15);

  function startManualScroll() {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (manual || !viewport || !track) return;
    const transform = getComputedStyle(track).transform;
    const offset = transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m41;
    const position = viewport.scrollLeft - offset;
    flushSync(() => setManual(true));
    viewport.scrollLeft = position;
  }

  function resumeMovement() {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const groupWidth = track.scrollWidth / 2;
    const progress = groupWidth ? (viewport.scrollLeft % groupWidth) / groupWidth : 0;
    track.style.animationDelay = `-${(direction === "right" ? 1 - progress : progress) * duration}s`;
    viewport.scrollLeft = 0;
    setManual(false);
  }

  function scrollCards(direction: number) {
    startManualScroll();
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollBy({
      left: direction * viewport.clientWidth * 0.8,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <section aria-labelledby={`${category}-heading`} className={selected ? styles.modalOpen : ""}>
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-cyan-800/60 pb-3">
        <h3 id={`${category}-heading`} className="flex items-center gap-3 font-pixel-mono text-sm text-amber-300 sm:text-base">
          <Marker aria-hidden="true" className="h-4 w-4 shrink-0 text-cyan-400" />{title}
        </h3>
        {experiences.length > 0 && (
          <div className="flex items-center gap-2">
          <button type="button" onClick={() => scrollCards(-1)} aria-label={`Scroll ${title} left`}
            className="inline-flex h-10 w-10 items-center justify-center border border-cyan-900 text-cyan-300 hover:border-cyan-400 focus-visible:outline-2 focus-visible:outline-amber-300">
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          </button>
          {looping && <button type="button" onClick={() => manual ? resumeMovement() : startManualScroll()} aria-pressed={manual}
            aria-label={manual ? `Resume ${title} movement` : `Pause ${title} movement and browse manually`}
            className={`${styles.motionControl} inline-flex min-h-10 items-center gap-2 border border-cyan-900 px-3 font-pixel-mono text-[10px] text-slate-300 hover:border-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300`}>
            {manual ? <Play aria-hidden="true" className="h-3 w-3" /> : <Pause aria-hidden="true" className="h-3 w-3" />}
            {manual ? "RESUME" : "PAUSE"}
          </button>}
          <button type="button" onClick={() => scrollCards(1)} aria-label={`Scroll ${title} right`}
            className="inline-flex h-10 w-10 items-center justify-center border border-cyan-900 text-cyan-300 hover:border-cyan-400 focus-visible:outline-2 focus-visible:outline-amber-300">
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>
          </div>
        )}
      </header>
      {experiences.length ? (
        <div ref={viewportRef} className={`${styles.viewport} ${manual ? styles.manual : ""}`} role="region" aria-label={`${title} gallery`}
          onPointerDown={startManualScroll}
          onWheel={(event) => { if (event.deltaX !== 0 || event.shiftKey) startManualScroll(); }}>
          <div ref={trackRef} className={`${styles.track} ${!looping ? styles.static : ""} ${direction === "right" ? styles.right : ""}`}
            style={{ "--voyage-duration": `${duration}s` } as CSSProperties}>
            {groups.map((group) => (
              <div key={group} className={`${styles.group} ${group ? styles.duplicate : ""}`} aria-hidden={group ? true : undefined}>
                {cards.map((experience, index) => {
                  const duplicate = group > 0 || index >= experiences.length;
                  return (
                    <div key={`${experience.id}-${index}`} aria-hidden={duplicate ? true : undefined}
                      className={`${styles.card} ${index >= experiences.length ? styles.duplicate : ""}`}>
                      <ExperienceCard experience={experience} duplicate={duplicate} onSelect={() => setSelected(experience)} />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex min-h-52 flex-col items-center justify-center gap-4 border border-dashed border-cyan-900 bg-[#071526]/50 p-6 text-center">
          <Compass aria-hidden="true" className="h-7 w-7 text-cyan-700" />
          <p className="font-pixel-mono text-xs leading-loose text-slate-400">MORE VOYAGES ARE BEING CHARTED...</p>
        </div>
      )}
      {selected && <VoyageMemories experience={selected} onDismiss={() => setSelected(null)} />}
    </section>
  );
}
