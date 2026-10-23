/**
 * Minns header controls: compact, non-modal menu dropdown and mobile action bar.
 * The dropdown leaves the page scrollable and is anchored to the sticky header.
 */
(() => {
  "use strict";

  const header = document.getElementById("nav");
  const menu = document.getElementById("siteMenu");
  const reserve = document.getElementById("reserve");
  const bar = document.getElementById("mbar");
  const fade = document.getElementById("mbarFade");
  const trigger = header?.querySelector(".nav__toggle");

  if (!header || !menu || !trigger) {
    return;
  }

  /**
   * Keep anchor scrolling aligned to the measured sticky header.
   * Also respect browser text zoom / font size adjustments.
   * @returns {void}
   */
  function syncHeader() {
    const rootSize = Number.parseFloat(
      window.getComputedStyle(document.documentElement).fontSize
    );
    document.documentElement.classList.toggle(
      "large-text",
      Number.isFinite(rootSize) && rootSize > 20
    );
    document.documentElement.style.setProperty(
      "--site-header-height",
      `${Math.ceil(header.getBoundingClientRect().height)}px`
    );
  }

  /**
   * Hide the mobile booking shortcut while the booking form is visible.
   * @returns {void}
   */
  function updateActionBar() {
    if (!bar || !reserve) return;
    const bounds = reserve.getBoundingClientRect();
    const reserveVisible = bounds.top < window.innerHeight && bounds.bottom > 0;
    const shouldShow = window.scrollY > 500 && !reserveVisible;
    bar.classList.toggle("show", shouldShow);
    fade?.classList.toggle("show", shouldShow);
  }

  /**
   * Update dropdown visibility and accessible state.
   * @param {boolean} open - Whether the menu should be expanded.
   * @param {boolean} [returnFocus=false] - Focus the menu trigger after closing.
   * @returns {void}
   */
  function setMenuOpen(open, returnFocus = false) {
    menu.hidden = !open;
    header.classList.toggle("open", open);
    trigger.setAttribute("aria-expanded", String(open));
    trigger.setAttribute("aria-label", open ? "Close menu" : "Open menu");

    if (!open && returnFocus) {
      trigger.focus({ preventScroll: true });
    }
  }

  trigger.disabled = false;
  setMenuOpen(false);
  syncHeader();
  updateActionBar();

  trigger.addEventListener("click", () => {
    const shouldOpen = menu.hidden;
    setMenuOpen(shouldOpen);
    if (shouldOpen) {
      menu.querySelector("a")?.focus({ preventScroll: true });
    }
  });

  menu.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      setMenuOpen(false);
    });
  });

  // Outside click closes the card without blocking the clicked page control.
  document.addEventListener("pointerdown", (event) => {
    if (menu.hidden || !(event.target instanceof Node)) return;
    if (!menu.contains(event.target) && !trigger.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  // Unlike the old modal dialog, the dropdown never traps keyboard focus.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      event.preventDefault();
      setMenuOpen(false, true);
    }
  });

  window.addEventListener("resize", () => {
    syncHeader();
    updateActionBar();
  });

  window.addEventListener("scroll", updateActionBar, { passive: true });

  if (document.fonts?.ready) {
    document.fonts.ready.then(syncHeader).catch(() => {
      // Font loading failure should not prevent navigation.
    });
  }

  if ("ResizeObserver" in window) {
    const probe = document.createElement("span");
    probe.setAttribute("aria-hidden", "true");
    probe.style.cssText =
      "position:absolute;left:0;top:0;width:1rem;height:1rem;" +
      "visibility:hidden;pointer-events:none";
    document.body.appendChild(probe);

    const observer = new ResizeObserver(syncHeader);
    observer.observe(header);
    observer.observe(probe);
  }
})();
