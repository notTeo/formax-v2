import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { projects } from "../../data/projects";
import { stripAccents } from "../../utils/text";
import Reveal from "../../components/Reveal/Reveal";
import Loader from "../../components/Loader/Loader";
import "./ProjectDetail.css";

const LOADING_DELAY_MS = 1200;

export default function ProjectDetail() {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const project = projects.find((item) => item.slug === slug);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), LOADING_DELAY_MS);
    return () => clearTimeout(timer);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="loader-container">
        <Loader size={56} label={t("project_detail_loading")} />
      </div>
    );
  }

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="page-project-detail">
      <div className="project-detail-hero">{/* PLACEHOLDER: {project.coverImage} */}</div>

      <Reveal as="h1">{project.title[lang]}</Reveal>

      <dl className="project-detail-meta">
        <dt>{stripAccents(t("project_meta_category"))}</dt>
        <dd>{t(`sector_${project.category.toLowerCase()}`)}</dd>

        <dt>{stripAccents(t("project_meta_location"))}</dt>
        <dd>{project.location[lang]}</dd>

        <dt>{stripAccents(t("project_meta_area"))}</dt>
        <dd>{project.area_sqm}</dd>

        <dt>{stripAccents(t("project_meta_status"))}</dt>
        <dd>
          {project.status === "Completed" ? t("project_status_completed") : t("project_status_inprogress")}
        </dd>

        <dt>{stripAccents(t("project_meta_year"))}</dt>
        <dd>{project.year}</dd>
      </dl>

      <div className="project-detail-gallery">
        {project.gallery.length === 0 && (
          <div className="project-detail-gallery-placeholder">{/* PLACEHOLDER: photo gallery */}</div>
        )}
        {project.gallery.map((image, index) => (
          <div className="project-detail-gallery-item" key={index}>
            {/* PLACEHOLDER: {image} */}
          </div>
        ))}
      </div>

      <p className="project-detail-description">{project.description[lang]}</p>
    </div>
  );
}
