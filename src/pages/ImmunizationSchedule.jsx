import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import lotusData from "../data/data";
import "./HomePage.css";
import "./Facilities.css";
import "./ImmunizationSchedule.css";

// Same scroll-reveal wrapper used on Facilities — kept local so this page
// has no new shared-component dependency. If it's ever pulled into
// components/, both pages can just import the one copy.
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

// Alternates the same pink / mint / deep-green tones used across the site
// (Facilities uses the equivalent FACILITY_TONES pattern) so the age rail
// doesn't read as one flat color top to bottom.
const AGE_TONES = ["lch-imm-age--pink", "lch-imm-age--mint", "lch-imm-age--deep"];

// Devanagari run — letters plus the punctuation that shows up mid-phrase
// (danda, comma, slash, "+") so a gloss like "बी.सी.जी. + पोलियो की वैक्सीन"
// is captured as one chunk instead of fragmenting at the "+".
const DEVANAGARI = /[\u0900-\u097F][\u0900-\u097F\u0964\u0965\s,./+-]*[\u0900-\u097F]|[\u0900-\u097F]/g;

// Split "DTwP/DTaP (डी.टी.पी.) - II, HepB - III" into two separate vaccine
// entries, but only when it's actually two shots joined by a comma — not
// a single dosing note like "HPV 0, 1, 6 Month". Commas inside parentheses
// (e.g. the Hindi gloss list in MMR's entry) are never split on.
function splitCompoundVaccine(raw) {
  const parts = [];
  let depth = 0;
  let current = "";
  for (const ch of raw) {
    if (ch === "(") depth++;
    if (ch === ")") depth = Math.max(0, depth - 1);
    if (ch === "," && depth === 0) {
      parts.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  parts.push(current);

  if (parts.length === 1) return [raw.trim()];
  const rest = parts.slice(1).map((p) => p.trim());
  const looksLikeDosingList = rest.some((p) => /^\d/.test(p));
  if (looksLikeDosingList) return [raw.trim()];
  return parts.map((p) => p.trim()).filter(Boolean);
}

function parseVaccine(raw) {
  const hindiRuns = raw.match(DEVANAGARI) || [];
  const caption = hindiRuns.join(" ").replace(/\s+/g, " ").trim();

  let english = raw.replace(DEVANAGARI, "");
  // Drop parens now containing only leftover symbols/spaces (what a Hindi
  // gloss like "(डी.टी.पी.)" turns into once the Devanagari is stripped).
  english = english.replace(/\([^A-Za-z0-9]*\)/g, "").replace(/\s{2,}/g, " ").trim();

  // A trailing English parenthetical that survived (e.g. "(For Live Vaccine
  // Single dose)") becomes a secondary note instead of getting mashed into
  // the name.
  let note = "";
  const noteMatch = english.match(/\(([^()]+)\)\s*$/);
  if (noteMatch) {
    note = noteMatch[1].trim();
    english = english.slice(0, noteMatch.index).trim();
  }

  // Trailing dose marker: "- I", "- II/OPV", "- I + OPV", "- B-1" ...
  let dose = "";
  const doseMatch = english.match(/-\s*([A-Za-z0-9/+\s]+)$/);
  if (doseMatch) {
    dose = doseMatch[1].trim();
    english = english.slice(0, doseMatch.index).trim();
  }

  english = english.replace(/^[\s-]+|[\s-]+$/g, "").trim();
  const name = english || caption || raw.trim();
  const showCaption = caption && caption !== name;

  const isBooster = /booster|बूस्टर/i.test(raw);

  return { name, dose, note, caption: showCaption ? caption : "", tag: isBooster ? "BOOSTER" : "SCHEDULED" };
}

function VaccineCard({ raw, delay }) {
  const { name, dose, note, caption, tag } = parseVaccine(raw);
  const [open, setOpen] = useState(false);

  return (
    <Reveal as="div" className="lch-imm-card" delay={delay}>
      <div className="lch-imm-card__main">
        <div className="lch-imm-card__heading">
          <span className="lch-imm-card__name">{name}</span>
          <span className={`lch-imm-badge ${tag === "BOOSTER" ? "is-booster" : "is-scheduled"}`}>
            {tag}
          </span>
          {dose && <span className="lch-imm-dose">Dose {dose}</span>}
        </div>
        {caption && <p className="lch-imm-caption">{caption}</p>}
        {note && <p className="lch-imm-note-line">{note}</p>}
      </div>
      <button
        type="button"
        className="lch-imm-info"
        aria-label={`More detail about ${name}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        i
      </button>
      {open && (
        <div className="lch-imm-popover" role="note">
          {lotusData.immunizationSchedule.generalNotes[0]}
        </div>
      )}
    </Reveal>
  );
}

export default function ImmunizationSchedule() {
  const { immunizationSchedule, contact } = lotusData;

  return (
    <div className="lch-page lch-imm-page">
      <Header />

      {/* HERO */}
      <section className="lch-fac-hero lch-imm-hero">
        <div className="lch-fac-hero__blob lch-fac-hero__blob--1" />
        <div className="lch-fac-hero__blob lch-fac-hero__blob--2" />
        <Reveal as="span" className="lch-eyebrow">
          Lotus Children's Hospital
        </Reveal>
        <Reveal as="h1" delay={80}>
          Immunization Schedule
        </Reveal>
        <Reveal as="p" delay={160} className="lch-fac-hero__sub">
          The IAP-recommended vaccine timeline, age by age — so nothing gets missed between
          visits.
        </Reveal>
      </section>

      {/* HOW TO READ IT */}
      <Reveal as="section" className="lch-scheme lch-imm-howto">
        <div className="lch-scheme__badge">📋</div>
        <div>
          <h3>How to read this chart</h3>
          <p>{immunizationSchedule.note}</p>
        </div>
      </Reveal>

      {/* SCHEDULE */}
      <section className="lch-fac-section lch-fac-section--tinted">
        <Reveal as="div" className="lch-section__head">
          <span className="lch-eyebrow">Birth to 16 Years</span>
          <h2>Age-by-age vaccines</h2>
        </Reveal>

        <div className="lch-imm-list">
          {immunizationSchedule.schedule.map((entry, rowIndex) => {
            const tone = AGE_TONES[rowIndex % AGE_TONES.length];
            const [ageMain, ageSubRaw] = entry.age.split(/\s(?=\()/);
            const ageSub = ageSubRaw ? ageSubRaw.replace(/[()]/g, "") : "";
            const doses = entry.vaccines.flatMap(splitCompoundVaccine);

            return (
              <div className="lch-imm-row" key={entry.age}>
                <div className={`lch-imm-age ${tone}`}>
                  <span className="lch-imm-age__main">{ageMain}</span>
                  {ageSub && <span className="lch-imm-age__sub">{ageSub}</span>}
                </div>
                <div className="lch-imm-stack">
                  {doses.map((dose, i) => (
                    <VaccineCard raw={dose} key={dose} delay={i * 60} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* GOOD TO KNOW */}
      <section className="lch-fac-section">
        <Reveal as="div" className="lch-section__head">
          <span className="lch-eyebrow">Before You Go</span>
          <h2>Good to know</h2>
        </Reveal>
        <Reveal as="ul" className="lch-imm-notes" delay={80}>
          {immunizationSchedule.generalNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </Reveal>
      </section>

      {/* CTA */}
      <Reveal as="section" className="lch-cta">
        <h2>Ready to book your child's next dose?</h2>
        <p>
          Vaccination runs daily, or call us any time between{" "}
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