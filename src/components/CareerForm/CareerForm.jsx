import { useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { positions } from "../../data/positions";
import { stripAccents } from "../../utils/text";
import Loader from "../Loader/Loader";
import "./CareerForm.css";

const initialState = {
  name: "",
  email: "",
  position: positions[0]?.id ?? "",
  message: "",
};

export default function CareerForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState(initialState);
  const [cvFile, setCvFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const cvInputRef = useRef(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(event) {
    setCvFile(event.target.files[0] ?? null);
  }

  function validate() {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = true;
    if (!formData.position) newErrors.position = true;
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
      const body = new FormData();
      body.append("name", formData.name);
      body.append("email", formData.email);
      body.append("position", formData.position);
      body.append("message", formData.message);
      if (cvFile) body.append("cv", cvFile);

      const response = await fetch("/api/send-career", { method: "POST", body });
      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setFormData(initialState);
        setCvFile(null);
        if (cvInputRef.current) cvInputRef.current.value = "";
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="career-form" onSubmit={handleSubmit}>
      <label htmlFor="name">{stripAccents(t("form_name_label"))}</label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder={t("form_name_placeholder")}
        value={formData.name}
        onChange={handleChange}
      />

      <label htmlFor="email">{stripAccents(t("form_email_label"))}</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder={t("form_email_placeholder")}
        value={formData.email}
        onChange={handleChange}
      />

      <label htmlFor="position">{stripAccents(t("form_position_label"))}</label>
      <select id="position" name="position" value={formData.position} onChange={handleChange}>
        {positions.map((position) => (
          <option key={position.id} value={position.id}>
            {position.title}
          </option>
        ))}
      </select>

      <label htmlFor="message">{stripAccents(t("form_message_label"))}</label>
      <textarea
        id="message"
        name="message"
        placeholder={t("form_message_placeholder")}
        value={formData.message}
        onChange={handleChange}
      />

      <label htmlFor="cv">{stripAccents(t("form_cv_label"))}</label>
      <input
        id="cv"
        name="cv"
        type="file"
        accept=".pdf,.doc,.docx"
        ref={cvInputRef}
        onChange={handleFileChange}
      />

      <button type="submit" className="btn-primary" disabled={status === "loading"}>
        {status === "loading" ? <Loader size={18} label={t("form_submitting")} /> : t("form_submit")}
      </button>

      {status === "success" && <p className="form-message success">{t("form_success")}</p>}
      {status === "error" && <p className="form-message error">{t("form_error")}</p>}
    </form>
  );
}
