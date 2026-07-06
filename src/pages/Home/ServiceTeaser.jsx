import { useLanguage } from "../../context/LanguageContext";

const sectors = [
  { id: "healthcare", key: "sector_healthcare" },
  { id: "offices", key: "sector_offices" },
  { id: "retail", key: "sector_retail" },
  { id: "residential", key: "sector_residential" },
];

export default function ServiceTeaser() {
  const { t } = useLanguage();

  return (
    <section className="service-teaser">
      <h2>{t("section_services_heading")}</h2>
      <div className="service-teaser-grid">
        {sectors.map((sector) => (
          <div className="service-teaser-card" key={sector.id}>
            <h3>{t(sector.key)}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
