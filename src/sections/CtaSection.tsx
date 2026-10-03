import { useState } from "react";
import { ArrowRight, KeyRound } from "lucide-react";

import { Button } from "@/components/Button";
import { LeadModal } from "@/components/LeadModal";
import { CTA_COPY } from "@/data/content";

export function CtaSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="contact" className="scroll-mt-24 bg-white pb-20 lg:pb-28">
      <div className="shell">
        <div
          data-reveal
          className="flex flex-col gap-7 rounded-card bg-mist px-7 py-9 sm:px-10 sm:py-10 lg:flex-row lg:items-center lg:gap-10 lg:px-14"
        >
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-navy/12 bg-white text-navy shadow-[0_10px_24px_-16px_rgba(13,37,63,0.5)]">
            <KeyRound size={22} aria-hidden="true" />
          </span>

          <div className="flex-1">
            <h2 className="text-[clamp(1.35rem,2.4vw,1.85rem)] text-ink">{CTA_COPY.title}</h2>
            <p className="mt-2.5 text-[0.9rem] text-body">{CTA_COPY.text}</p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => setModalOpen(true)}
            className="w-full shrink-0 lg:w-auto"
          >
            {CTA_COPY.cta}
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </div>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} mode="contact" />
    </section>
  );
}
