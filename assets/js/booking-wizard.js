(function () {
  'use strict';
  var form = document.getElementById('resForm');
  if (!form) return;
  var panels = Array.from(form.querySelectorAll('[data-booking-step]'));
  var progress = Array.from(form.querySelectorAll('.wizard-progress li'));
  var next = document.getElementById('wizardNext'), back = document.getElementById('wizardBack');
  var send = document.getElementById('wizardSend'), errors = document.getElementById('wizardErrors');
  var status = document.getElementById('wizardStatus'), review = document.getElementById('wizardReview');
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var step = 0, initialized = false, heightAnimation;
  var capacities = {17:6,19:6,20:7,21:8,22:8,26:10};
  var fields = function (name) { return form.elements.namedItem(name); };
  var value = function (name) { return fields(name).value.trim(); };
  function localDate() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  }
  function clearError(field) {
    field.removeAttribute('aria-invalid');
    var hint = document.getElementById('wizard-error-' + field.name);
    if (hint) hint.textContent = '';
  }
  function fieldError(field, message) {
    field.setAttribute('aria-invalid','true');
    var id = 'wizard-error-' + field.name, hint = document.getElementById(id);
    if (!hint) { hint = document.createElement('span'); hint.id = id; hint.className = 'wizard-field-error'; field.parentElement.appendChild(hint); }
    hint.textContent = message;
    field.setAttribute('aria-describedby',id);
  }
  function validate(names) {
    var first;
    names.forEach(function (name) {
      var field = fields(name), message = '';
      clearError(field);
      if (field.required && !value(name)) message = 'Please complete this field.';
      else if (!field.validity.valid) {
        if (name === 'email') message = 'Enter a valid email address.';
        else if (name === 'people') message = 'Enter a whole number from 1 to ' + field.max + '.';
        else if (name === 'from') message = 'Choose today or a future date.';
        else if (name === 'to') message = 'End date must be on or after the start date.';
        else message = 'Please check this field.';
      }
      if (name === 'to' && value('to') && value('from') && value('to') < value('from')) message = 'End date must be on or after the start date.';
      if (message) { fieldError(field,message); if (!first) first = field; }
    });
    errors.hidden = !first;
    errors.textContent = first ? 'Please check the highlighted fields before continuing.' : '';
    if (first) first.focus();
    return !first;
  }
  function updateLimits() {
    fields('from').min = localDate();
    fields('to').min = value('from') || fields('from').min;
    fields('people').max = capacities[value('boat')] || 10;
  }
  function show(index, focus) {
    if (heightAnimation) heightAnimation.cancel();
    var oldHeight = form.getBoundingClientRect().height;
    form.dataset.direction = index < step ? 'back' : 'forward';
    step = index;
    panels.forEach(function (panel,i) { panel.hidden = i !== step; });
    progress.forEach(function (item,i) {
      if (i === step) item.setAttribute('aria-current','step'); else item.removeAttribute('aria-current');
      item.setAttribute('data-complete',String(i < step));
    });
    form.style.setProperty('--wizard-progress',((step+1)/3*100)+'%');
    status.textContent = 'Step ' + (step+1) + ' of 3 · ' + ['Rental details','Contact details','Review'][step];
    back.hidden = step === 0;
    next.hidden = step === 2;
    send.hidden = step !== 2;
    next.textContent = step === 0 ? 'Continue →' : 'Review booking →';
    errors.hidden = true;
    if (step !== 2) send.removeAttribute('href');
    var newHeight = form.getBoundingClientRect().height;
    if (initialized && !motion.matches && form.animate && oldHeight !== newHeight) {
      heightAnimation = form.animate([{height:oldHeight+'px'},{height:newHeight+'px'}],{duration:280,easing:'ease-out'});
    }
    initialized = true;
    if (focus) {
      var title = panels[step].querySelector('h3');
      title.focus({preventScroll:true});
      var r = title.getBoundingClientRect(), header = document.getElementById('nav').getBoundingClientRect().bottom;
      if (r.top < header+16 || r.top > window.innerHeight-80) title.scrollIntoView({block:'start',behavior:motion.matches?'instant':'smooth'});
    }
  }
  function buildReview() {
    var boat = fields('boat').selectedOptions[0].textContent;
    var days = Math.round((Date.parse(value('to'))-Date.parse(value('from')))/86400000)+1;
    var dateText = value('from') + ' to ' + value('to') + ' (' + days + (days === 1 ? ' day)' : ' days)');
    var rows = [['Boat',boat],['Dates',dateText],['People',value('people')||'To be confirmed'],['Name',value('name')],['Email',value('email')]];
    [['Phone','phone'],['Staying at','stay'],['Notes','notes']].forEach(function (row) { if (value(row[1])) rows.push([row[0],value(row[1])]); });
    review.replaceChildren();
    rows.forEach(function (row) {
      var group = document.createElement('div'), key = document.createElement('dt'), text = document.createElement('dd');
      key.textContent = row[0]; text.textContent = row[1]; group.append(key,text); review.append(group);
    });
    var body = ['Hello Minns Water Sports,','','I would like to request a boat rental:',''].concat(rows.map(function (row) { return row[0]+': '+row[1]; }),['','Thank you!']).join('\n');
    send.href = 'mailto:info@mwsboats.com?subject=' + encodeURIComponent('Boat reservation request: '+boat+', '+value('from')) + '&body=' + encodeURIComponent(body);
  }
  form.addEventListener('submit',function (e) {
    e.preventDefault(); updateLimits();
    if (step === 0 && validate(['boat','people','from','to'])) show(1,true);
    else if (step === 1 && validate(['name','email','phone','stay','notes'])) {
      if (!validate(['boat','people','from','to'])) { show(0,false); validate(['boat','people','from','to']); return; }
      buildReview(); show(2,true);
    }
  });
  back.addEventListener('click',function () { show(Math.max(0,step-1),true); });
  form.addEventListener('input',function (e) { if (e.target.name) clearError(e.target); });
  fields('boat').addEventListener('change',updateLimits);
  fields('from').addEventListener('change',function () { updateLimits(); if (!value('to')) fields('to').value = value('from'); });
  document.querySelectorAll('[data-boat]').forEach(function (link) {
    link.addEventListener('click',function () { fields('boat').value = link.dataset.boat; updateLimits(); show(0,false); });
  });
  updateLimits();
  show(0,false);
  document.getElementById('bookingFields').disabled = false;
  form.classList.add('wizard-ready');
}());
