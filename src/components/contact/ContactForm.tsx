"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/lib/links";

type Status = { state: "idle" } | { state: "sending" } | { state: "sent" } | { state: "error"; message: string };

const SUBJECTS = ["Product enquiry", "Order or delivery help", "Partnership / distribution", "Media & collaborations", "Something else"];

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setStatus({ state: "sent" });
      form.reset();
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  if (status.state === "sent") {
    return (
      <div className="border border-ink/10 bg-white p-8 text-center" role="status">
        <p className="m-0 font-serif text-[30px] text-ink">Thank you — we&apos;ve received your message.</p>
        <p className="mt-3 mb-0 text-[15px] leading-7 text-ink/80">
          We reply within one working day. For anything urgent, call{" "}
          <a href={contact.phoneHref} className="gw-link">
            {contact.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-5 sm:grid-cols-2" aria-label="Contact form">
      <div>
        <label htmlFor="cf-name" className="gw-label">
          Your name *
        </label>
        <input id="cf-name" name="name" type="text" required maxLength={120} autoComplete="name" className="gw-field" />
      </div>
      <div>
        <label htmlFor="cf-email" className="gw-label">
          Email *
        </label>
        <input id="cf-email" name="email" type="email" required maxLength={200} autoComplete="email" className="gw-field" />
      </div>
      <div>
        <label htmlFor="cf-phone" className="gw-label">
          Phone (optional)
        </label>
        <input id="cf-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" className="gw-field" />
      </div>
      <div>
        <label htmlFor="cf-subject" className="gw-label">
          Subject *
        </label>
        <select id="cf-subject" name="subject" required className="gw-field" defaultValue={SUBJECTS[0]}>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-message" className="gw-label">
          Message *
        </label>
        <textarea id="cf-message" name="message" required maxLength={5000} className="gw-field" />
      </div>
      {/* honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
        <button type="submit" className="gw-btn" disabled={status.state === "sending"}>
          {status.state === "sending" ? "Sending…" : "Send message"}
        </button>
        {status.state === "error" && (
          <p className="m-0 text-[14px] text-wine" role="alert">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
