import { Link } from "wouter";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/data/language-store";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <div className="font-serif text-3xl tracking-wider text-foreground">
                <span className="text-primary italic mr-1">La</span>
                <span className="font-bold">Maison</span>
                <span className="font-light italic ml-1">Riche</span>
              </div>
            </Link>
            <p className="text-muted-foreground mb-8 max-w-sm font-light leading-relaxed">
              {t(
                "Luxury That Reflects Your Taste. Since 1989, we have been curating and creating the finest home interiors for Cairo's most discerning clientele.",
              )}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="https://wa.me/+201277917937"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-serif tracking-widest uppercase text-sm mb-6">
              {t("Explore")}
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/collections"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("All Collections")}
                </Link>
              </li>
              <li>
                <Link
                  href="/new-collection"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("New Collection")}
                </Link>
              </li>
              <li>
                <Link
                  href="/clearance"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Clearance · تخفيضات
                </Link>
              </li>
              <li>
                <Link
                  href="/before-after"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("Before & After")}
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("Projects")}
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("Reviews")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("Contact Us")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground font-serif tracking-widest uppercase text-sm mb-6">
              {t("Visit Us")}
            </h4>
            <ul className="space-y-4 text-muted-foreground font-light">
              <li className="leading-relaxed">
                {t("27 Yathreb,")}
                <br />
                {t("Ad Doqi, Dokki,")}
                <br />
                {t("Cairo, Egypt")}
              </li>
              <li>
                <a
                  href="tel:+201277917937"
                  className="hover:text-primary transition-colors"
                >
                  01277917937
                </a>
                <br />
                <a
                  href="tel:+20237618384"
                  className="hover:text-primary transition-colors"
                >
                  0237618384
                </a>
              </li>
              <li>
                <a
                  href="mailto:lamaisonricheeg@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  lamaisonricheeg@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground tracking-wider uppercase">
            &copy; {new Date().getFullYear()} {t("La Maison Riche. All Rights Reserved.")}
          </p>
          <Link
            href="/admin"
            className="text-[#333] text-[11px] hover:text-primary transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
