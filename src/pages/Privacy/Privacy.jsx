import { useLanguage } from "../../context/LanguageContext";
import Reveal from "../../components/Reveal/Reveal";
import Seo from "../../components/Seo/Seo";
import { pageSeo } from "../../data/seo";
import "./Privacy.css";

const sections = [
  "collect",
  "use",
  "cookies",
  "sharing",
  "security",
  "rights",
  "changes",
  "contact",
];

export default function Privacy() {
  const { t } = useLanguage();

  return (
    <div className="page-privacy">
      <Seo title={pageSeo.privacy.title} description={pageSeo.privacy.description} />
      <Reveal as="h1">{t("privacy_page_title")}</Reveal>
      <p className="privacy-updated">{t("privacy_last_updated")}</p>
      <Reveal as="p" className="privacy-intro" delay={80}>
        {t("privacy_intro")}
      </Reveal>

      {sections.map((section, index) => (
        <Reveal as="section" className="privacy-section" key={section} delay={120 + index * 60}>
          <h2>{t(`privacy_section_${section}_heading`)}</h2>
          <p>{t(`privacy_section_${section}_body`)}</p>
        </Reveal>
      ))}
    </div>
  );
}
