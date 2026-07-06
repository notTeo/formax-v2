import { useLanguage } from "../../context/LanguageContext";

const pillars = [1, 2, 3];

export default function ValuesPillars() {
  const { t } = useLanguage();

  return (
    <section className="values-pillars">
      <h2>{t("about_values_heading")}</h2>
      <div className="values-pillars-items">
        {pillars.map((id) => (
          <div className="values-pillar" key={id} />
        ))}
      </div>
    </section>
  );
}
