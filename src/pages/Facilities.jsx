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

// Equipment gets a photo placeholder — swap `src` for real equipment photos
// whenever available, layout stays the same.
const EQUIPMENT_IMAGES = {
  Ventilator: "001F3F",
  "Bedside Monitor": "008080",
  "Bubble CPAP": "001F3F",
  "Double Surface Phototherapy": "008080",
  "Infant Warmer": "001F3F",
};

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
                src={`https://placehold.co/500x360/${EQUIPMENT_IMAGES[item] || "008080"}/ffffff?text=${encodeURIComponent(
                  item
                )}&font=montserrat`}
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
              <span className="lch-fac-card__icon">{iconFor(facility)}</span>
              <p>{facility}</p>
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