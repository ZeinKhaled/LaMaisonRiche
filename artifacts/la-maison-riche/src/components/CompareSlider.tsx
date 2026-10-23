import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/data/language-store";
import { motion } from "framer-motion";

interface CompareProps {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
  hideBadges?: boolean;
  aspectClass?: string;
}

export function CompareSlider({
  beforeSrc,
  afterSrc,
  alt,
  hideBadges = false,
  aspectClass = "aspect-[16/10]",
}: CompareProps) {
  const { t } = useLanguage();
  const [position, setPosition] = useState(50);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  };

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      updateFromClientX(clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${aspectClass} overflow-hidden select-none cursor-ew-resize bg-card border border-border`}
      onMouseDown={(e) => {
        setHasInteracted(true);
        draggingRef.current = true;
        updateFromClientX(e.clientX);
      }}
      onTouchStart={(e) => {
        setHasInteracted(true);
        draggingRef.current = true;
        updateFromClientX(e.touches[0].clientX);
      }}
    >
      {/* After (full) */}
      <img
        src={afterSrc}
        alt={`${alt} — after`}
        className="absolute inset-0 w-full h-full object-contain bg-[#f5f5f5] pointer-events-none"
        draggable={false}
      />
      {/* Before (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`,
        }}
      >
        <img
          src={beforeSrc}
          alt={`${alt} — before`}
          className="w-full h-full object-contain bg-[#f5f5f5]"
          style={{ filter: "grayscale(0.6) brightness(0.85)" }}
          draggable={false}
        />
      </div>

      {!hideBadges && (
        <>
          <div className="absolute top-4 left-4 px-3 py-1 bg-background/80 backdrop-blur text-xs uppercase tracking-widest text-foreground border border-border pointer-events-none">
            {t("Before")}
          </div>
          <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs uppercase tracking-widest pointer-events-none">
            {t("After")}
          </div>
        </>
      )}

      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 w-px bg-primary pointer-events-none"
        style={{ left: `${position}%` }}
      >
        <motion.div
          animate={
            hasInteracted
              ? { scale: 1, boxShadow: "0 4px 14px rgba(0,0,0,0.25)" }
              : {
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 4px 14px rgba(0,0,0,0.25)",
                    "0 4px 22px rgba(227,2,2,0.55)",
                    "0 4px 14px rgba(0,0,0,0.25)",
                  ],
                }
          }
          transition={{ duration: 2, repeat: hasInteracted ? 0 : Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing"
        >
          {/* Subtle fading animated arrows */}
          <motion.div
            className="flex items-center gap-1.5 text-primary text-xs font-serif select-none"
            animate={
              hasInteracted
                ? { opacity: 0.8 }
                : {
                    opacity: [0.6, 1, 0.6],
                  }
            }
            transition={{ duration: 1.5, repeat: hasInteracted ? 0 : Infinity, ease: "easeInOut" }}
          >
            <motion.span
              animate={hasInteracted ? {} : { x: [-1.5, 0, -1.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              &#9664;
            </motion.span>
            <span className="w-0.5 h-3 bg-primary/40 rounded-full" />
            <motion.span
              animate={hasInteracted ? {} : { x: [1.5, 0, 1.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              &#9654;
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
