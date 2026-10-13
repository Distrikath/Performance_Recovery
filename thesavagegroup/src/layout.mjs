// Page shell: <head>, header, mobile menu and footer.
import { site, nav, headerCta, distrik } from '../content/site.mjs';
import { esc, imageUrl, link } from './components.mjs';

export function layout({ path, title, description, body, hero = 'none', noindex = false, image }) {
  const canonical = site.domain + (path === '/404.html' ? '/' : path);
  const ogImage = imageUrl(image || site.shareImage);
  const robots = site.preview || noindex ? '<meta name="robots" content="noindex, nofollow">' : '';
  const current = (href) => (path === href || (href !== '/' && path.startsWith(href)) ? ' aria-current="page"' : '');

  const navLinks = nav.map((n) => `<li><a href="${n.href}"${current(n.href)}>${esc(n.label)}</a></li>`).join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${robots}
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:locale" content="${site.locale}">
${ogImage ? `<meta property="og:image" content="${ogImage}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#171717">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/styles.css">
<script src="/assets/main.js" defer></script>
</head>
<body data-hero="${hero}">
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header" data-header>
  <div class="site-header__inner wrap">
    <a class="wordmark" href="/"${path === '/' ? ' aria-current="page"' : ''}>${esc(site.wordmark)}</a>
    <nav class="site-nav" aria-label="Main">
      <ul>${navLinks}</ul>
    </nav>
    <a class="btn btn--header" href="${headerCta.href}">${esc(headerCta.label)}</a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle>
      <span class="sr-only" data-menu-label>Open menu</span>
      <span class="menu-toggle__bars" aria-hidden="true"><span></span><span></span></span>
    </button>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu" data-menu hidden>
  <nav class="wrap" aria-label="Mobile">
    <ul>${navLinks}</ul>
    <a class="btn btn--solid btn--block" href="${headerCta.href}">${esc(headerCta.label)}</a>
  </nav>
</div>
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
${site.preview ? '<div class="preview-bar" role="note">Preview build — not for publication. Review notes and photography placeholders are visible.</div>' : ''}
</body>
</html>
`;
}

function footer() {
  const legal = site.legal.length
    ? `<ul class="footer__legal">${site.legal
        .map((l) => `<li>${esc(l.name)}${l.detail ? ` · ${esc(l.detail)}` : ''}</li>`)
        .join('')}</ul>`
    : '';
  return `<footer class="site-footer on-dark">
  <div class="wrap">
    <div class="footer__top">
      <div>
        <p class="footer__wordmark">${esc(site.wordmark)}</p>
        <p class="footer__tagline">${esc(site.tagline)}</p>
      </div>
      <nav aria-label="Footer">
        <ul class="footer__nav">${nav.map((n) => `<li><a href="${n.href}">${esc(n.label)}</a></li>`).join('')}</ul>
      </nav>
      <div class="footer__col">
        <p class="label">DISTRIK · Canggu</p>
        <ul>
          <li>${link(`mailto:${distrik.email}`, distrik.email)}</li>
          <li>${link(distrik.instagram, `Instagram ${distrik.instagramHandle}`)}</li>
          <li>${link(distrik.booking, 'Book recovery')}</li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p>© ${new Date().getFullYear()} ${esc(site.name)}</p>
      ${legal}
    </div>
  </div>
</footer>`;
}
