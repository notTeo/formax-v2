import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { projects } from "../../data/projects";
import FilterBar from "../../components/FilterBar/FilterBar";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Reveal from "../../components/Reveal/Reveal";
import Loader from "../../components/Loader/Loader";
import "./Projects.css";

const validCategories = ["Healthcare", "Offices", "Retail", "Residential", "Hospitality"];
const LOADING_DELAY_MS = 1600;

export default function Projects() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeFilter, setActiveFilter] = useState(
    validCategories.includes(categoryParam) ? categoryParam : "All"
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), LOADING_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

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
      {isLoading ? (
        <div className="loader-container">
          <Loader size={56} label={t("projects_loading")} />
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 60}>
              <ProjectCard {...project} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
