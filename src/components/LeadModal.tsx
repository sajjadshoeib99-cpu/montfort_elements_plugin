import { useEffect, useRef, useState } from "react";
import { CalendarCheck, Check, X } from "lucide-react";

import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

export type LeadMode = "viewing" | "contact";

type Props = {
  open: boolean;
  onClose: () => void;
  mode: LeadMode;
  propertyName?: string;
};

type Errors = Partial<Record<"name" | "email" | "phone" | "date", string>>;

const COPY: Record<LeadMode, { title: string; text: string; submit: string }> = {
  viewing: {
    title: "Schedule a viewing",
    text: "Tell us when suits you and an advisor will confirm within one business day.",
    submit: "Request viewing",
  },
  contact: {
    title: "Contact the agent",
    text: "Send a question about this property and we will reply the same working day.",
    submit: "Send enquiry",
  },
};

export function LeadModal({ open, onClose, mode, propertyName }: Props) {
  const copy = COPY[mode];
  const [values, setValues] = useState({ name: "", email: "", phone: "", date: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setSent(false);
    setErrors({});
    const timer = window.setTimeout(() => firstFieldRef.current?.focus(), 120);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  const update = (key: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (values.phone.trim() && values.phone.replace(/\D/g, "").length < 7)
      next.phone = "Please enter a valid phone number.";
    if (mode === "viewing" && !values.date) next.date = "Choose a preferred date.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    try {
      const key = "horizon:leads";
      const list = JSON.parse(window.localStorage.getItem(key) ?? "[]");
      window.localStorage.setItem(
        key,
        JSON.stringify([
          ...list,
          { ...values, mode, propertyName: propertyName ?? null, at: new Date().toISOString() },
        ]),
      );
    } catch {
      /* storage unavailable — the confirmation still shows */
    }
    setSent(true);
  };

  const inputClass = (field: keyof Errors) =>
    cn("field", errors[field] && "border-red-500/70 focus:border-red-500");

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto p-4 py-10 sm:items-center">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="fixed inset-0 h-full w-full cursor-default bg-navy-deep/70 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        className="animate-rise relative w-full max-w-[520px] overflow-hidden rounded-card bg-white shadow-[0_40px_80px_-40px_rgba(8,25,43,0.8)]"
      >
        <div className="flex items-start justify-between gap-6 border-b border-line px-6 py-5">
          <div>
            <h2 id="lead-modal-title" className="text-[1.15rem] text-ink">
              {sent ? "Request received" : copy.title}
            </h2>
            {propertyName ? (
              <p className="mt-1 text-[0.78rem] text-body">{propertyName}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-navy transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-white"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        {sent ? (
          <div className="px-6 py-8 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gold/20 text-navy">
              <Check size={22} aria-hidden="true" />
            </span>
            <p className="mt-4 text-[0.9rem] leading-[1.8] text-body">
              Thank you, {values.name.split(" ")[0] || "there"}. {mode === "viewing" ? "Your viewing request has been noted" : "Your enquiry has been noted"} for{" "}
              <span className="font-semibold text-ink">{propertyName ?? "Horizon Properties"}</span>. An
              advisor will be in touch shortly.
            </p>
            <div className="mt-6 flex justify-center">
              <Button variant="primary" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="px-6 py-6">
            <p className="text-[0.82rem] leading-[1.8] text-body">{copy.text}</p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="lead-name" className="mb-1.5 block text-[0.75rem] font-semibold text-navy">
                  Full name
                </label>
                <input
                  id="lead-name"
                  ref={firstFieldRef}
                  value={values.name}
                  onChange={update("name")}
                  className={inputClass("name")}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name ? <p className="mt-1 text-[0.72rem] text-red-600">{errors.name}</p> : null}
              </div>

              <div>
                <label htmlFor="lead-email" className="mb-1.5 block text-[0.75rem] font-semibold text-navy">
                  Email
                </label>
                <input
                  id="lead-email"
                  type="email"
                  value={values.email}
                  onChange={update("email")}
                  className={inputClass("email")}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email ? <p className="mt-1 text-[0.72rem] text-red-600">{errors.email}</p> : null}
              </div>

              <div>
                <label htmlFor="lead-phone" className="mb-1.5 block text-[0.75rem] font-semibold text-navy">
                  Phone <span className="font-normal text-body">(optional)</span>
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  value={values.phone}
                  onChange={update("phone")}
                  className={inputClass("phone")}
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone ? <p className="mt-1 text-[0.72rem] text-red-600">{errors.phone}</p> : null}
              </div>

              {mode === "viewing" ? (
                <div className="sm:col-span-2">
                  <label htmlFor="lead-date" className="mb-1.5 block text-[0.75rem] font-semibold text-navy">
                    Preferred date
                  </label>
                  <input
                    id="lead-date"
                    type="date"
                    value={values.date}
                    onChange={update("date")}
                    className={inputClass("date")}
                    aria-invalid={Boolean(errors.date)}
                  />
                  {errors.date ? <p className="mt-1 text-[0.72rem] text-red-600">{errors.date}</p> : null}
                </div>
              ) : null}

              <div className="sm:col-span-2">
                <label htmlFor="lead-message" className="mb-1.5 block text-[0.75rem] font-semibold text-navy">
                  Message <span className="font-normal text-body">(optional)</span>
                </label>
                <textarea
                  id="lead-message"
                  rows={3}
                  value={values.message}
                  onChange={update("message")}
                  className="field resize-none"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[0.7rem] text-body">
                We only use your details to answer this enquiry.
              </p>
              <Button type="submit" variant="primary" className="shrink-0">
                <CalendarCheck size={15} aria-hidden="true" />
                {copy.submit}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
