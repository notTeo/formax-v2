import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const categories = [
  { id: "healthcare", key: "sector_healthcare", category: "Healthcare" },
  { id: "offices", key: "sector_offices", category: "Offices" },
  { id: "retail", key: "sector_retail", category: "Retail" },
  { id: "residential", key: "sector_residential", category: "Residential" },
  { id: "hospitality", key: "sector_hospitality", category: "Hospitality" },
];

export default function HeroCategories() {
  const { t } = useLanguage();

  return (
    <div className="hero-categories">
      <Link to="/projects" className="hero-category-pill">
        {t("filter_all")}
      </Link>
      {categories.map((cat) => (
        <Link key={cat.id} to={`/projects?category=${cat.category}`} className="hero-category-pill">
          {t(cat.key)}
        </Link>
      ))}
    </div>
  );
}
