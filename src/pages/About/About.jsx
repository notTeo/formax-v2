import CompanyStory from "./CompanyStory";
import TeamGrid from "./TeamGrid";
import CertificationsStrip from "./CertificationsStrip";
import Seo from "../../components/Seo/Seo";
import { pageSeo } from "../../data/seo";
import "./About.css";

export default function About() {
  return (
    <div className="page-about">
      <Seo title={pageSeo.about.title} description={pageSeo.about.description} />
      <CompanyStory />
      <TeamGrid />
      <CertificationsStrip />
    </div>
  );
}
