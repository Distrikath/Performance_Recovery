// Page shell: <head>, header, mobile menu and footer.
import { site, nav, headerCta, distrik } from '../content/site.mjs';
import { esc, imageUrl, link, picture } from './components.mjs';
import { distrikLogoMarkup } from './pages.mjs';

export function layout({ path, title, description, body, hero = 'none', noindex = false, image, theme = 'dark' }) {
  const canonical = site.domain + (path === '/404.html' ? '/' : path);
  const ogImage = imageUrl(image || site.shareImage);
  const robots = site.preview || noindex ? '<meta name="robots" content="noindex, nofollow">' : '';
  const current = (href) => (path === href || (href !== '/' && path.startsWith(href)) ? ' aria-current="page"' : '');

  const navLinks = nav.map((n) => `<li><a href="${n.href}"${current(n.href)}>${esc(n.label)}</a></li>`).join('');
  const sitemapRows = [{ label: 'Home', href: '/' }, ...nav]
    .map((n) => `<li><a href="${n.href}"${path === n.href ? ' aria-current="page"' : current(n.href === '/' ? '#' : n.href)}>${esc(n.label)}</a></li>`)
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
<meta name="theme-color" content="#0c0c0c">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<script>try{if(!sessionStorage.getItem('tsg-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('is-loading');setTimeout(function(){document.documentElement.classList.remove('is-loading')},4000)}}catch(e){}</script>
<link rel="preload" href="/assets/fonts/archivo-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/space-mono-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/styles.css">
<script src="/assets/main.js" defer></script>
</head>
<body class="theme-${theme}" data-hero="${hero}"${site.preview ? ' data-preview' : ''}>
<a class="skip-link" href="#main">Skip to content</a>
<div class="loader" aria-hidden="true" data-loader>
  <span class="loader__cross">+</span>
  <div class="loader__text mono">
    <p>${esc(site.wordmark)}</p>
    <p>Movement<br>Recovery<br>Connection</p>
    <p>(AU) Corporate Wellness<br>(ID) DISTRIK, Canggu</p>
  </div>
  <p class="loader__count mono"><span data-loader-count>000</span> — Loading</p>
  <span class="loader__bar" data-loader-bar></span>
</div>
<header class="site-header" data-header>
  <div class="g site-header__inner">
    <a class="wordmark c1 w1" href="/"${path === '/' ? ' aria-current="page"' : ''}>${esc(site.wordmark)}</a>
    <nav class="site-nav c2 w2" aria-label="Main">
      <ul>${navLinks}</ul>
    </nav>
    <div class="site-header__end c4 w1">
      <a class="header-cta" href="${headerCta.href}">${esc(headerCta.label)}</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu" data-menu-toggle>
        <span data-menu-label>Menu</span>
      </button>
    </div>
  </div>
</header>
<div class="menu-panel theme-dark" id="site-menu" data-menu hidden>
  <nav class="g" aria-label="Site menu">
    <div class="c1 w2 nav-col">
      <p class="label">Sitemap</p>
      <ul class="nav-rows nav-rows--big">${sitemapRows}</ul>
    </div>
    <div class="c3 w1 nav-col">
      <p class="label">DISTRIK · Canggu</p>
      ${distrikRows()}
    </div>
    <div class="c4 w1 nav-col">
      <p class="label">Talk to us</p>
      <ul class="nav-rows">
        <li><a href="/contact/#corporate">Workplace program</a></li>
        <li><a href="/contact/#distrik">DISTRIK enquiry</a></li>
      </ul>
      <a class="btn btn--solid btn--block menu-cta" href="${headerCta.href}">${esc(headerCta.label)}</a>
    </div>
  </nav>
  ${tiles()}
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

function distrikRows() {
  return `<ul class="nav-rows">
        <li>${link(distrik.booking, 'Book recovery ↗')}</li>
        <li>${link(distrik.instagram, `Instagram ${distrik.instagramHandle} ↗`)}</li>
        <li>${link(`mailto:${distrik.email}`, distrik.email)}</li>
      </ul>`;
}

// Two image tiles — one per business — shared by the menu and footer.
function tiles() {
  return `<div class="g tiles">
    <a class="tile c1 w2" href="/distrik/">
      ${picture('distrik-assisted-stretch', { span: 2, shape: 'landscape' })}
      <span class="tile__body">${distrikLogoMarkup('')}<span class="cta__arrow" aria-hidden="true">→</span></span>
    </a>
    <a class="tile c3 w2" href="/corporate-wellness/">
      ${picture('ph-workplace-session', { span: 2, shape: 'landscape' })}
      <span class="tile__body"><span class="tile__title">Corporate Wellness</span><span class="cta__arrow" aria-hidden="true">→</span></span>
    </a>
  </div>`;
}

function footer() {
  const legal = site.legal.map((l) => `<li>${esc(l.name)}${l.detail ? ` · ${esc(l.detail)}` : ''}</li>`).join('');
  return `<footer class="site-footer on-dark theme-dark">
  <div class="g footer__top">
    <div class="c1 w1">
      <p class="head-md footer__tagline">${esc(site.tagline)}</p>
      <p class="mono muted footer__regions">(AU) — (ID)</p>
    </div>
    <nav class="c2 w1 nav-col" aria-label="Footer">
      <p class="label">Sitemap</p>
      <ul class="nav-rows">${[{ label: 'Home', href: '/' }, ...nav].map((n) => `<li><a href="${n.href}">${esc(n.label)}</a></li>`).join('')}</ul>
    </nav>
    <div class="c3 w1 nav-col">
      <p class="label">DISTRIK · Canggu</p>
      ${distrikRows()}
    </div>
    <div class="c4 w1 nav-col">
      <p class="label">Information</p>
      <ul class="nav-rows">
        <li><a href="#main">Back to top ↑</a></li>
      </ul>
      <ul class="footer__legal">
        <li>© ${new Date().getFullYear()} ${esc(site.name)}</li>
        ${legal}
      </ul>
    </div>
  </div>
  ${tiles()}
  <p class="footer__wordmark" aria-hidden="true"><span>${esc(site.wordmark)}</span></p>
</footer>`;
}
