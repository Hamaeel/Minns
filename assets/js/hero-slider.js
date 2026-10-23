(function () {
  'use strict';
  var root = document.getElementById('heroSlider');
  if (!root) return;
  var slides = Array.from(root.querySelectorAll('.hero-slide'));
  if (slides.length < 2) return;
  var motionButton = root.querySelector('.hero-slider__motion');
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var current = 0, timer = null, paused = motion.matches, hovering = false, focused = false, inView = true, touch = null;
  function schedule() {
    window.clearTimeout(timer);
    if (!paused && !hovering && !focused && inView && !document.hidden) {
      timer = window.setTimeout(function () { show(current + 1); }, 6500);
    }
  }
  function updateButton() {
    motionButton.textContent = paused ? 'Play background images' : 'Pause background images';
  }
  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) { slide.classList.toggle('is-active', i === current); });
    // Warm the following image; never change the headline, CTA or focus.
    var nextImage = slides[(current + 1) % slides.length].querySelector('img');
    if (nextImage) nextImage.removeAttribute('loading');
    schedule();
  }
  motionButton.addEventListener('click', function () { paused = !paused; updateButton(); schedule(); });
  root.addEventListener('mouseenter', function () { hovering = true; schedule(); });
  root.addEventListener('mouseleave', function () { hovering = false; schedule(); });
  root.addEventListener('focusin', function () { focused = true; schedule(); });
  root.addEventListener('focusout', function (e) {
    focused = !!e.relatedTarget && root.contains(e.relatedTarget);
    schedule();
  });
  root.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { paused = true; updateButton(); schedule(); }
  });
  root.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'touch' && !e.target.closest('a,button')) touch = { x: e.clientX, y: e.clientY };
  });
  root.addEventListener('pointerup', function (e) {
    if (!touch) return;
    var dx = e.clientX - touch.x, dy = e.clientY - touch.y;
    touch = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) show(current + (dx < 0 ? 1 : -1));
    else if (Math.abs(dx) < 10 && Math.abs(dy) < 10) { paused = !paused; updateButton(); schedule(); }
  });
  root.addEventListener('pointercancel', function () { touch = null; });
  document.addEventListener('visibilitychange', schedule);
  if (motion.addEventListener) motion.addEventListener('change', function (e) {
    if (e.matches) { paused = true; updateButton(); schedule(); }
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) { inView = entries[0].isIntersecting; schedule(); }).observe(root);
  }
  motionButton.hidden = false;
  updateButton();
  show(0);
}());
