import { useLanguage } from "../../context/LanguageContext";
import { projects } from "../../data/projects";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

export default function FeaturedProjects() {
  const { t } = useLanguage();
  const featured = projects.slice(0, 3);

  return (
    <section className="featured-projects">
      <h2>{t("section_featured_projects_heading")}</h2>
      <div className="featured-projects-grid">
        {featured.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </section>
  );
}
