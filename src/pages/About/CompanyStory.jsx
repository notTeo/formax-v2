import { useLanguage } from "../../context/LanguageContext";

export default function CompanyStory() {
  const { t } = useLanguage();

  return (
    <section className="company-story">
      <h2>{t("about_story_heading")}</h2>
      <div className="company-story-columns">
        <div className="company-story-text" />
        <div className="company-story-image">{/* PLACEHOLDER: company story image */}</div>
      </div>
    </section>
  );
}
