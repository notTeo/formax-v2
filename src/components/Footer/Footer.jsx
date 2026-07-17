import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
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
        <div className="footer-column">
          <p>{t("footer_tagline")}</p>
        </div>

        <div className="footer-column">
          <nav className="footer-links" aria-label={t("footer_nav_aria_label")}>
            {links.map((link) => (
              <Link key={link.to} to={link.to}>
                {t(link.key)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-column">
          <p>{t("contact_phone_label")}</p>
          <p>{t("contact_email_label")}</p>
          <p>{t("contact_address_label")}</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} FORMAX. {t("footer_rights")}
        </p>
      </div>
    </footer>
  );
}
