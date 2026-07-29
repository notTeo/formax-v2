export const SITE_NAME = "FORMAX";
export const SITE_URL = "https://formax.group";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const DEFAULT_DESCRIPTION =
  "FORMAX κατασκευές: αναλαμβάνουμε έργα υγείας, γραφείων, καταστημάτων, κατοικιών και φιλοξενίας στην Αθήνα, από τον σχεδιασμό έως την παράδοση.";

export const pageSeo = {
  comingSoon: {
    title: "FORMAX | Κατασκευαστική Εταιρεία Αθήνα",
    description: DEFAULT_DESCRIPTION,
  },
  home: {
    title: "FORMAX | Κατασκευαστική Εταιρεία Αθήνα",
    description: DEFAULT_DESCRIPTION,
  },
  about: {
    title: "Σχετικά με Εμάς | FORMAX Κατασκευές Αθήνα",
    description:
      "Γνωρίστε τη FORMAX, μια κατασκευαστική εταιρεία στην Αθήνα με έμπειρη ομάδα μηχανικών και πιστοποιήσεις ποιότητας στις κατασκευές formax κάθε κλίμακας.",
  },
  projects: {
    title: "Έργα | FORMAX Κατασκευές Αθήνα",
    description:
      "Δείτε ενδεικτικά έργα από τις κατασκευές formax σε τομείς υγείας, γραφείων, retail, κατοικιών και φιλοξενίας σε όλη την Ελλάδα.",
  },
  careers: {
    title: "Καριέρα | FORMAX Κατασκευές Αθήνα",
    description:
      "Ανοιχτές θέσεις εργασίας στη FORMAX — γίνετε μέλος της ομάδας που υλοποιεί τις κατασκευές formax στην Αθήνα και σε όλη τη χώρα.",
  },
  contact: {
    title: "Επικοινωνία | FORMAX Κατασκευές Αθήνα",
    description:
      "Επικοινωνήστε με τη FORMAX για το επόμενο κατασκευαστικό σας έργο στην Αθήνα — τηλέφωνο, email και διεύθυνση γραφείων.",
  },
  privacy: {
    title: "Πολιτική Απορρήτου | FORMAX",
    description:
      "Πολιτική απορρήτου της FORMAX σχετικά με τη συλλογή και επεξεργασία προσωπικών δεδομένων.",
  },
  notFound: {
    title: "Η σελίδα δεν βρέθηκε | FORMAX",
    description: "Η σελίδα που αναζητήσατε δεν υπάρχει ή έχει μετακινηθεί.",
    noindex: true,
  },
};

export function projectSeo(project) {
  const title = project.title?.el ?? project.title?.en ?? "";
  return {
    title: `${title} | FORMAX Κατασκευές Αθήνα`,
    description:
      project.description?.el ??
      project.description?.en ??
      DEFAULT_DESCRIPTION,
  };
}
