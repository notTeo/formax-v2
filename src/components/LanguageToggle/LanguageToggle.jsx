import { useLanguage } from "../../context/LanguageContext";
import "./LanguageToggle.css";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  const next = lang === "en" ? "el" : "en";

  return (
    <button
      type="button"
      className="language-toggle btn-ghost"
      aria-label={`Switch to ${next.toUpperCase()}`}
      onClick={() => setLang(next)}
    >
      {lang.toUpperCase()}
    </button>
  );
}
