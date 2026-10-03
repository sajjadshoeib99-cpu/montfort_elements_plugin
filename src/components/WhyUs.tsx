import { REASONS } from "@/lib/content";

export default function WhyUs() {
  return (
    <section className="why-section" data-depth>
      <div className="content-width">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">چرا هورایزن</p>
          <h2>ساخته‌شده بر اساس سبک واقعی زندگی شما</h2>
        </div>

        <div className="reason-grid" data-reveal>
          {REASONS.map((reason) => (
            <div className="reason-item" key={reason.title}>
              <span className="reason-icon">
                <reason.icon size={24} />
              </span>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
