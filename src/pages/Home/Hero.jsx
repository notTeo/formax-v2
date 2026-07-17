import { useLanguage } from "../../context/LanguageContext";
import { stats } from "../../data/stats";
import StatCounter from "../../components/StatCounter/StatCounter";
import HeroCategories from "./HeroCategories";
import logo from "../../assets/FORMAX-letters-only.svg";
import heroPhoto1 from "../../assets/photos/abbe-sublett-nxZDMUQhN4o-unsplash.jpg";
import heroPhoto2 from "../../assets/photos/kenrick-baksh-Wm8opOd-MDE-unsplash.jpg";
import heroPhoto3 from "../../assets/photos/lei-jiang-csPvbh_E1uc-unsplash.jpg";
import heroPhoto4 from "../../assets/photos/nick-wessaert-A2DibrM7wqo-unsplash.jpg";
import heroPhoto5 from "../../assets/photos/nick-wessaert-JI01fn0U7Cg-unsplash.jpg";
import "./Hero.css";

const heroPhotos = [heroPhoto1, heroPhoto2, heroPhoto3, heroPhoto4, heroPhoto5];

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

      <div className="hero-image">
        {heroPhotos.map((src, index) => (
          <img
            key={src}
            src={src}
            alt=""
            className="hero-image-slide"
            style={{ "--slide-index": index }}
          />
        ))}
      </div>
    </section>
  );
}
