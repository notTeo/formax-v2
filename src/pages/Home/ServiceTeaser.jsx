import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import Reveal from "../../components/Reveal/Reveal";

const sectors = [
  { id: "healthcare", key: "sector_healthcare", category: "Healthcare" },
  { id: "offices", key: "sector_offices", category: "Offices" },
  { id: "retail", key: "sector_retail", category: "Retail" },
  { id: "residential", key: "sector_residential", category: "Residential" },
];

export default function ServiceTeaser() {
  const { t } = useLanguage();

  return (
    <section className="service-teaser">
      <Reveal as="h2">{t("section_services_heading")}</Reveal>
      <div className="service-teaser-grid">
        {sectors.map((sector, index) => (
          <Reveal
            as={Link}
            to={`/projects?category=${sector.category}`}
            className="service-teaser-card"
            delay={index * 80}
            key={sector.id}
          >
            <div className="service-teaser-card-image">{/* PLACEHOLDER: sector photo */}</div>
            <h3>{t(sector.key)}</h3>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
