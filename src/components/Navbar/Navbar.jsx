import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { stripAccents } from "../../utils/text";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import wordmark from "../../assets/FORMAX-letters-only.svg";
import iconLogo from "../../assets/FORMAX-icon-only.svg";
import "./Navbar.css";

const links = [
  { to: "/about", key: "nav_about" },
  { to: "/projects", key: "nav_projects" },
  { to: "/careers", key: "nav_careers" },
];

const homeLink = { to: "/", key: "nav_home" };
const contactLink = { to: "/contact", key: "nav_contact" };

export default function Navbar() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showCenterLogo, setShowCenterLogo] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const heroLogoEl = document.querySelector(".hero-logo-big");
    if (!heroLogoEl) {
      setShowCenterLogo(true);
      return undefined;
    }

    setShowCenterLogo(false);
    const observer = new IntersectionObserver(([entry]) => setShowCenterLogo(!entry.isIntersecting), {
      rootMargin: "-80px 0px 0px 0px",
    });
    observer.observe(heroLogoEl);
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <header className="navbar">
      <Link
        to="/"
        className={`navbar-center-logo ${showCenterLogo ? "visible" : ""}`}
        onClick={() => setIsOpen(false)}
      >
        <img className="navbar-center-logo-wordmark" src={wordmark} alt="FORMAX" />
      </Link>

      <nav className={`navbar-links ${isOpen ? "open" : ""}`}>
        <div className="navbar-links-list">
          <NavLink
            to={homeLink.to}
            end
            className={({ isActive }) => `navbar-home-mobile ${isActive ? "active" : ""}`}
            style={{ "--link-index": 0 }}
            onClick={() => setIsOpen(false)}
          >
            {stripAccents(t(homeLink.key))}
          </NavLink>
          {links.map((link, index) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? "active" : "")}
              style={{ "--link-index": index + 1 }}
              onClick={() => setIsOpen(false)}
            >
              {stripAccents(t(link.key))}
            </NavLink>
          ))}
          <NavLink
            to={contactLink.to}
            className={({ isActive }) => `navbar-contact-mobile ${isActive ? "active" : ""}`}
            style={{ "--link-index": links.length + 1 }}
            onClick={() => setIsOpen(false)}
          >
            {stripAccents(t(contactLink.key))}
          </NavLink>
        </div>
        <div className="navbar-mobile-utilities">
          <Link to="/" className="navbar-mobile-icon" onClick={() => setIsOpen(false)}>
            <img src={iconLogo} alt="FORMAX" />
          </Link>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </nav>

      <div className="navbar-right">
        <Link to={contactLink.to} className="btn-primary navbar-contact-btn">
          {stripAccents(t(contactLink.key))}
        </Link>
        <LanguageToggle />
        <ThemeToggle />
      </div>

      <button
        type="button"
        className={`navbar-hamburger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <span />
        <span />
      </button>

      <div
        className={`navbar-backdrop ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
    </header>
  );
}
