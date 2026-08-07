import { NavLink } from "react-router-dom";
import lotusData from "../data/data";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  const { contact } = lotusData;

  return (
    <footer className="lch-footer">
      <div className="lch-footer__top">
        <div className="lch-footer__brand">
          <span className="lch-footer__name">{lotusData.hospitalName}</span>
          <p className="lch-footer__tagline">{lotusData.tagline}</p>
          <p className="lch-footer__timing">
            🕘 {contact.consultationTiming}
          </p>
        </div>

        <div className="lch-footer__col">
          <h4>Explore</h4>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/facilities">Facilities</NavLink></li>
            <li><NavLink to="/doctors">Doctors</NavLink></li>
            <li><NavLink to="/gallery">Gallery</NavLink></li>
            <li><NavLink to="/contact">Contact Us</NavLink></li>
          </ul>
        </div>

        <div className="lch-footer__col">
          <h4>Services</h4>
          <ul>
            {contact.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
            <li>Ayushman Bharat (PM-JAY) accepted</li>
          </ul>
        </div>

        <div className="lch-footer__col">
          <h4>Get in Touch</h4>
          <ul>
            <li>{contact.address}</li>
            {contact.phones.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone}`}>{phone}</a>
              </li>
            ))}
            <li>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="lch-footer__bottom">
        <p>
          © {year} {lotusData.hospitalName}. Nurturing with heart and science.
        </p>
        <div className="lch-footer__legal">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/emergency-guide">Emergency Guide</a>
          <a href="/patient-rights">Patient Rights</a>
          <a href="/careers">Careers</a>
        </div>
      </div>
    </footer>
  );
}