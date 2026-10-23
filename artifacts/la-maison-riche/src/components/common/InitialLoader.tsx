import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_URL = `${import.meta.env.BASE_URL}logo.png`;

export function InitialLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Only display once per session so navigating doesn't annoy the user
    const hasLoaded = sessionStorage.getItem("lmr-initial-loader");
    if (hasLoaded) {
      setShow(false);
      return;
    }

    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("lmr-initial-loader", "true");
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center pointer-events-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center px-6"
          >
            <div className="relative mb-6">
              <motion.img
                src={LOGO_URL}
                alt="La Maison Riche"
                className="h-20 w-auto object-contain p-2 rounded shadow-sm"
                style={{ backgroundColor: "#5E1C32" }}
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(94,28,50,0)",
                    "0 0 25px rgba(94,28,50,0.4)",
                    "0 0 0 rgba(94,28,50,0)",
                  ],
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="font-serif text-3xl md:text-4xl tracking-wider text-foreground">
                <span className="text-primary italic mr-1.5">La</span>
                <span className="font-semibold">Maison</span>
                <span className="font-light italic ml-1.5">Riche</span>
              </h1>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground mt-2 font-light">
                Interior Haute Couture · Since 1989
              </p>
            </motion.div>

            {/* Subtle progress indicator line */}
            <div className="w-32 h-[1px] bg-border mt-8 overflow-hidden relative">
              <motion.div
                className="absolute inset-y-0 left-0 bg-primary w-full"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
