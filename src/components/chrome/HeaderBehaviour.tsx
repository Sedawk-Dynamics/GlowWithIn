"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Re-implements the handful of BeTheme header behaviours the ported CSS
 * depends on, without shipping the theme's jQuery bundle:
 *
 *   1. body offset      — the header is `absolute` (desktop) / `fixed` (mobile),
 *                         so the page content is pushed down by its live height.
 *   2. scrolled state   — `body.mfn-header-scrolled` past the header height.
 *   3. burger drawer    — toggles the theme's classes on the column / html.
 *   4. click submenus   — in the drawer, SHOP opens its children on tap.
 *   5. rotating tagline — the small gradient line in the desktop header.
 *   6. current item     — marks the active page in both menus.
 */
export function HeaderBehaviour() {
  const pathname = usePathname();

  /* 6. current menu item */
  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>("#mfn-header-template .mfn-header-menu > li > a.mfn-menu-link");
    links.forEach((a) => {
      const li = a.parentElement!;
      let active = false;
      try {
        const url = new URL(a.href, window.location.origin);
        if (url.origin === window.location.origin) {
          active = url.pathname === "/" ? pathname === "/" : pathname.startsWith(url.pathname);
        }
      } catch {
        /* ignore malformed hrefs */
      }
      li.classList.toggle("current-menu-item", active);
      li.classList.toggle("current_page_item", active);
      if (active) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }, [pathname]);

  useEffect(() => {
    const header = document.getElementById("mfn-header-template");
    if (!header) return;
    const html = document.documentElement;
    const body = document.body;
    const mq = window.matchMedia("(max-width: 767px)");

    /* 1. body offset */
    const setOffset = () => {
      const h = header.getBoundingClientRect().height;
      if (mq.matches) html.style.setProperty("--gw-mobile-header-h", `${h}px`);
      else html.style.setProperty("--gw-header-h", `${h}px`);
    };
    setOffset();
    const ro = new ResizeObserver(setOffset);
    ro.observe(header);
    window.addEventListener("resize", setOffset);
    mq.addEventListener("change", setOffset);

    /* 2. scrolled state */
    const onScroll = () => {
      const h = header.getBoundingClientRect().height;
      body.classList.toggle("mfn-header-scrolled", window.scrollY > h);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* 3. burger drawer */
    const burgerColumn = header.querySelector<HTMLElement>(".column_header_burger");
    const sidebar = header.querySelector<HTMLElement>(".mfn-header-tmpl-menu-sidebar");
    const burger = header.querySelector<HTMLElement>(".mfn-header-menu-burger");

    const bringToFront = (on: boolean) => {
      if (!burgerColumn) return;
      burgerColumn.classList.toggle("mfn-bring-to-front", on);
      burgerColumn.closest(".mcb-wrap")?.classList.toggle("mfn-bring-to-front", on);
      burgerColumn.closest(".mcb-section")?.classList.toggle("mfn-bring-to-front", on);
    };

    const closeDrawer = () => {
      burgerColumn?.classList.remove("mfn-header-tmpl-menu-active");
      sidebar?.setAttribute("aria-expanded", "false");
      burger?.setAttribute("aria-expanded", "false");
      bringToFront(false);
      html.classList.remove("mfn-header-tmpl-burger-sidebar-opened", "scrollbar-hidden");
      document.removeEventListener("click", onOutside, true);
    };

    const openDrawer = () => {
      burgerColumn?.classList.add("mfn-header-tmpl-menu-active");
      sidebar?.setAttribute("aria-expanded", "true");
      burger?.setAttribute("aria-expanded", "true");
      bringToFront(true);
      html.classList.add("mfn-header-tmpl-burger-sidebar-opened");
      // defer so the opening click itself is not treated as "outside"
      setTimeout(() => document.addEventListener("click", onOutside, true), 0);
    };

    function onOutside(e: MouseEvent) {
      const t = e.target as Node;
      if (sidebar && !sidebar.contains(t) && !burger?.contains(t)) closeDrawer();
    }

    const onToggle = (e: Event) => {
      e.preventDefault();
      if (burgerColumn?.classList.contains("mfn-header-tmpl-menu-active")) closeDrawer();
      else openDrawer();
    };
    const toggles = header.querySelectorAll<HTMLElement>(".mfn-header-menu-toggle");
    toggles.forEach((t) => t.addEventListener("click", onToggle));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", onKey);

    /* 4. click submenus inside the drawer */
    const onSubmenuClick = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const li = a.parentElement as HTMLElement;
      if (!li.classList.contains("mfn-li-hover")) {
        e.preventDefault();
        e.stopPropagation();
        li.parentElement?.querySelectorAll(":scope > li.mfn-li-hover").forEach((s) => s.classList.remove("mfn-li-hover"));
        li.classList.add("mfn-li-hover");
      }
      // second tap on an already-open parent follows the link
    };
    const submenuParents = header.querySelectorAll<HTMLAnchorElement>(
      ".mfn-menu-submenu-on-click li.menu-item-has-children > a.mfn-menu-link",
    );
    submenuParents.forEach((a) => a.addEventListener("click", onSubmenuClick));

    /* close the drawer when a leaf link is followed */
    const onLeaf = () => {
      if (html.classList.contains("mfn-header-tmpl-burger-sidebar-opened")) closeDrawer();
    };
    const leafLinks = header.querySelectorAll<HTMLAnchorElement>(
      ".mfn-header-tmpl-menu-sidebar .mfn-menu-li:not(.menu-item-has-children) > a, .mfn-header-tmpl-menu-sidebar .sub-menu a",
    );
    leafLinks.forEach((a) => a.addEventListener("click", onLeaf));

    /* 5. rotating tagline */
    const tag = document.getElementById("wellnessWrap");
    let timer: number | undefined;
    if (tag) {
      let texts: string[] = [];
      try {
        texts = JSON.parse(tag.dataset.taglines ?? "[]");
      } catch {
        texts = [];
      }
      if (texts.length > 1) {
        let index = 0;
        timer = window.setInterval(() => {
          tag.style.opacity = "0";
          window.setTimeout(() => {
            index = (index + 1) % texts.length;
            tag.textContent = texts[index];
            tag.style.opacity = "1";
          }, 600);
        }, 3000);
      }
    }

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setOffset);
      mq.removeEventListener("change", setOffset);
      window.removeEventListener("scroll", onScroll);
      toggles.forEach((t) => t.removeEventListener("click", onToggle));
      submenuParents.forEach((a) => a.removeEventListener("click", onSubmenuClick));
      leafLinks.forEach((a) => a.removeEventListener("click", onLeaf));
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onOutside, true);
      if (timer) window.clearInterval(timer);
    };
  }, []);

  /* close the drawer on route change */
  useEffect(() => {
    document.documentElement.classList.remove("mfn-header-tmpl-burger-sidebar-opened", "scrollbar-hidden");
    document.querySelector(".column_header_burger")?.classList.remove("mfn-header-tmpl-menu-active", "mfn-bring-to-front");
  }, [pathname]);

  return null;
}
