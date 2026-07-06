import { useLanguage } from "../../context/LanguageContext";

const sectors = ["Healthcare", "Offices", "Retail", "Residential"];

export default function ServiceTeaser() {
  const { t } = useLanguage();

  return (
    <section className="service-teaser">
      <h2>{t("section_services_heading")}</h2>
      <div className="service-teaser-grid">
        {sectors.map((sector) => (
          <div className="service-teaser-card" key={sector}>
            <h3>{sector}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
