import Hero from "./Hero";
import ServiceTeaser from "./ServiceTeaser";
import FeaturedProjects from "./FeaturedProjects";
import CTABanner from "./CTABanner";
import StatCounter from "../../components/StatCounter/StatCounter";
import { stats } from "../../data/stats";
import { useLanguage } from "../../context/LanguageContext";
import "./Home.css";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="page-home">
      <Hero />

      <section className="stats-section">
        <StatCounter
          value={stats.sqm_delivered}
          label={t("stat_sqm_delivered")}
          suffix={t("stat_suffix_sqm")}
        />
        <StatCounter value={stats.projects_completed} label={t("stat_projects_completed")} suffix="" />
        <StatCounter value={stats.projects_active} label={t("stat_projects_active")} suffix="" />
        <StatCounter
          value={stats.budget_managed}
          label={t("stat_budget_managed")}
          suffix={t("stat_suffix_budget")}
        />
      </section>

      <ServiceTeaser />
      <FeaturedProjects />
      <CTABanner />
    </div>
  );
}
