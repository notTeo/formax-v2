import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import Seo from "../../components/Seo/Seo";
import { pageSeo } from "../../data/seo";
import "./NotFound.css";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="page-not-found">
      <Seo title={pageSeo.notFound.title} description={pageSeo.notFound.description} noindex />
      <h1>{t("notfound_heading")}</h1>
      <p>{t("notfound_message")}</p>
      <Link to="/">{t("notfound_link")}</Link>
    </div>
  );
}
