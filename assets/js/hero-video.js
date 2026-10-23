/**
 * Future-video preview control and unconnected profile-link notices.
 * No video requests or fabricated platform navigation are performed.
 */
(() => {
  "use strict";

  const trigger = document.getElementById("heroVideoLaunch");
  const notice = document.getElementById("heroVideoNotice");
  const profileStatus = document.getElementById("reviewPlatformStatus");

  /**
   * Show or hide the informative video placeholder.
   * @param {boolean} visible - Whether to display the coming-soon message.
   * @returns {void}
   */
  function setVideoNotice(visible) {
    if (!trigger || !notice) return;
    notice.hidden = !visible;
    trigger.setAttribute("aria-expanded", String(visible));
  }

  if (trigger && notice) {
    trigger.addEventListener("click", () => {
      setVideoNotice(notice.hidden);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !notice.hidden) {
        setVideoNotice(false);
        trigger.focus({ preventScroll: true });
      }
    });

    document.addEventListener("pointerdown", (event) => {
      if (notice.hidden || !(event.target instanceof Node)) return;
      if (!trigger.contains(event.target) && !notice.contains(event.target)) {
        setVideoNotice(false);
      }
    });
  }

  // Business profile URLs are pending; avoid '#' jumping the page to its top.
  document.querySelectorAll("[data-profile-pending]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      if (!profileStatus) return;
      const platform = link.querySelector("span")?.textContent?.trim() || "This";
      profileStatus.textContent = `${platform} business profile link coming soon.`;
    });
  });
})();
