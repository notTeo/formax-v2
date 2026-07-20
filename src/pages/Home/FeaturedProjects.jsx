import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { stripAccents } from "../../utils/text";
import Reveal from "../../components/Reveal/Reveal";
import photo1 from "../../assets/photos/abbe-sublett-nxZDMUQhN4o-unsplash.jpg";
import photo2 from "../../assets/photos/kenrick-baksh-Wm8opOd-MDE-unsplash.jpg";
import photo3 from "../../assets/photos/lei-jiang-csPvbh_E1uc-unsplash.jpg";
import photo4 from "../../assets/photos/nick-wessaert-JI01fn0U7Cg-unsplash.jpg";
import "./FeaturedProjects.css";

export default function FeaturedProjects() {
  const { t } = useLanguage();

  return (
    <section className="project-gallery">
      <Reveal className="project-gallery-grid">
        <div className="project-gallery-img project-gallery-img--left">
          <img src={photo2} alt="" />
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
          <img src={photo3} alt="" />
        </div>
        <div className="project-gallery-img project-gallery-img--wide-bottom">
          <img src={photo4} alt="" />
        </div>
      </Reveal>
    </section>
  );
}
