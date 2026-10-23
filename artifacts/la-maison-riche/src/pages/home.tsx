import { PageTransition } from "@/components/layout/PageTransition";
import { CompareSlider } from "@/components/CompareSlider";
import {
  BEFORE_AFTER_PROJECTS,
  getImageUrl,
  getProductImages,
} from "@/data/products";
import { getCatalogImage, useCatalog } from "@/data/catalog-store";
import { useLanguage } from "@/data/language-store";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Scissors,
  Tag,
  Gift,
  Percent,
} from "lucide-react";
import { FaTiktok, FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { LuxuryMarquee } from "@/components/common/LuxuryMarquee";
import { SplitText, RevealText } from "@/components/common/SplitText";
import { SectionDivider } from "@/components/common/SectionDivider";
import { AnimatedCounter } from "@/components/common/AnimatedCounter";
import { useScroll, useTransform } from "framer-motion";

const TIKTOK_URL = "https://www.tiktok.com/@lamaisonricheeg";
const INSTAGRAM_URL = "https://www.instagram.com/lamaisonricheeg";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61586895308832";
const MAPS_EMBED_SRC =
  "https://www.google.com/maps?q=27%20Yathreb%2C%20Ad%20Doqi%2C%20Dokki%2C%20Egypt&output=embed";
const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=27+Yathreb+Ad+Doqi+Dokki+Egypt";

export default function Home() {
  const { products, categories, offers } = useCatalog();
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 800], [0, 150]);
  const visibleCategories = categories.filter(
    (category) => category.name !== "Lighting" && category.slug !== "Lighting",
  );
  const newPieces = products.filter((p) => p.isNew).slice(0, 4);
  const clearancePieces = products.filter((p) => p.isClearance).slice(0, 4);
  const featuredBA = BEFORE_AFTER_PROJECTS[0];

  return (
    <PageTransition className="pt-0">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0 will-change-transform"
          style={{ y: heroParallax }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />
          <img
            src="Images/IMG-20260208-WA0009.jpg"
            alt="La Maison Riche Showroom"
            className="w-full h-full object-cover object-center scale-110"
            style={{ filter: "brightness(0.92) contrast(1.05)" }}
          />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-secondary font-serif italic tracking-widest text-lg md:text-xl mb-6"
            >
              {t("Since 1989")}
            </motion.h2>

            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground mb-8 leading-tight">
              <SplitText text="Luxury That" delay={0.25} /> <br />
              <motion.span
                className="text-primary italic inline-block mr-3"
                initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.85, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                Reflects
              </motion.span>
              <SplitText text="Your Taste" delay={0.7} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="text-foreground/80 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              {t("Curating Cairo's most exquisite home interiors. A haute-couture atelier for your living space.")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link
                href="/collections"
                className="bg-primary text-primary-foreground px-8 py-4 uppercase tracking-widest text-sm hover:bg-primary/90 transition-all duration-300 w-full sm:w-auto shadow-md hover:shadow-lg hover:-translate-y-1"
              >
                {t("Explore Collections")}
              </Link>
              <a
                href="https://wa.me/+201277917937"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-foreground/40 text-foreground px-8 py-4 uppercase tracking-widest text-sm hover:border-primary hover:text-primary transition-all duration-300 w-full sm:w-auto bg-background/40 backdrop-blur hover:-translate-y-1"
              >
                {t("Call Us Now")}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Luxury Marquee Ticker */}
      <LuxuryMarquee />

      {/* Stats Counter Bar */}
      <section className="py-12 bg-background border-b border-border/60">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-serif text-3xl md:text-5xl text-foreground font-semibold">
                <AnimatedCounter value={1989} duration={2} />
              </p>
              <p className="text-[11px] uppercase tracking-[0.25em] text-primary mt-2">
                Established Since
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="font-serif text-3xl md:text-5xl text-foreground font-semibold">
                <AnimatedCounter value={380} suffix="+" duration={2.2} />
              </p>
              <p className="text-[11px] uppercase tracking-[0.25em] text-primary mt-2">
                Exclusive Pieces
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="font-serif text-3xl md:text-5xl text-foreground font-semibold">
                <AnimatedCounter value={35} suffix="+" duration={2} />
              </p>
              <p className="text-[11px] uppercase tracking-[0.25em] text-primary mt-2">
                Years of Craft
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="font-serif text-3xl md:text-5xl text-foreground font-semibold">
                <AnimatedCounter value={100} suffix="%" duration={1.8} />
              </p>
              <p className="text-[11px] uppercase tracking-[0.25em] text-primary mt-2">
                Handcrafted Quality
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Image Buttons */}
      <section className="py-28 bg-background relative">
        <SectionDivider className="mb-14" />
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
            <div>
              <p className="text-secondary font-serif italic tracking-widest text-sm mb-4">
                {t("Step into the house")}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">
                <RevealText>Shop by Category</RevealText>
              </h2>
            </div>
            <Link
              href="/collections"
              className="group flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              {t("View All")}{" "}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {visibleCategories.map((cat, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: (i % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={`/collections/${encodeURIComponent(cat.slug)}`}
                    className="group block relative aspect-[3/4] overflow-hidden bg-card border border-border hover:border-primary transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1.5"
                  >
                    <img
                      src={getImageUrl(cat.seed, 600, 800)}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent group-hover:from-black/90 transition-colors duration-500 pointer-events-none" />
                    
                    {/* Smoothly revealed gold/primary bottom border indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-[#D4AF37] to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center pointer-events-none z-10" />

                    <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-4 md:p-6 pb-6 pointer-events-none z-10">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-primary-foreground/75 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        Explore
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl text-white leading-tight drop-shadow-lg transition-transform duration-300 group-hover:-translate-y-1">
                        {t(cat.name)}
                      </h3>
                      <div className="mt-2 h-0.5 w-8 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reupholstery Feature — إعادة التنجيد */}
      <section className="py-28 bg-card border-y border-border relative">
        <SectionDivider className="mb-14" />
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] md:aspect-[5/6] overflow-hidden bg-background"
            >
              <motion.img
                src="Images/New%20folder%20(2)/sofa_Tufted_Loveseat_Sofa(1).jpg"
                alt="Reupholstery atelier — La Maison Riche"
                className="w-full h-full object-contain bg-[#f5f5f5]"
                animate={{
                  y: [-3, 3, -3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="absolute bottom-6 left-6 right-6 bg-background/85 backdrop-blur p-4 border-l-2 border-primary shadow-lg z-20">
                <p className="text-xs uppercase tracking-widest text-primary mb-1">
                  {t("In our atelier")}
                </p>
                <p className="font-serif text-foreground text-lg leading-snug">
                  {t("Hand-stitched. Traditional craft. Modern fabrics.")}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="flex items-center gap-2 text-secondary font-serif italic tracking-widest text-sm mb-4">
                <Scissors size={14} className="text-primary" />
                إعادة التنجيد · Reupholstery
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8 leading-tight">
                <RevealText>We re-upholster your favourite pieces</RevealText>
              </h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                {t("That sofa from your grandmother. The headboard you love. Our atelier strips, rebuilds, and re-skins furniture in our workshop in Dokki — choose from hundreds of fabrics in our showroom.")}
              </p>
              <ul className="space-y-4 mb-10 text-foreground/85">
                {[
                  "Sofas, armchairs, dining chairs, headboards, ottomans",
                  "Hundreds of fabrics — velvet, linen, leather, jacquard",
                  "Complimentary pick-up & delivery within greater Cairo",
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + idx * 0.15 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-primary mt-1 text-base">•</span>
                    <span>{t(item)}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/+201277917937"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground px-7 py-3 uppercase tracking-widest text-xs hover:bg-primary/90 transition-all duration-300 inline-flex items-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <FaWhatsapp /> {t("Get a free quote")}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Collection Strip */}
      <section className="py-28 bg-background relative">
        <SectionDivider className="mb-14" />
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
            <div>
              <p className="flex items-center gap-2 text-secondary font-serif italic tracking-widest text-sm mb-4">
                <Sparkles size={14} className="text-primary" /> {t("Just arrived")}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">
                <RevealText>The New Collection</RevealText>
              </h2>
            </div>
            <Link
              href="/new-collection"
              className="group flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              {t("See Everything New")}{" "}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {newPieces.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.75,
                  delay: (i % 4) * 0.12,
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
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest shadow-sm z-10 pointer-events-none">
                      {t("New")}
                    </div>
                    {/* Hover overlay with product name + Inquire */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10 pointer-events-none">
                      <p className="text-white text-xs font-serif truncate mb-1 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                        {t(product.name)}
                      </p>
                      <span className="text-[10px] uppercase tracking-widest text-primary-foreground bg-primary px-3 py-1.5 self-start inline-flex items-center gap-1.5 translate-y-3 group-hover:translate-y-0 transition-transform duration-300 shadow-sm">
                        Inquire <ArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-primary mb-1">
                    {t(product.category)}
                  </p>
                  <h4 className="font-serif text-lg text-foreground leading-snug group-hover:text-primary transition-colors">
                    {t(product.name)}
                  </h4>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers / العروض */}
      <section className="py-28 bg-card border-y border-border relative">
        <SectionDivider className="mb-14" />
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p className="flex items-center justify-center gap-2 text-secondary font-serif italic tracking-widest text-sm mb-4">
              <Tag size={14} className="text-primary" /> العروض · Limited Offers
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">
              <RevealText>This Month's Offers</RevealText>
            </h2>
            <p className="text-muted-foreground font-light max-w-xl mx-auto mt-4">
              {t("Exclusive savings on selected pieces and services — valid only this month.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {offers.map((offer, index) => (
              <motion.a
                key={offer.id}
                href={`https://wa.me/+201277917937?text=${encodeURIComponent(offer.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="group relative bg-background border border-border hover:border-primary transition-all duration-300 overflow-hidden flex flex-col shadow-sm hover:shadow-[0_18px_35px_-10px_rgba(0,0,0,0.35)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={getCatalogImage(offer.image, 800, 600)}
                    alt={offer.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-5 py-3 font-serif text-xl uppercase tracking-widest shadow-md z-10 pointer-events-none">
                    {t(offer.badge)}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary mb-3">
                    <Tag size={12} /> {t(offer.eyebrow)}
                  </p>
                  <h3 className="font-serif text-2xl text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                    {t(offer.title)}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {t(offer.description)}
                  </p>
                  <span className="text-foreground/80 text-xs uppercase tracking-widest inline-flex items-center gap-2 group-hover:text-primary transition-colors">
                    <FaWhatsapp /> {t("Book on WhatsApp")} <ArrowRight size={12} />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mt-10">
            {t("* Offers cannot be combined. Valid in showroom and via WhatsApp.")}
          </p>
        </div>
      </section>

      {/* Clearance Sale Section · تخفيضات */}
      <section className="py-28 bg-background border-b border-border relative">
        <SectionDivider className="mb-14" />
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
            <div>
              <p className="flex items-center gap-2 text-primary font-serif italic tracking-widest text-sm mb-4">
                <Percent size={14} className="text-primary" /> Clearance · تخفيضات
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">
                <RevealText>Clearance Selection</RevealText>
              </h2>
            </div>
            <Link
              href="/clearance"
              className="group flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              View All Clearance{" "}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {clearancePieces.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.75,
                  delay: (i % 4) * 0.12,
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
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest shadow-sm z-10 pointer-events-none">
                      Clearance
                    </div>
                    {/* Hover overlay with product name + Inquire */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10 pointer-events-none">
                      <p className="text-white text-xs font-serif truncate mb-1 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                        {product.name}
                      </p>
                      <span className="text-[10px] uppercase tracking-widest text-primary-foreground bg-primary px-3 py-1.5 self-start inline-flex items-center gap-1.5 translate-y-3 group-hover:translate-y-0 transition-transform duration-300 shadow-sm">
                        Inquire <ArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-primary mb-1">
                    {product.category}
                  </p>
                  <h4 className="font-serif text-lg text-foreground leading-snug group-hover:text-primary transition-colors">
                    {product.name}
                  </h4>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/clearance"
              className="inline-flex items-center gap-2 border border-border bg-card px-8 py-3.5 uppercase tracking-widest text-xs hover:border-primary hover:text-primary transition-all duration-300 shadow-sm hover:shadow"
            >
              View All Clearance Pieces <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Before & After Slider Teaser (no badges) */}
      {featuredBA && (
        <section className="py-28 bg-background relative">
          <SectionDivider className="mb-14" />
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <CompareSlider
                  beforeSrc={getImageUrl(featuredBA.beforeSeed, 1200, 750)}
                  afterSrc={getImageUrl(featuredBA.afterSeed, 1200, 750)}
                  alt={featuredBA.title}
                  hideBadges
                />
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-4 text-center">
                  {t("← Drag the slider to see the transformation →")}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-secondary font-serif italic tracking-widest text-sm mb-4">
                  Before · After · إعادة التجديد
                </p>
                <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8 leading-tight">
                  <RevealText>Reimagining Cairo's homes</RevealText>
                </h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-10">
                  {t("Three decades of refurbishment, reupholstery, and full room redesigns. See real projects — drag the slider to watch each space transform.")}
                </p>
                <Link
                  href="/before-after"
                  className="inline-block bg-primary text-primary-foreground px-8 py-4 uppercase tracking-widest text-sm hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  {t("View Transformations")}
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Map + TikTok / Socials */}
      <section className="py-28 bg-background relative">
        <SectionDivider className="mb-14" />
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-secondary font-serif italic tracking-widest text-sm mb-4">
              {t("Visit · Follow · Connect")}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">
              <RevealText>Find Us in Cairo</RevealText>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Google Map (spans 2 cols on lg) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2 relative bg-card border border-border overflow-hidden"
            >
              <iframe
                title="La Maison Riche — Google Maps"
                src={MAPS_EMBED_SRC}
                className="w-full h-[420px] grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              />
              <div className="p-6 border-t border-border bg-background flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary mb-1">
                    <MapPin size={14} /> {t("Showroom")}
                  </p>
                  <p className="font-serif text-lg text-foreground">
                    {t("27 Yathreb, Ad Doqi, Dokki, Cairo")}
                  </p>
                </div>
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border text-foreground px-5 py-2.5 uppercase tracking-widest text-xs hover:border-primary hover:text-primary transition-colors text-center"
                >
                  {t("Open in Maps")}
                </a>
              </div>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col gap-6"
            >
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-card border border-border hover:border-primary p-8 transition-colors flex-1 flex flex-col justify-between"
              >
                <div>
                  <FaTiktok className="text-foreground text-4xl mb-4 group-hover:text-primary transition-colors" />
                  <p className="text-xs uppercase tracking-widest text-primary mb-2">
                    TikTok
                  </p>
                  <h3 className="font-serif text-2xl text-foreground mb-2">
                    {t("Watch our latest pieces")}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t("Behind the scenes from the showroom and atelier.")}
                  </p>
                </div>
                <span className="mt-6 text-foreground/70 text-xs uppercase tracking-widest group-hover:text-primary transition-colors inline-flex items-center gap-2">
                  {t("Follow us")} <ArrowRight size={14} />
                </span>
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-card border border-border hover:border-primary p-6 transition-colors flex items-center gap-4"
              >
                <FaInstagram className="text-foreground text-3xl group-hover:text-primary transition-colors" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-primary mb-1">
                    Instagram
                  </p>
                  <p className="font-serif text-foreground">@lamaisonricheeg</p>
                </div>
              </a>

              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-card border border-border hover:border-primary p-6 transition-colors flex items-center gap-4"
              >
                <FaFacebook className="text-foreground text-3xl group-hover:text-primary transition-colors" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-primary mb-1">
                    Facebook
                  </p>
                  <p className="font-serif text-foreground">La Maison Riche</p>
                </div>
              </a>

              <div className="bg-card border border-border p-6 space-y-3">
                <a
                  href="tel:+201277917937"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <Phone size={16} className="text-primary" />
                  <span className="text-sm">01277917937</span>
                </a>
                <a
                  href="tel:+0237618384"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <Phone size={16} className="text-primary" />
                  <span className="text-sm">0237618384</span>
                </a>
                <a
                  href="mailto:lamaisonricheeg@gmail.com"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors break-all"
                >
                  <Mail size={16} className="text-primary" />
                  <span className="text-sm">lamaisonricheeg@gmail.com</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
