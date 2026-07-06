import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./NotFound.css";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="page-not-found">
      <h1>{t("notfound_heading")}</h1>
      <p>{t("notfound_message")}</p>
      <Link to="/">{t("notfound_link")}</Link>
    </div>
  );
}
