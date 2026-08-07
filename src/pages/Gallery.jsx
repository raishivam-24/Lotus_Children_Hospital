import { useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import lotusData from "../data/data";
import "./HomePage.css";
import "./Gallery.css";

// Placeholder photos generated per category so the gallery is fully laid out
// before real hospital photography is available. Swap each `src` for a real
// image path (e.g. "/images/gallery/nicu-1.jpg") whenever ready — the rest
// of the layout, captions, and lightbox will keep working unchanged.
function placeholder(label, bg, fg) {
  return `https://placehold.co/700x500/${bg}/${fg}?text=${encodeURIComponent(
    label
  )}&font=montserrat`;
}

const GALLERY_SECTIONS = [
  {
    id: "exterior",
    title: "Hospital — Front & Back View",
    desc: "A first look at Lotus Children's Hospital, inside and out.",
    images: [
      { src: placeholder("Front View", "001F3F", "ffffff"), caption: "Main entrance & façade" },
      { src: placeholder("Back View", "001F3F", "ffffff"), caption: "Rear building view" },
      { src: placeholder("Night View", "001F3F", "ffffff"), caption: "Hospital at night" },
    ],
  },
  {
    id: "reception",
    title: "Reception Area",
    desc: "A warm, welcoming first stop for every family that walks in.",
    images: [
      { src: placeholder("Reception Desk", "008080", "ffffff"), caption: "Reception desk" },
      { src: placeholder("Waiting Lounge", "008080", "ffffff"), caption: "Waiting lounge" },
      { src: placeholder("Registration Counter", "008080", "ffffff"), caption: "Registration counter" },
    ],
  },
  {
    id: "nicu-1",
    title: "NICU — 1",
    desc: "Newborn Intensive Care Unit, bay 1 — round-the-clock monitoring.",
    images: [
      { src: placeholder("NICU 1 - Bay", "e0f2f1", "001F3F"), caption: "NICU bay 1" },
      { src: placeholder("NICU 1 - Warmer", "e0f2f1", "001F3F"), caption: "Infant warmer station" },
    ],
  },
  {
    id: "nicu-2",
    title: "NICU — 2",
    desc: "Newborn Intensive Care Unit, bay 2.",
    images: [
      { src: placeholder("NICU 2 - Bay", "e0f2f1", "001F3F"), caption: "NICU bay 2" },
      { src: placeholder("NICU 2 - Monitor", "e0f2f1", "001F3F"), caption: "Bedside monitoring" },
    ],
  },
  {
    id: "nicu-3",
    title: "NICU — 3",
    desc: "Newborn Intensive Care Unit, bay 3.",
    images: [
      { src: placeholder("NICU 3 - Bay", "e0f2f1", "001F3F"), caption: "NICU bay 3" },
      { src: placeholder("NICU 3 - CPAP", "e0f2f1", "001F3F"), caption: "Bubble CPAP setup" },
    ],
  },
  {
    id: "private-ward",
    title: "Private Ward",
    desc: "Comfortable, private rooms for families who want extra privacy.",
    images: [
      { src: placeholder("Private Room", "f8f9fa", "001F3F"), caption: "Private patient room" },
      { src: placeholder("Attendant Area", "f8f9fa", "001F3F"), caption: "Attendant seating area" },
      { src: placeholder("Private Washroom", "f8f9fa", "001F3F"), caption: "Attached washroom" },
    ],
  },
  {
    id: "picu",
    title: "PICU",
    desc: "Paediatric Intensive Care Unit for critically ill children.",
    images: [
      { src: placeholder("PICU Bay", "001F3F", "ffffff"), caption: "PICU bed & monitors" },
      { src: placeholder("PICU Ventilator", "001F3F", "ffffff"), caption: "Ventilator support station" },
    ],
  },
  {
    id: "ot",
    title: "Operation Theatre",
    desc: "A fully equipped OT for all paediatric surgical procedures.",
    images: [
      { src: placeholder("Operation Theatre", "008080", "ffffff"), caption: "Main operation theatre" },
      { src: placeholder("Pre-Op Room", "008080", "ffffff"), caption: "Pre-operative room" },
      { src: placeholder("Sterilization Area", "008080", "ffffff"), caption: "Sterilization area" },
    ],
  },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null); // { src, caption } | null

  return (
    <div className="lch-page lch-gallery-page">
      <Header />

      {/* HERO */}
      <section className="lch-gallery-hero">
        <span className="lch-eyebrow">Lotus Children's Hospital</span>
        <h1>A Look Inside Our Hospital</h1>
        <p>
          From the moment you walk in to the care behind every ward — take a
          visual tour of the spaces built around your child's comfort and
          safety.
        </p>
      </section>

      {/* QUICK NAV */}
      <nav className="lch-gallery-nav" aria-label="Gallery sections">
        {GALLERY_SECTIONS.map((section) => (
          <a key={section.id} href={`#${section.id}`} className="lch-gallery-nav__chip">
            {section.title}
          </a>
        ))}
      </nav>

      {/* SECTIONS */}
      {GALLERY_SECTIONS.map((section, i) => (
        <section
          id={section.id}
          key={section.id}
          className={`lch-gallery-section ${i % 2 === 1 ? "lch-gallery-section--tinted" : ""}`}
        >
          <div className="lch-gallery-section__head">
            <h2>{section.title}</h2>
            <p>{section.desc}</p>
          </div>

          <div className="lch-gallery-grid">
            {section.images.map((img) => (
              <button
                type="button"
                className="lch-gallery-item"
                key={img.src}
                onClick={() => setLightbox(img)}
              >
                <img src={img.src} alt={img.caption} loading="lazy" />
                <span className="lch-gallery-item__caption">{img.caption}</span>
              </button>
            ))}
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="lch-cta">
        <h2>Want to see it in person?</h2>
        <p>
          Book an appointment and visit our sensory-friendly facilities
          yourself — our team would love to show you around.
        </p>
        <NavLink to="/contact" className="lch-btn lch-btn--primary lch-btn--lg">
          Book an Appointment
        </NavLink>
      </section>

      <Footer />

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="lch-lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="lch-lightbox__close"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            ✕
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.caption} />
            <figcaption>{lightbox.caption}</figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}