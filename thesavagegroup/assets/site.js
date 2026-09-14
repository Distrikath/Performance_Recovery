/* THE SAVAGE GROUP — shared behaviour */
(function () {
  'use strict';

  /* mobile navigation */
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('.nav-links a')) {
        nav.setAttribute('data-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* mark the current page in the nav */
  var here = location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '/');
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var target = a.getAttribute('href');
    if (!target || target.charAt(0) === '#') return;
    var path = new URL(a.href).pathname.replace(/\/index\.html$/, '/');
    if (path === here) a.setAttribute('aria-current', 'page');
  });

  /* scroll reveal */
  var items = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* local time for each office */
  var clocks = document.querySelectorAll('[data-clock]');
  if (clocks.length) {
    var tick = function () {
      clocks.forEach(function (el) {
        try {
          el.textContent = new Intl.DateTimeFormat('en-AU', {
            hour: '2-digit', minute: '2-digit', hour12: false,
            timeZone: el.getAttribute('data-clock')
          }).format(new Date());
        } catch (err) { /* unknown zone — leave the fallback text */ }
      });
    };
    tick();
    setInterval(tick, 15000);
  }

  /* enquiry forms post to the group inbox via the visitor's mail client */
  document.querySelectorAll('form[data-mailto]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var subject = form.getAttribute('data-subject') || 'Website enquiry';
      var lines = [];
      data.forEach(function (value, key) {
        if (String(value).trim()) lines.push(key + ': ' + value);
      });
      window.location.href = 'mailto:' + form.getAttribute('data-mailto') +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n\n'));
    });
  });
})();
