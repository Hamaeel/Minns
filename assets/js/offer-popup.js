/** Demo promotional popup; does not claim a real offer or genuine deadline. */
(() => {
  "use strict";
  const popup = document.getElementById("offerPopup");
  const close = document.getElementById("offerClose");
  const book = document.getElementById("offerBook");
  const display = document.getElementById("offerCountdown");
  if (!popup || !close || !book || !display) return;
  const durationMs = 15 * 60 * 1000;
  let endsAt = 0;
  let intervalId = null;

  /** Format a remaining duration as MM:SS. */
  const formatRemaining = (ms) => {
    const seconds = Math.max(0, Math.ceil(ms / 1000));
    return String(Math.floor(seconds / 60)).padStart(2, "0") + ":" + String(seconds % 60).padStart(2, "0");
  };

  /** Update the visible preview timer without manufacturing an actual promotion. */
  const tick = () => {
    const remaining = Math.max(0, endsAt - Date.now());
    display.textContent = formatRemaining(remaining);
    if (remaining === 0 && intervalId !== null) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
  };

  /** Close the preview and stop its countdown. */
  const dismiss = () => {
    popup.hidden = true;
    if (intervalId !== null) window.clearInterval(intervalId);
    intervalId = null;
    try { window.sessionStorage.setItem("minns-offer-demo-dismissed", "1"); } catch { /* Storage may be blocked. */ }
  };

  /** Display the clearly labeled preview once per browser session. */
  const show = () => {
    try {
      if (window.sessionStorage.getItem("minns-offer-demo-dismissed") === "1") return;
    } catch { /* Continue without storage. */ }
    popup.hidden = false;
    endsAt = Date.now() + durationMs;
    tick();
    intervalId = window.setInterval(tick, 1000);
  };

  close.addEventListener("click", dismiss);
  book.addEventListener("click", dismiss);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !popup.hidden) dismiss();
  });
  window.setTimeout(show, 5000);
})();
