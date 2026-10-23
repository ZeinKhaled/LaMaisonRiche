import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-primary origin-left z-[99] pointer-events-none shadow-[0_1px_8px_rgba(227,2,2,0.4)]"
      style={{ scaleX }}
    />
  );
}
