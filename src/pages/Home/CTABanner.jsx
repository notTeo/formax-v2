import { useLanguage } from "../../context/LanguageContext";
import Reveal from "../../components/Reveal/Reveal";

export default function CTABanner() {
  const { t } = useLanguage();

  return (
    <section className="cta-banner">
      <Reveal as="h2">{t("cta_heading")}</Reveal>
      <Reveal as="p" delay={80}>
        {t("cta_subheading")}
      </Reveal>
      <Reveal delay={160}>
        <button type="button" className="btn-primary">
          {t("cta_button")}
        </button>
      </Reveal>
    </section>
  );
}
