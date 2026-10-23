(function () {
  'use strict';
  var links = Array.from(document.querySelectorAll('[data-gallery]'));
  if (!links.length || !window.HTMLDialogElement || !HTMLDialogElement.prototype.showModal) return;
  var dialog = document.createElement('dialog');
  dialog.className = 'gallery-dialog';
  dialog.setAttribute('aria-labelledby','galleryDialogTitle');
  dialog.innerHTML = '<div class="gallery-dialog__tools"><p id="galleryDialogTitle">Exuma gallery</p><button type="button" data-gallery-close aria-label="Close gallery">Close ×</button></div><figure><img id="galleryLarge" alt=""><figcaption id="galleryDialogCaption"></figcaption></figure><div class="gallery-dialog__nav"><button type="button" data-gallery-prev aria-label="Previous photo"><svg aria-hidden="true"><use href="#i-left"/></svg></button><p class="gallery-dialog__count" role="status" aria-live="polite"></p><button type="button" data-gallery-next aria-label="Next photo"><svg aria-hidden="true"><use href="#i-arrow"/></svg></button></div>';
  document.body.appendChild(dialog);
  var image = dialog.querySelector('img'), caption = dialog.querySelector('figcaption'), count = dialog.querySelector('.gallery-dialog__count');
  var current = 0, opener, previousOverflow;
  function show(index) {
    current = (index + links.length) % links.length;
    var link = links[current], thumbnail = link.querySelector('img');
    image.src = link.href;
    image.alt = thumbnail.alt;
    caption.textContent = Array.from(link.querySelectorAll('.gallery-caption b,.gallery-caption small')).map(function (part) { return part.textContent.trim(); }).join(' · ');
    count.textContent = 'Photo ' + (current+1) + ' of ' + links.length;
  }
  links.forEach(function (link,i) {
    link.addEventListener('click',function (e) {
      e.preventDefault(); opener = link; show(i);
      previousOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      dialog.showModal();
      dialog.querySelector('[data-gallery-close]').focus();
    });
  });
  dialog.querySelector('[data-gallery-prev]').addEventListener('click',function () { show(current-1); });
  dialog.querySelector('[data-gallery-next]').addEventListener('click',function () { show(current+1); });
  dialog.querySelector('[data-gallery-close]').addEventListener('click',function () { dialog.close(); });
  dialog.addEventListener('keydown',function (e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); show(current + (e.key === 'ArrowRight' ? 1 : -1)); }
    if (e.key === 'Tab') {
      var buttons = dialog.querySelectorAll('button:not([disabled])');
      var first = buttons[0], last = buttons[buttons.length-1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  dialog.addEventListener('click',function (e) {
    if (e.target !== dialog) return;
    var r = dialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
  });
  dialog.addEventListener('close',function () {
    document.documentElement.style.overflow = previousOverflow || '';
    if (opener) opener.focus({preventScroll:true});
    image.removeAttribute('src');
  });
}());
