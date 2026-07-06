import { useLanguage } from "../../context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero">
      <h1>{t("hero_headline")}</h1>
      <p>{t("hero_subheadline")}</p>
    </section>
  );
}
