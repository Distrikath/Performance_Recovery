// Shared HTML building blocks. Pages compose these; copy lives in
// content/site.mjs.
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

export const isExternal = (href = '') => /^https?:\/\//.test(href) || href.startsWith('mailto:');

// Join an array of lines with <br> (used for intentional headline breaks).
export const lines = (v) => (Array.isArray(v) ? v.map(esc).join('<br>') : esc(v));

export const label = (text, tag = 'p') => (text ? `<${tag} class="label">${esc(text)}</${tag}>` : '');

// Review notes are only rendered while site.preview is true.
export const note = (text) =>
  site.preview && text ? `<p class="review-note"><span>Review note</span> ${esc(text)}</p>` : '';

export function link(href, text, cls = '') {
  const ext = /^https?:\/\//.test(href);
  return `<a class="${cls}" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ''}>${esc(text)}${
    ext ? '<span class="sr-only"> (opens in a new tab)</span>' : ''
  }</a>`;
}

export function button(cta, variant = 'solid') {
  if (!cta) return '';
  const ext = /^https?:\/\//.test(cta.href);
  return `<a class="btn btn--${variant}" href="${esc(cta.href)}"${ext ? ' target="_blank" rel="noopener"' : ''}>${esc(
    cta.label
  )}${ext ? '<span class="btn__ext" aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span>' : ''}</a>`;
}

export const buttons = (ctas = [], variants = ['solid', 'outline']) =>
  ctas.length
    ? `<div class="actions">${ctas.map((c, i) => button(c, variants[i] || 'outline')).join('')}</div>`
    : '';

/**
 * Photograph (or labelled placeholder) inside a fixed-ratio frame.
 * opts.ratio   — CSS aspect-ratio for the frame (e.g. '4/5'); omit to fill parent.
 * opts.sizes   — the img `sizes` attribute.
 * opts.eager   — load immediately (above the fold).
 * opts.caption — show the image's caption (true) under the frame.
 */
export function picture(key, opts = {}) {
  const im = images[key];
  if (!im) throw new Error(`Unknown image key: ${key}`);
  const { ratio, sizes = '100vw', eager = false, cls = '', caption = false } = opts;
  const frameStyle = ratio ? ` style="aspect-ratio:${ratio}"` : '';

  if (im.placeholder) {
    const inner = site.preview
      ? `<span class="ph__tag">Photography to come</span><span class="ph__brief">${esc(im.brief)}</span>`
      : '';
    return `<div class="frame ph ${cls}"${frameStyle} role="img" aria-label="${esc(
      im.alt || 'Photograph to come'
    )}">${inner}</div>`;
  }

  const m = manifest[im.src];
  if (!m) throw new Error(`Image "${im.src}" missing from assets/img/manifest.json — run npm run images`);
  const srcset = m.widths.map((w) => `/assets/img/${im.src}-${w}.webp ${w}w`).join(', ');
  const fallback = m.widths.find((w) => w >= 1200) || m.widths[m.widths.length - 1];
  const style = `--pos:${im.pos || '50% 50%'};--pos-m:${im.posMobile || im.pos || '50% 50%'}`;
  const img = `<img src="/assets/img/${im.src}-${fallback}.webp" srcset="${srcset}" sizes="${esc(sizes)}" width="${
    m.width
  }" height="${m.height}" alt="${esc(im.alt)}" style="${style}" ${
    eager ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'
  } decoding="async">`;
  const frame = `<div class="frame ${cls}"${frameStyle}>${img}</div>`;
  if (caption && im.caption) {
    return `<figure class="figure">${frame}<figcaption class="caption">${esc(im.caption)}</figcaption></figure>`;
  }
  return frame;
}

export const imageUrl = (key, width = 1200) => {
  const im = images[key];
  if (!im || im.placeholder) return '';
  const m = manifest[im.src];
  const w = m.widths.find((x) => x >= width) || m.widths[m.widths.length - 1];
  return `${site.domain}/assets/img/${im.src}-${w}.webp`;
};

// Large photographic hero. Text sits bottom-left over the image.
export function photoHero({ hero, eyebrow = '', extra = '', ctas = hero.ctas, variants }) {
  const tone = hero.tone || 'dark';
  return `<section class="hero hero--photo hero--${tone}" aria-labelledby="page-title">
  <div class="hero__media">${picture(hero.image, { sizes: '100vw', eager: true })}</div>
  <div class="hero__content wrap">
    ${eyebrow}${label(hero.label)}
    <h1 id="page-title" class="display">${lines(hero.headline)}</h1>
    ${hero.body ? `<p class="hero__body">${esc(hero.body)}</p>` : ''}
    ${buttons(ctas, variants || (tone === 'dark' ? ['light', 'outline-light'] : ['solid', 'outline']))}
    ${extra}
  </div>
</section>`;
}

// Typographic hero for inner pages without a lead photograph.
export function textHero(hero) {
  return `<section class="hero hero--text" aria-labelledby="page-title">
  <div class="wrap">
    ${label(hero.label)}
    <h1 id="page-title" class="display">${lines(hero.headline)}</h1>
    ${hero.body ? `<p class="hero__body">${esc(hero.body)}</p>` : ''}
  </div>
</section>`;
}
