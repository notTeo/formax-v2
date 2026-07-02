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
