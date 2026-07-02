import { useLanguage } from "../../context/LanguageContext";
import "./LanguageToggle.css";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="language-toggle">
      <button
        type="button"
        className={lang === "en" ? "active" : ""}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >
        EN
      </button>
      <span>/</span>
      <button
        type="button"
        className={lang === "el" ? "active" : ""}
        aria-pressed={lang === "el"}
        onClick={() => setLang("el")}
      >
        EL
      </button>
    </div>
  );
}
