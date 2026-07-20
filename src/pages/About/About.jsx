import CompanyStory from "./CompanyStory";
import TeamGrid from "./TeamGrid";
import CertificationsStrip from "./CertificationsStrip";
import "./About.css";

export default function About() {
  return (
    <div className="page-about">
      <CompanyStory />
      <TeamGrid />
      <CertificationsStrip />
    </div>
  );
}
