import { useLanguage } from "../../context/LanguageContext";

export default function CTABanner() {
  const { t } = useLanguage();

  return (
    <section className="cta-banner">
      <h2>{t("cta_heading")}</h2>
      <p>{t("cta_subheading")}</p>
      <button type="button">{t("cta_button")}</button>
    </section>
  );
}
