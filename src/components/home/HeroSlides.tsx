"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { heroSlides } from "@/data/brand";

/**
 * Home hero — the client's five 16:9 banners.
 *
 * The previous site dropped these into a fixed 647px-tall Elementor slider as
 * `background-size: cover`, which cropped the top and bottom of every banner
 * (the "product photos are only partly visible" complaint). Here each slide is
 * an aspect-locked 16:9 box and the banner is `object-fit: contain`, so the
 * whole image is always visible at every viewport width.
 *
 * Native scroll-snap does the sliding; autoplay pauses on hover / touch / when
 * the tab is hidden, and respects prefers-reduced-motion.
 */
const AUTOPLAY_MS = 5000;

export function HeroSlides() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = heroSlides.length;

  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track) return;
      const next = ((i % count) + count) % count;
      track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
    },
    [count],
  );

  /* keep the dots in sync with manual swipes */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
        setIndex(Math.min(count - 1, Math.max(0, i)));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [count]);

  /* autoplay */
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      goTo(index + 1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [index, paused, goTo]);

  return (
    <section
      className="gw-hero"
      aria-roledescription="carousel"
      aria-label="GlowWithin™ products"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div ref={trackRef} className="gw-hero__track" tabIndex={0} aria-live="off">
        {heroSlides.map((slide, i) => (
          <Link
            key={slide.src}
            href={slide.href}
            className="gw-hero__slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}: ${slide.alt}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              width={2560}
              height={1440}
              sizes="100vw"
              quality={82}
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              draggable={false}
            />
          </Link>
        ))}
      </div>


      <div className="gw-hero__dots" role="tablist" aria-label="Choose slide">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            className="gw-hero__dot"
            aria-current={i === index ? "true" : undefined}
            aria-selected={i === index}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
