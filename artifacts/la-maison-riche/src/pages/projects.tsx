import { PageTransition } from "@/components/layout/PageTransition";
import { useCatalog } from "@/data/catalog-store";
import { useLanguage } from "@/data/language-store";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Projects() {
  const { projects } = useCatalog();
  const { t } = useLanguage();

  return (
    <PageTransition>
      <section className="pt-32 pb-12 border-b border-border bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-6">{t("Our Projects")}</h1>
            <p className="text-secondary font-serif italic tracking-widest text-lg">{t("Real spaces, real transformations")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background min-h-[50vh]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (i % 6) * 0.1 }}
                className="group cursor-pointer"
              >
                <Link href={`/projects/${project.id}`}>
                  <div className="relative overflow-hidden mb-6 bg-card h-[260px] flex items-center justify-center">
                    {project.images[0] ? (
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-contain bg-[#f5f5f5] transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#f5f5f5] flex items-center justify-center text-muted-foreground text-xs uppercase tracking-widest">
                        {t("No photo yet")}
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <h4 className="font-serif text-2xl text-foreground mb-2">{t(project.title)}</h4>
                    <p className="text-muted-foreground text-sm line-clamp-2">{t(project.description)}</p>
                  </div>
                </Link>
              </motion.div>
            ))}

            {projects.length === 0 && (
              <div className="col-span-full bg-foreground text-background border border-foreground py-20 px-6 text-center">
                <h2 className="font-serif text-4xl mb-3">{t("Coming Soon")}</h2>
                <p className="text-background/70 mb-8">{t("Our project gallery is being updated.")}</p>
                <a href="https://wa.me/+201277917937" target="_blank" rel="noopener noreferrer" className="inline-block border border-primary bg-primary text-primary-foreground px-6 py-3 uppercase tracking-widest text-xs hover:bg-primary/90">
                  {t("Call Us to Check")}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
