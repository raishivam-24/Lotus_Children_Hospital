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

// Icons matched to each facility line from data.js — keyed by keyword so the
// list stays data-driven without hardcoding a whole new array.
const FACILITY_ICONS = [
  { match: /24x7 medical/i, icon: "🩺" },
  { match: /vaccination/i, icon: "💉" },
  { match: /admission/i, icon: "🛏️" },
  { match: /newborn intensive/i, icon: "👶" },
  { match: /paediatric intensive/i, icon: "🏥" },
  { match: /well baby/i, icon: "🍼" },
  { match: /adolescent/i, icon: "🧑" },
  { match: /neurology/i, icon: "🧠" },
  { match: /diabetic/i, icon: "🩸" },
  { match: /thalassemia/i, icon: "🩹" },
  { match: /genetic/i, icon: "🧬" },
  { match: /nephrology/i, icon: "💧" },
  { match: /surgical/i, icon: "🔬" },
];

function iconFor(text) {
  const found = FACILITY_ICONS.find((f) => f.match.test(text));
  return found ? found.icon : "✨";
}

// Pulls a short, card-friendly title out of the longer facility description
// in data.js, e.g. "Neurology Clinic (treatment for epilepsy...)" -> "Neurology Clinic".
function shortTitle(text) {
  const parenSplit = text.split(" (")[0];
  const dashSplit = parenSplit.split(" - ")[0];
  return dashSplit.length > 34 ? `${dashSplit.slice(0, 34)}…` : dashSplit;
}

// Alternating navy / teal / mint tones so the facility photo grid doesn't
// look monochrome. Swap each `src` in the card render for a real photo
// whenever available — layout and captions keep working unchanged.
const FACILITY_TONES = [
  ["1B4D3E", "ffffff"],
  ["4FA8A3", "ffffff"],
  ["DCEEEC", "1B4D3E"],
];

// Real photos take priority over the generated placeholder for any facility
// whose text includes the given keyword (case-insensitive). Add more entries
// here as real photos come in — e.g. nicu: "/images/facilities/nicu.jpg".
const FACILITY_PHOTOS = {
  "24x7": "/gallery/reception.png",
  vaccination: "/facilities/vaccination.png",
  nicu: "/gallery/nicu-1-2.png",
  picu: "/gallery/picu3.png",
  admission: "/gallery/private11.png",
};

function facilityImage(text, index) {
  const override = Object.keys(FACILITY_PHOTOS).find((key) =>
    text.toLowerCase().includes(key)
  );
  if (override) return FACILITY_PHOTOS[override];

  const [bg, fg] = FACILITY_TONES[index % FACILITY_TONES.length];
  return `https://placehold.co/480x340/${bg}/${fg}?text=${encodeURIComponent(
    shortTitle(text)
  )}&font=montserrat`;
}

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
  "Ventilator": "/facilities/ventilator.png",
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
          {facilitiesAvailable.map((facility, i) => (
            <Reveal
              as="div"
              className="lch-fac-card"
              key={facility}
              delay={(i % 6) * 70}
            >
              <div className="lch-fac-card__photo">
                <img
                  src={facilityImage(facility, i)}
                  alt={shortTitle(facility)}
                  loading="lazy"
                />
                <span className="lch-fac-card__badge">{iconFor(facility)}</span>
              </div>
              <div className="lch-fac-card__body">
                <h4>{shortTitle(facility)}</h4>
                <p>{facility}</p>
              </div>
            </Reveal>
          ))}
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