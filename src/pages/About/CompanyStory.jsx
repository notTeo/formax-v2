import { useLanguage } from "../../context/LanguageContext";
import Reveal from "../../components/Reveal/Reveal";

export default function CompanyStory() {
  const { t } = useLanguage();

  return (
    <section className="company-story">
      <div className="company-story-columns">
        <div className="company-story-text">
          <Reveal as="h2">{t("about_story_heading")}</Reveal>
          <p>{t("about_story_body")}</p>
        </div>
        <div className="company-story-image">{/* PLACEHOLDER: company story image */}</div>
      </div>
    </section>
  );
}
