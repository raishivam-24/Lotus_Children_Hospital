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
      { src: "/gallery/hospital-front-view.png", caption: "Main entrance & façade" , ratio: "16/9" },
      { src: "/gallery/hospital-front-2.png", caption: "Rear building view" },
      { src: "/gallery/hospital-back-view.png", caption: "Hospital back view" , ratio: "16/9" },
    ],
  },
  {
    id: "reception",
    title: "Reception Area",
    desc: "A warm, welcoming first stop for every family that walks in.",
    images: [
      { src: "/gallery/reception.png", caption: "Reception desk"},
      { src: "/gallery/waiting-area.png", caption: "Waiting lounge" },
      { src: "/gallery/pharmacy.png", caption: "Pharmacy Conter", ratio: "16/9"},
    ],
  },
  {
    id: "nicu-1",
    title: "NICU — 1",
    desc: "Newborn Intensive Care Unit, bay 1 — round-the-clock monitoring.",
    images: [
      { src: "/gallery/nicu-1.png", caption: "NICU 1" },
      { src: "/gallery/nicu-1-1.png", caption: "Infant warmer station" },
      { src: "/gallery/nicu-1-2.png", caption: "Infant warmer station" },
      { src: "/gallery/nicu-1-3.png", caption: "Infant warmer station" },
      { src: "/gallery/nicu-1-4.png", caption: "Infant warmer station" },
    ],
  },
  {
    id: "nicu-2",
    title: "NICU — 2",
    desc: "Newborn Intensive Care Unit, bay 2.",
    images: [
      { src: "/gallery/nicu-2.png", caption: "NICU 2" },
      { src: "/gallery/nicu-2-1.png", caption: "Infant warmer station" },
      { src: "/gallery/nicu-2-2.png", caption: "Infant warmer station" },
      { src: "/gallery/nicu-2-3.png", caption: "Infant warmer station" },
      { src: "/gallery/nicu-2-4.png", caption: "Infant warmer station" },
    ],
  },
  {
    id: "nicu-3",
    title: "NICU — 3",
    desc: "Newborn Intensive Care Unit, bay 3.",
    images: [
      { src: "/gallery/nicu3.png", caption: "NICU bay 3" },
      { src: "/gallery/nicu31.png", caption: "Bedside monitoring" },
      { src: "/gallery/nicu32.png", caption: "Bedside monitoring" },
      { src: "/gallery/nicu33.png", caption: "Bedside monitoring" },
    ],
  },
  {
    id: "private-ward",
    title: "Private Ward",
    desc: "Comfortable, private rooms for families who want extra privacy.",
    images: [
      { src: "/gallery/private1.png", caption: "Private room door" },
      { src: "/gallery/private11.png", caption: "Private room" },
      { src: "/gallery/private2.png", caption: "Private room door" },
      { src: "/gallery/private21.png", caption: "Private room" },
      
    ],
  },
  {
    id: "picu",
    title: "PICU",
    desc: "Paediatric Intensive Care Unit for critically ill children.",
    images: [
      { src: "/gallery/picu1.png", caption: "PICU Entrance" },
      { src: "/gallery/picu2.png", caption: "PICU bed" },
      { src: "/gallery/picu3.png", caption: "PICU bed" },
      { src: "/gallery/picu4.png", caption: "PICU bed" },   
      { src: "/gallery/picu5.png", caption: "PICU desk" },   
    ],
  },
  {
    id: "ot",
    title: "Operation Theatre",
    desc: "A fully equipped OT for all paediatric surgical procedures.",
    images: [
      { src: "/gallery/OT1.png", caption: "Operation Theatre entrance" },
      { src: "/gallery/OT2.png", caption: "Operation Theatre interior" },
      { src: "/gallery/OT3.png", caption: "Operation Theatre interior" },
      { src: "/gallery/OT4.png", caption: "Operation Theatre interior" },
      { src: "/gallery/OT5.png", caption: "Operation Theatre interior" },
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
                style={{ aspectRatio: img.ratio || "9 / 16" }}
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