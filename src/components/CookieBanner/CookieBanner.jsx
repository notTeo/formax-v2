import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useConsent } from "../../context/ConsentContext";
import { stripAccents } from "../../utils/text";
import "./CookieBanner.css";

function CookieIcon() {
  return (
    <svg
      className="cookie-banner-icon"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="30" fill="#D4913B" />
      <circle cx="32" cy="32" r="27" fill="#E4A24B" />

      <circle cx="20" cy="22" r="3.5" fill="#6B3A1F" />
      <circle cx="38" cy="18" r="2.8" fill="#6B3A1F" />
      <circle cx="28" cy="38" r="3.2" fill="#6B3A1F" />
      <circle cx="44" cy="34" r="2.5" fill="#6B3A1F" />
      <circle cx="18" cy="42" r="2.2" fill="#6B3A1F" />
      <circle cx="40" cy="48" r="2.8" fill="#6B3A1F" />

      <circle cx="12" cy="30" r="4" fill="#E4A24B" stroke="#D4913B" strokeWidth="1.5" />
      <circle cx="48" cy="22" r="3" fill="#E4A24B" stroke="#D4913B" strokeWidth="1.5" />
      <circle cx="32" cy="50" r="3.5" fill="#E4A24B" stroke="#D4913B" strokeWidth="1.5" />
    </svg>
  );
}

export default function CookieBanner() {
  const { t } = useLanguage();
  const { consent, accept, decline } = useConsent();

  if (consent !== null) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label={t("cookie_banner_aria")}>
      <CookieIcon />
      <div className="cookie-banner-content">
        <p className="cookie-banner-text">
          {t("cookie_banner_text")}{" "}
          <Link to="/privacy-policy">{t("cookie_banner_privacy_link")}</Link>
        </p>
        <div className="cookie-banner-actions">
          <button className="btn-primary" onClick={accept}>
            {stripAccents(t("cookie_banner_accept"))}
          </button>
          <button className="cookie-banner-decline" onClick={decline}>
            {stripAccents(t("cookie_banner_decline"))}
          </button>
        </div>
      </div>
    </div>
  );
}
