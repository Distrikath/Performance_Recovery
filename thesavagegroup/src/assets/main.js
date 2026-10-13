// The Savage Group — small progressive enhancements. The site works without JS.
(() => {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const menuLabel = document.querySelector('[data-menu-label]');
  const body = document.body;

  // Header: transparent over the hero, solid once the page scrolls.
  const setSolid = () => header.classList.toggle('is-solid', window.scrollY > 24 || body.classList.contains('menu-open'));
  setSolid();
  window.addEventListener('scroll', setSolid, { passive: true });

  // Mobile menu.
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    menuLabel.textContent = open ? 'Close' : 'Menu';
    menu.hidden = !open;
    body.classList.toggle('menu-open', open);
    setSolid();
    if (open) menu.querySelector('a')?.focus();
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      setMenu(false);
      toggle.focus();
    }
  });
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) setMenu(false);
  });
  // Keep keyboard focus inside the open menu (menu links + toggle).
  menu.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const items = [...menu.querySelectorAll('a')];
    if (e.shiftKey && document.activeElement === items[0]) {
      e.preventDefault();
      toggle.focus();
    } else if (!e.shiftKey && document.activeElement === items[items.length - 1]) {
      e.preventDefault();
      toggle.focus();
    }
  });

  // Intro loader: runs only when the inline head script flagged this visit.
  const root = document.documentElement;
  const loader = document.querySelector('[data-loader]');
  if (loader && root.classList.contains('is-loading')) {
    const count = loader.querySelector('[data-loader-count]');
    const DURATION = 1100;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / DURATION);
      loader.style.setProperty('--p', p.toFixed(3));
      count.textContent = String(Math.round(p * 100)).padStart(3, '0');
      if (p < 1) return requestAnimationFrame(tick);
      try { sessionStorage.setItem('tsg-intro', '1'); } catch (e) { /* storage unavailable */ }
      loader.classList.add('is-done');
      setTimeout(() => root.classList.remove('is-loading'), 500);
    };
    requestAnimationFrame(tick);
  }

  // Fit display type to the grid once the real fonts have loaded:
  // headline lines shrink (never grow) so none overflows; the footer
  // wordmark scales to fill the full width exactly.
  const contentWidth = (el) => {
    const cs = getComputedStyle(el);
    return el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  };
  const fitType = () => {
    document.querySelectorAll('.display').forEach((el) => {
      el.style.fontSize = '';
      const widest = Math.max(...[...el.querySelectorAll('.ln')].map((l) => l.offsetWidth));
      const avail = contentWidth(el);
      if (widest > avail) el.style.fontSize = `${(parseFloat(getComputedStyle(el).fontSize) * avail) / widest}px`;
    });
    document.querySelectorAll('.footer__wordmark').forEach((el) => {
      const inner = el.firstElementChild;
      el.style.fontSize = '';
      const size = parseFloat(getComputedStyle(el).fontSize);
      el.style.fontSize = `${(size * contentWidth(el)) / inner.offsetWidth}px`;
    });
  };
  let fitFrame;
  const scheduleFit = () => {
    cancelAnimationFrame(fitFrame);
    fitFrame = requestAnimationFrame(fitType);
  };
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(scheduleFit);
  window.addEventListener('resize', scheduleFit);

  // Preview only: press G to overlay the 4-column grid.
  if (body.hasAttribute('data-preview')) {
    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'g' && !e.target.closest('input, textarea, select') && !e.metaKey && !e.ctrlKey) {
        body.classList.toggle('show-grid');
      }
    });
  }

  // Enquiry form. Never reports success unless the configured endpoint
  // confirms it. With no endpoint, it explains that nothing was sent.
  const form = document.querySelector('[data-enquiry-form]');
  if (form) {
    const status = form.querySelector('[data-form-status]');
    const endpoint = form.dataset.endpoint;
    const say = (msg, kind) => {
      status.textContent = msg;
      status.dataset.kind = kind;
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const invalid = [...form.querySelectorAll('[required]')].filter((f) => !f.checkValidity());
      form.querySelectorAll('[aria-invalid]').forEach((f) => f.removeAttribute('aria-invalid'));
      if (invalid.length) {
        invalid.forEach((f) => f.setAttribute('aria-invalid', 'true'));
        invalid[0].focus();
        say('Please complete the highlighted fields.', 'error');
        return;
      }
      if (!endpoint) {
        say('Preview only: this enquiry has not been sent. The form is not yet connected to a submission service.', 'info');
        return;
      }
      const button = form.querySelector('[type="submit"]');
      button.disabled = true;
      say('Sending…', 'info');
      try {
        const res = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        say('Thank you. Your enquiry has been sent and we will be in touch.', 'success');
      } catch {
        say('Sorry, your enquiry could not be sent. Please try again shortly.', 'error');
      } finally {
        button.disabled = false;
      }
    });
  }
})();
