/**
 * In-place fleet detail and booking experience for Minns Water Sports.
 * Uses one native dialog and moves the existing three-step wizard into it.
 * Without dialog support, original card booking links still work as before.
 */
(() => {
  "use strict";

  const dialog = document.getElementById("boatDialog");
  const form = document.getElementById("resForm");
  const scrollPanel = document.getElementById("boatDialogScroll");
  const details = document.getElementById("boatModalDetails");
  const booking = document.getElementById("boatModalBooking");
  const wizardHost = document.getElementById("boatModalWizardHost");
  const close = document.getElementById("boatModalClose");
  const back = document.getElementById("boatModalBack");
  const book = document.getElementById("boatModalBook");
  const image = document.getElementById("boatModalImage");
  const title = document.getElementById("boatModalTitle");
  const bookingTitle = document.getElementById("boatModalBookingTitle");
  const size = document.getElementById("boatModalSize");
  const capacity = document.getElementById("boatModalCapacity");
  const engine = document.getElementById("boatModalEngine");
  const price = document.getElementById("boatModalPrice");
  const tier = document.getElementById("boatModalTier");
  const artworkNote = document.getElementById("boatModalArtworkNote");
  const cards = Array.from(document.querySelectorAll("#fleet .boats > .boat"));

  const supported = Boolean(
    dialog && typeof dialog.showModal === "function" &&
    form && window.MinnsBookingWizard && scrollPanel &&
    details && booking && wizardHost && close && back && book &&
    image && title && bookingTitle && size && capacity && engine &&
    price && tier && artworkNote
  );
  if (!supported) return;

  // The form is moved, never copied; its IDs, validation, listeners and values survive.
  const formHome = form.parentNode;
  const formHomeSibling = form.nextSibling;
  const root = document.documentElement;
  const body = document.body;

  let activeBoat = "";
  let opener = null;
  let scrollY = 0;
  let previous = null;

  /**
   * Prevent background scrolling, including touch scrolling on mobile Safari.
   * @returns {void}
   */
  function lockPage() {
    scrollY = window.scrollY;
    previous = {
      rootOverflow: root.style.overflow,
      rootScrollBehavior: root.style.scrollBehavior,
      bodyPosition: body.style.position,
      bodyOverflow: body.style.overflow,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width
    };
    root.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.overflow = "hidden";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
  }

  /**
   * Restore all inline scroll styles and the user's exact previous page position.
   * @returns {void}
   */
  function unlockPage() {
    if (!previous) return;
    root.style.overflow = previous.rootOverflow;
    root.style.scrollBehavior = "auto";
    body.style.position = previous.bodyPosition;
    body.style.overflow = previous.bodyOverflow;
    body.style.top = previous.bodyTop;
    body.style.left = previous.bodyLeft;
    body.style.right = previous.bodyRight;
    body.style.width = previous.bodyWidth;
    window.scrollTo(0, scrollY);
    root.style.scrollBehavior = previous.rootScrollBehavior;
    previous = null;
  }

  /**
   * Return the shared booking wizard to its original booking section.
   * @returns {void}
   */
  function restoreForm() {
    if (form.parentNode === formHome) return;
    if (formHomeSibling && formHomeSibling.parentNode === formHome) {
      formHome.insertBefore(form, formHomeSibling);
    } else {
      formHome.appendChild(form);
    }
  }

  /**
   * Fill the modal from the live card, respecting the selected pricing tier.
   * @param {HTMLElement} card - The selected fleet card.
   * @returns {string} Its boat identifier, or an empty string.
   */
  function populate(card) {
    const link = card.querySelector("a[data-boat]");
    const thumbnail = card.querySelector(".boat__size--photo img");
    const boatName = card.querySelector("h3");
    const sizeBadge = card.querySelector(".boat__size--photo > span");
    const meta = card.querySelectorAll(".boat__meta li");
    const displayedPrice = card.querySelector("[data-rates]");
    if (!link || !thumbnail || !boatName || !displayedPrice) return "";

    title.textContent = boatName.textContent.trim();
    bookingTitle.textContent = `Book ${title.textContent}`;
    size.textContent = sizeBadge ? sizeBadge.textContent.trim() : "";
    capacity.textContent = meta[0]?.textContent.trim() || "";
    engine.textContent = meta[1]?.textContent.trim() || "";
    price.textContent = displayedPrice.firstChild?.textContent.trim() || "";
    tier.textContent = document.querySelector('.seg button[aria-pressed="true"]')?.textContent.trim() || "Daily rental rate";

    image.src = thumbnail.getAttribute("src");
    image.alt = thumbnail.alt;
    artworkNote.hidden = !/illustration/i.test(thumbnail.alt);
    return link.dataset.boat || "";
  }

  /**
   * Open a details preview in a viewport-centered modal.
   * @param {HTMLElement} card - Fleet card.
   * @param {HTMLElement} source - Element to restore focus to on close.
   * @returns {void}
   */
  function open(card, source) {
    if (dialog.open) return;
    const boatId = populate(card);
    if (!boatId) return;

    activeBoat = boatId;
    opener = source;
    booking.hidden = true;
    details.hidden = false;
    dialog.setAttribute("aria-labelledby", "boatModalTitle");
    dialog.setAttribute("aria-describedby", "boatModalPriceNote");
    scrollPanel.scrollTop = 0;

    try {
      dialog.showModal();
      lockPage();
      close.focus({ preventScroll: true });
    } catch (error) {
      unlockPage();
      if (dialog.open) dialog.close();
      // Retain the original section link as the progressive-enhancement fallback.
      const destination = document.getElementById("reserve");
      destination?.scrollIntoView({ block: "start" });
    }
  }

  /**
   * Keep the full wizard inside this same dialog, not at page bottom.
   * @returns {void}
   */
  function startBooking() {
    if (!activeBoat) return;
    wizardHost.appendChild(form);
    details.hidden = true;
    booking.hidden = false;
    dialog.setAttribute("aria-labelledby", "boatModalBookingTitle");
    dialog.removeAttribute("aria-describedby");
    window.MinnsBookingWizard.selectBoat(activeBoat);
    scrollPanel.scrollTop = 0;
    back.focus({ preventScroll: true });
  }

  /**
   * Return to the selected boat details without leaving or closing the popup.
   * @returns {void}
   */
  function backToDetails() {
    booking.hidden = true;
    details.hidden = false;
    dialog.setAttribute("aria-labelledby", "boatModalTitle");
    dialog.setAttribute("aria-describedby", "boatModalPriceNote");
    scrollPanel.scrollTop = 0;
    book.focus({ preventScroll: true });
  }

  cards.forEach((card) => {
    const link = card.querySelector("a[data-boat]");
    const heading = card.querySelector("h3");
    if (!link || !heading || !card.querySelector("img")) return;

    // This overlay is a genuine keyboard-accessible button, not a nested link.
    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "boat__surface-trigger";
    trigger.setAttribute("aria-label", `View details and book ${heading.textContent.trim()}`);
    trigger.setAttribute("aria-haspopup", "dialog");
    trigger.setAttribute("aria-controls", "boatDialog");
    card.appendChild(trigger);
    trigger.addEventListener("click", () => open(card, trigger));

    // Keep the existing card booking CTA; intercept its old #reserve jump.
    link.setAttribute("aria-haspopup", "dialog");
    link.setAttribute("aria-controls", "boatDialog");
    link.addEventListener("click", (event) => {
      event.preventDefault();
      open(card, link);
    });
  });

  book.addEventListener("click", startBooking);
  back.addEventListener("click", backToDetails);
  close.addEventListener("click", () => dialog.close());

  // The dialog's native Escape handling closes it; clicks outside the card do too.
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom
    ) {
      dialog.close();
    }
  });

  dialog.addEventListener("close", () => {
    restoreForm();
    unlockPage();
    image.removeAttribute("src");
    activeBoat = "";
    if (opener?.isConnected) opener.focus({ preventScroll: true });
    opener = null;
  });
})();
