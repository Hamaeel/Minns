(function () {
  'use strict';
  var nav = document.getElementById('nav');
  var announcement = document.querySelector('.announcement');
  var row = nav && nav.querySelector('.nav__in');
  if (!row || !announcement) return;
  var frame;
  function layout() {
    frame = null;
    document.documentElement.classList.toggle('large-text', parseFloat(getComputedStyle(document.documentElement).fontSize) > 20);
    // Measure the full desktop menu before choosing a compact layout.
    nav.classList.remove('compact');
    if (window.innerWidth >= 1024) {
      var css = getComputedStyle(row);
      var available = row.clientWidth - parseFloat(css.paddingLeft) - parseFloat(css.paddingRight);
      var required = nav.querySelector('.logo').scrollWidth + nav.querySelector('.nav__links').scrollWidth + nav.querySelector('.nav__cta').scrollWidth + 2 * parseFloat(css.gap || 0);
      nav.classList.toggle('compact', required > available);
    }
    var barHeight = announcement.getBoundingClientRect().height;
    var stackHeight = barHeight + nav.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--announcement-height', barHeight + 'px');
    document.documentElement.style.setProperty('--header-stack-height', stackHeight + 'px');
    document.documentElement.style.setProperty('scroll-padding-top', (stackHeight + 24) + 'px');
  }
  function queueLayout() {
    if (!frame) frame = window.requestAnimationFrame(layout);
  }
  if ('ResizeObserver' in window) {
    var observer = new ResizeObserver(queueLayout);
    observer.observe(announcement);
    observer.observe(row);
  }
  window.addEventListener('resize', queueLayout);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(queueLayout);
  layout();
}());
