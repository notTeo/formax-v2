import { useLanguage } from "../../context/LanguageContext";
import Reveal from "../../components/Reveal/Reveal";
import { team } from "../../data/team";

export default function TeamGrid() {
  const { t, lang } = useLanguage();

  return (
    <section className="team-grid">
      <Reveal as="h2">{t("about_team_heading")}</Reveal>
      <div className="team-grid-items">
        {team.map((member) => (
          <div className="team-grid-item" key={member.id}>
            <div className="team-grid-photo">
              {member.photo ? <img src={member.photo} alt={member.name} /> : null}
              {/* PLACEHOLDER: team member photo */}
            </div>
            <h3>{member.name}</h3>
            <p className="team-grid-role">{member.role[lang]}</p>
            {member.phone ? (
              <a className="team-grid-phone" href={`tel:${member.phone.replace(/\s+/g, "")}`}>
                {member.phone}
              </a>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
