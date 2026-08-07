import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import lotusData from "../data/data";
import "./Header.css";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Facilities", to: "/facilities" },
  { label: "Doctors", to: "/doctors" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact Us", to: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever a link is tapped
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`lch-header ${scrolled ? "lch-header--scrolled" : ""}`}>
      <div className="lch-header__inner">
        <NavLink to="/" className="lch-header__brand" onClick={closeMenu}>
          <span className="lch-header__mark" aria-hidden="true">
            <svg viewBox="0 0 48 48" width="30" height="30">
              <path
                d="M24 6c3 6 9 8 9 15a9 9 0 0 1-18 0c0-7 6-9 9-15Z"
                fill="#8F2F49"
              />
              <path
                d="M24 20c4 3 12 3 15 9-4 5-12 6-15 3-3 3-11 2-15-3 3-6 11-6 15-9Z"
                fill="#1D6B58"
              />
            </svg>
          </span>
          <span className="lch-header__name">{lotusData.hospitalName}</span>
        </NavLink>

        <nav
          className={`lch-header__nav ${menuOpen ? "lch-header__nav--open" : ""}`}
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={closeMenu}
              className={({ isActive }) =>
                "lch-header__link" + (isActive ? " lch-header__link--active" : "")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="lch-header__actions">
          <a
            className="lch-header__phone"
            href={`tel:${lotusData.contact.phones[0]}`}
          >
            📞 {lotusData.contact.phones[0]}
          </a>
          <NavLink to="/contact" className="lch-btn lch-btn--primary lch-btn--sm">
            Book an Appointment
          </NavLink>
        </div>

        <button
          type="button"
          className={`lch-header__burger ${menuOpen ? "lch-header__burger--open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}