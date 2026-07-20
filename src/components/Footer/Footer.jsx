import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { stripAccents } from "../../utils/text";
import fullLogo from "../../assets/FORMAX-combined.svg";
import "./Footer.css";

const links = [
  { to: "/", key: "nav_home" },
  { to: "/about", key: "nav_about" },
  { to: "/projects", key: "nav_projects" },
  { to: "/careers", key: "nav_careers" },
  { to: "/contact", key: "nav_contact" },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img className="footer-logo" src={fullLogo} alt="FORMAX" />
          <p className="footer-tagline">{t("footer_tagline")}</p>
        </div>

        <div className="footer-section">
          <p className="footer-heading">{stripAccents(t("footer_links_heading"))}</p>
          <nav className="footer-links" aria-label={t("footer_nav_aria_label")}>
            {links.map((link) => (
              <Link key={link.to} to={link.to}>
                {t(link.key)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-section">
          <p className="footer-heading">{stripAccents(t("footer_contact_heading"))}</p>
          <div className="footer-contact">
            <p>{t("contact_phone_label")}</p>
            <p>{t("contact_email_label")}</p>
            <p>{t("contact_address_label")}</p>
          </div>
          <p className="footer-careers-line">
            {t("footer_careers_prompt")}{" "}
            <Link to="/careers">{t("footer_careers_cta")}</Link>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} FORMAX. {t("footer_rights")}
        </p>
        
        <div className="footer-bottom-right">
          <Link to="/privacy-policy" className="footer-meta-link">
            {t("footer_privacy_link")}
          </Link>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
