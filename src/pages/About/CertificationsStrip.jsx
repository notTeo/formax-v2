import { useLanguage } from "../../context/LanguageContext";

const placeholderLogos = [1, 2, 3, 4, 5];

export default function CertificationsStrip() {
  const { t } = useLanguage();

  return (
    <section className="certifications-strip">
      <h2>{t("about_certifications_heading")}</h2>
      <div className="certifications-strip-items">
        {placeholderLogos.map((id) => (
          <div className="certifications-strip-logo" key={id} />
        ))}
      </div>
    </section>
  );
}
