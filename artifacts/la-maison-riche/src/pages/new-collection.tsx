import { PageTransition } from "@/components/layout/PageTransition";
import { getProductImages } from "@/data/products";
import { useCatalog } from "@/data/catalog-store";
import { useLanguage } from "@/data/language-store";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function NewCollection() {
  const { products } = useCatalog();
  const { t } = useLanguage();
  const newPieces = products.filter((p) => p.isNew);
  const hero = newPieces[0];
  const rest = newPieces.slice(1);

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
            <p className="flex items-center justify-center gap-2 text-secondary font-serif italic tracking-widest text-sm mb-4">
              <Sparkles size={14} className="text-primary" /> {t("Just arrived")}
            </p>
            <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-6">
              {t("The New")} <span className="text-primary italic">{t("Collection")}</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              {t("Our latest pieces — sourced, woven, gilded, and finished over the past season. Limited stock in showroom.")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero featured */}
      {hero && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-3 relative aspect-[4/3] overflow-hidden bg-card"
              >
                <img
                  src={getProductImages(hero, 1400, 1050)[0]}
                  alt={hero.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6 px-3 py-1 bg-primary text-primary-foreground text-xs uppercase tracking-widest z-10 pointer-events-none shadow-md">
                  {t("New")}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-2"
              >
                <p className="text-xs uppercase tracking-widest text-primary mb-4">{t(hero.category)}</p>
                <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight">
                  {t(hero.name)}
                </h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-8">
                  {t(hero.description)}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={`/product/${hero.id}`}
                    className="bg-primary text-primary-foreground px-7 py-3 uppercase tracking-widest text-xs hover:bg-primary/90 transition-colors"
                  >
                    {t("View Piece")}
                  </Link>
                  <a
                    href="https://wa.me/+201277917937"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-border text-foreground px-7 py-3 uppercase tracking-widest text-xs hover:border-primary hover:text-primary transition-colors"
                  >
                    {t("Call Us Now")}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Grid of remaining new pieces */}
      <section className="py-12 pb-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {rest.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.75,
                  delay: (i % 6) * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer flex flex-col transition-all duration-300"
              >
                <Link href={`/product/${product.id}`} className="block flex-1">
                  <div className="product-card relative overflow-hidden mb-6 bg-card border border-border group-hover:border-primary transition-all duration-500 shadow-sm group-hover:shadow-[0_18px_35px_-10px_rgba(0,0,0,0.35)]">
                    <img
                      src={getProductImages(product)[0]}
                      alt={product.name}
                      className="w-full h-[250px] object-contain bg-[#f5f5f5] transition-transform duration-700 ease-out group-hover:scale-105 opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute top-4 left-4 px-2 py-1 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest shadow-sm z-10 pointer-events-none">
                      {t("New")}
                    </div>
                    {/* Hover overlay with product name + Inquire */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 z-10 pointer-events-none">
                      <span className="text-white text-xs font-serif truncate mb-1 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                        {t(product.name)}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-primary-foreground bg-primary px-3 py-1.5 self-start inline-flex items-center gap-1.5 translate-y-3 group-hover:translate-y-0 transition-transform duration-300 shadow-sm">
                        Inquire Piece &rarr;
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-widest text-primary mb-2">{t(product.category)}</p>
                    <h4 className="font-serif text-xl text-foreground mb-2 group-hover:text-primary transition-colors">{t(product.name)}</h4>
                    <p className="text-muted-foreground text-sm italic">{t(product.price)}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
