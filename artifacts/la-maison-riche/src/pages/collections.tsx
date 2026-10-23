import { PageTransition } from "@/components/layout/PageTransition";
import { getImageUrl } from "@/data/products";
import { useCatalog } from "@/data/catalog-store";
import { useLanguage } from "@/data/language-store";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Collections() {
  const { categories, products } = useCatalog();
  const { t } = useLanguage();
  const visibleCategories = categories.filter(
    (category) => category.name !== "Lighting" && category.slug !== "Lighting",
  );
  const countByCategory = (slug: string) =>
    products.filter((p) => p.category === slug).length;

  return (
    <PageTransition>
      {/* Header */}
      <section className="pt-32 pb-16 border-b border-border bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-secondary font-serif italic tracking-widest text-sm mb-4">{t("Browse the house")}</p>
            <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-6">{t("Our Collections")}</h1>
            <p className="text-muted-foreground max-w-xl mx-auto font-light leading-relaxed">
              {t("Tap a category to step into the room. Each tile opens the full collection.")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image-button category grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleCategories.map((cat, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: (i % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={`/collections/${encodeURIComponent(cat.slug)}`}
                    className="group block relative aspect-[3/4] overflow-hidden bg-card border border-border hover:border-primary transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1.5"
                  >
                    <img
                      src={getImageUrl(cat.seed, 800, 1000)}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-70 group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent group-hover:from-background/90 transition-colors duration-500 pointer-events-none" />
                    
                    {/* Smoothly revealed gold/primary bottom border */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-[#D4AF37] to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center pointer-events-none z-10" />

                    <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-6 pb-7 pointer-events-none z-10">
                      <p className="text-secondary font-serif italic tracking-widest text-xs mb-2">
                        {t(cat.tagline)}
                      </p>
                      <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-3 leading-tight transition-transform duration-300 group-hover:-translate-y-1">
                        {t(cat.name)}
                      </h3>
                      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/80 group-hover:text-primary transition-colors">
                        <span>{t("View")} {countByCategory(cat.slug)} {t("pieces")}</span>
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
