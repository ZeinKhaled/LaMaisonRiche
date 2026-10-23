import { motion } from "framer-motion";

interface LuxuryMarqueeProps {
  className?: string;
  items?: string[];
}

const DEFAULT_ITEMS = [
  "Free Consultation",
  "Premium Materials",
  "Since 1989",
  "Cairo's Finest Showroom",
  "Bespoke Upholstery",
  "Dokki Atelier",
  "High-End Finishing",
];

export function LuxuryMarquee({
  className = "",
  items = DEFAULT_ITEMS,
}: LuxuryMarqueeProps) {
  // Duplicate for seamless loop
  const list = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden border-y border-border/80 bg-card/60 backdrop-blur-sm py-4 select-none ${className}`}
    >
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap gap-10 items-center w-max"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 35,
        }}
      >
        {list.map((item, idx) => (
          <div key={idx} className="flex items-center gap-10">
            <span className="font-serif tracking-[0.25em] text-xs uppercase text-foreground/85 font-light hover:text-primary transition-colors">
              {item}
            </span>
            <span className="text-primary text-xs opacity-75">◆</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
