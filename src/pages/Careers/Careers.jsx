import { useLanguage } from "../../context/LanguageContext";
import { positions } from "../../data/positions";
import PositionsList from "./PositionsList";
import CareerForm from "../../components/CareerForm/CareerForm";
import Reveal from "../../components/Reveal/Reveal";
import "./Careers.css";

export default function Careers() {
  const { t } = useLanguage();

  return (
    <div className="page-careers">
      <Reveal as="h1">{t("careers_heading")}</Reveal>

      <section>
        <Reveal as="h2">{t("careers_positions_heading")}</Reveal>
        <PositionsList positions={positions} />
      </section>

      <section>
        <Reveal as="h2">{t("careers_form_heading")}</Reveal>
        <CareerForm />
      </section>
    </div>
  );
}
