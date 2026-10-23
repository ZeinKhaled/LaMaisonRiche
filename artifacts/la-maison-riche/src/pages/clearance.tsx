import { PageTransition } from "@/components/layout/PageTransition";
import { getProductImages } from "@/data/products";
import { useCatalog } from "@/data/catalog-store";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Percent, ArrowRight, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Clearance() {
  const { products } = useCatalog();
  const clearancePieces = products.filter((p) => p.isClearance);
  const hero = clearancePieces[0];
  const rest = clearancePieces.slice(1);

  return (
    <PageTransition>
      {/* Header */}
      <section className="pt-24 pb-14 border-b border-border bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="flex items-center justify-center gap-2 text-primary font-serif italic tracking-widest text-sm mb-4">
              <Percent size={14} className="text-primary" /> Clearance Sale · تخفيضات خاصة
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
              Clearance <span className="text-primary italic">Collection</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Exceptional showroom pieces, floor samples, and archived designs available at exclusive privilege pricing. Limited quantities available in our Cairo showroom.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured clearance piece if available */}
      {hero && (
        <section className="py-16 md:py-20 bg-background border-b border-border">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-3 relative aspect-[4/3] overflow-hidden bg-card border border-border group"
              >
                <img
                  src={getProductImages(hero, 1400, 1050)[0]}
                  alt={hero.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 px-3 py-1 bg-primary text-primary-foreground text-xs uppercase tracking-widest shadow-md z-10 pointer-events-none">
                  Clearance · تخفيض
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-2"
              >
                <p className="text-xs uppercase tracking-widest text-primary mb-3">
                  {hero.category}
                </p>
                <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight">
                  {hero.name}
                </h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-8">
                  {hero.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={`/product/${hero.id}`}
                    className="bg-primary text-primary-foreground px-7 py-3 uppercase tracking-widest text-xs hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                  >
                    View Piece <ArrowRight size={14} />
                  </Link>
                  <a
                    href={`https://wa.me/+201277917937?text=${encodeURIComponent(
                      `Hello La Maison Riche, I would like to inquire about the clearance piece: ${hero.name}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-border text-foreground px-7 py-3 uppercase tracking-widest text-xs hover:border-primary hover:text-primary transition-colors inline-flex items-center gap-2"
                  >
                    <FaWhatsapp /> Inquire Now
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Grid of clearance pieces */}
      <section className="py-16 md:py-24 bg-background min-h-[40vh]">
        <div className="container mx-auto px-6">
          {clearancePieces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {(hero ? rest : clearancePieces).map((product, i) => (
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
                    <div className="product-card relative overflow-hidden mb-5 bg-card border border-border group-hover:border-primary transition-all duration-500 shadow-sm group-hover:shadow-[0_18px_35px_-10px_rgba(0,0,0,0.35)]">
                      <img
                        src={getProductImages(product)[0]}
                        alt={product.name}
                        className="w-full h-[260px] object-contain bg-[#f5f5f5] transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest shadow-sm z-10 pointer-events-none">
                        Clearance
                      </div>
                      {/* Luxury hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 z-10 pointer-events-none">
                        <span className="text-white text-xs font-serif truncate mb-1 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                          {product.name}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-primary-foreground bg-primary px-3 py-1.5 self-start inline-flex items-center gap-1.5 translate-y-3 group-hover:translate-y-0 transition-transform duration-300 shadow-sm">
                          Inquire Piece <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] uppercase tracking-widest text-primary mb-1.5">
                        {product.category}
                      </p>
                      <h4 className="font-serif text-xl text-foreground mb-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-muted-foreground text-sm italic">
                        {product.price || "Inquire"}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="border border-border bg-card p-12 md:p-20 text-center max-w-2xl mx-auto">
              <Percent className="w-12 h-12 text-primary mx-auto mb-4 opacity-80" />
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                No Clearance Items Currently
              </h2>
              <p className="text-muted-foreground font-light mb-8">
                All clearance pieces have found their new homes. Please check back soon or browse our full collection.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/collections"
                  className="bg-primary text-primary-foreground px-6 py-3 uppercase tracking-widest text-xs hover:bg-primary/90 transition-colors"
                >
                  Browse Collections
                </Link>
                <a
                  href="https://wa.me/+201277917937?text=Hello%20La%20Maison%20Riche,%20are%20there%20any%20upcoming%20clearance%20offers?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border text-foreground px-6 py-3 uppercase tracking-widest text-xs hover:border-primary hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  <FaWhatsapp /> Contact Showroom
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
