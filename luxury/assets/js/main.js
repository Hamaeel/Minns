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

  // Boats: real fleet, from the Minns price list. The three top-view images we
  // have rotate through the slots, so the boat on screen changes with the specs.
  var white = 'assets/img/boat-white.png';
  var woodA = 'assets/img/boat-wood-a.png';
  var woodB = 'assets/img/boat-wood-b.png';
  var fleet = [
    { name: "17' Boston Whaler", people: '6 people', power: '70hp', length: "17'", img: white },
    { name: "19' Power Cat / Whaler", people: '6 people', power: '115hp', length: "19'", img: woodA },
    { name: "20' Power Cat", people: '7 people', power: 'twin engine', length: "20'", img: woodB },
    { name: "21' Boston Whaler", people: '8 people', power: '2 x 90hp', length: "21'", img: white },
    { name: "22' Power Cat / Whaler", people: '8 people', power: 'twin engine', length: "22'", img: woodA },
    { name: "26' Power Cat", people: '10 people', power: '2 x 115hp', length: "26'", img: woodB }
  ];
  var boats = document.querySelector('.boats');
  if (boats) {
    var i = 0;
    var nameEl = boats.querySelector('.boats__name');
    var slot = function (k) { return boats.querySelector('[data-slot="' + k + '"]'); };
    var spec = function (k) { return boats.querySelector('[data-spec="' + k + '"]'); };
    var at = function (n) { return fleet[(n % fleet.length + fleet.length) % fleet.length]; };
    var busy = false;

    // Preload, so a swapped image is never a blank frame.
    fleet.forEach(function (b) { var im = new Image(); im.src = b.img; });

    var paint = function () {
      var b = at(i);
      nameEl.textContent = b.name;
      spec('people').textContent = b.people;
      spec('power').textContent = b.power;
      spec('length').textContent = b.length;
      slot('main').src = b.img;
      slot('main').alt = b.name + ' seen from above';
      slot('prev').src = at(i - 1).img;
      slot('next').src = at(i + 1).img;
    };
    paint();

    var show = function (dir) {
      if (busy) return;
      busy = true;
      i = (i + dir + fleet.length) % fleet.length;
      boats.style.setProperty('--dir', dir);
      boats.classList.add('is-swapping');
      setTimeout(function () {
        paint();
        boats.classList.remove('is-swapping');
        busy = false;
      }, reduce ? 0 : 320);
    };
    boats.querySelectorAll('.boats__btn').forEach(function (btn) {
      btn.addEventListener('click', function () { show(+btn.dataset.dir); });
    });
    slot('prev').addEventListener('click', function () { show(-1); });
    slot('next').addEventListener('click', function () { show(1); });
    boats.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(-1);
      if (e.key === 'ArrowRight') show(1);
    });
    // Phones: swipe sideways to change boat.
    var sx = null, sy = 0;
    boats.addEventListener('touchstart', function (e) {
      sx = e.touches[0].clientX; sy = e.touches[0].clientY;
    }, { passive: true });
    boats.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      var dy = e.changedTouches[0].clientY - sy;
      sx = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) show(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  // Phones: quick call/book bar once the hero is gone, hidden again at the contact block.
  var mbar = document.querySelector('.mbar');
  var hero = document.querySelector('.hero');
  var contact = document.querySelector('.contact');
  if (mbar && hero && contact && 'IntersectionObserver' in window) {
    var heroOut = false, contactIn = false;
    var sync = function () { mbar.classList.toggle('is-on', heroOut && !contactIn); };
    new IntersectionObserver(function (en) { heroOut = !en[en.length - 1].isIntersecting; sync(); }).observe(hero);
    new IntersectionObserver(function (en) { contactIn = en[en.length - 1].isIntersecting; sync(); }).observe(contact);
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
  var els = document.querySelectorAll('[data-rv]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.01 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('is-in'); });
  }
})();
