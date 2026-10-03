import { PROCESS } from "@/lib/content";

export default function Process() {
  return (
    <section className="process-section" data-depth>
      <div className="content-width">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">مسیر کار</p>
          <h2>از اولین تماس تا تحویل کلید</h2>
        </div>

        <ol className="process-grid">
          {PROCESS.map((item, index) => (
            <li
              className="process-step"
              key={item.step}
              data-reveal
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <span className="process-number">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
