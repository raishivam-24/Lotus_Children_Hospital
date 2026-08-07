import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import lotusData from "../data/data";
import "./HomePage.css";
import "./Doctors.css";

// Generates a clean placeholder headshot from the doctor's initials.
// Swap the `src` for a real photo path whenever one is available.
function avatarUrl(name) {
  const clean = name.replace("Dr. ", "");
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    clean
  )}&background=001F3F&color=fff&size=320&font-size=0.36&bold=true`;
}

export default function Doctors() {
  const { doctors, contact } = lotusData;

  return (
    <div className="lch-page lch-docs-page">
      <Header />

      {/* HERO */}
      <section className="lch-docs-hero">
        <span className="lch-eyebrow">Lotus Children's Hospital</span>
        <h1>Meet Our Specialists</h1>
        <p>
          World-class pediatric experts dedicated to your child's health and
          happiness — across neonatal, critical, and general child care.
        </p>
        <p className="lch-docs-hero__timing">
          🕘 Consultation: {contact.consultationTiming}
        </p>
      </section>

      {/* DOCTOR PROFILES */}
      <section className="lch-docs-list">
        {doctors.map((doc, index) => (
          <article
            className={`lch-doc ${index % 2 === 1 ? "lch-doc--reverse" : ""}`}
            key={doc.regNo}
          >
            <div className="lch-doc__photo">
              <img src={avatarUrl(doc.name)} alt={doc.name} />
            </div>

            <div className="lch-doc__info">
              <span className="lch-eyebrow">{doc.specialization}</span>
              <h2>{doc.name}</h2>
              <p className="lch-doc__hindiName">{doc.nameHindi}</p>

              <h4 className="lch-doc__label">Qualifications</h4>
              <ul className="lch-doc__quals">
                {doc.qualifications.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>

              <div className="lch-doc__meta">
                <span className="lch-doc__reg">
                  Registration No. {doc.regNo}
                </span>
              </div>

              <NavLink
                to="/contact"
                className="lch-btn lch-btn--primary"
              >
                Book an Appointment
              </NavLink>
            </div>
          </article>
        ))}
      </section>

      {/* CTA */}
      <section className="lch-cta">
        <h2>Not sure which specialist your child needs?</h2>
        <p>
          Call us and our team will help you find the right doctor for your
          child's needs, or walk in for a consultation any day between{" "}
          {contact.consultationTiming.replace("Daily, ", "")}.
        </p>
        <a
          href={`tel:${contact.phones[0]}`}
          className="lch-btn lch-btn--primary lch-btn--lg"
        >
          📞 Call {contact.phones[0]}
        </a>
      </section>

      <Footer />
    </div>
  );
}