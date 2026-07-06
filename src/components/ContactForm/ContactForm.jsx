import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./ContactForm.css";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = true;
    if (!formData.subject.trim()) newErrors.subject = true;
    if (!formData.message.trim()) newErrors.message = true;
    return newErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setFormData(initialState);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label htmlFor="name">{t("form_name_label")}</label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder={t("form_name_placeholder")}
        value={formData.name}
        onChange={handleChange}
      />

      <label htmlFor="email">{t("form_email_label")}</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder={t("form_email_placeholder")}
        value={formData.email}
        onChange={handleChange}
      />

      <label htmlFor="subject">{t("form_subject_label")}</label>
      <input
        id="subject"
        name="subject"
        type="text"
        placeholder={t("form_subject_placeholder")}
        value={formData.subject}
        onChange={handleChange}
      />

      <label htmlFor="message">{t("form_message_label")}</label>
      <textarea
        id="message"
        name="message"
        placeholder={t("form_message_placeholder")}
        value={formData.message}
        onChange={handleChange}
      />

      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? t("form_submitting") : t("form_submit")}
      </button>

      {status === "success" && <p className="form-message success">{t("form_success")}</p>}
      {status === "error" && <p className="form-message error">{t("form_error")}</p>}
    </form>
  );
}
