import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useCatalog } from "./catalog-store";

type Lang = "en" | "ar";

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: (text: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "lmr-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { translations, updateTranslations } = useCatalog();
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    return window.localStorage.getItem(STORAGE_KEY) === "ar" ? "ar" : "en";
  });

  const pending = useRef<Set<string>>(new Set());
  const buffer = useRef<Record<string, string>>({});
  const flushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleLang = () => {
    setLang((current) => {
      const next = current === "en" ? "ar" : "en";
      if (typeof window !== "undefined")
        window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  };

  const scheduleFlush = () => {
    if (flushTimer.current) clearTimeout(flushTimer.current);
    flushTimer.current = setTimeout(() => {
      const additions = buffer.current;
      buffer.current = {};
      if (Object.keys(additions).length === 0) return;
      updateTranslations({ ...translations, ...additions });
    }, 600);
  };

  const requestTranslation = (text: string) => {
    if (pending.current.has(text)) return;
    pending.current.add(text);
    fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
      .then((response) =>
        response.ok
          ? response.json()
          : Promise.reject(new Error("translate failed")),
      )
      .then((data: { translation?: string }) => {
        if (data.translation) {
          buffer.current[text] = data.translation;
          scheduleFlush();
        }
      })
      .catch(() => {})
      .finally(() => {
        pending.current.delete(text);
      });
  };

  const t = (text: string): string => {
    if (!text || lang === "en") return text;
    const cached = translations[text];
    if (cached) return cached;
    requestTranslation(text);
    return text;
  };

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
