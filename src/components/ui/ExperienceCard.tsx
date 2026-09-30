"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useState } from "react";
import type { Experience } from "@/types";

export default function ExperienceCard({ experience, duplicate = false, onSelect }: {
  experience: Experience;
  duplicate?: boolean;
  onSelect: () => void;
}) {
  const [failed, setFailed] = useState(false);
  const image = experience.image ?? experience.gallery?.[0]?.src;
  return (
    <button type="button" tabIndex={duplicate ? -1 : 0} onClick={onSelect}
      aria-label={`View ${experience.title}, ${experience.period}`} aria-haspopup="dialog"
      className="group/card block h-full w-full cursor-pointer border border-cyan-800/70 bg-[#071526] p-2 text-left shadow-[3px_3px_0_#020617] transition-[transform,border-color,box-shadow] duration-200 hover:border-cyan-300 hover:shadow-[0_0_16px_#22d3ee20,3px_3px_0_#020617] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none">
      <span className="relative block aspect-video overflow-hidden border border-cyan-900 bg-[#030c18]">
        {image && !failed ? (
          <Image src={image} alt={experience.imageAlt ?? experience.gallery?.[0]?.alt ?? experience.title}
            fill sizes="(max-width: 640px) 82vw, 380px" className="object-contain transition-[filter] duration-200 group-hover/card:brightness-110 motion-reduce:transition-none"
            onError={() => setFailed(true)} />
        ) : (
          <span className="flex h-full flex-col items-center justify-center gap-4 px-4 text-center text-slate-500">
            <ImageIcon aria-hidden="true" className="h-8 w-8 text-cyan-800" />
            <span className="font-pixel-mono text-[10px] leading-relaxed">DOCUMENTATION PHOTO<br />COMING SOON</span>
          </span>
        )}
        <span aria-hidden="true" className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-amber-300" />
        <span aria-hidden="true" className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-amber-300" />
      </span>
      <span className="block px-1 pb-2 pt-4">
        <span className="flex items-start justify-between gap-3">
          <span className="min-w-0 font-pixel-mono text-xs leading-relaxed text-cyan-200">{experience.title}</span>
          <span className="w-20 shrink-0 text-right font-pixel-mono text-[9px] leading-relaxed text-amber-300">{experience.period}</span>
        </span>
        <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">{experience.caption}</span>
      </span>
    </button>
  );
}
