import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  wordSpacing?: string;
}

export function SplitText({
  text,
  className = "",
  delay = 0,
  wordSpacing = "mr-2.5",
}: SplitTextProps) {
  const words = text.split(" ");

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className={`inline-block overflow-hidden ${wordSpacing}`}>
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export function RevealText({
  children,
  className = "",
  delay = 0.1,
}: RevealTextProps) {
  const words = children.split(" ");

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-2">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
