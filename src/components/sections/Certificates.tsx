"use client";

import { Award, ChevronLeft, ChevronRight, ExternalLink, FileBadge, Pause, Play } from "lucide-react";
import { useRef, useState, type CSSProperties } from "react";
import { flushSync } from "react-dom";
import styles from "@/components/ui/VoyageRow.module.css";

const certificates = [
  {
    file: "Mentor_Scholarship_Certificate.pdf",
    title: "Scholarship Mentor",
    issuer: "BINUS University",
  },
  {
    file: "Samsung_Innovation_Campus_COC.pdf",
    title: "Samsung Innovation Campus — Certificate of Completion",
    issuer: "Samsung Innovation Campus",
  },
  {
    file: "Memulai_Pemrograman_Dengan_Python.pdf",
    title: "Memulai Pemrograman dengan Python",
    issuer: "Dicoding",
  },
  {
    file: "Belajar_Membuat_Aplikasi_Web_Dengan_React.pdf",
    title: "Belajar Membuat Aplikasi Web dengan React",
    issuer: "Dicoding",
  },
  {
    file: "Find_IT_UGM.pdf",
    title: "FIND IT! Certificate",
    issuer: "Universitas Gadjah Mada",
  },
  {
    file: "COC_Bootcamp_BNCC.pdf",
    title: "BNCC Bootcamp — Certificate of Completion",
    issuer: "Bina Nusantara Computer Club",
  },
  {
    file: "Belajar_Dasar_Pemgrograman_Javascript.pdf",
    title: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding",
  },
  {
    file: "COA_Capture_The_Flag.pdf",
    title: "Capture The Flag — Certificate of Appreciation",
    issuer: "COMPFEST 18",
  },
  {
    file: "COA_Business_IT.pdf",
    title: "Business IT Case — Certificate of Appreciation",
    issuer: "COMPFEST 18",
  },
  {
    file: "Belajar_Fundamental_Aplikasi_Web_Dengan_React.pdf",
    title: "Belajar Fundamental Aplikasi Web dengan React",
    issuer: "Dicoding",
  },
  {
    file: "Freshmen_Leader_Certificate.pdf",
    title: "Freshmen Leader",
    issuer: "BINUS University",
  },
];

const duration = Math.max(60, certificates.length * 15);

export default function CertificatesSection() {
  const [manual, setManual] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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
    track.style.animationDelay = `-${progress * duration}s`;
    viewport.scrollLeft = 0;
    setManual(false);
  }

  function scrollCards(direction: number) {
    startManualScroll();
    viewportRef.current?.scrollBy({
      left: direction * (viewportRef.current?.clientWidth ?? 0) * 0.8,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <section aria-labelledby="certificates-heading" className="mb-16 min-w-0 scroll-mt-24 pt-4 sm:pt-6">
      <header className="mb-8 space-y-3">
        <div className="flex items-start gap-3">
          <Award aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
          <h2 id="certificates-heading" className="font-pixel text-xs leading-loose text-white sm:text-base">
            CERTIFICATE LOGBOOK <span className="text-cyan-300">{"// CREDENTIALS"}</span>
          </h2>
        </div>
        <p className="text-sm text-slate-300 sm:text-base">
          Certifications and achievements collected along the journey.
        </p>
      </header>

      <section aria-labelledby="certificate-voyage-heading">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-cyan-800/60 pb-3">
          <div className="flex items-center gap-3">
            <FileBadge aria-hidden="true" className="h-4 w-4 shrink-0 text-cyan-400" />
            <h3 id="certificate-voyage-heading" className="font-pixel-mono text-sm text-amber-300 sm:text-base">
              CERTIFICATES
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => scrollCards(-1)} aria-label="Scroll certificates left"
              className="inline-flex h-10 w-10 items-center justify-center border border-cyan-900 text-cyan-300 hover:border-cyan-400 focus-visible:outline-2 focus-visible:outline-amber-300">
              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => manual ? resumeMovement() : startManualScroll()} aria-pressed={manual}
              aria-label={manual ? "Resume certificate movement" : "Pause certificate movement and browse manually"}
              className={`${styles.motionControl} inline-flex min-h-10 items-center gap-2 border border-cyan-900 px-3 font-pixel-mono text-[10px] text-slate-300 hover:border-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300`}>
              {manual ? <Play aria-hidden="true" className="h-3 w-3" /> : <Pause aria-hidden="true" className="h-3 w-3" />}
              {manual ? "RESUME" : "PAUSE"}
            </button>
            <button type="button" onClick={() => scrollCards(1)} aria-label="Scroll certificates right"
              className="inline-flex h-10 w-10 items-center justify-center border border-cyan-900 text-cyan-300 hover:border-cyan-400 focus-visible:outline-2 focus-visible:outline-amber-300">
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </header>
        <div ref={viewportRef} className={`${styles.viewport} ${manual ? styles.manual : ""}`} role="region" aria-label="Certificate carousel"
          onPointerDown={startManualScroll}
          onWheel={(event) => { if (event.deltaX !== 0 || event.shiftKey) startManualScroll(); }}>
          <div ref={trackRef} className={styles.track} style={{ "--voyage-duration": `${duration}s` } as CSSProperties}>
            {[0, 1].map((group) => (
              <div key={group} className={`${styles.group} ${group ? styles.duplicate : ""}`} aria-hidden={group ? true : undefined}>
                {certificates.map(({ file, title, issuer }, index) => {
                  const certificateUrl = `/assets/certificates/${encodeURIComponent(file)}`;
                  return (
                    <div key={`${file}-${index}`} className={styles.card}>
                      <a
                        href={certificateUrl}
                        target="_blank"
                        rel="noreferrer"
                        tabIndex={group ? -1 : undefined}
                        aria-label={`Open ${title} certificate from ${issuer} in a new tab`}
                        className="group/card block h-full border border-cyan-800/70 bg-[#071526] p-2 text-left shadow-[3px_3px_0_#020617] transition-[transform,border-color,box-shadow] duration-200 hover:border-cyan-300 hover:shadow-[0_0_16px_#22d3ee20,3px_3px_0_#020617] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none"
                      >
                        <span className="relative block aspect-video overflow-hidden border border-cyan-900 bg-[#030c18]">
                          <iframe
                            src={`${certificateUrl}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                            title={`${title} certificate preview`}
                            loading="lazy"
                            tabIndex={-1}
                            className="pointer-events-none h-full w-full border-0 bg-[#030c18]"
                          />
                          <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-amber-300" />
                          <span aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-amber-300" />
                        </span>
                        <span className="block px-1 pb-2 pt-4">
                          <span className="flex items-start justify-between gap-3">
                            <span className="min-w-0 font-pixel-mono text-xs leading-relaxed text-cyan-200">{title}</span>
                            <ExternalLink aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-amber-300" />
                          </span>
                          <span className="mt-2 block text-sm leading-relaxed text-slate-400">{issuer}</span>
                        </span>
                      </a>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
