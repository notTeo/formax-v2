import { useLanguage } from "../../context/LanguageContext";
import Reveal from "../../components/Reveal/Reveal";

const placeholderLogos = [1, 2, 3, 4, 5];

export default function CertificationsStrip() {
  const { t } = useLanguage();

  return (
    <section className="certifications-strip">
      <Reveal as="h2">{t("about_certifications_heading")}</Reveal>
      <div className="certifications-strip-items">
        {placeholderLogos.map((id) => (
          <div className="certifications-strip-logo" key={id}>
            {/* PLACEHOLDER: certification logo */}
          </div>
        ))}
      </div>
    </section>
  );
}
