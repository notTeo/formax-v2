import { useLanguage } from "../../context/LanguageContext";
import { positions } from "../../data/positions";
import PositionsList from "./PositionsList";
import CareerForm from "../../components/CareerForm/CareerForm";
import "./Careers.css";

export default function Careers() {
  const { t } = useLanguage();

  return (
    <div className="page-careers">
      <h1>{t("careers_heading")}</h1>

      <section>
        <h2>{t("careers_positions_heading")}</h2>
        <PositionsList positions={positions} />
      </section>

      <section>
        <h2>{t("careers_form_heading")}</h2>
        <CareerForm />
      </section>
    </div>
  );
}
