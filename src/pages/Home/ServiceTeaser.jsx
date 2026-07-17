import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import Reveal from "../../components/Reveal/Reveal";
import healthcarePhoto from "../../assets/categories/healthcare.jpg";
import officePhoto from "../../assets/categories/office.jpg";
import retailPhoto from "../../assets/categories/retail.jpg";
import residentialPhoto from "../../assets/categories/residential.jpg";
import hospitalityPhoto from "../../assets/categories/hospitality.jpg";

const sectors = [
  { id: "healthcare", key: "sector_healthcare", category: "Healthcare", photo: healthcarePhoto },
  { id: "offices", key: "sector_offices", category: "Offices", photo: officePhoto },
  { id: "retail", key: "sector_retail", category: "Retail", photo: retailPhoto },
  { id: "residential", key: "sector_residential", category: "Residential", photo: residentialPhoto },
  { id: "hospitality", key: "sector_hospitality", category: "Hospitality", photo: hospitalityPhoto },
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
            <div className="service-teaser-card-image">
              <img src={sector.photo} alt={t(sector.key)} loading="lazy" />
            </div>
            <h3>{t(sector.key)}</h3>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
