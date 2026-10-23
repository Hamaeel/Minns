(function () {
  var RATES = { '17': [316, 272, 243, 300], '19': [418, 360, 330, 400], '20': [498, 450, 410, 400], '22': [498, 450, 410, 400], '26': [607, 538, 483, 400] };
  var tierFor = function (days) { return days >= 7 ? 2 : days >= 3 ? 1 : 0; };
  var money = function (n) { return '$' + n.toLocaleString('en-US'); };
  var iso = function (d) { return d.toISOString().slice(0, 10); };

  // Header and full-screen navigation are initialized by header-menu.js.
  document.getElementById('yr').textContent = new Date().getFullYear();

  // Reveal each main section as it enters the viewport; preserve reduced motion.
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var sections = Array.from(document.querySelectorAll('main > section'));
  var els = Array.from(document.querySelectorAll('.rv'));
  if (!reduceMotion && 'IntersectionObserver' in window) {
    sections.forEach(function (section) {
      if (!section.classList.contains('hero')) section.classList.add('section-reveal');
    });
    var targets = els.concat(sections.filter(function (s) { return s.classList.contains('section-reveal'); }));
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });
    targets.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('in');
      } else {
        io.observe(el);
      }
    });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  // Fleet: rate length switch
  var segBtns = document.querySelectorAll('.seg button');
  segBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      segBtns.forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      var t = +b.dataset.tier;
      document.querySelectorAll('[data-rates]').forEach(function (el) {
        el.firstChild.nodeValue = money(+el.dataset.rates.split(',')[t]);
      });
    });
  });

  // Fleet: show the matching real photo when a boat row is hovered
  var photos = document.querySelectorAll('.fleet__photo img');
  document.querySelectorAll('.boat').forEach(function (row) {
    row.addEventListener('mouseenter', function () {
      document.querySelectorAll('.boat').forEach(function (r) { r.classList.toggle('on', r === row); });
      var key = row.dataset.photo;
      if (!key) return;
      photos.forEach(function (img) { img.classList.toggle('off', img.dataset.key !== key); });
    });
  });

  // Booking steps and email draft are initialized by booking-wizard.js.

  // FAQ: native <details> remain independent, so opening another question
  // never closes one already open. Offer an explicit open/close all control.
  var faqGroup = document.getElementById('faqAnswers');
  var faqToggle = document.getElementById('faqExpandAll');
  if (faqGroup && faqToggle) {
    var faqItems = Array.from(faqGroup.querySelectorAll('details'));
    var syncFaqToggle = function () {
      var allOpen = faqItems.length > 0 && faqItems.every(function (item) {
        return item.open;
      });
      faqToggle.textContent = allOpen ? 'Collapse all' : 'Expand all';
      faqToggle.setAttribute('aria-expanded', String(allOpen));
    };
    faqToggle.addEventListener('click', function () {
      var shouldOpen = !faqItems.every(function (item) { return item.open; });
      faqItems.forEach(function (item) { item.open = shouldOpen; });
      syncFaqToggle();
    });
    faqItems.forEach(function (item) {
      item.addEventListener('toggle', syncFaqToggle);
    });
    syncFaqToggle();
  }

  // Guides tabs
  var tabs = document.querySelectorAll('.tabs button');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.setAttribute('aria-selected', x === t); });
      document.querySelectorAll('.panel').forEach(function (p) { p.classList.toggle('on', p.id === t.dataset.tab); });
    });
  });

  // Gallery rail arrows
  var rail = document.getElementById('rail');
  document.querySelectorAll('.rail-ctrl button').forEach(function (b) {
    b.addEventListener('click', function () { rail.scrollBy({ left: +b.dataset.dir * rail.clientWidth * 0.6, behavior: 'smooth' }); });
  });

  // Lightbox
  var lb = document.createElement('div');
  lb.className = 'lb';
  lb.setAttribute('role', 'dialog');
  lb.innerHTML = '<img alt="">';
  document.body.appendChild(lb);
  document.querySelectorAll('.rail img, .maps img').forEach(function (img) {
    img.addEventListener('click', function () {
      lb.querySelector('img').src = img.src;
      lb.querySelector('img').alt = img.alt;
      lb.classList.add('on');
    });
  });
  lb.addEventListener('click', function () { lb.classList.remove('on'); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('on'); });
})();
