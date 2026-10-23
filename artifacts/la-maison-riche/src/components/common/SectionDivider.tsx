import { motion } from "framer-motion";

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div className={`w-full flex items-center justify-center my-2 select-none overflow-hidden ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent origin-center"
      />
    </div>
  );
}
