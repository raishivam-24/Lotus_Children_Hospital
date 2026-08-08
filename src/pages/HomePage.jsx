import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import lotusData from "../data/data";
import logo from "../assets/logo.png";
import "./HomePage.css";

const HIGHLIGHT_FACILITIES = [
  {
    image: "/gallery/nicu-1-1.png",
    title: "NICU",
    desc: "Newborn Intensive Care Unit for round-the-clock critical newborn care.",
  },
  {
    image: "/gallery/picu3.png",
    title: "PICU",
    desc: "Paediatric Intensive Care Unit for critically ill children.",
  },
  {
    image: "/gallery/reception.png",
    title: "24×7 Admission",
    desc: "Round-the-clock emergency admission facility.",
  },
  {
    image: "/gallery/private11.png",
    title: "Private & General Wards",
    desc: "Comfortable private rooms and general wards.",
  },
];

export default function HomePage() {
  const { doctors, governmentScheme, contact } = lotusData;

  return (
    <div className="lch-page">
      <Header />

      {/* HERO */}
      <section className="lch-hero">
        <div className="lch-hero__text">
          <span className="lch-eyebrow">Lotus Children's Hospital</span>
          <h1>
            Where healing feels
            <br />
            like <em>home</em>.
          </h1>
          <p>
            Where medical excellence meets emotional well-being. We provide a
            soothing, playful environment designed specifically for the unique
            needs of children and their families.
          </p>
          <div className="lch-hero__actions">
            <NavLink to="/contact" className="lch-btn lch-btn--primary">
              Book an Appointment
            </NavLink>
            <NavLink to="/facilities" className="lch-btn lch-btn--outline">
              Our Facilities
            </NavLink>
          </div>
          <p className="lch-hero__timing">
            🕘 Consultation: {contact.consultationTiming}
          </p>
        </div>
        <div className="lch-hero__art" aria-hidden="true">
          <svg
            className="lch-hero__blob"
            viewBox="0 0 200 200"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <radialGradient id="lchBlobGradient" cx="32%" cy="32%" r="75%">
                <stop offset="0%" stopColor="#DCEEEC" />
                <stop offset="60%" stopColor="#F0ECE3" />
                <stop offset="100%" stopColor="#F9F7F2" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path
              transform="translate(100 100)"
              fill="url(#lchBlobGradient)"
              d="M45.7,-49.5C58.9,-39.7,68.4,-24.4,70.5,-8.1C72.6,8.2,67.3,25.5,56.6,38.5C45.9,51.5,29.8,60.2,12.4,63.9C-5,67.6,-23.7,66.3,-38.7,57.4C-53.7,48.5,-65,32,-68.5,14.1C-72,-3.8,-67.7,-23.1,-56.7,-37.4C-45.7,-51.7,-28,-61,-9.9,-63.4C8.2,-65.8,26.4,-59.3,45.7,-49.5Z"
            />
          </svg>
          <div className="lch-hero__logo">
            <img src={logo} alt="Lotus Children's Hospital" />
          </div>
        </div>
      </section>

      {/* GOVERNMENT SCHEME */}
      <section className="lch-scheme">
        <div className="lch-scheme__badge">🏛️</div>
        <div>
          <h3>{governmentScheme.name}</h3>
          <p>{governmentScheme.benefit}</p>
        </div>
        <NavLink to="/contact" className="lch-btn lch-btn--primary lch-btn--sm">
          Ask About Eligibility
        </NavLink>
      </section>

      {/* FACILITIES */}
      <section className="lch-section" id="facilities">
        <div className="lch-section__head">
          <span className="lch-eyebrow">Care & Facilities</span>
          <h2>Everything your child may need, under one roof</h2>
          <p>
            From routine checkups to critical care, our facilities are built
            around comfort, safety, and speed when it matters most.
          </p>
        </div>

        <div className="lch-facility-grid">
          {HIGHLIGHT_FACILITIES.map((item) => (
            <div className="lch-facility-card" key={item.title}>
              <div className="lch-facility-card__image">
                <img src={item.image} alt={item.title} />
              </div>

              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="lch-facility-more">
          <NavLink to="/facilities" className="lch-btn lch-btn--outline">
            See All Clinics &amp; Equipment
          </NavLink>
        </div>
      </section>

      {/* DOCTORS */}
      <section className="lch-section lch-section--tinted" id="doctors">
        <div className="lch-section__head">
          <span className="lch-eyebrow">Meet Our Specialists</span>
          <h2>World-class pediatric experts</h2>
          <p>Dedicated to your child's health and happiness.</p>
        </div>

        <div className="lch-doctor-grid">
          {doctors.map((doc) => (
            <div className="lch-doctor-card" key={doc.regNo}>
              <div className="lch-doctor-card__avatar" aria-hidden="true">
                {doc.name
                  .replace("Dr. ", "")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h4>{doc.name}</h4>
              <p className="lch-doctor-card__spec">{doc.specialization}</p>
              <ul className="lch-doctor-card__quals">
                {doc.qualifications.slice(0, 3).map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
              <span className="lch-doctor-card__reg">Reg. No. {doc.regNo}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="lch-cta">
        <h2>Ready to start your child's healing journey?</h2>
        <p>
          Our team is here to provide the nurturing care your family
          deserves. Schedule a visit to our sensory-friendly facilities
          today.
        </p>
        <NavLink to="/contact" className="lch-btn lch-btn--primary lch-btn--lg">
          Book an Appointment Now
        </NavLink>
      </section>

      <Footer />
    </div>
  );
}