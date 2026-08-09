import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import lotusData from "../data/data";
import "./HomePage.css";
import "./Facilities.css";

// Tiny scroll-reveal wrapper — adds "is-visible" once the element enters
// the viewport, no extra libraries needed.
function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`lch-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// ---------- Icon set ----------
// Small, stroke-based SVGs (24x24, currentColor) so every icon inherits its
// card's accent color and stays crisp at any size — no image files, no new
// dependency. Add a new icon here + a matching FACILITY_ICONS entry below
// whenever a new facility line needs its own glyph.
const ICONS = {
  stethoscope: (
    <path d="M4.5 3v6a4.5 4.5 0 0 0 9 0V3M9 15.5a4.5 4.5 0 0 0 9 0v-2M18 9v1.5a3 3 0 1 1-3-3" />
  ),
  syringe: (
    <path d="m18 2 4 4m-4.5-2.5-9 9 3 3 9-9M8.5 12.5 3 18l1 2 2 1 5.5-5.5M6 16l2 2" />
  ),
  bed: (
    <path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 18v2M21 18v2M3 13h18M7 9V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3" />
  ),
  baby: (
    <path d="M9 12h.01M15 12h.01M8.5 15.5c1 1 2 1.5 3.5 1.5s2.5-.5 3.5-1.5M12 3a4 4 0 0 0-4 4c0 1 .3 1.7.8 2.4C7.7 10.2 7 11.5 7 13a5 5 0 0 0 10 0c0-1.5-.7-2.8-1.8-3.6.5-.7.8-1.4.8-2.4a4 4 0 0 0-4-4Z" />
  ),
  building: (
    <path d="M4 21V7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v14M12 21v-9a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v9M4 21h16M8 10h.01M8 14h.01M16 14h.01" />
  ),
  bottle: (
    <path d="M10 2h4M11 2v3.5c0 .4-.15.8-.44 1.1L9 8.4c-.6.6-.9 1.4-.9 2.2v9.4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-9.4c0-.8-.3-1.6-.9-2.2l-1.56-1.8A1.6 1.6 0 0 1 13 5.5V2" />
  ),
  user: (
    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 21c0-3.9 3.1-7 7-7s7 3.1 7 7" />
  ),
  brain: (
    <path d="M9.5 3a3 3 0 0 0-3 3c0 .4 0 .8.15 1.15A3 3 0 0 0 5 10a3 3 0 0 0 1.15 4.85A3 3 0 0 0 9 19a3 3 0 0 0 .5-.05V3.05A3 3 0 0 0 9.5 3ZM14.5 3a3 3 0 0 1 3 3c0 .4 0 .8-.15 1.15A3 3 0 0 1 19 10a3 3 0 0 1-1.15 4.85A3 3 0 0 1 15 19a3 3 0 0 1-.5-.05V3.05a3 3 0 0 1 .5-.05Z" />
  ),
  droplet: (
    <path d="M12 2.7s6 6.4 6 10.6a6 6 0 0 1-12 0c0-4.2 6-10.6 6-10.6Z" />
  ),
  bandage: (
    <path d="m4.9 14.5 5.6-5.6a3 3 0 0 1 4.2 0l4.4 4.4a3 3 0 0 1 0 4.2l-5.6 5.6a3 3 0 0 1-4.2 0l-4.4-4.4a3 3 0 0 1 0-4.2ZM9 15l6-6M11 8l.01.01M14.5 11.5l.01.01" />
  ),
  dna: (
    <path d="M7 3s0 4 5 4 5 4 5 4-0 4-5 4-5 4-5 4M4 6h1M19 6h-1M4 18h1M19 18h-1M6 9h2M16 9h2M6 15h2M16 15h2" />
  ),
  waves: (
    <path d="M3 16c1.3 1.3 2.7 1.3 4 0s2.7-1.3 4 0 2.7 1.3 4 0 2.7-1.3 4-1.3M3 11c1.3 1.3 2.7 1.3 4 0s2.7-1.3 4 0 2.7 1.3 4 0 2.7-1.3 4-1.3" />
  ),
  scalpel: (
    <path d="M20 4 9 15l-3 1 1-3L18 2l2 2ZM6 18l-2 2M9 15l3 3" />
  ),
  sparkle: (
    <path d="M12 3v4M12 17v4M4.2 4.2l2.8 2.8M17 17l2.8 2.8M3 12h4M17 12h4M4.2 19.8 7 17M17 7l2.8-2.8" />
  ),
};

function Icon({ name, className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name] || ICONS.sparkle}
    </svg>
  );
}

// Icon matched to each facility line from data.js — keyed by keyword so the
// list stays data-driven without hardcoding a whole new array.
const FACILITY_ICONS = [
  { match: /24x7 medical/i, icon: "stethoscope" },
  { match: /vaccination/i, icon: "syringe" },
  { match: /admission/i, icon: "bed" },
  { match: /newborn intensive/i, icon: "baby" },
  { match: /paediatric intensive/i, icon: "building" },
  { match: /well baby/i, icon: "bottle" },
  { match: /adolescent/i, icon: "user" },
  { match: /neurology/i, icon: "brain" },
  { match: /diabetic/i, icon: "droplet" },
  { match: /thalassemia/i, icon: "bandage" },
  { match: /genetic/i, icon: "dna" },
  { match: /nephrology/i, icon: "waves" },
  { match: /surgical/i, icon: "scalpel" },
];

function iconFor(text) {
  const found = FACILITY_ICONS.find((f) => f.match.test(text));
  return found ? found.icon : "sparkle";
}

// Pulls a short, card-friendly title out of the longer facility description
// in data.js, e.g. "Neurology Clinic (treatment for epilepsy...)" -> "Neurology Clinic".
function shortTitle(text) {
  const parenSplit = text.split(" (")[0];
  const dashSplit = parenSplit.split(" - ")[0];
  return dashSplit.length > 34 ? `${dashSplit.slice(0, 34)}…` : dashSplit;
}

// Alternating pink / mint / deep-green tones so the facility icon grid
// doesn't look monochrome.
const FACILITY_TONES = ["lch-fac-tone--pink", "lch-fac-tone--mint", "lch-fac-tone--deep"];

// Equipment gets a photo placeholder — swap `src` for real equipment photos
// whenever available, layout stays the same.
const EQUIPMENT_IMAGES = {
  Ventilator: "1B4D3E",
  "Bedside Monitor": "4FA8A3",
  "Bubble CPAP": "1B4D3E",
  "Double Surface Phototherapy": "4FA8A3",
  "Infant Warmer": "1B4D3E",
};

// Real equipment photos take priority over the color placeholder above.
// Add more entries as real photos come in — key must match the exact
// string used in data.js's `equipment` array.
const EQUIPMENT_PHOTOS = {
  Ventilator: "/facilities/ventilator.png",
  "Bedside Monitor": "/facilities/bedside-monitor.png",
  "Bubble CPAP": "/facilities/Bubble CPAP.png",
  "Double Surface Phototherapy": "/facilities/double-surface-phototherapy.png",
  "Infant Warmer": "/facilities/infant-warmer.png",
};

function equipmentImage(item) {
  if (EQUIPMENT_PHOTOS[item]) return EQUIPMENT_PHOTOS[item];
  return `https://placehold.co/500x360/${EQUIPMENT_IMAGES[item] || "008080"}/ffffff?text=${encodeURIComponent(
    item
  )}&font=montserrat`;
}

export default function Facilities() {
  const { facilitiesAvailable, equipment, governmentScheme, contact } = lotusData;

  return (
    <div className="lch-page lch-fac-page">
      <Header />

      {/* HERO */}
      <section className="lch-fac-hero">
        <div className="lch-fac-hero__blob lch-fac-hero__blob--1" />
        <div className="lch-fac-hero__blob lch-fac-hero__blob--2" />
        <Reveal as="span" className="lch-eyebrow">
          Lotus Children's Hospital
        </Reveal>
        <Reveal as="h1" delay={80}>
          Care &amp; Facilities
        </Reveal>
        <Reveal as="p" delay={160} className="lch-fac-hero__sub">
          Critical care, comfort, and everything in between — under one roof.
        </Reveal>
      </section>

      {/* GOVERNMENT SCHEME */}
      <Reveal as="section" className="lch-scheme">
        <div className="lch-scheme__badge lch-fac-pulse">🏛️</div>
        <div>
          <h3>{governmentScheme.name}</h3>
          <p>{governmentScheme.benefit}</p>
        </div>
        <NavLink to="/contact" className="lch-btn lch-btn--primary lch-btn--sm">
          Ask About Eligibility
        </NavLink>
      </Reveal>

      {/* EQUIPMENT */}
      <section className="lch-fac-section">
        <Reveal as="div" className="lch-section__head">
          <span className="lch-eyebrow">On-Site Equipment</span>
          <h2>Ready for critical moments</h2>
        </Reveal>

        <div className="lch-fac-equip-grid">
          {equipment.map((item, i) => (
            <Reveal
              as="div"
              className="lch-fac-equip-card"
              key={item}
              delay={i * 90}
            >
              <img
                src={equipmentImage(item)}
                alt={item}
                loading="lazy"
              />
              <span className="lch-fac-equip-card__label">{item}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FACILITIES AVAILABLE */}
      <section className="lch-fac-section lch-fac-section--tinted">
        <Reveal as="div" className="lch-section__head">
          <span className="lch-eyebrow">Clinics &amp; Care</span>
          <h2>Facilities available</h2>
        </Reveal>

        <div className="lch-fac-grid">
          {facilitiesAvailable.map((facility, i) => {
            const tone = FACILITY_TONES[i % FACILITY_TONES.length];
            return (
              <Reveal
                as="div"
                className="lch-fac-card"
                key={facility}
                delay={(i % 6) * 70}
              >
                <div className={`lch-fac-card__icon ${tone}`}>
                  <Icon name={iconFor(facility)} className="lch-fac-card__icon-svg" />
                </div>
                <div className="lch-fac-card__body">
                  <h4>{shortTitle(facility)}</h4>
                  <p>{facility}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <Reveal as="section" className="lch-cta">
        <h2>Ready to start your child's healing journey?</h2>
        <p>
          Schedule a visit, or call us any time between{" "}
          {contact.consultationTiming.replace("Daily, ", "")}.
        </p>
        <NavLink to="/contact" className="lch-btn lch-btn--primary lch-btn--lg">
          Book an Appointment Now
        </NavLink>
      </Reveal>

      <Footer />
    </div>
  );
}