import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { stripAccents } from "../../utils/text";
import Reveal from "../../components/Reveal/Reveal";
import photo1 from "../../assets/photos/abbe-sublett-nxZDMUQhN4o-unsplash.jpg";
import photo2 from "../../assets/photos/kenrick-baksh-Wm8opOd-MDE-unsplash.jpg";
import photo3 from "../../assets/photos/lei-jiang-csPvbh_E1uc-unsplash.jpg";
import photo4 from "../../assets/photos/nick-wessaert-A2DibrM7wqo-unsplash.jpg";
import photo5 from "../../assets/photos/nick-wessaert-JI01fn0U7Cg-unsplash.jpg";
import "./FeaturedProjects.css";

const galleryImages = [
  { src: photo1, rowSpan: 12 },
  { src: photo2, rowSpan: 8 },
  { src: photo4, rowSpan: 14 },
  { src: photo3, rowSpan: 10 },
  { src: photo5, rowSpan: 8 },
  { src: photo1, rowSpan: 9 },
];

export default function FeaturedProjects() {
  const { t } = useLanguage();

  return (
    <section className="project-gallery">
      <div className="project-gallery-grid">
        <Reveal className="project-gallery-text">
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
        </Reveal>

        {galleryImages.map((image, index) => (
          <Reveal
            key={`${image.src}-${index}`}
            className="project-gallery-item"
            delay={index * 60}
            style={{ gridRowEnd: `span ${image.rowSpan}` }}
          >
            <img src={image.src} alt={t("gallery_heading")} loading="lazy" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
