(function () {
  'use strict';
  var header = document.getElementById('nav'), menu = document.getElementById('siteMenu');
  var trigger = header.querySelector('.nav__toggle'), close = menu.querySelector('.menu-close');
  var previousOverflow = '', returnFocus = true;
  function syncHeader() {
    document.documentElement.classList.toggle('large-text',parseFloat(getComputedStyle(document.documentElement).fontSize)>20);
    document.documentElement.style.setProperty('--site-header-height',header.getBoundingClientRect().height+'px');
  }
  function updateActionBar() {
    var bar = document.getElementById('mbar'), reserve = document.getElementById('reserve').getBoundingClientRect();
    if (bar) bar.classList.toggle('show',window.scrollY>500 && !(reserve.top<window.innerHeight && reserve.bottom>0));
  }
  syncHeader(); updateActionBar();
  window.addEventListener('resize',function () { syncHeader(); updateActionBar(); });
  window.addEventListener('scroll',updateActionBar,{passive:true});
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncHeader);
  if ('ResizeObserver' in window) {
    var probe = document.createElement('span');
    probe.setAttribute('aria-hidden','true');
    probe.style.cssText = 'position:absolute;left:0;top:0;width:1rem;height:1rem;visibility:hidden;pointer-events:none';
    document.body.appendChild(probe);
    var observer = new ResizeObserver(syncHeader); observer.observe(header); observer.observe(probe);
  }
  if (!menu.showModal) return;
  trigger.disabled = false;
  trigger.addEventListener('click',function () {
    returnFocus = true;
    previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    menu.style.setProperty('--menu-header-top',header.getBoundingClientRect().top+'px');
    header.classList.add('open');
    trigger.setAttribute('aria-expanded','true');
    trigger.setAttribute('aria-label','Close menu');
    menu.showModal(); close.focus();
  });
  close.addEventListener('click',function () { menu.close(); });
  menu.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click',function () { returnFocus = false; menu.close(); });
  });
  menu.addEventListener('keydown',function (e) {
    if (e.key !== 'Tab') return;
    var items = menu.querySelectorAll('button:not([disabled]),a[href]');
    var first = items[0], last = items[items.length-1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  menu.addEventListener('close',function () {
    header.classList.remove('open');
    trigger.setAttribute('aria-expanded','false');
    trigger.setAttribute('aria-label','Open menu');
    document.documentElement.style.overflow = previousOverflow;
    if (returnFocus) trigger.focus({preventScroll:true});
  });
}());
