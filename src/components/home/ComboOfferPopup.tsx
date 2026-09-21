"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { tm } from "@/components/ui/Tm";

/** Shown once per browser session; add ?offer to the URL to see it again. */
const SEEN_KEY = "gw-combo-offer-seen";
/** Let the hero banner land first. */
const DELAY_MS = 2500;

/**
 * Home page pop-up that sends visitors to the shop's Combo Offers category.
 * The whole card is one link; only the close button sits outside it.
 *
 * Built on the native <dialog>, which supplies the backdrop, the Escape key,
 * the focus trap and top-layer stacking (it sits above BeTheme's fixed mobile
 * header without any z-index work).
 */
export function ComboOfferPopup({ href, headline, text }: { href: string; headline: string; text: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).has("offer");
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // storage blocked (private mode, strict settings): just show it
    }
    if (seen && !forced) return;

    const timer = window.setTimeout(() => {
      const dialog = dialogRef.current;
      if (!dialog || dialog.open) return;
      dialog.showModal();
      closeRef.current?.focus();
      document.documentElement.classList.add("gw-offer-open");
      try {
        window.sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        // not fatal: it may show again on the next visit to the home page
      }
    }, DELAY_MS);

    return () => {
      window.clearTimeout(timer);
      document.documentElement.classList.remove("gw-offer-open");
    };
  }, []);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      className="gw-offer"
      aria-labelledby="gw-offer-title"
      aria-describedby="gw-offer-text"
      onClose={() => document.documentElement.classList.remove("gw-offer-open")}
      // Native Escape handling is left to the browser's heuristics for dialogs opened
      // without a click (this one opens on a timer); handle it explicitly instead.
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          close();
        }
      }}
      // A click on the dialog element itself (not its contents) is a click on the backdrop.
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <button ref={closeRef} type="button" className="gw-offer__close" onClick={close} aria-label="Close offer">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <a href={href} className="gw-offer__card">
        <div className="gw-offer__media">
          <Image
            src="/images/offers/combo-first-edition.webp"
            alt="GlowWithin™ The 1st Edition Offer: Nourishing Hair Serum, Brightening Face Serum, Gel Face Cream and Intimate Wash"
            fill
            sizes="(max-width: 520px) 92vw, 460px"
            loading="eager"
          />
        </div>
        <div className="gw-offer__body">
          <p className="gw-offer__eyebrow">Combo Offers</p>
          <h2 id="gw-offer-title" className="gw-offer__title">
            {headline}
          </h2>
          <p id="gw-offer-text" className="gw-offer__text">
            {tm(text)}
          </p>
          <span className="gw-btn gw-offer__cta">Shop combo offers</span>
        </div>
      </a>
    </dialog>
  );
}
