import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./ProjectCard.css";

export default function ProjectCard({ slug, title, category, status, coverImage }) {
  const { t } = useLanguage();

  return (
    <Link to={`/projects/${slug}`} className="project-card">
      <div className="project-card-image" data-cover-image={coverImage}>
        {/* PLACEHOLDER IMAGE */}
      </div>
      <div className="project-card-body">
        <h3>{title}</h3>
        <p>{category}</p>
        <span className="project-card-status">
          {status === "Completed" ? t("project_status_completed") : t("project_status_inprogress")}
        </span>
      </div>
    </Link>
  );
}
