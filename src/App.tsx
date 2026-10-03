import { useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Camera,
  Compass,
  Facebook,
  FileText,
  Instagram,
  KeyRound,
  LineChart,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Twitter,
  Users,
} from "lucide-react";

import { Brand } from "@/components/Brand";
import Hero from "@/components/Hero";
import { EMAIL, PHONE } from "@/lib/site";

import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import lakesideImg from "@/assets/property-lakeside.jpg";
import triptychImg from "@/assets/property-triptych.jpg";

const properties = [
  { title: "Lakeside Residence", place: "Lake Como, Italy", price: "$4,250,000", crop: "" },
  { title: "The Glass Pavilion", place: "Aspen, Colorado", price: "$3,180,000", crop: "crop-left" },
  { title: "Hillcrest Manor", place: "Beverly Hills, CA", price: "$5,900,000", crop: "crop-center" },
  { title: "Cedar Ridge House", place: "Portland, Oregon", price: "$1,760,000", crop: "crop-right" },
];

const reasons = [
  {
    icon: ShieldCheck,
    title: "Verified listings",
    text: "Every home is inspected and its paperwork checked before it reaches you.",
  },
  {
    icon: Users,
    title: "Local advisors",
    text: "Agents who live in the neighbourhoods they sell, from Aspen to Como.",
  },
  {
    icon: LineChart,
    title: "Sharp pricing",
    text: "Live market data keeps your offer competitive and your sale well timed.",
  },
  {
    icon: Sparkles,
    title: "End-to-end care",
    text: "From first viewing to final signature, one team handles the whole move.",
  },
];

const services = [
  {
    icon: Compass,
    title: "BUYING",
    text: "Curated shortlists and private viewings tailored to how you want to live.",
  },
  {
    icon: KeyRound,
    title: "SELLING",
    text: "Photography, staging and a launch plan that puts your home in front of the right buyers.",
  },
  {
    icon: Building2,
    title: "INVESTMENT",
    text: "Yield analysis and portfolio guidance for residential and mixed-use assets.",
  },
  {
    icon: LineChart,
    title: "VALUATION",
    text: "A precise, data-backed estimate of what your property is worth today.",
  },
  {
    icon: FileText,
    title: "LEGAL & TAX",
    text: "Trusted partners handle contracts, escrow and cross-border paperwork.",
  },
  {
    icon: Camera,
    title: "STAGING",
    text: "Interior styling and virtual tours that make every listing feel like home.",
  },
];

const footerLinks = {
  Explore: [
    { label: "About", href: "#about" },
    { label: "Properties", href: "#properties" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],
  Company: [
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Partners", href: "#" },
    { label: "Journal", href: "#" },
  ],
};

export default function App() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollTrack = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth * 0.6, behavior: "smooth" });
  };

  return (
    <div id="top">
      <Hero />

      <main>
        <section id="about" className="about-section content-width">
          <div className="about-copy">
            <p className="eyebrow">ABOUT HORIZON</p>
            <h2>A modern practice for buying and selling exceptional homes</h2>
            <p className="body-copy">
              For over a decade we have matched discerning owners with properties that
              hold their value and their character. We keep our list small, our advice
              honest and our process calm from the first viewing to the final key.
            </p>
            <a className="primary-action" href="#properties">
              Explore our listings
              <ArrowRight size={15} />
            </a>
          </div>

          <div className="about-gallery">
            <img className="about-main" src={aboutImg} alt="Sunlit living space with wide windows" />
            <div className="about-preview">
              <img src={heroImg} alt="" aria-hidden="true" />
            </div>
            <button className="round-control about-next" type="button" aria-label="Next image">
              <ArrowRight size={18} />
            </button>
          </div>
        </section>

        <section id="properties" className="properties-section content-width">
          <div className="section-heading">
            <p className="eyebrow">FEATURED LISTINGS</p>
            <h2>Properties on the market</h2>
          </div>

          <div className="carousel-wrap">
            <div className="property-track" ref={trackRef}>
              {properties.map((property) => (
                <article className="property-card" key={property.title}>
                  <img
                    className={property.crop || undefined}
                    src={property.crop ? triptychImg : lakesideImg}
                    alt={property.title}
                  />
                  <div className="property-details">
                    <div>
                      <h3>{property.title}</h3>
                      <p>
                        <MapPin size={13} />
                        {property.place}
                      </p>
                    </div>
                    <strong>{property.price}</strong>
                  </div>
                </article>
              ))}
            </div>

            <button
              className="round-control carousel-prev"
              type="button"
              aria-label="Previous properties"
              onClick={() => scrollTrack(-1)}
            >
              <ArrowLeft size={18} />
            </button>
            <button
              className="round-control carousel-next"
              type="button"
              aria-label="More properties"
              onClick={() => scrollTrack(1)}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </section>

        <section id="contact" className="contact-section content-width">
          <div className="key-icon">
            <KeyRound size={24} />
          </div>
          <div className="contact-copy">
            <h2>Ready to find your next home?</h2>
            <p>Tell us what you are looking for and an advisor will get back within a day.</p>
          </div>
          <a className="primary-action contact-action" href={`mailto:${EMAIL}`}>
            Book a consultation
          </a>
        </section>

        <section className="why-section">
          <div className="content-width">
            <div className="section-heading">
              <p className="eyebrow">WHY HORIZON</p>
              <h2>Built around how you actually move</h2>
            </div>

            <div className="reason-grid">
              {reasons.map((reason) => (
                <div className="reason-item" key={reason.title}>
                  <reason.icon size={26} />
                  <h3>{reason.title}</h3>
                  <p>{reason.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="services-section content-width">
          <div className="services-heading">
            <p className="eyebrow">OUR SERVICES</p>
            <h2>Everything you need, under one roof</h2>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <service.icon size={26} />
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a href="#contact" aria-label={`Learn more about ${service.title.toLowerCase()}`}>
                  <ArrowRight size={16} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <div className="content-width">
          <section className="final-cta">
            <p className="eyebrow">GET STARTED</p>
            <h2>Let’s find your horizon</h2>
            <p>
              Book a private viewing this week and walk through the homes that match
              your shortlist — no pressure, no obligation.
            </p>
            <a className="light-action" href={`mailto:${EMAIL}`}>
              Schedule a viewing
              <ArrowRight size={15} />
            </a>
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <div className="content-width">
          <div className="footer-grid">
            <div className="footer-brand">
              <Brand />
              <p>
                A boutique real estate practice representing distinctive homes across
                the coast, the mountains and the city.
              </p>
            </div>

            {Object.entries(footerLinks).map(([heading, links]) => (
              <div className="footer-column" key={heading}>
                <h3>{heading.toUpperCase()}</h3>
                {links.map((link) => (
                  <a key={link.label} href={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            ))}

            <div className="footer-column contact-column">
              <h3>GET IN TOUCH</h3>
              <a href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}>
                <Phone size={13} />
                {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`}>
                <Mail size={13} />
                {EMAIL}
              </a>
              <p>
                <MapPin size={13} />
                128 Harbor Way, Suite 400
              </p>
              <div className="social-links">
                <a href="#" aria-label="Instagram">
                  <Instagram size={15} />
                </a>
                <a href="#" aria-label="Facebook">
                  <Facebook size={15} />
                </a>
                <a href="#" aria-label="LinkedIn">
                  <Linkedin size={15} />
                </a>
                <a href="#" aria-label="Twitter">
                  <Twitter size={15} />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Horizon Real Estate. All rights reserved.</p>
            <div>
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
