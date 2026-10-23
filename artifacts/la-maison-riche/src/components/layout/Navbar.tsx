import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/data/language-store";
import { AnimatePresence, motion } from "framer-motion";

const LOGO_URL = `${import.meta.env.BASE_URL}logo.png`;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [location] = useLocation();
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/collections", label: "Collections" },
    { href: "/new-collection", label: "New Collection" },
    { href: "/clearance", label: "Clearance" },
    { href: "/before-after", label: "Before & After" },
    { href: "/projects", label: "Projects" },
    { href: "/reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-border py-3 shadow-sm"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-6 flex items-center justify-between gap-2 min-w-0">
        {/* Logo + wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 sm:gap-3.5 shrink-0"
          aria-label="La Maison Riche home"
        >
          {!logoFailed && (
            <img
              src={LOGO_URL}
              alt="La Maison Riche"
              className="h-10 sm:h-12 md:h-14 w-auto shrink-0 object-contain rounded-xl p-1 shadow-sm transition-all duration-300 group-hover:opacity-90"
              style={{ backgroundColor: "#5E1C32" }}
              onError={() => setLogoFailed(true)}
            />
          )}
          <div className="leading-tight shrink-0">
            <div className="font-serif text-sm sm:text-base md:text-lg tracking-wider text-foreground whitespace-nowrap">
              <span className="text-primary italic mr-1">La</span>
              <span className="font-semibold">Maison</span>
              <span className="font-light italic ml-1">Riche</span>
            </div>
            <div className="text-[8px] sm:text-[9.5px] md:text-[10.5px] uppercase tracking-[0.14em] sm:tracking-[0.18em] text-muted-foreground mt-0.5 whitespace-nowrap">
              {t("Decor & Refurbishment · Since 1989")}
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 ml-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[10px] xl:text-[11px] uppercase tracking-wider xl:tracking-widest whitespace-nowrap transition-colors duration-300 hover:text-primary ${
                location === link.href ? "text-primary font-medium" : "text-foreground/80"
              }`}
            >
              {t(link.label)}
            </Link>
          ))}
          {/* disabled for now
          <button
            onClick={toggleLang}
            className="text-xs uppercase tracking-widest border border-border px-3 py-1.5 hover:border-primary hover:text-primary transition-colors"
          >
            {lang === "en" ? "AR" : "EN"}
          </button>
          */}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden shrink-0 p-1 text-foreground hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border py-6 px-6 shadow-xl lg:hidden"
          >
            <nav className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-serif tracking-wider transition-colors duration-300 ${
                    location === link.href
                      ? "text-primary"
                      : "text-foreground/80"
                  }`}
                >
                  {t(link.label)}
                </Link>
              ))}
              {/* disabled for now
              <button
                onClick={toggleLang}
                className="text-lg font-serif tracking-wider text-foreground/80 hover:text-primary"
              >
                {lang === "en" ? "AR" : "EN"}
              </button>
              */}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
