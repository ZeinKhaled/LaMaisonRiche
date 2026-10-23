import { PageTransition } from "@/components/layout/PageTransition";
import { CompareSlider } from "@/components/CompareSlider";
import { BEFORE_AFTER_PROJECTS, getImageUrl } from "@/data/products";
import { useLanguage } from "@/data/language-store";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function BeforeAfter() {
  const { t } = useLanguage();

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
            <p className="text-secondary font-serif italic tracking-widest text-sm mb-4">إعادة التجديد · Refurbishment</p>
            <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-6">
              {t("Before")} <span className="text-primary italic">&</span> {t("After")}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              {t("Drag the slider on each project to see the transformation. Every room here was reimagined, re-upholstered, and rebuilt by the La Maison Riche atelier.")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 space-y-24">
          {BEFORE_AFTER_PROJECTS.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`grid grid-cols-1 lg:grid-cols-5 gap-10 items-center ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="lg:col-span-3">
                <CompareSlider
                  beforeSrc={getImageUrl(p.beforeSeed, 1200, 750)}
                  afterSrc={getImageUrl(p.afterSeed, 1200, 750)}
                  alt={p.title}
                />
              </div>
              <div className="lg:col-span-2">
                <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary mb-4">
                  <MapPin size={14} /> {t(p.location)}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6 leading-tight">
                  {t(p.title)}
                </h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-8">
                  {t(p.description)}
                </p>
                <a
                  href="https://wa.me/+201277917937"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-primary text-primary-foreground px-7 py-3 uppercase tracking-widest text-xs hover:bg-primary/90 transition-colors"
                >
                  {t("Discuss Your Space")}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h3 className="text-secondary font-serif italic tracking-widest text-sm mb-4">{t("Your turn")}</h3>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            {t("Reimagine your")} <span className="text-primary italic">{t("space")}</span>
          </h2>
          <p className="text-muted-foreground font-light leading-relaxed mb-10">
            {t("Share photos of the room you want to transform. Our designers will return with a private proposal — no obligation.")}
          </p>
          <a
            href="https://wa.me/+201277917937"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground px-10 py-4 uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors"
          >
            {t("Call Us Now")}
          </a>
        </div>
      </section>
    </PageTransition>
  );
}
