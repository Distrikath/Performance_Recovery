// Shared HTML building blocks. Pages compose these; copy lives in
// content/site.mjs.
//
// GRID: every page uses a 4-column grid (.g). Images only ever span
// 1, 2, 3 or 4 columns (¼, ½, ¾, full) and only use three shapes:
//   portrait 4:5 · landscape 3:2 · wide 16:9
// Utility classes: .c1–.c4 = start column, .w1–.w4 = width in columns.
import { site, images } from '../content/site.mjs';

let manifest = {};
export function setManifest(m) {
  manifest = m;
}

export const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Escape text and turn *word* into an italic serif accent.
export const rich = (s = '') => esc(s).replace(/\*(.+?)\*/g, '<em>$1</em>');
export const plain = (s = '') => String(Array.isArray(s) ? s.join(' ') : s).replace(/\*/g, '');

// Headline lines, each on its own row; *word* becomes an accent.
export const lines = (v) =>
  (Array.isArray(v) ? v : [v]).map((l) => `<span class="ln">${rich(l)}</span>`).join(' ');

export const label = (text, num = '', tag = 'p') =>
  text ? `<${tag} class="label">${num ? `<span class="label__num">(${esc(num)})</span> ` : ''}${esc(text)}</${tag}>` : '';

// Review notes are only rendered while site.preview is true.
export const note = (text) =>
  site.preview && text ? `<p class="review-note"><span>Review note</span> ${esc(text)}</p>` : '';

const extAttrs = (href) => (/^https?:\/\//.test(href) ? ' target="_blank" rel="noopener"' : '');
const extHint = (href) => (/^https?:\/\//.test(href) ? '<span class="sr-only"> (opens in a new tab)</span>' : '');

export function link(href, text, cls = '') {
  return `<a class="${cls}" href="${esc(href)}"${extAttrs(href)}>${esc(text)}${extHint(href)}</a>`;
}

// Arrow link — the primary call-to-action style.
export function cta(c, cls = '') {
  if (!c) return '';
  const arrow = /^https?:\/\//.test(c.href) ? '↗' : '→';
  return `<a class="cta ${cls}" href="${esc(c.href)}"${extAttrs(c.href)}><span>${esc(c.label)}</span><span class="cta__arrow" aria-hidden="true">${arrow}</span>${extHint(
    c.href
  )}</a>`;
}

export function button(c, variant = 'solid') {
  if (!c) return '';
  return `<a class="btn btn--${variant}" href="${esc(c.href)}"${extAttrs(c.href)}>${esc(c.label)}${extHint(c.href)}</a>`;
}

const SHAPES = { portrait: '4/5', landscape: '3/2', wide: '16/9', square: '1/1' };
const SIZES = { 1: '(min-width: 900px) 25vw, 50vw', 2: '(min-width: 900px) 50vw, 100vw', 3: '(min-width: 900px) 75vw, 100vw', 4: '100vw' };

/**
 * Photograph (or labelled placeholder).
 * opts.span    — columns the image occupies (1–4); sets `sizes`.
 * opts.shape   — 'portrait' | 'landscape' | 'wide'; omit to fill the parent.
 * opts.eager   — load immediately (above the fold).
 * opts.caption — show caption under the frame (string overrides the image's caption).
 */
export function picture(key, opts = {}) {
  const im = images[key];
  if (!im) throw new Error(`Unknown image key: ${key}`);
  const { span = 4, shape, eager = false, cls = '', caption = false } = opts;
  const frameStyle = shape ? ` style="aspect-ratio:${SHAPES[shape]}"` : '';
  const capText = typeof caption === 'string' ? caption : caption ? im.caption : '';

  let frame;
  if (im.placeholder) {
    const inner = site.preview
      ? `<span class="ph__tag">Photography to come</span><span class="ph__brief">${esc(im.brief)}</span>`
      : '';
    frame = `<div class="frame ph ${cls}"${frameStyle} role="img" aria-label="${esc(im.alt || 'Photograph to come')}">${inner}</div>`;
  } else {
    const m = manifest[im.src];
    if (!m) throw new Error(`Image "${im.src}" missing from assets/img/manifest.json — run npm run images`);
    const srcset = m.widths.map((w) => `/assets/img/${im.src}-${w}.webp ${w}w`).join(', ');
    const fallback = m.widths.find((w) => w >= 1200) || m.widths[m.widths.length - 1];
    const style = `--pos:${im.pos || '50% 50%'};--pos-m:${im.posMobile || im.pos || '50% 50%'}`;
    const img = `<img src="/assets/img/${im.src}-${fallback}.webp" srcset="${srcset}" sizes="${SIZES[span]}" width="${
      m.width
    }" height="${m.height}" alt="${esc(im.alt)}" style="${style}" ${
      eager ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'
    } decoding="async">`;
    const tag = site.preview && im.temporary ? '<span class="temp-tag">Temporary image</span>' : '';
    frame = `<div class="frame ${cls}"${frameStyle}>${img}${tag}</div>`;
  }
  return capText ? `<figure class="figure">${frame}<figcaption class="caption">${esc(capText)}</figcaption></figure>` : frame;
}

export const imageUrl = (key, width = 1200) => {
  const im = images[key];
  if (!im || im.placeholder) return '';
  const m = manifest[im.src];
  const w = m.widths.find((x) => x >= width) || m.widths[m.widths.length - 1];
  return `${site.domain}/assets/img/${im.src}-${w}.webp`;
};

/**
 * Full-bleed photographic hero.
 * meta — up to four short mono strings, one per grid column, along the top.
 * logo — optional markup shown above the headline.
 */
export function photoHero({ hero, meta = [], logo = '', ctas = hero.ctas || [], size = '' }) {
  return `<section class="hero hero--${hero.tone || 'dark'}" aria-labelledby="page-title">
  <div class="hero__media">${picture(hero.image, { span: 4, eager: true })}</div>
  <div class="hero__inner">
    <div class="g hero__meta">${meta.map((m, i) => `<p class="mono c${i + 1} w1">${esc(m)}</p>`).join('')}</div>
    <div class="hero__foot">
      ${logo}
      <h1 id="page-title" class="display ${size}">${lines(hero.headline)}</h1>
      <div class="g hero__row">
        ${hero.body ? `<p class="hero__body c1 w2">${esc(hero.body)}</p>` : ''}
        ${ctas.map((c, i) => `<div class="c${3 + i} w1 m1">${cta(c, 'cta--light')}</div>`).join('')}
      </div>
    </div>
  </div>
</section>`;
}

// Typographic hero for inner pages without a lead photograph.
export function textHero(hero, meta = []) {
  return `<section class="hero-text" aria-labelledby="page-title">
  <div class="g hero__meta">${[hero.label, ...meta].map((m, i) => `<p class="mono c${i + 1} w1">${esc(m)}</p>`).join('')}</div>
  <h1 id="page-title" class="display">${lines(hero.headline)}</h1>
  ${hero.body ? `<div class="g"><p class="lead c3 w2">${esc(hero.body)}</p></div>` : ''}
</section>`;
}

// Large statement: label in column 1, serif statement across columns 2–4.
export function statement({ id, num, labelText, headline, body = '', extra = '', tag = 'h2', size = 'serif-xl' }) {
  return `<section class="section statement"${id ? ` id="${id}"` : ''}${id ? ` aria-labelledby="${id}-t"` : ''}>
  <div class="g">
    <div class="c1 w1">${label(labelText, num)}</div>
    <${tag} class="${size} c2 w3"${id ? ` id="${id}-t"` : ''}>${rich(headline)}</${tag}>
    ${body ? `<p class="lead c3 w2 statement__body">${esc(body)}</p>` : ''}
    ${extra}
  </div>
</section>`;
}

// Giant call-to-action band.
export function ctaBand({ id, headline, ctas = [], labelText = '' }) {
  return `<section class="section cta-band" aria-labelledby="${id}">
  <div class="g">${labelText ? `<div class="c1 w1">${label(labelText)}</div>` : ''}</div>
  <h2 id="${id}" class="display display--band">${lines(headline)}</h2>
  <div class="g cta-band__row">
    ${ctas.map((c, i) => `<div class="c${3 + i} w1">${cta(c)}</div>`).join('')}
  </div>
</section>`;
}
