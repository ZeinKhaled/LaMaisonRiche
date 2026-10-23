import { PageTransition } from "@/components/layout/PageTransition";
import { getProductImages } from "@/data/products";
import { useCatalog } from "@/data/catalog-store";
import { useLanguage } from "@/data/language-store";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";

function scrollToProduct(productId: string) {
  const el = document.getElementById(`product-${productId}`);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Category() {
  const { category } = useParams<{ category: string }>();
  const decodedCategory = decodeURIComponent(category || "");
  const { products, categories } = useCatalog();
  const { t } = useLanguage();

  const isValidCategory = categories.some((c) => c.slug === decodedCategory);

  const filteredProducts = products.filter(
    (p) => p.category === decodedCategory,
  );

  const sections = filteredProducts
    .map((product) => ({ id: product.id, label: product.sectionLabel }))
    .filter((entry): entry is { id: string; label: string } =>
      Boolean(entry.label),
    );

  if (!isValidCategory) {
    return (
      <PageTransition>
        <section className="py-32 text-center bg-background min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="font-serif text-4xl text-foreground mb-4">
            {t("Category Not Found")}
          </h1>
          <p className="text-muted-foreground mb-8">
            {t("The category you are looking for does not exist.")}
          </p>
          <Link
            href="/collections"
            className="text-primary hover:underline uppercase tracking-widest text-sm"
          >
            {t("View All Collections")}
          </Link>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      {/* Header */}
      <section className="pt-20 pb-12 border-b border-border bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-6">
              {t(decodedCategory)}
            </h1>
            <p className="text-secondary font-serif italic tracking-widest text-lg">
              {t("Curated pieces")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-background min-h-[50vh]">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <Link
              href="/collections"
              className="text-muted-foreground hover:text-primary uppercase tracking-widest text-xs transition-colors flex items-center gap-2"
            >
              &larr; {t("Back to All Collections")}
            </Link>
          </div>

          <div
            className={
              sections.length > 0
                ? "grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10"
                : ""
            }
          >
            {sections.length > 0 && (
              <aside className="lg:sticky lg:top-28 h-fit border border-border bg-card p-4">
                <p className="text-xs uppercase tracking-widest text-primary mb-3">
                  {t("Jump to")}
                </p>
                <nav className="flex flex-col gap-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToProduct(section.id)}
                      className="text-left text-sm text-muted-foreground hover:text-primary py-2 border-b border-border last:border-b-0 transition-colors"
                    >
                      {t(section.label)}
                    </button>
                  ))}
                </nav>
              </aside>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  id={`product-${product.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: Math.min(i, 6) * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer scroll-mt-28 flex flex-col transition-all duration-300"
                >
                  <Link href={`/product/${product.id}`} className="block flex-1">
                    <div className="product-card relative overflow-hidden mb-6 bg-card border border-border group-hover:border-primary transition-all duration-500 shadow-sm group-hover:shadow-[0_18px_35px_-10px_rgba(0,0,0,0.35)]">
                      <img
                        src={getProductImages(product)[0]}
                        alt={product.name}
                        loading={i < 6 ? "eager" : "lazy"}
                        className="w-full h-[250px] object-contain bg-[#f5f5f5] transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                      />
                      {product.isClearance && (
                        <div className="absolute top-3 left-3 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest shadow-sm z-10 pointer-events-none">
                          Clearance
                        </div>
                      )}
                      {product.isNew && !product.isClearance && (
                        <div className="absolute top-3 left-3 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest shadow-sm z-10 pointer-events-none">
                          {t("New")}
                        </div>
                      )}
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
                      <p className="text-xs uppercase tracking-widest text-primary mb-2">
                        {t(product.category)}
                      </p>
                      <h4 className="font-serif text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                        {t(product.name)}
                      </h4>
                      <p className="text-muted-foreground text-sm italic">
                        {t(product.price)}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}

              {filteredProducts.length === 0 && (
                <div className="sold-out-box col-span-full bg-foreground text-background border border-foreground py-20 px-6 text-center">
                  <h2 className="font-serif text-4xl mb-3">{t("Sold Out For Now")}</h2>
                  <p className="text-background/70 mb-8">
                    {t("This collection is currently unavailable")}
                  </p>
                  <a
                    href="https://wa.me/+201277917937"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-primary bg-primary text-primary-foreground px-6 py-3 uppercase tracking-widest text-xs hover:bg-primary/90"
                  >
                    {t("Call Us to Check")}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
