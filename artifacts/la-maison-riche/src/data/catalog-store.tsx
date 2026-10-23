import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  CATEGORIES,
  OFFERS,
  PRODUCTS,
  PROJECTS,
  TESTIMONIALS,
  type CategoryInfo,
  type Offer,
  type Product,
  type Project,
  type Testimonial,
} from "./products";

export interface CatalogState {
  products: Product[];
  categories: CategoryInfo[];
  offers: Offer[];
  projects: Project[];
  testimonials: Testimonial[];
  translations: Record<string, string>;
}

type SaveStatus = "idle" | "saving" | "saved" | "error";

interface CatalogContextValue extends CatalogState {
  isLoading: boolean;
  saveStatus: SaveStatus;
  saveError: string | null;
  updateProducts: (products: Product[]) => void;
  updateCategories: (categories: CategoryInfo[]) => void;
  updateOffers: (offers: Offer[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateTestimonials: (testimonials: Testimonial[]) => void;
  updateTranslations: (translations: Record<string, string>) => void;
  resetCatalog: () => void;
}

const defaultCatalog: CatalogState = {
  products: PRODUCTS,
  categories: CATEGORIES,
  offers: OFFERS,
  projects: PROJECTS,
  testimonials: TESTIMONIALS,
  translations: {},
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

function isCatalogData(
  value: unknown,
): value is Pick<CatalogState, "products" | "categories" | "offers"> {
  if (!value || typeof value !== "object") return false;
  const data = value as Partial<CatalogState>;
  return (
    Array.isArray(data.products) &&
    Array.isArray(data.categories) &&
    Array.isArray(data.offers)
  );
}

async function loadCatalog(): Promise<CatalogState> {
  const response = await fetch("/api/data", {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error("Unable to load catalog data");
  const data: unknown = await response.json();
  if (!isCatalogData(data))
    throw new Error("Catalog data has an invalid shape");
  const partial = data as Partial<CatalogState>;
  return {
    ...data,
    projects: Array.isArray(partial.projects) ? partial.projects : [],
    testimonials: Array.isArray(partial.testimonials)
      ? partial.testimonials
      : [],
    translations:
      partial.translations && typeof partial.translations === "object"
        ? partial.translations
        : {},
  };
}

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [catalog, setCatalog] = useState<CatalogState>(defaultCatalog);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveError, setSaveError] = useState<string | null>(null);
  const hydrated = useRef(false);
  const skipNextSave = useRef(false);

  useEffect(() => {
    let active = true;
    loadCatalog()
      .then((data) => {
        if (!active) return;
        skipNextSave.current = true;
        setCatalog(data);
      })
      .catch((error: unknown) => {
        if (!active) return;
        setSaveError(
          error instanceof Error
            ? error.message
            : "Unable to load catalog data",
        );
        setSaveStatus("error");
      })
      .finally(() => {
        if (!active) return;
        hydrated.current = true;
        setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }

    let active = true;
    setSaveStatus("saving");
    setSaveError(null);
    fetch("/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(catalog),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to save catalog data");
        return response.json();
      })
      .then(() => {
        if (active) setSaveStatus("saved");
      })
      .catch((error: unknown) => {
        if (!active) return;
        setSaveError(
          error instanceof Error
            ? error.message
            : "Unable to save catalog data",
        );
        setSaveStatus("error");
      });
    return () => {
      active = false;
    };
  }, [catalog]);

  const value = useMemo<CatalogContextValue>(
    () => ({
      ...catalog,
      isLoading,
      saveStatus,
      saveError,
      updateProducts: (products) =>
        setCatalog((current) => ({ ...current, products })),
      updateCategories: (categories) =>
        setCatalog((current) => ({ ...current, categories })),
      updateOffers: (offers) =>
        setCatalog((current) => ({ ...current, offers })),
      updateProjects: (projects) =>
        setCatalog((current) => ({ ...current, projects })),
      updateTestimonials: (testimonials) =>
        setCatalog((current) => ({ ...current, testimonials })),
      updateTranslations: (translations) =>
        setCatalog((current) => ({ ...current, translations })),
      resetCatalog: () => setCatalog(defaultCatalog),
    }),
    [catalog, isLoading, saveStatus, saveError],
  );

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context)
    throw new Error("useCatalog must be used inside CatalogProvider");
  return context;
}

export function slugifyCategory(name: string) {
  return name.trim().replace(/\s+/g, " ");
}

export function getCatalogImage(image: string, w = 1000, h = 800) {
  if (
    image.startsWith("data:") ||
    image.startsWith("blob:") ||
    image.includes("/") ||
    image.includes(".")
  ) {
    return image.startsWith("/")
      ? image
      : image.includes("/") && !image.startsWith("http")
        ? `/${image}`
        : image;
  }
  return `https://picsum.photos/seed/${image}/${w}/${h}`;
}
