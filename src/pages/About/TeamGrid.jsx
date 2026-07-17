import { useLanguage } from "../../context/LanguageContext";
import Reveal from "../../components/Reveal/Reveal";

const placeholderTeam = [1, 2, 3, 4];

export default function TeamGrid() {
  const { t } = useLanguage();

  return (
    <section className="team-grid">
      <Reveal as="h2">{t("about_team_heading")}</Reveal>
      <div className="team-grid-items">
        {placeholderTeam.map((id) => (
          <div className="team-grid-item" key={id}>
            {/* PLACEHOLDER: team member photo */}
          </div>
        ))}
      </div>
    </section>
  );
}
