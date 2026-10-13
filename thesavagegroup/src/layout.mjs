// Page shell: <head>, header, mobile menu and footer.
import { site, nav, headerCta, distrik } from '../content/site.mjs';
import { esc, imageUrl, link } from './components.mjs';
import { existsSync } from 'node:fs';

// Tanker (display face) — served locally if src/assets/fonts/tanker.woff2
// exists, otherwise loaded from Fontshare. Compressed Archivo is the fallback.
const TANKER_LOCAL = existsSync(new URL('./assets/fonts/tanker.woff2', import.meta.url));
const tankerHead = TANKER_LOCAL
  ? `<link rel="preload" href="/assets/fonts/tanker.woff2" as="font" type="font/woff2" crossorigin>
<style>@font-face{font-family:'Tanker';src:url('/assets/fonts/tanker.woff2') format('woff2');font-weight:400;font-style:normal;font-display:swap}</style>`
  : `<link rel="preconnect" href="https://api.fontshare.com" crossorigin>
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=tanker@400&amp;display=swap">`;

export function layout({ path, title, description, body, hero = 'none', noindex = false, image }) {
  const canonical = site.domain + (path === '/404.html' ? '/' : path);
  const ogImage = imageUrl(image || site.shareImage);
  const robots = site.preview || noindex ? '<meta name="robots" content="noindex, nofollow">' : '';
  const current = (href) => (path === href || (href !== '/' && path.startsWith(href)) ? ' aria-current="page"' : '');

  const navLinks = nav.map((n) => `<li><a href="${n.href}"${current(n.href)}>${esc(n.label)}</a></li>`).join('');
  const menuLinks = nav
    .map((n, i) => `<li><a href="${n.href}"${current(n.href)}><span class="mono" aria-hidden="true">0${i + 1}</span>${esc(n.label)}</a></li>`)
    .join('');

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
${tankerHead}
<link rel="preload" href="/assets/fonts/space-grotesk-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/space-mono-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/styles.css">
<script src="/assets/main.js" defer></script>
</head>
<body data-hero="${hero}"${site.preview ? ' data-preview' : ''}>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header" data-header>
  <div class="g site-header__inner">
    <a class="wordmark c1 w1" href="/"${path === '/' ? ' aria-current="page"' : ''}>${esc(site.wordmark)}</a>
    <nav class="site-nav c2 w2" aria-label="Main">
      <ul>${navLinks}</ul>
    </nav>
    <div class="site-header__end c4 w1">
      <a class="header-cta" href="${headerCta.href}">${esc(headerCta.label)}</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle>
        <span data-menu-label>Menu</span>
      </button>
    </div>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu" data-menu hidden>
  <nav aria-label="Mobile">
    <ul>${menuLinks}</ul>
    <a class="btn btn--solid btn--block" href="${headerCta.href}">${esc(headerCta.label)}</a>
  </nav>
</div>
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
${site.preview ? '<div class="preview-bar" role="note">Preview build — not for publication · press G to show the grid</div>' : ''}
<div class="grid-overlay" aria-hidden="true"><div class="g"><span></span><span></span><span></span><span></span></div></div>
</body>
</html>
`;
}

function footer() {
  const legal = site.legal.map((l) => `<li>${esc(l.name)}${l.detail ? ` · ${esc(l.detail)}` : ''}</li>`).join('');
  return `<footer class="site-footer on-dark">
  <div class="g footer__top">
    <p class="head-md c1 w1 footer__tagline">${esc(site.tagline)}</p>
    <nav class="c2 w1" aria-label="Footer">
      <p class="label">Index</p>
      <ul class="footer__list">${nav.map((n) => `<li><a href="${n.href}">${esc(n.label)}</a></li>`).join('')}</ul>
    </nav>
    <div class="c3 w1">
      <p class="label">DISTRIK · Canggu</p>
      <ul class="footer__list">
        <li>${link(`mailto:${distrik.email}`, distrik.email)}</li>
        <li>${link(distrik.instagram, `Instagram ${distrik.instagramHandle}`)}</li>
        <li>${link(distrik.booking, 'Book recovery')}</li>
      </ul>
    </div>
    <div class="c4 w1">
      <p class="label">Information</p>
      <ul class="footer__list footer__legal">
        <li>© ${new Date().getFullYear()} ${esc(site.name)}</li>
        ${legal}
      </ul>
    </div>
  </div>
  <p class="footer__wordmark" aria-hidden="true"><span>${esc(site.wordmark)}</span></p>
</footer>`;
}
