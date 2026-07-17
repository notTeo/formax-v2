import { useLanguage } from "../../context/LanguageContext";
import { stats } from "../../data/stats";
import StatCounter from "../../components/StatCounter/StatCounter";
import HeroCategories from "./HeroCategories";
import logo from "../../assets/FORMAX-letters-only.svg";
import "./Hero.css";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero">
      <div className="hero-content">
        <img className="hero-logo-big" src={logo} alt="FORMAX" />
        <p>{t("hero_subheadline")}</p>

        <div className="hero-mini-stats">
          <StatCounter variant="inline" value={stats.years_active} label={t("stat_years_active")} suffix="" />
          <StatCounter
            variant="inline"
            value={stats.projects_completed}
            label={t("stat_projects_completed")}
            suffix=""
          />
        </div>

        <HeroCategories />
      </div>

      <div className="hero-image">{/* PLACEHOLDER: hero image */}</div>
    </section>
  );
}
