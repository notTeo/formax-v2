import { useLanguage } from "../../context/LanguageContext";
import { projects } from "../../data/projects";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Reveal from "../../components/Reveal/Reveal";

export default function FeaturedProjects() {
  const { t } = useLanguage();
  const featured = projects.slice(0, 3);

  return (
    <section className="featured-projects">
      <Reveal as="h2">{t("section_featured_projects_heading")}</Reveal>
      <div className="featured-projects-grid">
        {featured.map((project, index) => (
          <Reveal key={project.slug} delay={index * 80}>
            <ProjectCard {...project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
