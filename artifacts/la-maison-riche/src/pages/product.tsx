import { PageTransition } from "@/components/layout/PageTransition";
import { getProductImages } from "@/data/products";
import { useCatalog } from "@/data/catalog-store";
import { useLanguage } from "@/data/language-store";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { products } = useCatalog();
  const { t } = useLanguage();
  const product = products.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(0);

  // Reset active image index and ensure top scroll when product id changes
  useEffect(() => {
    setActiveImage(0);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [id]);

  if (!product) {
    return (
      <PageTransition>
        <section className="py-32 text-center bg-background min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="font-serif text-4xl text-foreground mb-4">
            {t("Piece Not Found")}
          </h1>
          <p className="text-muted-foreground mb-8">
            {t("The piece you are looking for does not exist or has been removed.")}
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

  const message = encodeURIComponent(
    `Hello, I am interested in inquiring about the "${product.name}" (${product.category}) from La Maison Riche.`,
  );
  const images = getProductImages(product);
  const suggestedProduct = product.suggestedProductId
    ? products.find((item) => item.id === product.suggestedProductId)
    : undefined;

  return (
    <PageTransition>
      <section className="py-12 bg-background min-h-screen">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <Link
              href="/collections"
              className="text-muted-foreground hover:text-primary uppercase tracking-widest text-xs transition-colors flex items-center gap-2"
            >
              &larr; {t("Back to Collections")}
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Image Gallery */}
            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] bg-card overflow-hidden"
              >
                <img
                  src={images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-contain bg-[#f5f5f5] hover:scale-[1.02] transition-transform duration-700 opacity-95 hover:opacity-100"
                />
              </motion.div>
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      onClick={() => setActiveImage(index)}
                      className={`w-20 h-20 shrink-0 bg-[#f5f5f5] border-2 transition-colors ${activeImage === index ? "border-primary" : "border-transparent hover:border-border"}`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col"
            >
              <div className="mb-8">
                <Link
                  href={`/collections/${encodeURIComponent(product.category)}`}
                  className="text-primary uppercase tracking-widest text-xs hover:underline mb-4 inline-block"
                >
                  {t(product.category)}
                </Link>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 leading-tight">
                  {t(product.name)}
                </h1>
                <p className="text-secondary font-serif italic text-xl">
                  {t(product.price)}
                </p>
              </div>

              <div className="h-px w-full bg-border mb-8" />

              <div className="prose prose-invert font-light text-muted-foreground leading-relaxed mb-12">
                <p>{t(product.description)}</p>
                <p className="italic text-sm mt-6">
                  {t("Available exclusively at our Dokki showroom. Customization options may be available upon consultation.")}
                </p>
              </div>

              <a
                href={`https://wa.me/+201277917937?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-5 uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors w-full sm:w-auto self-start"
              >
                <FaWhatsapp size={18} />
                {t("Call Us Now")}
              </a>

              <p className="text-xs text-muted-foreground mt-4 tracking-wider uppercase">
                {t("Or call us directly at")}{" "}
                <a
                  href="tel:+201277917937"
                  className="text-foreground hover:text-primary"
                >
                  012 7791 7937
                </a>
              </p>
            </motion.div>
          </div>
          {suggestedProduct && (
            <section className="mt-24 pt-16 border-t border-border">
              <p className="text-primary text-xs uppercase tracking-widest mb-3">
                {t("You may also like")}
              </p>
              <h2 className="font-serif text-4xl mb-8">{t("Suggested Product")}</h2>
              <Link
                href={`/product/${suggestedProduct.id}`}
                className="group block max-w-sm"
              >
                <div className="bg-card border border-border">
                  <img
                    src={getProductImages(suggestedProduct)[0]}
                    alt={suggestedProduct.name}
                    className="w-full h-[250px] object-contain bg-[#f5f5f5] group-hover:scale-[1.02] transition-transform"
                  />
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-widest text-primary mb-2">
                      {t(suggestedProduct.category)}
                    </p>
                    <h3 className="font-serif text-2xl">
                      {t(suggestedProduct.name)}
                    </h3>
                  </div>
                </div>
              </Link>
            </section>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
