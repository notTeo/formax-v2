import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { stripAccents } from "../../utils/text";
import Reveal from "../../components/Reveal/Reveal";
import photoLeft from "../../assets/photos/gallery/gallery-curved-facade.jpg";
import photoRight from "../../assets/photos/gallery/gallery-glass-corner.jpg";
import photoBottomLight from "../../assets/photos/featured-projects/featured-projects-light.jpg";
import photoBottomDark from "../../assets/photos/featured-projects/featured-projects-dark.jpg";
import "./FeaturedProjects.css";

export default function FeaturedProjects() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <section className="project-gallery">
      <Reveal className="project-gallery-grid">
        <div className="project-gallery-img project-gallery-img--left">
          <img src={photoLeft} alt="" />
        </div>
        <div className="project-gallery-text">
          <h2>{t("gallery_heading")}</h2>
          <p>{t("gallery_subheading")}</p>
          <Link to="/projects" className="project-gallery-show-all">
            {stripAccents(t("gallery_show_all"))}
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                d="M3.5 8h9M8 3.5 12.5 8 8 12.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
        <div className="project-gallery-img project-gallery-img--right">
          <img src={photoRight} alt="" />
        </div>
        <div className="project-gallery-img project-gallery-img--wide-bottom">
          <img key={theme} src={theme === "dark" ? photoBottomDark : photoBottomLight} alt="" />
        </div>
      </Reveal>
    </section>
  );
}
