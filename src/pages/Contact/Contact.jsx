import { useLanguage } from "../../context/LanguageContext";
import ContactForm from "../../components/ContactForm/ContactForm";
import Reveal from "../../components/Reveal/Reveal";
import "./Contact.css";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <div className="page-contact">
      <Reveal as="h1">{t("contact_heading")}</Reveal>

      <section className="contact-info">
        <Reveal as="h2">{t("contact_info_heading")}</Reveal>
        <p>
          <a href="tel:+302103628958">{t("contact_phone_label")}</a>
        </p>
        <p>
          <a href="mailto:info@formax.group">{t("contact_email_label")}</a>
        </p>
        <p>{t("contact_address_label")}</p>
      </section>

      <ContactForm />

      <div className="contact-map">{/* REPLACE WITH MAPS EMBED */}</div>
    </div>
  );
}
