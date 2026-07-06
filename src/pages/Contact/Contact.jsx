import { useLanguage } from "../../context/LanguageContext";
import ContactForm from "../../components/ContactForm/ContactForm";
import "./Contact.css";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <div className="page-contact">
      <h1>{t("contact_heading")}</h1>

      <section className="contact-info">
        <h2>{t("contact_info_heading")}</h2>
        <p>{t("contact_phone_label")}</p>
        <p>{t("contact_email_label")}</p>
        <p>{t("contact_address_label")}</p>
      </section>

      <ContactForm />

      <div className="contact-map">{/* REPLACE WITH MAPS EMBED */}</div>
    </div>
  );
}
