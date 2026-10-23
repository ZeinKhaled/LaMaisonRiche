import { motion } from "framer-motion";
import { ReactNode } from "react";

export function PageTransition({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <>
      {/* Luxury Curtain Wipe Overlay */}
      <motion.div
        className="fixed inset-0 z-50 pointer-events-none origin-bottom bg-[#1A1215]"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="fixed inset-0 z-50 pointer-events-none origin-top bg-primary/20"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={`min-h-screen pt-24 ${className}`}
      >
        {children}
      </motion.div>
    </>
  );
}
