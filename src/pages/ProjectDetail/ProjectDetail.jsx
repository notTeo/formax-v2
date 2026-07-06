import { useParams, Navigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { projects } from "../../data/projects";
import "./ProjectDetail.css";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="page-project-detail">
      <div className="project-detail-hero">{/* PLACEHOLDER: {project.coverImage} */}</div>

      <h1>{project.title}</h1>

      <dl className="project-detail-meta">
        <dt>{t("project_meta_category")}</dt>
        <dd>{project.category}</dd>

        <dt>{t("project_meta_location")}</dt>
        <dd>{project.location}</dd>

        <dt>{t("project_meta_area")}</dt>
        <dd>{project.area_sqm}</dd>

        <dt>{t("project_meta_status")}</dt>
        <dd>
          {project.status === "Completed" ? t("project_status_completed") : t("project_status_inprogress")}
        </dd>

        <dt>{t("project_meta_year")}</dt>
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

      <p className="project-detail-description">{project.description}</p>
    </div>
  );
}
