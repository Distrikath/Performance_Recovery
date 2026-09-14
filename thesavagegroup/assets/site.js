/* THE SAVAGE GROUP — film plane, drawer, reveals, clocks */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── film reel: flicker in, settle, then slow cinematic rotation ─── */
  var frames = document.querySelectorAll('.film-frame');
  if (frames.length) {
    var show = function (i, settle) {
      var n = ((i % frames.length) + frames.length) % frames.length;
      var el = frames[n];
      if (!el) return;
      if (el.dataset.src && !el.getAttribute('src')) el.src = el.dataset.src;
      frames.forEach(function (f) { f.classList.remove('active', 'settle'); });
      el.classList.add('active');
      if (settle) el.classList.add('settle');
      var next = frames[(n + 1) % frames.length];
      if (next && next.dataset.src && !next.getAttribute('src')) next.src = next.dataset.src;
    };

    if (reduce) {
      show(0);
    } else {
      var fast = 0;
      var flicker = function () {
        if (fast >= frames.length) { show(0, true); setTimeout(rotate, 9000); return; }
        show(fast); fast++;
        setTimeout(flicker, 145);
      };
      var slow = 0;
      var rotate = function () {
        slow = (slow + 1) % frames.length;
        frames.forEach(function (f) { f.style.transition = 'opacity 1.9s ease'; });
        show(slow, true);
        setTimeout(rotate, 9000);
      };
      flicker();
    }
  }

  /* ─── drawer ─── */
  var drawer = document.getElementById('drawer');
  if (drawer) {
    var open = document.getElementById('menuOpen');
    var close = document.getElementById('menuClose');
    var setOpen = function (state) {
      drawer.classList.toggle('open', state);
      document.body.style.overflow = state ? 'hidden' : '';
      drawer.setAttribute('aria-hidden', String(!state));
    };
    if (open) open.addEventListener('click', function () { setOpen(true); });
    if (close) close.addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    drawer.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
  }

  /* ─── statement lines + scroll reveals ─── */
  var targets = document.querySelectorAll('.rv, .statement');
  if (!('IntersectionObserver' in window) || reduce) {
    targets.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ─── the grade follows the section in view ─── */
  var grade = document.querySelector('.grade');
  var zones = document.querySelectorAll('[data-grade]');
  if (grade && zones.length && 'IntersectionObserver' in window) {
    var gio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) grade.style.background = e.target.getAttribute('data-grade');
      });
    }, { threshold: 0.5 });
    zones.forEach(function (z) { gio.observe(z); });
  }

  /* ─── office clocks ─── */
  var clocks = document.querySelectorAll('[data-clock]');
  if (clocks.length) {
    var tick = function () {
      clocks.forEach(function (el) {
        try {
          el.textContent = new Intl.DateTimeFormat('en-AU', {
            hour: '2-digit', minute: '2-digit', hour12: false,
            timeZone: el.getAttribute('data-clock')
          }).format(new Date());
        } catch (err) { /* unknown zone — keep the fallback */ }
      });
    };
    tick(); setInterval(tick, 15000);
  }

  /* ─── enquiry forms ─── */
  document.querySelectorAll('form[data-mailto]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var lines = [];
      new FormData(form).forEach(function (v, k) { if (String(v).trim()) lines.push(k + ': ' + v); });
      window.location.href = 'mailto:' + form.getAttribute('data-mailto') +
        '?subject=' + encodeURIComponent(form.getAttribute('data-subject') || 'Website enquiry') +
        '&body=' + encodeURIComponent(lines.join('\n\n'));
    });
  });
})();
