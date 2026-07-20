import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
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
        <div className="footer-column footer-brand">
          <img className="footer-logo" src={fullLogo} alt="FORMAX" />
          <p>{t("footer_tagline")}</p>
          <div className="footer-careers-row">
            <p className="footer-careers-prompt">{t("footer_careers_prompt")}</p>
            <Link to="/careers" className="btn-primary footer-cta">
              {t("footer_careers_cta")}
            </Link>
          </div>
        </div>

        <div className="footer-column">
          <p className="footer-column-heading">{t("footer_links_heading")}</p>
          <nav className="footer-links" aria-label={t("footer_nav_aria_label")}>
            {links.map((link) => (
              <Link key={link.to} to={link.to}>
                {t(link.key)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-column">
          <p className="footer-column-heading">{t("footer_contact_heading")}</p>
          <p>{t("contact_phone_label")}</p>
          <p>{t("contact_email_label")}</p>
          <p>{t("contact_address_label")}</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} FORMAX. {t("footer_rights")}
        </p>
        <Link to="/privacy-policy" className="footer-privacy-link">
          {t("footer_privacy_link")}
        </Link>
      </div>

      <div className="footer-utilities">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </footer>
  );
}
