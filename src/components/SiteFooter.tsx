import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Brand } from "./Brand";
import { CONTACT, FOOTER } from "@/lib/content";
import { EMAIL, PHONE } from "@/lib/site";

const SOCIALS = [
  { label: "اینستاگرام", Icon: Instagram },
  { label: "فیسبوک", Icon: Facebook },
  { label: "لینکدین", Icon: Linkedin },
  { label: "توییتر", Icon: Twitter },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="content-width">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>{FOOTER.about}</p>
          </div>

          {FOOTER.columns.map((column) => (
            <div className="footer-column" key={column.heading}>
              <h3>{column.heading}</h3>
              {column.links.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}

          <div className="footer-column contact-column">
            <h3>{FOOTER.contactHeading}</h3>
            <a href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}>
              <Phone size={13} />
              <span dir="ltr">{PHONE}</span>
            </a>
            <a href={`mailto:${EMAIL}`}>
              <Mail size={13} />
              <span dir="ltr">{EMAIL}</span>
            </a>
            <p>
              <MapPin size={13} />
              {CONTACT.address}
            </p>
            <div className="social-links">
              {SOCIALS.map(({ label, Icon }) => (
                <a key={label} href="#" aria-label={label}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{FOOTER.copyright}</p>
          <div>
            {FOOTER.legal.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
