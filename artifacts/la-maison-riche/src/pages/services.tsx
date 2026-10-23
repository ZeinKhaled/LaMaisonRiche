import { PageTransition } from "@/components/layout/PageTransition";
import { motion } from "framer-motion";
import { Paintbrush, Scissors, Sofa } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Paintbrush size={32} strokeWidth={1} />,
      title: "Interior Consultation",
      description: "Our expert designers work closely with you to understand your vision, lifestyle, and architectural constraints to propose a cohesive narrative for your home."
    },
    {
      icon: <Scissors size={32} strokeWidth={1} />,
      title: "Custom Fabrication",
      description: "From bespoke upholstery tailored to your exact dimensions to hand-crafted drapery, our atelier brings exclusive designs to life with unparalleled precision."
    },
    {
      icon: <Sofa size={32} strokeWidth={1} />,
      title: "Curation & Sourcing",
      description: "We leverage our global network of artisans and heritage houses to source rare textiles, distinctive wallpapers, and statement decorative pieces."
    }
  ];

  return (
    <PageTransition>
      {/* Header */}
      <section className="pt-20 pb-20 border-b border-border bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-6">Our Services</h1>
            <p className="text-secondary font-serif italic tracking-widest text-lg">Bespoke excellence for your home</p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {services.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto rounded-full border border-border flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-500">
                  {service.icon}
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-4">{service.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-card border-y border-border relative overflow-hidden text-center">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="https://picsum.photos/seed/luxuryservice/1920/600" alt="Service background" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8 leading-tight">
              Ready to Transform <br/>Your Space?
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed mb-12">
              Schedule a private consultation at our Dokki showroom to discuss your next interior project.
            </p>
            <a 
              href="https://wa.me/+201277917937" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex bg-primary text-primary-foreground px-10 py-5 uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors"
            >
              Book an Appointment
            </a>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
