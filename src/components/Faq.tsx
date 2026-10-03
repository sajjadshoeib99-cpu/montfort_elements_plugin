import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { FAQ } from "@/lib/content";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="faq-section content-width">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">سؤالات متداول</p>
        <h2>پاسخ سؤال‌های پرتکرار</h2>
      </div>

      <div className="faq-list">
        {FAQ.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <article
              className={`faq-item ${isOpen ? "is-open" : ""}`}
              key={item.q}
              data-reveal
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <button
                className="faq-question"
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{item.q}</span>
                {isOpen ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
