import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { projects } from "../../data/projects";
import FilterBar from "../../components/FilterBar/FilterBar";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Reveal from "../../components/Reveal/Reveal";
import "./Projects.css";

const validCategories = ["Healthcare", "Offices", "Retail", "Residential", "Hospitality"];

export default function Projects() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeFilter, setActiveFilter] = useState(
    validCategories.includes(categoryParam) ? categoryParam : "All"
  );

  const filterCategories = [
    { value: "All", label: t("filter_all") },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Offices", label: "Offices" },
    { value: "Retail", label: "Retail" },
    { value: "Residential", label: "Residential" },
    { value: "Hospitality", label: "Hospitality" },
  ];

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="page-projects">
      <Reveal as="h1">{t("projects_heading")}</Reveal>
      <FilterBar categories={filterCategories} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 60}>
            <ProjectCard {...project} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
