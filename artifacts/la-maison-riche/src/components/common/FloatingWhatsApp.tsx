import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export function FloatingWhatsApp({
  phoneNumber = "+201277917937",
  defaultMessage = "Hello La Maison Riche, I would like to inquire about your interior collections.",
}: FloatingWhatsAppProps) {
  // Clean phone number for click-to-chat URL: digits only, or with leading plus
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  const href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <aside
      aria-label="Contact options"
      className="fixed bottom-6 right-6 z-50 flex items-center group pointer-events-auto"
      style={{
        bottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))",
        right: "max(1.5rem, env(safe-area-inset-right, 1.5rem))",
      }}
    >
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_36px_rgba(37,211,102,0.55)] transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-background"
      >
        {/* Subtle breathing ambient ripple ring */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none"
          style={{ animationDuration: "3s" }}
          aria-hidden="true"
        />

        {/* WhatsApp Icon */}
        <FaWhatsapp size={32} className="relative z-10" />

        {/* Floating tooltip badge on hover (desktop) */}
        <span
          className="hidden md:flex absolute right-full mr-3.5 px-3 py-1.5 rounded bg-background/95 backdrop-blur border border-border text-foreground text-xs font-serif tracking-wider shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none items-center gap-1.5"
          aria-hidden="true"
        >
          <span className="w-2 h-2 rounded-full bg-[#25D366]" />
          Chat on WhatsApp
        </span>
      </motion.a>
    </aside>
  );
}
