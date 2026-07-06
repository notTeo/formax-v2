import CompanyStory from "./CompanyStory";
import TeamGrid from "./TeamGrid";
import ValuesPillars from "./ValuesPillars";
import CertificationsStrip from "./CertificationsStrip";
import "./About.css";

export default function About() {
  return (
    <div className="page-about">
      <CompanyStory />
      <TeamGrid />
      <ValuesPillars />
      <CertificationsStrip />
    </div>
  );
}
