# FORMAX Skeleton Build Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a fully working, unstyled React skeleton for the FORMAX construction company website — all 6 routes, all components, data architecture, language context, and Vercel serverless form endpoints — with no final visual design.

**Architecture:** Vite + React 18 + React Router v6 single-page app. A `LanguageContext` wraps the whole tree and exposes `t(key)` for every user-facing string, backed by a flat translation table in `src/data/translations.js`. Pages are built from small, page-local subcomponents plus shared components in `src/components/`. Two Vercel serverless functions under `/api` handle form submissions via the Resend SDK. Styling is deliberately minimal — structural CSS only (flex/grid/gap), using CSS variables for brand tokens with no color/spacing decisions applied yet.

**Tech Stack:** React 18, React Router v6, Vite, plain CSS, Resend SDK, formidable (multipart parsing for the CV upload endpoint), Vercel serverless functions.

**Adaptation note:** This is a UI skeleton with no business logic to unit-test (no test framework was requested in the spec). In place of a TDD red/green cycle, each task's verification step is "build succeeds" (`npm run build`) plus, once a route exists, a dev-server check that the route renders. Interactive behaviors (language toggle, filter, counter animation, form submit states) are verified manually in the browser in the final task, per the skill's guidance to adapt process to context.

---

## File Structure

```
formax_v3/
  .env.example
  .gitignore
  vercel.json
  package.json
  vite.config.js
  index.html
  api/
    send-contact.js
    send-career.js
  src/
    main.jsx
    App.jsx
    context/
      LanguageContext.jsx
    data/
      stats.js
      positions.js
      projects.js
      translations.js
    styles/
      variables.css
      global.css
    components/
      Navbar/Navbar.jsx, Navbar.css
      Footer/Footer.jsx, Footer.css
      ProjectCard/ProjectCard.jsx, ProjectCard.css
      StatCounter/StatCounter.jsx, StatCounter.css
      FilterBar/FilterBar.jsx, FilterBar.css
      LanguageToggle/LanguageToggle.jsx, LanguageToggle.css
      ContactForm/ContactForm.jsx, ContactForm.css
      CareerForm/CareerForm.jsx, CareerForm.css
    pages/
      Home/Home.jsx, Home.css, Hero.jsx, ServiceTeaser.jsx, FeaturedProjects.jsx, CTABanner.jsx
      About/About.jsx, About.css, CompanyStory.jsx, TeamGrid.jsx, ValuesPillars.jsx, CertificationsStrip.jsx
      Projects/Projects.jsx, Projects.css
      ProjectDetail/ProjectDetail.jsx, ProjectDetail.css
      Careers/Careers.jsx, Careers.css, PositionsList.jsx
      Contact/Contact.jsx, Contact.css
      NotFound/NotFound.jsx, NotFound.css
```

Page-local subcomponents (Hero, ServiceTeaser, FeaturedProjects, CTABanner, CompanyStory, TeamGrid, ValuesPillars, CertificationsStrip, PositionsList) live inside their page's folder because they are only ever used by that one page. The 8 components named explicitly in the spec (Navbar, Footer, ProjectCard, StatCounter, FilterBar, LanguageToggle, ContactForm, CareerForm) live in `src/components/` because they are reused across pages.

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html` (via Vite scaffold)
- Create: `.gitignore`
- Create: `vercel.json`
- Create: `.env.example`

- [ ] **Step 1: Scaffold the Vite React project in place**

Run:
```bash
cd /Users/nicktheodosis/Code/formax_v3
npm create vite@latest . -- --template react
```
When prompted about the directory not being empty, confirm to proceed (it's empty, so this shouldn't prompt).

- [ ] **Step 2: Install dependencies**

Run:
```bash
npm install react-router-dom resend formidable
npm install
```

- [ ] **Step 3: Initialize git and add a .gitignore**

Create `.gitignore`:
```
node_modules
dist
.vercel
.env
.env.local
```

Run:
```bash
git init
git add .gitignore
git commit -m "chore: initialize gitignore"
```

- [ ] **Step 4: Create vercel.json**

Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

- [ ] **Step 5: Create .env.example**

Create `.env.example`:
```
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=info@formax.gr
CAREER_EMAIL=careers@formax.gr
```

- [ ] **Step 6: Verify the scaffold builds**

Run: `npm run build`
Expected: build succeeds, `dist/` is created.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vite.config.js index.html vercel.json .env.example src public
git commit -m "chore: scaffold Vite React project with router, resend, formidable"
```

---

### Task 2: Global Styles

**Files:**
- Create: `src/styles/variables.css`
- Create: `src/styles/global.css`

- [ ] **Step 1: Create variables.css**

```css
:root {
  --color-gold: #c9a84c;
  --color-black: #0d0d0d;
  --color-white: #fafafa;
  --color-mid: #1a1a1a;
  --color-border: #2a2a2a;
}
```

- [ ] **Step 2: Create global.css (structural resets only)**

```css
* {
  box-sizing: border-box;
}

html,
body,
#root {
  height: 100%;
}

body {
  margin: 0;
}

main {
  min-height: 100vh;
}
```

- [ ] **Step 3: Delete the Vite default stylesheets**

Run: `rm -f /Users/nicktheodosis/Code/formax_v3/src/App.css /Users/nicktheodosis/Code/formax_v3/src/index.css`

- [ ] **Step 4: Commit**

```bash
git add src/styles src/App.css src/index.css
git commit -m "feat: add brand variable and global structural stylesheets"
```

---

### Task 3: Data Layer

**Files:**
- Create: `src/data/stats.js`
- Create: `src/data/positions.js`
- Create: `src/data/projects.js`
- Create: `src/data/translations.js`

- [ ] **Step 1: Create stats.js**

```js
export const stats = {
  sqm_delivered: 45000,
  projects_completed: 38,
  projects_active: 12,
  budget_managed: 24,
};
```

- [ ] **Step 2: Create positions.js**

```js
export const positions = [
  { id: 1, title: "Site Engineer", department: "Engineering", type: "Full-time" },
  { id: 2, title: "Project Manager", department: "Management", type: "Full-time" },
  { id: 3, title: "Safety Officer", department: "Health & Safety", type: "Contract" },
  { id: 4, title: "Architectural Draftsperson", department: "Design", type: "Part-time" },
];
```

- [ ] **Step 3: Create projects.js**

```js
export const projects = [
  {
    slug: "athens-general-hospital-wing",
    title: "Athens General Hospital Wing",
    category: "Healthcare",
    status: "Completed",
    location: "Athens, Greece",
    area_sqm: 8200,
    year: 2023,
    coverImage: "/assets/projects/placeholder-1.jpg",
    gallery: [],
    description: "Placeholder description for the Athens General Hospital Wing project.",
  },
  {
    slug: "piraeus-corporate-tower",
    title: "Piraeus Corporate Tower",
    category: "Offices",
    status: "Completed",
    location: "Piraeus, Greece",
    area_sqm: 12400,
    year: 2022,
    coverImage: "/assets/projects/placeholder-2.jpg",
    gallery: [],
    description: "Placeholder description for the Piraeus Corporate Tower project.",
  },
  {
    slug: "glyfada-retail-plaza",
    title: "Glyfada Retail Plaza",
    category: "Retail",
    status: "In Progress",
    location: "Glyfada, Greece",
    area_sqm: 5600,
    year: 2025,
    coverImage: "/assets/projects/placeholder-3.jpg",
    gallery: [],
    description: "Placeholder description for the Glyfada Retail Plaza project.",
  },
  {
    slug: "kifisia-residences",
    title: "Kifisia Residences",
    category: "Residential",
    status: "Completed",
    location: "Kifisia, Greece",
    area_sqm: 7300,
    year: 2021,
    coverImage: "/assets/projects/placeholder-4.jpg",
    gallery: [],
    description: "Placeholder description for the Kifisia Residences project.",
  },
  {
    slug: "santorini-boutique-resort",
    title: "Santorini Boutique Resort",
    category: "Hospitality",
    status: "In Progress",
    location: "Santorini, Greece",
    area_sqm: 9100,
    year: 2026,
    coverImage: "/assets/projects/placeholder-5.jpg",
    gallery: [],
    description: "Placeholder description for the Santorini Boutique Resort project.",
  },
  {
    slug: "thessaloniki-medical-center",
    title: "Thessaloniki Medical Center",
    category: "Healthcare",
    status: "Completed",
    location: "Thessaloniki, Greece",
    area_sqm: 6800,
    year: 2020,
    coverImage: "/assets/projects/placeholder-6.jpg",
    gallery: [],
    description: "Placeholder description for the Thessaloniki Medical Center project.",
  },
];
```

- [ ] **Step 4: Create translations.js**

```js
export const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_projects: "Projects",
    nav_careers: "Careers",
    nav_contact: "Contact",
    hero_headline: "Building the future, with precision.",
    hero_subheadline: "FORMAX delivers large-scale construction projects across every sector.",
    stat_sqm_delivered: "Square Meters Delivered",
    stat_projects_completed: "Projects Completed",
    stat_projects_active: "Active Projects",
    stat_budget_managed: "Budget Managed",
    stat_suffix_sqm: " sqm",
    stat_suffix_budget: "M€",
    section_services_heading: "Our Sectors",
    section_featured_projects_heading: "Featured Projects",
    cta_heading: "Ready to start your next project?",
    cta_subheading: "Get in touch with our team today.",
    cta_button: "Contact Us",
    about_story_heading: "Our Story",
    about_team_heading: "Our Team",
    about_values_heading: "Our Values",
    about_certifications_heading: "Certifications",
    projects_heading: "Projects",
    filter_all: "All",
    project_status_completed: "Completed",
    project_status_inprogress: "In Progress",
    project_meta_category: "Category",
    project_meta_location: "Location",
    project_meta_area: "Area (sqm)",
    project_meta_status: "Status",
    project_meta_year: "Year",
    careers_heading: "Careers",
    careers_positions_heading: "Open Positions",
    careers_form_heading: "Apply Now",
    contact_heading: "Contact",
    contact_info_heading: "Get in Touch",
    contact_phone_label: "+30 210 000 0000",
    contact_email_label: "info@formax.gr",
    contact_address_label: "123 Placeholder Ave, Athens, Greece",
    form_name_label: "Full Name",
    form_name_placeholder: "Enter your full name",
    form_email_label: "Email",
    form_email_placeholder: "Enter your email",
    form_subject_label: "Subject",
    form_subject_placeholder: "Enter a subject",
    form_message_label: "Message",
    form_message_placeholder: "Enter your message",
    form_position_label: "Position",
    form_cv_label: "Upload CV",
    form_submit: "Submit",
    form_submitting: "Submitting...",
    form_success: "Thank you! Your message has been sent.",
    form_error: "Something went wrong. Please try again.",
    footer_tagline: "Precision construction, delivered.",
    footer_rights: "All rights reserved.",
    notfound_heading: "404",
    notfound_message: "Page not found.",
    notfound_link: "Return home",
  },
  el: {
    nav_home: "Αρχική",
    nav_about: "Σχετικά",
    nav_projects: "Έργα",
    nav_careers: "Καριέρα",
    nav_contact: "Επικοινωνία",
    hero_headline: "Χτίζουμε το μέλλον, με ακρίβεια.",
    hero_subheadline: "Η FORMAX υλοποιεί μεγάλης κλίμακας κατασκευαστικά έργα σε κάθε τομέα.",
    stat_sqm_delivered: "Τετραγωνικά Μέτρα Παραδοθέντα",
    stat_projects_completed: "Ολοκληρωμένα Έργα",
    stat_projects_active: "Ενεργά Έργα",
    stat_budget_managed: "Διαχειριζόμενος Προϋπολογισμός",
    stat_suffix_sqm: " τ.μ.",
    stat_suffix_budget: "εκ. €",
    section_services_heading: "Οι Τομείς μας",
    section_featured_projects_heading: "Επιλεγμένα Έργα",
    cta_heading: "Έτοιμοι να ξεκινήσετε το επόμενο έργο σας;",
    cta_subheading: "Επικοινωνήστε με την ομάδα μας σήμερα.",
    cta_button: "Επικοινωνήστε μαζί μας",
    about_story_heading: "Η Ιστορία μας",
    about_team_heading: "Η Ομάδα μας",
    about_values_heading: "Οι Αξίες μας",
    about_certifications_heading: "Πιστοποιήσεις",
    projects_heading: "Έργα",
    filter_all: "Όλα",
    project_status_completed: "Ολοκληρωμένο",
    project_status_inprogress: "Σε Εξέλιξη",
    project_meta_category: "Κατηγορία",
    project_meta_location: "Τοποθεσία",
    project_meta_area: "Εμβαδόν (τ.μ.)",
    project_meta_status: "Κατάσταση",
    project_meta_year: "Έτος",
    careers_heading: "Καριέρα",
    careers_positions_heading: "Ανοιχτές Θέσεις",
    careers_form_heading: "Υποβολή Αίτησης",
    contact_heading: "Επικοινωνία",
    contact_info_heading: "Επικοινωνήστε μαζί μας",
    contact_phone_label: "+30 210 000 0000",
    contact_email_label: "info@formax.gr",
    contact_address_label: "Λεωφόρος Παράδειγμα 123, Αθήνα, Ελλάδα",
    form_name_label: "Ονοματεπώνυμο",
    form_name_placeholder: "Εισάγετε το ονοματεπώνυμό σας",
    form_email_label: "Email",
    form_email_placeholder: "Εισάγετε το email σας",
    form_subject_label: "Θέμα",
    form_subject_placeholder: "Εισάγετε ένα θέμα",
    form_message_label: "Μήνυμα",
    form_message_placeholder: "Εισάγετε το μήνυμά σας",
    form_position_label: "Θέση",
    form_cv_label: "Ανέβασμα Βιογραφικού",
    form_submit: "Υποβολή",
    form_submitting: "Υποβάλλεται...",
    form_success: "Ευχαριστούμε! Το μήνυμά σας εστάλη.",
    form_error: "Κάτι πήγε στραβά. Παρακαλούμε δοκιμάστε ξανά.",
    footer_tagline: "Κατασκευές ακριβείας, στην ώρα τους.",
    footer_rights: "Με επιφύλαξη παντός δικαιώματος.",
    notfound_heading: "404",
    notfound_message: "Η σελίδα δεν βρέθηκε.",
    notfound_link: "Επιστροφή στην αρχική",
  },
};
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: succeeds (data files aren't imported yet, but must be valid JS — this catches syntax errors).

- [ ] **Step 6: Commit**

```bash
git add src/data
git commit -m "feat: add placeholder data layer (stats, positions, projects, translations)"
```

---

### Task 4: LanguageContext + App Shell

**Files:**
- Create: `src/context/LanguageContext.jsx`
- Modify: `src/App.jsx` (replace Vite default)
- Modify: `src/main.jsx` (replace Vite default)

- [ ] **Step 1: Create LanguageContext.jsx**

```jsx
import { createContext, useContext, useState, useCallback } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("el");

  const t = useCallback((key) => translations[lang]?.[key] ?? key, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
```

- [ ] **Step 2: Replace App.jsx with a minimal shell (Home route only for now)**

```jsx
import { Routes, Route } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext";

function RoutePlaceholder({ title }) {
  return <div>{title}</div>;
}

export default function App() {
  const { t } = useLanguage();

  return (
    <main>
      <Routes>
        <Route path="/" element={<RoutePlaceholder title={t("hero_headline")} />} />
      </Routes>
    </main>
  );
}
```

- [ ] **Step 3: Replace main.jsx**

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import "./styles/variables.css";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);
```

- [ ] **Step 4: Verify the dev server renders the Greek headline at "/"**

Run:
```bash
npm run dev &
sleep 2
curl -s http://localhost:5173/ | grep -q '<div id="root">' && echo "OK: index served"
kill %1
```
Expected: `OK: index served` (full client-rendered content can't be checked via curl since it's a SPA — the real check is opening `http://localhost:5173/` in a browser and seeing "Χτίζουμε το μέλλον, με ακρίβεια." rendered).

- [ ] **Step 5: Commit**

```bash
git add src/context src/App.jsx src/main.jsx
git commit -m "feat: add LanguageContext and wire up app shell with router"
```

---

### Task 5: LanguageToggle Component

**Files:**
- Create: `src/components/LanguageToggle/LanguageToggle.jsx`
- Create: `src/components/LanguageToggle/LanguageToggle.css`

- [ ] **Step 1: Create LanguageToggle.jsx**

```jsx
import { useLanguage } from "../../context/LanguageContext";
import "./LanguageToggle.css";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="language-toggle">
      <button type="button" className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>
        EN
      </button>
      <span>/</span>
      <button type="button" className={lang === "el" ? "active" : ""} onClick={() => setLang("el")}>
        EL
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Create LanguageToggle.css**

```css
.language-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
```

- [ ] **Step 3: Temporarily mount it in App.jsx to verify, then revert**

Verify by editing `src/App.jsx` to import and render `<LanguageToggle />` above `<Routes>`, run `npm run dev`, open `http://localhost:5173/`, click EN/EL and confirm the headline text swaps language. Then revert `App.jsx` back to the Task 4 version (Navbar will mount it properly in Task 6).

- [ ] **Step 4: Commit**

```bash
git add src/components/LanguageToggle
git commit -m "feat: add LanguageToggle component"
```

---

### Task 6: Navbar Component

**Files:**
- Create: `src/components/Navbar/Navbar.jsx`
- Create: `src/components/Navbar/Navbar.css`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create Navbar.jsx**

```jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import { useLanguage } from "../../context/LanguageContext";
import "./Navbar.css";

const links = [
  { to: "/", key: "nav_home" },
  { to: "/about", key: "nav_about" },
  { to: "/projects", key: "nav_projects" },
  { to: "/careers", key: "nav_careers" },
  { to: "/contact", key: "nav_contact" },
];

export default function Navbar() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <img src="/assets/logo.svg" alt="FORMAX" />
      </div>

      <button
        type="button"
        className="navbar-hamburger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`navbar-links ${isOpen ? "open" : ""}`}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setIsOpen(false)}
          >
            {t(link.key)}
          </NavLink>
        ))}
      </nav>

      <div className="navbar-right">
        <LanguageToggle />
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Create Navbar.css**

```css
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-links {
  display: flex;
  gap: 1rem;
}

.navbar-hamburger {
  display: none;
  flex-direction: column;
  gap: 0.25rem;
}

@media (max-width: 768px) {
  .navbar-hamburger {
    display: flex;
  }

  .navbar-links {
    display: none;
    flex-direction: column;
    width: 100%;
  }

  .navbar-links.open {
    display: flex;
  }
}
```

- [ ] **Step 3: Mount Navbar in App.jsx**

```jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { useLanguage } from "./context/LanguageContext";

function RoutePlaceholder({ title }) {
  return <div>{title}</div>;
}

export default function App() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<RoutePlaceholder title={t("hero_headline")} />} />
        </Routes>
      </main>
    </>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: succeeds. Then `npm run dev`, open `http://localhost:5173/`, confirm the nav links render, the active link ("Αρχική"/"Home") is highlighted, and the hamburger appears at narrow widths.

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar src/App.jsx
git commit -m "feat: add Navbar with language toggle and mobile hamburger menu"
```

---

### Task 7: Footer Component

**Files:**
- Create: `src/components/Footer/Footer.jsx`
- Create: `src/components/Footer/Footer.css`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create Footer.jsx**

```jsx
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./Footer.css";

const links = [
  { to: "/", key: "nav_home" },
  { to: "/about", key: "nav_about" },
  { to: "/projects", key: "nav_projects" },
  { to: "/careers", key: "nav_careers" },
  { to: "/contact", key: "nav_contact" },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-column">
        <img src="/assets/logo.svg" alt="FORMAX" />
        <p>{t("footer_tagline")}</p>
      </div>

      <div className="footer-column">
        <nav className="footer-links">
          {links.map((link) => (
            <Link key={link.to} to={link.to}>
              {t(link.key)}
            </Link>
          ))}
        </nav>
      </div>

      <div className="footer-column">
        <p>{t("contact_phone_label")}</p>
        <p>{t("contact_email_label")}</p>
        <p>{t("contact_address_label")}</p>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} FORMAX. {t("footer_rights")}
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Create Footer.css**

```css
.footer {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.footer-bottom {
  width: 100%;
}
```

- [ ] **Step 3: Mount Footer in App.jsx**

```jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { useLanguage } from "./context/LanguageContext";

function RoutePlaceholder({ title }) {
  return <div>{title}</div>;
}

export default function App() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<RoutePlaceholder title={t("hero_headline")} />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: succeeds. Then confirm in the browser that the footer's 3 columns and copyright line render below the placeholder content.

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer src/App.jsx
git commit -m "feat: add Footer with nav links and contact info columns"
```

---

### Task 8: ProjectCard Component

**Files:**
- Create: `src/components/ProjectCard/ProjectCard.jsx`
- Create: `src/components/ProjectCard/ProjectCard.css`

- [ ] **Step 1: Create ProjectCard.jsx**

```jsx
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./ProjectCard.css";

export default function ProjectCard({ slug, title, category, status, coverImage }) {
  const { t } = useLanguage();

  return (
    <Link to={`/projects/${slug}`} className="project-card">
      <div className="project-card-image">{/* PLACEHOLDER IMAGE: {coverImage} */}</div>
      <div className="project-card-body">
        <h3>{title}</h3>
        <p>{category}</p>
        <span className="project-card-status">
          {status === "Completed" ? t("project_status_completed") : t("project_status_inprogress")}
        </span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Create ProjectCard.css**

```css
.project-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
}

.project-card-image {
  aspect-ratio: 16 / 9;
}

.project-card-body {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds (component isn't wired into a page yet — this only checks syntax; it will be exercised for real in Task 11).

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectCard
git commit -m "feat: add ProjectCard component"
```

---

### Task 9: StatCounter Component

**Files:**
- Create: `src/components/StatCounter/StatCounter.jsx`
- Create: `src/components/StatCounter/StatCounter.css`

- [ ] **Step 1: Create StatCounter.jsx**

```jsx
import { useEffect, useRef, useState } from "react";
import "./StatCounter.css";

export default function StatCounter({ value, label, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    function animateCount() {
      const duration = 1500;
      const start = performance.now();

      function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        setCount(Math.floor(progress * value));

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setCount(value);
        }
      }

      requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animateCount();
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="stat-counter" ref={ref}>
      <span className="stat-counter-value">
        {count}
        {suffix}
      </span>
      <span className="stat-counter-label">{label}</span>
    </div>
  );
}
```

- [ ] **Step 2: Create StatCounter.css**

```css
.stat-counter {
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds. Full animation behavior is verified once it's wired into Home in Task 11.

- [ ] **Step 4: Commit**

```bash
git add src/components/StatCounter
git commit -m "feat: add StatCounter with IntersectionObserver-driven count-up animation"
```

---

### Task 10: FilterBar Component

**Files:**
- Create: `src/components/FilterBar/FilterBar.jsx`
- Create: `src/components/FilterBar/FilterBar.css`

- [ ] **Step 1: Create FilterBar.jsx**

```jsx
import "./FilterBar.css";

export default function FilterBar({ categories, activeFilter, onFilterChange }) {
  return (
    <div className="filter-bar">
      {categories.map((category) => (
        <button
          key={category.value}
          type="button"
          className={activeFilter === category.value ? "active" : ""}
          onClick={() => onFilterChange(category.value)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create FilterBar.css**

```css
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds. Full filtering behavior is verified once wired into Projects in Task 13.

- [ ] **Step 4: Commit**

```bash
git add src/components/FilterBar
git commit -m "feat: add FilterBar component"
```

---

### Task 11: Home Page

**Files:**
- Create: `src/pages/Home/Hero.jsx`
- Create: `src/pages/Home/ServiceTeaser.jsx`
- Create: `src/pages/Home/FeaturedProjects.jsx`
- Create: `src/pages/Home/CTABanner.jsx`
- Create: `src/pages/Home/Home.jsx`
- Create: `src/pages/Home/Home.css`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create Hero.jsx**

```jsx
import { useLanguage } from "../../context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero">
      <h1>{t("hero_headline")}</h1>
      <p>{t("hero_subheadline")}</p>
    </section>
  );
}
```

- [ ] **Step 2: Create ServiceTeaser.jsx**

```jsx
import { useLanguage } from "../../context/LanguageContext";

const sectors = ["Healthcare", "Offices", "Retail", "Residential"];

export default function ServiceTeaser() {
  const { t } = useLanguage();

  return (
    <section className="service-teaser">
      <h2>{t("section_services_heading")}</h2>
      <div className="service-teaser-grid">
        {sectors.map((sector) => (
          <div className="service-teaser-card" key={sector}>
            <h3>{sector}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create FeaturedProjects.jsx**

```jsx
import { useLanguage } from "../../context/LanguageContext";
import { projects } from "../../data/projects";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

export default function FeaturedProjects() {
  const { t } = useLanguage();
  const featured = projects.slice(0, 3);

  return (
    <section className="featured-projects">
      <h2>{t("section_featured_projects_heading")}</h2>
      <div className="featured-projects-grid">
        {featured.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create CTABanner.jsx**

```jsx
import { useLanguage } from "../../context/LanguageContext";

export default function CTABanner() {
  const { t } = useLanguage();

  return (
    <section className="cta-banner">
      <h2>{t("cta_heading")}</h2>
      <p>{t("cta_subheading")}</p>
      <button type="button">{t("cta_button")}</button>
    </section>
  );
}
```

- [ ] **Step 5: Create Home.jsx**

```jsx
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
```

- [ ] **Step 6: Create Home.css**

```css
.page-home {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stats-section {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.service-teaser-grid,
.featured-projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
```

- [ ] **Step 7: Wire Home into App.jsx, replacing the placeholder route**

```jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 8: Verify**

Run: `npm run build`
Expected: succeeds. Then `npm run dev`, open `http://localhost:5173/`, and confirm: hero text renders, 4 stat counters are present (initially 0), the 4 sector cards render, 3 featured project cards render and link to `/projects/<slug>`, and the CTA banner renders. Scroll the stats section into view and confirm each counter animates up to its target value once.

- [ ] **Step 9: Commit**

```bash
git add src/pages/Home src/App.jsx
git commit -m "feat: build Home page with hero, stats, service teaser, featured projects, and CTA"
```

---

### Task 12: About Page

**Files:**
- Create: `src/pages/About/CompanyStory.jsx`
- Create: `src/pages/About/TeamGrid.jsx`
- Create: `src/pages/About/ValuesPillars.jsx`
- Create: `src/pages/About/CertificationsStrip.jsx`
- Create: `src/pages/About/About.jsx`
- Create: `src/pages/About/About.css`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create CompanyStory.jsx**

```jsx
import { useLanguage } from "../../context/LanguageContext";

export default function CompanyStory() {
  const { t } = useLanguage();

  return (
    <section className="company-story">
      <h2>{t("about_story_heading")}</h2>
      <div className="company-story-columns">
        <div className="company-story-text" />
        <div className="company-story-image">{/* PLACEHOLDER: company story image */}</div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create TeamGrid.jsx**

```jsx
import { useLanguage } from "../../context/LanguageContext";

const placeholderTeam = [1, 2, 3, 4];

export default function TeamGrid() {
  const { t } = useLanguage();

  return (
    <section className="team-grid">
      <h2>{t("about_team_heading")}</h2>
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
```

- [ ] **Step 3: Create ValuesPillars.jsx**

```jsx
import { useLanguage } from "../../context/LanguageContext";

const pillars = [1, 2, 3];

export default function ValuesPillars() {
  const { t } = useLanguage();

  return (
    <section className="values-pillars">
      <h2>{t("about_values_heading")}</h2>
      <div className="values-pillars-items">
        {pillars.map((id) => (
          <div className="values-pillar" key={id} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create CertificationsStrip.jsx**

```jsx
import { useLanguage } from "../../context/LanguageContext";

const placeholderLogos = [1, 2, 3, 4, 5];

export default function CertificationsStrip() {
  const { t } = useLanguage();

  return (
    <section className="certifications-strip">
      <h2>{t("about_certifications_heading")}</h2>
      <div className="certifications-strip-items">
        {placeholderLogos.map((id) => (
          <div className="certifications-strip-logo" key={id} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create About.jsx**

```jsx
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
```

- [ ] **Step 6: Create About.css**

```css
.page-about {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.company-story-columns {
  display: flex;
  gap: 1rem;
}

.team-grid-items,
.values-pillars-items,
.certifications-strip-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}
```

- [ ] **Step 7: Add the /about route in App.jsx**

```jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 8: Verify**

Run: `npm run build`
Expected: succeeds. Then confirm `http://localhost:5173/about` renders the 4 sections and the "About" nav link is highlighted as active.

- [ ] **Step 9: Commit**

```bash
git add src/pages/About src/App.jsx
git commit -m "feat: build About page with story, team, values, and certifications sections"
```

---

### Task 13: Projects Index Page

**Files:**
- Create: `src/pages/Projects/Projects.jsx`
- Create: `src/pages/Projects/Projects.css`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create Projects.jsx**

```jsx
import { useState, useMemo } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { projects } from "../../data/projects";
import FilterBar from "../../components/FilterBar/FilterBar";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import "./Projects.css";

export default function Projects() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("All");

  const filterCategories = [
    { value: "All", label: t("filter_all") },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Offices", label: "Offices" },
    { value: "Retail", label: "Retail" },
    { value: "Residential", label: "Residential" },
    { value: "Hospitality", label: "Hospitality" },
  ];

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="page-projects">
      <h1>{t("projects_heading")}</h1>
      <FilterBar categories={filterCategories} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create Projects.css**

```css
.page-projects {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

- [ ] **Step 3: Add the /projects route in App.jsx**

```jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Projects from "./pages/Projects/Projects";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: succeeds. Then on `http://localhost:5173/projects`, confirm all 6 project cards render under "All", and clicking each filter button shows only matching-category cards (e.g. "Healthcare" shows exactly 2: Athens General Hospital Wing, Thessaloniki Medical Center).

- [ ] **Step 5: Commit**

```bash
git add src/pages/Projects src/App.jsx
git commit -m "feat: build Projects index page with category filtering"
```

---

### Task 14: ProjectDetail Page

**Files:**
- Create: `src/pages/ProjectDetail/ProjectDetail.jsx`
- Create: `src/pages/ProjectDetail/ProjectDetail.css`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create ProjectDetail.jsx**

```jsx
import { useParams, Navigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { projects } from "../../data/projects";
import "./ProjectDetail.css";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="page-project-detail">
      <div className="project-detail-hero">{/* PLACEHOLDER: {project.coverImage} */}</div>

      <h1>{project.title}</h1>

      <dl className="project-detail-meta">
        <dt>{t("project_meta_category")}</dt>
        <dd>{project.category}</dd>

        <dt>{t("project_meta_location")}</dt>
        <dd>{project.location}</dd>

        <dt>{t("project_meta_area")}</dt>
        <dd>{project.area_sqm}</dd>

        <dt>{t("project_meta_status")}</dt>
        <dd>
          {project.status === "Completed" ? t("project_status_completed") : t("project_status_inprogress")}
        </dd>

        <dt>{t("project_meta_year")}</dt>
        <dd>{project.year}</dd>
      </dl>

      <div className="project-detail-gallery">
        {project.gallery.length === 0 && (
          <div className="project-detail-gallery-placeholder">{/* PLACEHOLDER: photo gallery */}</div>
        )}
        {project.gallery.map((image, index) => (
          <div className="project-detail-gallery-item" key={index}>
            {/* PLACEHOLDER: {image} */}
          </div>
        ))}
      </div>

      <p className="project-detail-description">{project.description}</p>
    </div>
  );
}
```

- [ ] **Step 2: Create ProjectDetail.css**

```css
.page-project-detail {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.project-detail-meta {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0.5rem 1rem;
}

.project-detail-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}
```

- [ ] **Step 3: Add the /projects/:slug route in App.jsx**

```jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Projects from "./pages/Projects/Projects";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: succeeds. Then confirm `http://localhost:5173/projects/athens-general-hospital-wing` renders the meta list, description, and gallery placeholder; and `http://localhost:5173/projects/does-not-exist` redirects to `/projects`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/ProjectDetail src/App.jsx
git commit -m "feat: build ProjectDetail page with meta, gallery placeholder, and not-found redirect"
```

---

### Task 15: Careers Page

**Files:**
- Create: `src/pages/Careers/PositionsList.jsx`
- Create: `src/components/CareerForm/CareerForm.jsx`
- Create: `src/components/CareerForm/CareerForm.css`
- Create: `src/pages/Careers/Careers.jsx`
- Create: `src/pages/Careers/Careers.css`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create PositionsList.jsx**

```jsx
export default function PositionsList({ positions }) {
  return (
    <ul className="positions-list">
      {positions.map((position) => (
        <li className="positions-list-item" key={position.id}>
          <h3>{position.title}</h3>
          <p>{position.department}</p>
          <span>{position.type}</span>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 2: Create CareerForm.jsx**

```jsx
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { positions } from "../../data/positions";
import "./CareerForm.css";

const initialState = {
  name: "",
  email: "",
  position: positions[0]?.id ?? "",
  message: "",
};

export default function CareerForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState(initialState);
  const [cvFile, setCvFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(event) {
    setCvFile(event.target.files[0] ?? null);
  }

  function validate() {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = true;
    if (!formData.position) newErrors.position = true;
    if (!formData.message.trim()) newErrors.message = true;
    return newErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("loading");

    try {
      const body = new FormData();
      body.append("name", formData.name);
      body.append("email", formData.email);
      body.append("position", formData.position);
      body.append("message", formData.message);
      if (cvFile) body.append("cv", cvFile);

      const response = await fetch("/api/send-career", { method: "POST", body });
      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setFormData(initialState);
        setCvFile(null);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="career-form" onSubmit={handleSubmit}>
      <label htmlFor="name">{t("form_name_label")}</label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder={t("form_name_placeholder")}
        value={formData.name}
        onChange={handleChange}
      />

      <label htmlFor="email">{t("form_email_label")}</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder={t("form_email_placeholder")}
        value={formData.email}
        onChange={handleChange}
      />

      <label htmlFor="position">{t("form_position_label")}</label>
      <select id="position" name="position" value={formData.position} onChange={handleChange}>
        {positions.map((position) => (
          <option key={position.id} value={position.id}>
            {position.title}
          </option>
        ))}
      </select>

      <label htmlFor="message">{t("form_message_label")}</label>
      <textarea
        id="message"
        name="message"
        placeholder={t("form_message_placeholder")}
        value={formData.message}
        onChange={handleChange}
      />

      <label htmlFor="cv">{t("form_cv_label")}</label>
      <input id="cv" name="cv" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />

      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? t("form_submitting") : t("form_submit")}
      </button>

      {status === "success" && <p className="form-message success">{t("form_success")}</p>}
      {status === "error" && <p className="form-message error">{t("form_error")}</p>}
    </form>
  );
}
```

- [ ] **Step 3: Create CareerForm.css**

```css
.career-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-message {
  margin: 0;
}
```

- [ ] **Step 4: Create Careers.jsx**

```jsx
import { useLanguage } from "../../context/LanguageContext";
import { positions } from "../../data/positions";
import PositionsList from "./PositionsList";
import CareerForm from "../../components/CareerForm/CareerForm";
import "./Careers.css";

export default function Careers() {
  const { t } = useLanguage();

  return (
    <div className="page-careers">
      <h1>{t("careers_heading")}</h1>

      <section>
        <h2>{t("careers_positions_heading")}</h2>
        <PositionsList positions={positions} />
      </section>

      <section>
        <h2>{t("careers_form_heading")}</h2>
        <CareerForm />
      </section>
    </div>
  );
}
```

- [ ] **Step 5: Create Careers.css**

```css
.page-careers {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.positions-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  padding: 0;
}

.positions-list-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
```

- [ ] **Step 6: Add the /careers route in App.jsx**

```jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Projects from "./pages/Projects/Projects";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import Careers from "./pages/Careers/Careers";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/careers" element={<Careers />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 7: Verify**

Run: `npm run build`
Expected: succeeds. Then on `http://localhost:5173/careers`, confirm all 4 positions list, the position `<select>` is populated from `positions.js`, the CV file input only accepts `.pdf/.doc/.docx`, submitting without required fields shows no crash, and submitting a valid form shows the loading state then a success or error message (the request will fail with a network/500 error until Task 18's `/api/send-career` exists and `RESEND_API_KEY` is set — that's expected at this point; confirm the error branch renders correctly instead).

- [ ] **Step 8: Commit**

```bash
git add src/pages/Careers src/components/CareerForm src/App.jsx
git commit -m "feat: build Careers page with positions list and career application form"
```

---

### Task 16: Contact Page

**Files:**
- Create: `src/components/ContactForm/ContactForm.jsx`
- Create: `src/components/ContactForm/ContactForm.css`
- Create: `src/pages/Contact/Contact.jsx`
- Create: `src/pages/Contact/Contact.css`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create ContactForm.jsx**

```jsx
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./ContactForm.css";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = true;
    if (!formData.subject.trim()) newErrors.subject = true;
    if (!formData.message.trim()) newErrors.message = true;
    return newErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setFormData(initialState);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label htmlFor="name">{t("form_name_label")}</label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder={t("form_name_placeholder")}
        value={formData.name}
        onChange={handleChange}
      />

      <label htmlFor="email">{t("form_email_label")}</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder={t("form_email_placeholder")}
        value={formData.email}
        onChange={handleChange}
      />

      <label htmlFor="subject">{t("form_subject_label")}</label>
      <input
        id="subject"
        name="subject"
        type="text"
        placeholder={t("form_subject_placeholder")}
        value={formData.subject}
        onChange={handleChange}
      />

      <label htmlFor="message">{t("form_message_label")}</label>
      <textarea
        id="message"
        name="message"
        placeholder={t("form_message_placeholder")}
        value={formData.message}
        onChange={handleChange}
      />

      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? t("form_submitting") : t("form_submit")}
      </button>

      {status === "success" && <p className="form-message success">{t("form_success")}</p>}
      {status === "error" && <p className="form-message error">{t("form_error")}</p>}
    </form>
  );
}
```

- [ ] **Step 2: Create ContactForm.css**

```css
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-message {
  margin: 0;
}
```

- [ ] **Step 3: Create Contact.jsx**

```jsx
import { useLanguage } from "../../context/LanguageContext";
import ContactForm from "../../components/ContactForm/ContactForm";
import "./Contact.css";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <div className="page-contact">
      <h1>{t("contact_heading")}</h1>

      <section className="contact-info">
        <h2>{t("contact_info_heading")}</h2>
        <p>{t("contact_phone_label")}</p>
        <p>{t("contact_email_label")}</p>
        <p>{t("contact_address_label")}</p>
      </section>

      <ContactForm />

      <div className="contact-map">{/* REPLACE WITH MAPS EMBED */}</div>
    </div>
  );
}
```

- [ ] **Step 4: Create Contact.css**

```css
.page-contact {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.contact-map {
  aspect-ratio: 16 / 9;
}
```

- [ ] **Step 5: Add the /contact route in App.jsx**

```jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Projects from "./pages/Projects/Projects";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import Careers from "./pages/Careers/Careers";
import Contact from "./pages/Contact/Contact";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 6: Verify**

Run: `npm run build`
Expected: succeeds. Then on `http://localhost:5173/contact`, confirm the contact info block, form, and map placeholder div all render; submitting the form shows the loading state then a success or error message (same expected-error caveat as Task 15 until Task 18 lands).

- [ ] **Step 7: Commit**

```bash
git add src/pages/Contact src/components/ContactForm src/App.jsx
git commit -m "feat: build Contact page with contact info, contact form, and map placeholder"
```

---

### Task 17: NotFound Page + Catch-All Route

**Files:**
- Create: `src/pages/NotFound/NotFound.jsx`
- Create: `src/pages/NotFound/NotFound.css`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create NotFound.jsx**

```jsx
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "./NotFound.css";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="page-not-found">
      <h1>{t("notfound_heading")}</h1>
      <p>{t("notfound_message")}</p>
      <Link to="/">{t("notfound_link")}</Link>
    </div>
  );
}
```

- [ ] **Step 2: Create NotFound.css**

```css
.page-not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
```

- [ ] **Step 3: Add the catch-all route in App.jsx (final route list)**

```jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Projects from "./pages/Projects/Projects";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import Careers from "./pages/Careers/Careers";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: succeeds. Then confirm `http://localhost:5173/does-not-exist` renders the 404 heading, message, and a working link back to `/`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/NotFound src/App.jsx
git commit -m "feat: add NotFound page and catch-all route"
```

---

### Task 18: Serverless Functions

**Files:**
- Create: `api/send-contact.js`
- Create: `api/send-career.js`

- [ ] **Step 1: Create api/send-contact.js**

```js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  const { name, email, subject, message } = req.body ?? {};

  if (!name || !email || !subject || !message) {
    res.status(400).json({ success: false, error: "Missing required fields" });
    return;
  }

  try {
    await resend.emails.send({
      from: "FORMAX Website <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL,
      subject: `New contact form submission: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
```

- [ ] **Step 2: Create api/send-career.js**

```js
import { Resend } from "resend";
import { IncomingForm } from "formidable";
import { readFile } from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const resend = new Resend(process.env.RESEND_API_KEY);

function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: false });
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  try {
    const { fields, files } = await parseForm(req);

    const name = fields.name?.[0] ?? fields.name;
    const email = fields.email?.[0] ?? fields.email;
    const position = fields.position?.[0] ?? fields.position;
    const message = fields.message?.[0] ?? fields.message;
    const cv = files.cv?.[0] ?? files.cv;

    if (!name || !email || !position || !message) {
      res.status(400).json({ success: false, error: "Missing required fields" });
      return;
    }

    const attachments = [];
    if (cv) {
      const content = await readFile(cv.filepath);
      attachments.push({
        filename: cv.originalFilename,
        content,
      });
    }

    await resend.emails.send({
      from: "FORMAX Website <onboarding@resend.dev>",
      to: process.env.CAREER_EMAIL,
      subject: `New career application: ${position}`,
      text: `Name: ${name}\nEmail: ${email}\nPosition: ${position}\n\n${message}`,
      attachments,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
```

- [ ] **Step 3: Verify the functions are syntactically valid**

Run:
```bash
node -e "import('./api/send-contact.js').then(() => console.log('send-contact OK')).catch((e) => { console.error(e); process.exit(1); })"
node -e "import('./api/send-career.js').then(() => console.log('send-career OK')).catch((e) => { console.error(e); process.exit(1); })"
```
Expected: both print their `OK` line (module loads and evaluates top-level code without throwing; `process.env.RESEND_API_KEY` being undefined is fine since `Resend()` doesn't validate until a call is made).

- [ ] **Step 4: Commit**

```bash
git add api
git commit -m "feat: add send-contact and send-career Vercel serverless functions"
```

---

### Task 19: Final Verification Against Spec

**Files:** none (verification only)

- [ ] **Step 1: Full production build**

Run: `npm run build`
Expected: succeeds with no errors or warnings about unresolved imports.

- [ ] **Step 2: Start the dev server and manually walk every route**

Run: `npm run dev`, then in a browser visit each of:
- `http://localhost:5173/` — Home renders (Hero, 4 stat counters, 4 sector cards, 3 featured project cards, CTA)
- `http://localhost:5173/about` — About renders (story, team grid, values, certifications)
- `http://localhost:5173/projects` — Projects renders (filter bar + 6 cards)
- `http://localhost:5173/projects/kifisia-residences` — ProjectDetail renders correct meta
- `http://localhost:5173/careers` — Careers renders (positions list + form)
- `http://localhost:5173/contact` — Contact renders (info + form + map placeholder)
- `http://localhost:5173/anything-else` — NotFound renders

Confirm none of the above throw a console error.

- [ ] **Step 3: Verify language toggle**

Click "EN" in the navbar — confirm every visible string (nav, headings, buttons, footer) switches to English. Click "EL" — confirm it switches back, including correct Greek accents (e.g. "Έργα", "Επικοινωνία", "Αρχική").

- [ ] **Step 4: Verify project filter**

On `/projects`, click each filter button (All, Healthcare, Offices, Retail, Residential, Hospitality) and confirm the grid updates to show only matching projects, with the clicked button receiving the `active` class.

- [ ] **Step 5: Verify StatCounter animation**

On `/`, reload the page so the stats section starts out of view, then scroll it into view. Confirm each of the 4 counters animates from 0 up to its target value once (`45000`, `38`, `12`, `24`) and does not re-trigger on subsequent scrolls past the section.

- [ ] **Step 6: Verify both forms**

On `/contact`, submit ContactForm with valid data — confirm the button disables during the request and a success or error message appears afterward (a real send requires `RESEND_API_KEY`/`CONTACT_EMAIL` to be set locally via `vercel dev`; under plain `npm run dev` the fetch to `/api/send-contact` will 404 since Vite doesn't serve `/api` — note this limitation and instead verify the request is fired and the error branch renders).
On `/careers`, submit CareerForm with valid data plus a `.pdf` file — confirm the same disable/success/error behavior.

- [ ] **Step 7: Verify serverless functions locally with Vercel CLI (optional but recommended)**

Run:
```bash
npx vercel dev
```
With `.env.local` populated from `.env.example` (a real `RESEND_API_KEY` is needed for an actual send; without one, confirm the endpoint still returns a well-formed `{ success: false, error }` JSON body rather than crashing). Re-run the Step 6 form submissions against `http://localhost:3000` and confirm `/api/send-contact` and `/api/send-career` respond as designed.

- [ ] **Step 8: Confirm the spec checklist**

- [ ] All 6 routes render without errors
- [ ] Language toggle switches all strings
- [ ] Project filter works
- [ ] StatCounter animates on scroll
- [ ] Both forms POST to their API endpoints and show success/error
- [ ] Vercel serverless functions are correctly structured

- [ ] **Step 9: Final commit (if any fixes were needed during verification)**

```bash
git add -A
git commit -m "fix: address issues found during final skeleton verification"
```
