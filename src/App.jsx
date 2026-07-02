import { Routes, Route } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext";

function RoutePlaceholder({ title }) {
  return <div>{title}</div>;
}

export default function App() {
  const { t } = useLanguage();

  return (
    <main>
      <Routes>
        <Route path="/" element={<RoutePlaceholder title={t("hero_headline")} />} />
      </Routes>
    </main>
  );
}
