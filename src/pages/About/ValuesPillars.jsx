import { useLanguage } from "../../context/LanguageContext";
import Reveal from "../../components/Reveal/Reveal";

const placeholderPillars = [1, 2, 3];

export default function ValuesPillars() {
  const { t } = useLanguage();

  return (
    <section className="values-pillars">
      <Reveal as="h2">{t("about_values_heading")}</Reveal>
      <div className="values-pillars-items">
        {placeholderPillars.map((id) => (
          <div className="values-pillar" key={id}>
            {/* PLACEHOLDER: value pillar icon and copy */}
          </div>
        ))}
      </div>
    </section>
  );
}
