"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

export default function ProfilePhoto() {
  const [unavailable, setUnavailable] = useState(false);

  return (
    <div className="relative w-full max-w-48 sm:max-w-60 min-h-56 sm:min-h-72 flex-1 bg-[#040c17] border-2 border-cyan-400/80 pixel-box overflow-hidden mx-auto">
      {unavailable ? (
        <div role="img" aria-label="Profile photo coming soon" className="flex h-full flex-col items-center justify-center gap-3 text-cyan-300/60">
          <ImageIcon className="w-9 h-9" aria-hidden="true" />
          <span className="text-[10px] font-['Silkscreen',monospace]">PHOTO COMING SOON</span>
        </div>
      ) : (
        <Image
          src="/assets/profile.jpeg"
          alt="Muhammad Abyan Hanif"
          loading="eager"
          fill
          sizes="(max-width: 320px) calc(100vw - 84px), 240px"
          className="object-cover object-top"
          onError={() => setUnavailable(true)}
        />
      )}
    </div>
  );
}
