import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/content";

export default function Testimonials() {
  return (
    <section className="testimonials-section content-width">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">نظر مشتریان</p>
        <h2>تجربهٔ کسانی که خانه‌شان را با ما پیدا کردند</h2>
      </div>

      <div className="testimonial-grid">
        {TESTIMONIALS.map((item, index) => (
          <figure
            className="testimonial-card"
            key={item.name}
            data-reveal
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <Quote className="testimonial-icon" size={22} aria-hidden="true" />
            <blockquote>{item.quote}</blockquote>
            <figcaption>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
