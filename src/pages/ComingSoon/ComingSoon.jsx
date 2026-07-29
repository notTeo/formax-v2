import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import LanguageToggle from "../../components/LanguageToggle/LanguageToggle";
import Seo from "../../components/Seo/Seo";
import { pageSeo } from "../../data/seo";
import logo from "../../assets/FORMAX-combined.svg";
import heroPhotoLight from "../../assets/photos/hero/hero-light.jpg";
import heroPhotoDark from "../../assets/photos/hero/hero-dark.jpg";
import "./ComingSoon.css";

export default function ComingSoon() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <div className="page-coming-soon">
      <Seo title={pageSeo.comingSoon.title} description={pageSeo.comingSoon.description} />
      <img
        key={theme}
        src={theme === "dark" ? heroPhotoDark : heroPhotoLight}
        alt=""
        className="coming-soon-image-photo"
      />

      <div className="coming-soon-controls">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      <div className="coming-soon-content">
        <img className="coming-soon-logo" src={logo} alt="FORMAX" />
        <span className="coming-soon-badge">{t("coming_soon_badge")}</span>
        <h1>{t("coming_soon_heading")}</h1>
        <p>{t("coming_soon_message")}</p>
      </div>
    </div>
  );
}
