import { useState, useMemo } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { projects } from "../../data/projects";
import FilterBar from "../../components/FilterBar/FilterBar";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import "./Projects.css";

export default function Projects() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("All");

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
      <h1>{t("projects_heading")}</h1>
      <FilterBar categories={filterCategories} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </div>
  );
}
