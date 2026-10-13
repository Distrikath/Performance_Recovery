// Page templates. Each returns { path, title, description, body, hero }.
//
// Every section follows the grid slots described in components.mjs:
//   col 1 LABEL · col 2 HEAD/TEXT · col 3 TEXT 2 · col 4 ACTION
// Images span 1/4 (w1), 1/2 (w2), 3/4 (w3) or full width only.
import { pages, projects, projectCategories, distrik, forms } from '../content/site.mjs';
import { esc, rich, label, note, link, cta, picture, photoHero, textHero, ctaBand, sectionHead, row, ctaStack } from './components.mjs';

const publicProjects = () => projects.filter((p) => p.verified && p.public);
const book = { label: 'Book Recovery', href: distrik.booking };
const pad = (n) => String(n).padStart(2, '0');
const paras = (list) => list.map((p) => `<p>${esc(p)}</p>`).join('');

let distrikSvg = '';
export function setDistrikSvg(svg) {
  distrikSvg = svg
    .replace(/<svg[^>]*?(viewBox="[^"]*")[^>]*>/, '<svg $1 xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">')
    .replace(/<\?xml[^>]*>/, '');
}
export const distrikLogoMarkup = (cls = '') => distrikLogo(cls);
// Each copy of the inline SVG gets its own internal ids, so several logos can
// appear on one page without clashing clip paths.
let logoCount = 0;
const distrikLogo = (cls = '') => {
  const n = ++logoCount;
  const svg = distrikSvg.replace(/(id="|url\(#|href="#)([^")]+)/g, (_, pre, id) => `${pre}${id}-${n}`);
  return `<span class="distrik-logo ${cls}" role="img" aria-label="DISTRIK">${svg}</span>`;
};

// Index row — the same four slots: (num) label | title | text | ¼ image.
function indexRow({ num, labelText, title, body, extra = '', image, id, tag = 'h3' }) {
  return `<div class="g index-row"${id ? ` id="${id}"` : ''}>
    <p class="mono c1 w1">(${esc(num)}) ${esc(labelText || '')}</p>
    <${tag} class="cond-lg c2 w1">${rich(title)}</${tag}>
    <div class="c3 w1 flow">${body}${extra}</div>
    ${image ? `<div class="c4 w1">${picture(image, { span: 1, shape: 'landscape' })}</div>` : ''}
  </div>`;
}

const section = (inner, { cls = '', id = '', labelledby = '', ariaLabel = '' } = {}) =>
  `<section class="section ${cls}"${id ? ` id="${id}"` : ''}${labelledby ? ` aria-labelledby="${labelledby}"` : ''}${
    ariaLabel ? ` aria-label="${esc(ariaLabel)}"` : ''
  }>${inner}</section>`;

// ------------------------------------------------------------------ HOME
export function home() {
  const c = pages.home;
  const work = publicProjects().slice(0, 3);
  return {
    ...c,
    hero: 'dark',
    image: c.hero.image,
    body: `
${photoHero({ hero: c.hero, meta: ['(AU) Corporate Wellness', '(ID) DISTRIK, Canggu', '', 'Founded by Justin Savage'] })}

${section(
  sectionHead({ id: 'intro-t', num: '01', labelText: c.intro.label, headline: c.intro.headline }) +
    row([
      { col: 2, cls: 'flow', html: `<p class="lead">${esc(c.intro.body)}</p>` },
      { col: 4, html: picture('shoulder-release', { span: 1, shape: 'portrait' }) },
    ]),
  { labelledby: 'intro-t' }
)}

${section(
  sectionHead({ id: 'corp-t', num: '02', labelText: c.corporate.label, headline: c.corporate.headline }) +
    row([
      { col: 1, span: 2, html: picture(c.corporate.image, { span: 2, shape: 'portrait' }) },
      { col: 3, cls: 'flow', html: `<p>${esc(c.corporate.body)}</p>` },
      { col: 4, html: ctaStack([c.corporate.cta]) },
    ]),
  { labelledby: 'corp-t' }
)}

${section(
  `<div class="g sh"><div class="c1 w1">${label(c.distrik.label, '03')}</div><div class="c2 w2">${distrikLogo('distrik-logo--lg')}</div></div>
  <div class="bleed row">${picture(c.distrik.image, { span: 4, shape: 'wide' })}</div>
  ${sectionHead({ id: 'distrik-t', num: '', labelText: '', headline: c.distrik.headline })}
  ${row([
    { col: 2, cls: 'flow', html: `<p>${esc(c.distrik.body)}</p>` },
    { col: 3, html: `<ul class="mono-list" aria-label="At DISTRIK">${c.distrik.list.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` },
    { col: 4, html: ctaStack([{ label: 'Discover DISTRIK', href: '/distrik/' }, book], 'cta--light') },
  ])}
  ${row(
    ['distrik-cupping', 'distrik-treatment-room', 'distrik-lounge', 'distrik-furniture-detail'].map((k, i) => ({
      col: i + 1,
      m1: true,
      html: picture(k, { span: 1, shape: 'portrait' }),
    })),
    'row--media'
  )}`,
  { cls: 'on-dark', labelledby: 'distrik-t' }
)}

${
  work.length
    ? section(
        sectionHead({ id: 'work-t', num: '04', labelText: c.work.label, headline: c.work.headline }) +
          row(
            work.map((p, i) => ({
              col: i === 0 ? 1 : i + 2,
              span: i === 0 ? 2 : 1,
              m1: i > 0,
              html: `<article class="card"><a href="${esc(p.href)}" class="card__link">
          ${picture(p.image, { span: i === 0 ? 2 : 1, shape: 'portrait' })}
          <p class="mono card__meta">(${pad(i + 1)}) ${esc(projectCategories[p.category])}</p>
          <h3 class="cond-md">${esc(p.title)}</h3>
          <p class="mono muted">${esc(p.location)}</p>
        </a></article>`,
            }))
          ) +
          row([{ col: 4, html: ctaStack([{ label: 'All projects', href: '/projects/' }]) }]),
        { labelledby: 'work-t' }
      )
    : ''
}

${section(
  sectionHead({ id: 'story-t', num: '05', labelText: c.story.label, headline: c.story.headline }) +
    row([
      { col: 1, html: picture(c.story.image, { span: 1, shape: 'portrait', caption: true }) },
      { col: 2, cls: 'flow', html: `<p>${esc(c.story.body)}</p>` },
      { col: 4, html: ctaStack([c.story.cta]) },
    ]),
  { labelledby: 'story-t' }
)}

${ctaBand({ id: 'cta-title', labelText: c.contact.label, headline: c.contact.headline, ctas: c.contact.ctas })}
`,
  };
}

// ------------------------------------------------------- CORPORATE
export function corporate() {
  const c = pages.corporate;
  return {
    ...c,
    hero: c.hero.tone,
    image: c.hero.image,
    body: `
${photoHero({ hero: c.hero, meta: ['(AU) Australia', 'Programs for workplaces'] })}

${section(
  sectionHead({ id: 'offer-t', num: '01', labelText: 'What we offer', headline: 'Five ways *in.*' }) +
    row([{ col: 2, span: 2, html: '<p class="lead">Start with one area or bring them together. Every program is shaped around your teams, spaces and calendar.</p>' }]),
  { labelledby: 'offer-t' }
)}

${section(
  c.offerings
    .map((x, i) =>
      indexRow({
        id: x.id,
        num: pad(i + 1),
        labelText: x.label,
        title: x.label,
        body: `<p class="head-sm">${esc(x.headline)}</p><p>${esc(x.body)}</p>`,
        extra: x.items ? `<ul class="mono-list">${x.items.map((it) => `<li>${esc(it)}</li>`).join('')}</ul>` : '',
        image: x.image,
      })
    )
    .join(''),
  { cls: 'index', ariaLabel: 'Offering areas' }
)}

${section(
  sectionHead({ id: 'process-t', num: '02', labelText: c.process.label, headline: c.process.headline }) +
    `<ol class="g row process__steps">${c.process.steps
      .map(
        (s, i) =>
          `<li class="c${i + 1} w1 m1"><span class="mono">${pad(i + 1)}${i < 3 ? ' →' : ''}</span><h3 class="cond-md">${esc(s.title)}</h3><p>${esc(s.body)}</p></li>`
      )
      .join('')}</ol>`,
  { labelledby: 'process-t' }
)}

${section(
  sectionHead({ id: 'client-t', num: '03', labelText: c.client.label, headline: c.client.headline }) +
    row([
      { col: 1, m1: true, html: picture(c.client.image, { span: 1, shape: 'portrait' }) },
      {
        col: 2,
        cls: 'flow',
        html: `<p class="lead">${esc(c.client.body)}</p>${
          c.client.details.length ? `<ul class="mono-list">${c.client.details.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>` : ''
        }${note(c.client.reviewNote)}`,
      },
      { col: 4, html: `<p class="mono muted">${esc(c.client.disclaimer)}</p>` },
    ]) +
    `<div class="g index-row index-row--dark">
      <p class="mono c1 w1">(→) ${esc(c.future.label)}</p>
      <h3 class="cond-lg c2 w1">${rich(c.future.headline)}</h3>
      <p class="c3 w1">${esc(c.future.body)}</p>
    </div>`,
  { cls: 'on-dark', id: c.client.id, labelledby: 'client-t' }
)}

${ctaBand({ id: 'cta-title', headline: c.cta.headline, ctas: [c.cta.button] })}
`,
  };
}

// ------------------------------------------------------- DISTRIK
export function distrikPage() {
  const c = pages.distrik;
  const r = c.recovery;
  const prices = distrik.prices.length
    ? `<div class="g row"><p class="label c1 w1"><span class="label__num">(IDR)</span> Session prices</p></div>
    <div class="g prices" aria-label="Session prices">
      ${distrik.prices
        .map((p, i) => `<div class="c${i + 1} w1 m1 price"><span class="cond-md">${esc(p.name)}</span><span class="mono">${esc(p.price)}</span></div>`)
        .join('')}
    </div>
    ${row(
      [...(distrik.priceNotes || []), 'Same price for Recover, Perform or Move.'].map((n, i) => ({ col: i + 2, html: `<p class="mono muted">${esc(n)}</p>` })),
      'row--tight'
    )}`
    : '';

  return {
    ...c,
    hero: 'dark',
    image: c.hero.image,
    body: `
${photoHero({
  hero: c.hero,
  labelText: c.hero.label,
  meta: ['(ID) Canggu, Bali', 'Run by PT The Savage Group'],
  logo: distrikLogo('distrik-logo--hero'),
  ctas: [book, { label: 'Explore Treatments', href: '#treatments' }],
})}

${section(
  sectionHead({ id: 'parts-t', num: '01', labelText: c.intro.label, headline: c.intro.headline }) +
    `<ul class="g row parts">${c.intro.parts
      .map(
        (p, i) =>
          `<li class="c${i + 2} w1"><a href="${p.href}"><span class="mono">(${pad(i + 1)})</span><span class="cond-md">${esc(p.label)}</span><span class="cta__arrow" aria-hidden="true">↓</span></a></li>`
      )
      .join('')}</ul>`,
  { labelledby: 'parts-t' }
)}

${section(
  `<div class="bleed">${picture(r.image, { span: 4, shape: 'wide', caption: true })}</div>
  <div class="row">${sectionHead({ id: 'treat-t', num: '02', labelText: r.label, headline: r.headline })}</div>
  ${row([
    { col: 2, cls: 'flow', html: `<p>${esc(r.note)}</p>` },
    { col: 4, html: ctaStack([book], 'cta--light') },
  ])}
  <ol class="g row technique-grid" aria-label="Techniques">${r.techniques
    .map((t, i) => `<li class="w1 m1"><span class="mono">${pad(i + 1)}</span>${esc(t)}</li>`)
    .join('')}</ol>`,
  { cls: 'on-dark treatments', id: r.id, labelledby: 'treat-t' }
)}

${section(
  sectionHead({ id: 'focus-t', num: '03', labelText: 'Treatment focus', headline: 'Three ways to *book.*' }) +
    `<div class="row">${r.focuses
      .map((f, i) =>
        indexRow({
          num: ['A', 'B', 'C'][i],
          labelText: 'Focus',
          title: f.name,
          body: `<p class="lead">${esc(f.body)}</p>`,
          image: ['athlete-rest', 'shoulder-sweat', 'athlete-stretch'][i],
        })
      )
      .join('')}</div>` +
    prices +
    row([{ col: 4, html: ctaStack([book]) }]),
  { cls: 'index', labelledby: 'focus-t' }
)}

${[c.supply, c.fuel]
  .map((x, i) =>
    section(
      sectionHead({ id: `${x.id}-t`, num: pad(i + 4), labelText: x.label, headline: x.headline, size: 'head-lg' }) +
        row(
          i
            ? [
                { col: 1, cls: 'flow', html: `<p>${esc(x.body)}</p>` },
                { col: 2, span: 3, html: picture(x.image, { span: 3, shape: 'wide' }) },
              ]
            : [
                { col: 1, span: 3, html: picture(x.image, { span: 3, shape: 'wide' }) },
                { col: 4, cls: 'flow', html: `<p>${esc(x.body)}</p>` },
              ]
        ),
      { id: x.id, labelledby: `${x.id}-t` }
    )
  )
  .join('')}

<section class="hero hero--dark community" id="${c.community.id}" aria-labelledby="community-title">
  <div class="hero__media">${picture(c.community.image, { span: 4 })}</div>
  <div class="hero__inner">
    <div class="g hero__meta">${c.community.details.map((d, i) => `<p class="mono c${i + 1} w1">${i === 0 ? '(06) ' : ''}${esc(d)}</p>`).join('')}</div>
    <div class="hero__foot">
      <h2 id="community-title" class="display run-lockup"><span class="ln"><span class="run-lockup__words">${esc(c.community.headline)}</span> ${distrikLogo('distrik-logo--lockup')}</span></h2>
      <div class="g hero__row">
        <p class="mono c1 w1 hero__label">${esc(c.community.label)}</p>
        <p class="hero__body c2 w2">${esc(c.community.body)}</p>
        <div class="c4 w1">${ctaStack([{ label: 'Follow on Instagram', href: distrik.instagram }], 'cta--light')}</div>
      </div>
    </div>
  </div>
</section>

${section(
  sectionHead({ id: 'clinical-t', num: '07', labelText: c.clinical.label, headline: c.clinical.headline, size: 'head-lg' }) +
    row([
      { col: 2, cls: 'flow', html: `<p>${esc(c.clinical.body)}</p>${note(c.clinical.reviewNote)}` },
      { col: 4, html: `<p class="mono muted">Enquiries</p><p>${link(`mailto:${distrik.email}`, distrik.email, 'text-link')}</p>` },
    ]),
  { cls: 'clinical', id: c.clinical.id, labelledby: 'clinical-t' }
)}

${visit(c.visit)}
`,
  };
}

function visit(v) {
  const hours = distrik.hours.length
    ? `<dl class="hours">${distrik.hours.map((h) => `<dt>${esc(h.days)}</dt><dd>${esc(h.time)}</dd>`).join('')}</dl>`
    : note('Opening hours and promotions are hidden until confirmed — add them in content/site.mjs.');
  return section(
    sectionHead({ id: 'visit-t', num: '08', labelText: v.label, headline: v.headline }) +
      row([
        { col: 1, html: picture(v.image, { span: 1, shape: 'portrait', caption: true }) },
        {
          col: 2,
          cls: 'flow',
          html: `<h3 class="label">Address</h3><address>${distrik.address.map(esc).join('<br>')}</address><p>${link(distrik.mapUrl, 'Open in Google Maps', 'text-link')}</p>`,
        },
        {
          col: 3,
          cls: 'flow',
          html: `<h3 class="label">Contact</h3><p>${link(`mailto:${distrik.email}`, distrik.email, 'text-link')}</p><p>${link(
            distrik.instagram,
            `Instagram ${distrik.instagramHandle}`,
            'text-link'
          )}</p><h3 class="label">Hours</h3>${hours}`,
        },
        { col: 4, html: ctaStack([book]) },
      ]),
    { id: v.id, labelledby: 'visit-t' }
  );
}

// ------------------------------------------------------- OUR STORY
export function story() {
  const c = pages.story;
  const chapters = c.chapters;
  const last = chapters[chapters.length - 1];
  return {
    ...c,
    hero: 'dark',
    image: c.hero.image,
    body: `
${photoHero({ hero: { ...c.hero, body: '', tone: 'dark' }, labelText: c.hero.label, meta: ['Justin Savage, founder', '(AU) — (ID)'], ctas: [] })}

${section(
  sectionHead({ id: 'intro-t', num: '00', labelText: 'Introduction', headline: c.hero.body, size: 'head-lg' }) +
    (note(c.reviewNote) ? row([{ col: 2, span: 2, html: note(c.reviewNote) }]) : ''),
  { labelledby: 'intro-t' }
)}

${section(
  chapters
    .slice(0, -1)
    .map((ch, i) =>
      indexRow({ tag: 'h2', num: pad(i + 1), labelText: ch.label, title: ch.headline, body: paras(ch.body), image: ch.image })
    )
    .join(''),
  { cls: 'index', ariaLabel: 'Chapters' }
)}

<div class="bleed">${picture(last.image, { span: 4, shape: 'wide', caption: true })}</div>

${section(
  sectionHead({ id: 'today-t', num: pad(chapters.length), labelText: last.label, headline: last.headline }) +
    row(last.body.map((p, i) => ({ col: i + 2, cls: 'flow', html: `<p>${esc(p)}</p>` }))),
  { labelledby: 'today-t' }
)}

${ctaBand({ id: 'story-cta', headline: pages.home.contact.headline, ctas: pages.home.contact.ctas })}
`,
  };
}

// ------------------------------------------------------- PROJECTS
export function projectsPage() {
  const c = pages.projects;
  const work = publicProjects();
  const groups = Object.entries(projectCategories)
    .map(([key, name]) => ({ key, name, items: work.filter((p) => p.category === key) }))
    .filter((g) => g.items.length);
  return {
    ...c,
    hero: 'none',
    body: `
${textHero(c.hero, [`${work.length} projects`, groups.map((g) => g.name).join(' · ')])}
${groups
  .map((g, gi) =>
    section(
      g.items
        .map(
          (p) => `<article class="g index-row project">
      <h2 id="g-${g.key}" class="label c1 w1"><span class="label__num">(${pad(gi + 1)})</span> ${esc(g.name)}</h2>
      <div class="c2 w2">${picture(p.image, { span: 2, shape: 'landscape' })}</div>
      <div class="c4 w1 flow">
        <h3 class="cond-lg">${esc(p.title)}</h3>
        <p class="mono muted">${esc(p.location)}</p>
        <p>${esc(p.summary)}</p>
        ${note(p.note)}
        ${p.href ? ctaStack([{ label: p.linkLabel || 'Read more', href: p.href }]) : ''}
      </div>
    </article>`
        )
        .join(''),
      { cls: 'index project-group', id: g.key, labelledby: `g-${g.key}` }
    )
  )
  .join('\n')}
${ctaBand({ id: 'projects-cta', headline: pages.home.contact.headline, ctas: pages.home.contact.ctas })}
`,
  };
}

// ------------------------------------------------------- CONTACT
export function contact() {
  const c = pages.contact;
  const f = forms.corporate;
  const connected = Boolean(f.endpoint);
  const field = (id, lab, type = 'text', attrs = '') =>
    `<div class="field"><label for="${id}">${lab}</label><input id="${id}" name="${id}" type="${type}" ${attrs}></div>`;

  return {
    ...c,
    hero: 'none',
    body: `
${textHero(c.hero, ['Corporate Wellness — Australia', 'DISTRIK — Canggu, Bali'])}
<nav class="g pathways" aria-label="Enquiry type">
  <a class="c1 w2 pathway" href="#${c.corporate.id}"><span class="mono">(01)</span><span class="cond-xl">${esc(
    c.corporate.label
  )}</span><span class="mono muted">Workplace programs in Australia →</span></a>
  <a class="c3 w2 pathway" href="#${c.distrik.id}"><span class="mono">(02)</span>${distrikLogo('distrik-logo--pathway')}<span class="mono muted">Performance recovery in Canggu, Bali →</span></a>
</nav>

${section(
  sectionHead({ id: 'corp-enq', num: '01', labelText: c.corporate.label, headline: c.corporate.headline, size: 'head-lg' }) +
    `<div class="g row">
      <div class="c2 w1 flow"><p>${esc(c.corporate.body)}</p></div>
      <form class="c3 w2 form" data-enquiry-form data-endpoint="${esc(f.endpoint)}" ${
        connected ? `action="${esc(f.endpoint)}" method="post"` : ''
      } novalidate>
        ${
          connected
            ? ''
            : `<div class="form__preview" role="note"><strong>Preview form.</strong> This form is not connected to a submission service yet, so nothing you enter will be sent.</div>`
        }
        <div class="form__grid">
          ${field('name', 'Name', 'text', 'autocomplete="name" required')}
          ${field('email', 'Work email', 'email', 'autocomplete="email" required')}
          ${field('company', 'Company', 'text', 'autocomplete="organization" required')}
          ${field('location', 'City / country', 'text', 'autocomplete="address-level2"')}
        </div>
        <div class="field">
          <label for="looking-for">What are you looking for?</label>
          <select id="looking-for" name="looking_for">
            <option value="">Select an option</option>
            ${f.lookingFor.map((o) => `<option>${esc(o)}</option>`).join('')}
          </select>
        </div>
        <div class="field">
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="6" required></textarea>
        </div>
        <div class="hp" aria-hidden="true"><label for="website">Leave this field empty</label><input id="website" name="_gotcha" type="text" tabindex="-1" autocomplete="off"></div>
        <p class="mono muted small">Name, work email, company and message are required. We use your details only to respond to your enquiry.</p>
        <button class="btn btn--solid" type="submit">Send enquiry</button>
        <p class="form__status" data-form-status role="status" aria-live="polite"></p>
      </form>
    </div>`,
  { cls: 'enquiry', id: c.corporate.id, labelledby: 'corp-enq' }
)}

${section(
  `<div class="g sh"><div class="c1 w1">${label(c.distrik.label + ' · Canggu', '02')}</div><div class="c2 w1">${distrikLogo('distrik-logo--md')}</div></div>` +
    sectionHead({ id: 'distrik-enq', num: '', labelText: '', headline: c.distrik.headline, size: 'head-lg' }) +
    `<div class="g row">
      <div class="c2 w1 flow"><p>${esc(c.distrik.body)}</p></div>
      <ul class="c3 w2 contact-list">
        <li><span class="mono">Book</span>${link(distrik.booking, 'Book on Fresha ↗', 'contact-list__link')}</li>
        <li><span class="mono">Email</span>${link(`mailto:${distrik.email}`, distrik.email, 'contact-list__link')}</li>
        <li><span class="mono">Instagram</span>${link(distrik.instagram, distrik.instagramHandle + ' ↗', 'contact-list__link')}</li>
        <li><span class="mono">Address</span><address>${distrik.address.map(esc).join('<br>')}</address></li>
      </ul>
    </div>`,
  { cls: 'on-dark enquiry', id: c.distrik.id, labelledby: 'distrik-enq' }
)}
`,
  };
}

// ------------------------------------------------------- 404 + reserved
export function notFound() {
  const c = pages.notFound;
  return {
    ...c,
    hero: 'none',
    noindex: true,
    body: `${textHero({ label: 'Error 404', headline: ['Page not *found.*'], body: 'The page you are looking for has moved or does not exist.' })}
<div class="section-tail">${row([{ col: 4, html: ctaStack([{ label: 'Back to home', href: '/' }]) }])}</div>`,
  };
}

export function reserved(path) {
  const c = pages.reserved;
  return {
    path,
    title: `${c.title} (${path})`,
    description: c.description,
    hero: 'none',
    noindex: true,
    body: `${textHero({ label: 'Client hub', headline: [`*${c.headline}*`], body: c.body })}
<div class="section-tail">${row([
      {
        col: 4,
        html: ctaStack([
          { label: 'Corporate Wellness', href: '/corporate-wellness/' },
          { label: 'Contact', href: '/contact/' },
        ]),
      },
    ])}</div>`,
  };
}

export const allPages = () => [home(), corporate(), distrikPage(), story(), projectsPage(), contact()];
