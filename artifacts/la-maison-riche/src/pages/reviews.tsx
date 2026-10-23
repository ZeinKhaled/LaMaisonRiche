import { PageTransition } from "@/components/layout/PageTransition";
import { useCatalog } from "@/data/catalog-store";
import { useLanguage } from "@/data/language-store";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function Reviews() {
  const { testimonials } = useCatalog();
  const { t } = useLanguage();

  return (
    <PageTransition>
      <section className="pt-32 pb-12 border-b border-border bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-6">{t("Client Reviews")}</h1>
            <p className="text-secondary font-serif italic tracking-widest text-lg">{t("What our clients say")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background min-h-[50vh]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (i % 6) * 0.1 }}
                className="bg-card border border-border p-6"
              >
                {testimonial.type === "text" ? (
                  <>
                    <Quote className="text-primary mb-4" size={22} />
                    <p className="text-foreground/90 font-light leading-relaxed mb-4">{t(testimonial.text || "")}</p>
                    <p className="text-xs uppercase tracking-widest text-primary">{t(testimonial.name || "")}</p>
                  </>
                ) : testimonial.image ? (
                  <img src={testimonial.image} alt="Client review screenshot" className="w-full h-auto object-contain" />
                ) : (
                  <div className="h-48 flex items-center justify-center text-muted-foreground text-xs uppercase tracking-widest">
                    {t("Screenshot coming soon")}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
