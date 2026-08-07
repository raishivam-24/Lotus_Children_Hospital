import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import lotusData from "../data/data";
import "./HomePage.css";
import "./Contact.css";

const SERVICE_OPTIONS = [
  "General Consultation",
  "Vaccination",
  "NICU / Newborn Care",
  "PICU / Critical Care",
  "Well Baby Clinic",
  "Adolescent Clinic",
  "Neurology Clinic",
  "Diabetic Clinic",
  "Nephrology Clinic",
  "Surgical Consultation",
];

export default function Contact() {
  const { contact } = lotusData;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend wired up yet — swap this for a real API call / email
    // service when one is available.
    setSubmitted(true);
  };

  const mapQuery = encodeURIComponent(contact.address);

  return (
    <div className="lch-page lch-contact-page">
      <Header />

      {/* HERO */}
      <section className="lch-contact-hero">
        <h1>Get in Touch</h1>
        <p>
          We're here to answer your questions and help schedule your
          child's next visit.
        </p>
      </section>

      {/* FORM + INFO */}
      <section className="lch-contact-body">
        <form className="lch-contact-form" onSubmit={handleSubmit}>
          {submitted ? (
            <div className="lch-contact-form__success">
              <h3>Thank you! 🌸</h3>
              <p>
                Your message has been noted. Our team will reach out to you
                shortly — for anything urgent, please call{" "}
                <a href={`tel:${contact.phones[0]}`}>{contact.phones[0]}</a>.
              </p>
              <button
                type="button"
                className="lch-btn lch-btn--outline"
                onClick={() => setSubmitted(false)}
              >
                Send another message
              </button>
            </div>
          ) : (
            <>
              <label className="lch-field">
                <span>Full Name</span>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
              </label>

              <div className="lch-field-row">
                <label className="lch-field">
                  <span>Email Address</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label className="lch-field">
                  <span>Phone Number</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="(555) 123-4567"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              <label className="lch-field">
                <span>Preferred Service</span>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select a service...
                  </option>
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="lch-field">
                <span>Message</span>
                <textarea
                  name="message"
                  placeholder="How can we help you?"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </label>

              <button type="submit" className="lch-contact-form__submit">
                Send Message
              </button>
            </>
          )}
        </form>

        <aside className="lch-contact-info">
          <div className="lch-contact-info__item">
            <span className="lch-contact-info__icon">📍</span>
            <div>
              <h3>Our Location</h3>
              <p>{contact.address}</p>
            </div>
          </div>

          <div className="lch-contact-info__item">
            <span className="lch-contact-info__icon">🕘</span>
            <div>
              <h3>Consultation Timing</h3>
              <p>{contact.consultationTiming}</p>
            </div>
          </div>

          <div className="lch-contact-info__item">
            <span className="lch-contact-info__icon">📞</span>
            <div>
              <h3>Contact Info</h3>
              {contact.phones.map((phone) => (
                <p key={phone}>
                  <a href={`tel:${phone}`}>{phone}</a>
                </p>
              ))}
              <p>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
            </div>
          </div>

          <hr className="lch-contact-info__divider" />

          <a href="#" className="lch-contact-info__faq">
            Frequently Asked Questions <span aria-hidden="true">→</span>
          </a>
        </aside>
      </section>

      {/* MAP */}
      <section className="lch-contact-map">
        <iframe
          title="Lotus Children's Hospital location"
          src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <Footer />
    </div>
  );
}