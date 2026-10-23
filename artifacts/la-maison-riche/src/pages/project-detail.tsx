import { PageTransition } from "@/components/layout/PageTransition";
import { useCatalog } from "@/data/catalog-store";
import { useLanguage } from "@/data/language-store";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { projects } = useCatalog();
  const { t } = useLanguage();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <PageTransition>
        <section className="py-32 text-center bg-background min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="font-serif text-4xl text-foreground mb-4">{t("Project Not Found")}</h1>
          <p className="text-muted-foreground mb-8">{t("The project you are looking for does not exist or has been removed.")}</p>
          <Link href="/projects" className="text-primary hover:underline uppercase tracking-widest text-sm">
            {t("View All Projects")}
          </Link>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="py-28 bg-background min-h-screen">
        <div className="container mx-auto px-6">
          <div className="mb-10">
            <Link href="/projects" className="text-muted-foreground hover:text-primary uppercase tracking-widest text-xs transition-colors flex items-center gap-2">
              &larr; {t("Back to Projects")}
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6">{t(project.title)}</h1>
            <p className="text-muted-foreground font-light leading-relaxed max-w-3xl mb-12">{t(project.description)}</p>
          </motion.div>

          {project.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {project.images.map((image, index) => (
                <div key={`${image}-${index}`} className="bg-card overflow-hidden">
                  <img src={image} alt={`${project.title} photo ${index + 1}`} className="w-full h-[360px] object-contain bg-[#f5f5f5]" />
                </div>
              ))}
            </div>
          )}

          {project.videos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.videos.map((video, index) => (
                <div key={`${video}-${index}`} className="bg-card overflow-hidden">
                  <video src={video} controls className="w-full h-[360px] object-contain bg-black" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
