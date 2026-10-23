import { PageTransition } from "@/components/layout/PageTransition";
import { useLanguage } from "@/data/language-store";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useLanguage();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    console.log("Form data:", data);
    setIsSuccess(true);
    form.reset();
  };

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
            <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-6">{t("Contact Us")}</h1>
            <p className="text-secondary font-serif italic tracking-widest text-lg">{t("We await your inquiry")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl text-foreground mb-8">{t("The Showroom")}</h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-12">
                {t("Visit our Dokki showroom to experience the quality of our materials firsthand. We recommend scheduling an appointment for personalized interior consultations.")}
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-primary shrink-0">
                    <FaMapMarkerAlt size={18} />
                  </div>
                  <div>
                    <h4 className="uppercase tracking-widest text-xs text-secondary mb-2">{t("Address")}</h4>
                    <p className="text-foreground font-light leading-relaxed">
                      {t("27 Yathreb,")}<br />
                      {t("Ad Doqi, Dokki,")}<br />
                      {t("Cairo, Egypt")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-primary shrink-0">
                    <FaPhoneAlt size={18} />
                  </div>
                  <div>
                    <h4 className="uppercase tracking-widest text-xs text-secondary mb-2">{t("Phone")}</h4>
                    <p className="text-foreground font-light leading-relaxed">
                      <a href="tel:+201277917937" className="hover:text-primary transition-colors block">012 7791 7937</a>
                      <a href="tel:+20237618384" className="hover:text-primary transition-colors block mt-1">02 3761 8384</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-primary shrink-0">
                    <FaEnvelope size={18} />
                  </div>
                  <div>
                    <h4 className="uppercase tracking-widest text-xs text-secondary mb-2">{t("Email")}</h4>
                    <p className="text-foreground font-light leading-relaxed">
                      <a href="mailto:lamaisonricheeg@gmail.com" className="hover:text-primary transition-colors">lamaisonricheeg@gmail.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-primary shrink-0">
                    <FaWhatsapp size={18} />
                  </div>
                  <div>
                    <h4 className="uppercase tracking-widest text-xs text-secondary mb-2">{t("WhatsApp")}</h4>
                    <p className="text-foreground font-light leading-relaxed">
                      <a href="https://wa.me/+201277917937" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors block">
                        {t("Message Us Directly")}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card p-8 md:p-12 border border-border"
            >
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} strokeWidth={1} />
                  </div>
                  <h3 className="font-serif text-3xl text-foreground mb-4">{t("Inquiry Sent")}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    {t("Thank you for reaching out to La Maison Riche. Our concierge will contact you shortly to assist with your request.")}
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 text-primary uppercase tracking-widest text-sm hover:underline"
                  >
                    {t("Send another message")}
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-serif text-3xl text-foreground mb-8">{t("Send an Inquiry")}</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground uppercase tracking-widest text-xs">{t("Full Name")}</FormLabel>
                            <FormControl>
                              <Input placeholder={t("Your Name")} className="bg-transparent border-border rounded-none focus-visible:ring-primary h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground uppercase tracking-widest text-xs">{t("Email Address")}</FormLabel>
                            <FormControl>
                              <Input placeholder="your@email.com" className="bg-transparent border-border rounded-none focus-visible:ring-primary h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground uppercase tracking-widest text-xs">{t("Phone Number")}</FormLabel>
                            <FormControl>
                              <Input placeholder="+20" className="bg-transparent border-border rounded-none focus-visible:ring-primary h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground uppercase tracking-widest text-xs">{t("Message")}</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder={t("How can we help you?")} 
                                className="bg-transparent border-border rounded-none focus-visible:ring-primary min-h-[120px] resize-none" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full rounded-none h-14 bg-primary text-primary-foreground hover:bg-primary/90 uppercase tracking-widest text-sm">
                        {t("Submit Inquiry")}
                      </Button>
                    </form>
                  </Form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[500px] w-full border-t border-border">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.8338876362727!2d31.201471625368413!3d30.04162311870601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145847846ba44d75%3A0xa21e494c28d6733c!2sLa%20Maison%20Riche!5e0!3m2!1sar!2seg!4v1777307422898!5m2!1sar!2seg" 
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: "grayscale(1) contrast(1.2) opacity(0.8)" }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="La Maison Riche Showroom Location"
        />
      </section>
    </PageTransition>
  );
}
