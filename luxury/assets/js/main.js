(function () {
  'use strict';

  var root = document.documentElement;
  var body = document.body;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Frame 0 -> 1: the water card opens into the full hero.
  function openHero() { body.classList.remove('is-intro'); }
  if (reduce || window.scrollY > 0) openHero();
  else window.addEventListener('load', function () { setTimeout(openHero, 700); });
  setTimeout(openHero, 3000);

  // Boats: real fleet, from the Minns price list.
  var fleet = [
    { name: "17' Boston Whaler", people: '6 people', power: '70hp', length: "17'" },
    { name: "19' Power Cat / Whaler", people: '6 people', power: '115hp', length: "19'" },
    { name: "20' Power Cat", people: '7 people', power: 'twin engine', length: "20'" },
    { name: "21' Boston Whaler", people: '8 people', power: '2 x 90hp', length: "21'" },
    { name: "22' Power Cat / Whaler", people: '8 people', power: 'twin engine', length: "22'" },
    { name: "26' Power Cat", people: '10 people', power: '2 x 115hp', length: "26'" }
  ];
  var boats = document.querySelector('.boats');
  if (boats) {
    var i = 0;
    var nameEl = boats.querySelector('.boats__name');
    var spec = function (k) { return boats.querySelector('[data-spec="' + k + '"]'); };
    var busy = false;
    var show = function (dir) {
      if (busy) return;
      busy = true;
      i = (i + dir + fleet.length) % fleet.length;
      boats.style.setProperty('--dir', dir);
      boats.classList.add('is-swapping');
      setTimeout(function () {
        var b = fleet[i];
        nameEl.textContent = b.name;
        spec('people').textContent = b.people;
        spec('power').textContent = b.power;
        spec('length').textContent = b.length;
        boats.classList.remove('is-swapping');
        busy = false;
      }, reduce ? 0 : 320);
    };
    boats.querySelectorAll('.boats__btn').forEach(function (btn) {
      btn.addEventListener('click', function () { show(+btn.dataset.dir); });
    });
    boats.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(-1);
      if (e.key === 'ArrowRight') show(1);
    });
  }

  // Frames 4 -> 5: the boat sails up and the water fades to paper.
  var harbour = document.querySelector('.harbour');
  var tick = function () {
    if (!harbour) return;
    var r = harbour.getBoundingClientRect();
    var travel = r.height - harbour.firstElementChild.offsetHeight;
    var p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 0;
    root.style.setProperty('--p', p.toFixed(4));
  };
  var queued = false;
  window.addEventListener('scroll', function () {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; tick(); });
  }, { passive: true });
  window.addEventListener('resize', tick);
  tick();

  // FAQ: one answer open at a time.
  var items = document.querySelectorAll('.faq__list details');
  items.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      items.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  // Water videos: play only while on screen; keep the still poster for reduced motion.
  var vids = document.querySelectorAll('.water__video');
  vids.forEach(function (v) {
    if (reduce) { v.removeAttribute('autoplay'); v.pause(); return; }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        en.forEach(function (e) {
          if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
          else v.pause();
        });
      }).observe(v.parentNode);
    }
  });

  // Fade sections in as they enter.
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.2 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('is-in'); });
  }
})();
