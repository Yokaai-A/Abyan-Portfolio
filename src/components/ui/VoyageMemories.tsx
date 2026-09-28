"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { Experience, VoyageMemory } from "@/types";

const controlClass = "inline-flex min-h-11 items-center justify-center gap-2 border border-cyan-500/50 bg-[#030914] px-3 py-2 text-cyan-200 hover:border-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300 disabled:cursor-not-allowed disabled:opacity-40";

export default function VoyageMemories({ experience, onDismiss }: {
  experience: Experience;
  onDismiss: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  const [index, setIndex] = useState(0);
  const gallery: VoyageMemory[] = [
    ...(experience.image ? [{ src: experience.image, caption: experience.caption, alt: experience.imageAlt }] : []),
    ...(experience.gallery ?? []).filter((photo) => photo.src !== experience.image),
  ];
  const memory = gallery[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  function navigate(direction: number) {
    if (gallery.length > 1) setIndex((current) => (current + direction + gallery.length) % gallery.length);
  }

  return (
    <dialog ref={dialogRef} aria-labelledby={headingId} onClose={() => {
      if (!dialogRef.current?.open) onDismiss();
    }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          navigate(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto border-2 border-cyan-500/70 bg-[#071526] p-4 text-slate-100 shadow-[6px_6px_0_#020617] backdrop:bg-[#020617]/90 sm:p-6">
      <header className="mb-5 flex items-start justify-between gap-4 border-b border-cyan-900 pb-4">
        <div className="min-w-0">
          <p className="mb-2 font-pixel-mono text-[11px] text-amber-300">VOYAGE LOGBOOK</p>
          <h2 id={headingId} className="font-pixel text-xs leading-loose text-cyan-200 sm:text-sm">{experience.title}</h2>
          <p className="mt-3 text-sm text-slate-300">{experience.organization}</p>
          <p className="mt-1 font-pixel-mono text-[11px] text-amber-300">{experience.period}</p>
          {experience.division && <p className="mt-1 text-xs text-slate-400">{experience.division}</p>}
        </div>
        <button type="button" aria-label="Close voyage details" onClick={() => dialogRef.current?.close()} className={`${controlClass} shrink-0`}>
          <X aria-hidden="true" className="h-5 w-5" />
        </button>
      </header>

      {memory && (
        <figure className="mb-5 border border-slate-600 bg-[#030914] p-2 sm:p-3">
          <div className="relative h-[40dvh] min-h-40 w-full">
            <Image src={memory.src} alt={memory.alt ?? memory.caption} fill sizes="(max-width: 768px) 90vw, 700px" className="object-contain" />
          </div>
          <figcaption className="pt-3 text-sm leading-relaxed text-slate-300" aria-live="polite">{memory.caption}</figcaption>
        </figure>
      )}

      {gallery.length > 1 && (
        <nav aria-label="Voyage photo navigation" className="mb-5 flex items-center justify-between gap-3">
          <button type="button" aria-label="Previous photo" onClick={() => navigate(-1)} className={controlClass}>
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <p aria-live="polite" aria-atomic="true" className="font-pixel-mono text-xs text-amber-300">{index + 1} / {gallery.length}</p>
          <button type="button" aria-label="Next photo" onClick={() => navigate(1)} className={controlClass}>
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </nav>
      )}

      <div className="space-y-3 text-sm leading-relaxed text-slate-300">
        {experience.description.map((description) => <p key={description}>{description}</p>)}
      </div>
      {experience.scholarship && <p className="mt-4 border-t border-slate-800 pt-3 text-xs text-slate-400">{experience.scholarship}</p>}
    </dialog>
  );
}
