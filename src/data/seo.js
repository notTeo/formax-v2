export const SITE_NAME = "FORMAX";
export const SITE_URL = "https://formax.group";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const DEFAULT_DESCRIPTION =
  "FORMAX construction company: we deliver healthcare, office, retail, residential, and hospitality projects in Athens, from design to handover.";

export const pageSeo = {
  comingSoon: {
    title: "FORMAX | Construction Company Athens",
    description: DEFAULT_DESCRIPTION,
  },
  home: {
    title: "FORMAX | Construction Company Athens",
    description: DEFAULT_DESCRIPTION,
  },
  about: {
    title: "About Us | FORMAX Construction Company Athens",
    description:
      "Meet FORMAX, a construction company in Athens with an experienced engineering team and quality certifications across projects of every scale.",
  },
  projects: {
    title: "Projects | FORMAX Construction Company Athens",
    description:
      "Browse projects by FORMAX construction company across healthcare, offices, retail, residential, and hospitality sectors in Greece.",
  },
  careers: {
    title: "Careers | FORMAX Construction Company Athens",
    description:
      "Open positions at FORMAX — join the team behind FORMAX construction company projects in Athens and across Greece.",
  },
  contact: {
    title: "Contact | FORMAX Construction Company Athens",
    description:
      "Get in touch with FORMAX construction company for your next building project in Athens — phone, email, and office address.",
  },
  privacy: {
    title: "Privacy Policy | FORMAX",
    description:
      "FORMAX's privacy policy on the collection and processing of personal data.",
  },
  notFound: {
    title: "Page Not Found | FORMAX",
    description: "The page you were looking for doesn't exist or has moved.",
    noindex: true,
  },
};

export function projectSeo(project) {
  const title = project.title?.en ?? project.title?.el ?? "";
  return {
    title: `${title} | FORMAX Construction Company Athens`,
    description:
      project.description?.en ??
      project.description?.el ??
      DEFAULT_DESCRIPTION,
  };
}
