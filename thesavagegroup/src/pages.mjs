// Page templates. Each returns { path, title, description, body, hero }.
// Layout rule: everything sits on the 4-column grid (.g). Images span
// 1/4 (w1), 1/2 (w2), 3/4 (w3) or full width (w4) — nothing in between.
import { pages, projects, projectCategories, distrik, forms } from '../content/site.mjs';
import { esc, rich, lines, label, note, link, cta, picture, photoHero, textHero, statement, ctaBand } from './components.mjs';

const publicProjects = () => projects.filter((p) => p.verified && p.public);
const book = { label: 'Book Recovery', href: distrik.booking };
const pad = (n) => String(n).padStart(2, '0');

let distrikSvg = '';
export function setDistrikSvg(svg) {
  distrikSvg = svg
    .replace(/<svg[^>]*?(viewBox="[^"]*")[^>]*>/, '<svg $1 xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">')
    .replace(/<\?xml[^>]*>/, '');
}
const distrikLogo = (cls = '') => `<span class="distrik-logo ${cls}" role="img" aria-label="DISTRIK">${distrikSvg}</span>`;

// Index row: (num) label | title | text | optional ¼ image.
function indexRow({ num, labelText, title, body, extra = '', image, id, tag = 'h3' }) {
  return `<div class="g index-row"${id ? ` id="${id}"` : ''}>
    <p class="mono c1 w1">(${esc(num)}) ${esc(labelText || '')}</p>
    <${tag} class="cond-lg c2 w1">${rich(title)}</${tag}>
    <div class="c3 w1 index-row__text">${body}${extra}</div>
    ${image ? `<div class="c4 w1">${picture(image, { span: 1, shape: 'landscape' })}</div>` : ''}
  </div>`;
}

// ------------------------------------------------------------------ HOME
export function home() {
  const c = pages.home;
  const work = publicProjects();
  return {
    ...c,
    hero: 'dark',
    image: c.hero.image,
    body: `
${photoHero({ hero: c.hero, meta: ['The Savage Group', '(AU) Corporate Wellness', '(ID) DISTRIK, Canggu', 'Founded by Justin Savage'] })}

${statement({
  id: 'intro',
  num: '01',
  labelText: c.intro.label,
  headline: c.intro.headline,
  extra: `<p class="c3 w1 statement__body">${esc(c.intro.body)}</p>
    <div class="c4 w1 statement__img">${picture('distrik-bodywork-detail', { span: 1, shape: 'portrait' })}</div>`,
})}

<section class="section" aria-labelledby="corp-title">
  <div class="g align-end">
    <div class="c1 w2">${picture(c.corporate.image, { span: 2, shape: 'portrait' })}</div>
    <div class="c3 w2 feature-text">
      ${label(c.corporate.label, '02')}
      <h2 id="corp-title" class="cond-xl">${lines(c.corporate.headline)}</h2>
      <div class="g g--nested">
        <p class="c1 w1">${esc(c.corporate.body)}</p>
        <div class="c2 w1">${cta(c.corporate.cta)}</div>
      </div>
    </div>
  </div>
</section>

<section class="section on-dark distrik-band" aria-labelledby="distrik-title">
  <div class="g align-end">
    <div class="c1 w2">${distrikLogo('distrik-logo--lg')}</div>
    <p class="mono c4 w1 t-right">${esc(c.distrik.label)}</p>
  </div>
  <div class="bleed">${picture(c.distrik.image, { span: 4, shape: 'wide' })}</div>
  <div class="g distrik-band__body">
    <div class="c1 w1">${label('DISTRIK', '03')}</div>
    <h2 id="distrik-title" class="cond-xl c2 w1">${rich(c.distrik.headline)}</h2>
    <div class="c3 w1">
      <p>${esc(c.distrik.body)}</p>
      <div class="cta-stack">${cta({ label: 'Discover DISTRIK', href: '/distrik/' }, 'cta--light')}${cta(book, 'cta--light')}</div>
    </div>
    <ul class="mono-list c4 w1" aria-label="At DISTRIK">${c.distrik.list.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
  </div>
  <div class="g strip">
    ${['distrik-cupping', 'distrik-treatment-room', 'distrik-lounge', 'distrik-furniture-detail']
      .map((k, i) => `<div class="c${i + 1} w1 m1">${picture(k, { span: 1, shape: 'portrait' })}</div>`)
      .join('')}
  </div>
</section>

${
  work.length
    ? `<section class="section" aria-labelledby="work-title">
  <div class="g section-head">
    <div class="c1 w1">${label(c.work.label, '04')}</div>
    <h2 id="work-title" class="serif-xl c2 w2">${rich(c.work.headline)}</h2>
    <div class="c4 w1 t-right">${cta({ label: 'All projects', href: '/projects/' })}</div>
  </div>
  <div class="g cards">
    ${work
      .slice(0, 3)
      .map((p, i) => {
        const span = i === 0 ? 2 : 1;
        const col = i === 0 ? 1 : i + 2;
        return `<article class="c${col} w${span}${i ? ' m1' : ''} card">
      <a href="${esc(p.href)}" class="card__link">
        ${picture(p.image, { span, shape: 'portrait' })}
        <p class="mono card__meta">(${pad(i + 1)}) ${esc(projectCategories[p.category])}</p>
        <h3 class="cond-md">${esc(p.title)}</h3>
        <p class="mono muted">${esc(p.location)}</p>
      </a>
    </article>`;
      })
      .join('')}
  </div>
</section>`
    : ''
}

<section class="section" aria-labelledby="story-title">
  <div class="g align-end">
    <div class="c1 w1 story-label">${label(c.story.label, '05')}</div>
    <div class="c2 w1">${picture(c.story.image, { span: 1, shape: 'portrait', caption: true })}</div>
    <div class="c3 w2">
      <h2 id="story-title" class="serif-xl">${lines(c.story.headline)}</h2>
      <div class="g g--nested story-row">
        <p class="c1 w1">${esc(c.story.body)}</p>
        <div class="c2 w1">${cta(c.story.cta)}</div>
      </div>
    </div>
  </div>
</section>

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
${photoHero({ hero: c.hero, meta: ['Corporate Wellness', '(AU) Australia', 'Programs for workplaces', ''] })}

${statement({
  id: 'offer',
  num: '01',
  labelText: 'What we offer',
  headline: 'Five ways *in.*',
  body: 'Start with one area or bring them together. Every program is shaped around your teams, spaces and calendar.',
})}

<section class="section index" aria-label="Offering areas">
  ${c.offerings
    .map((x, i) =>
      indexRow({
        id: x.id,
        num: pad(i + 1),
        labelText: x.label,
        title: x.label,
        body: `<p class="serif-sm">${esc(x.headline)}</p><p>${esc(x.body)}</p>`,
        extra: x.items ? `<ul class="mono-list">${x.items.map((it) => `<li>${esc(it)}</li>`).join('')}</ul>` : '',
        image: x.image,
      })
    )
    .join('')}
</section>

<section class="section process" aria-labelledby="process-title">
  <div class="g section-head">
    <div class="c1 w1">${label(c.process.label, '02')}</div>
    <h2 id="process-title" class="serif-xl c2 w3">${rich(c.process.headline)}</h2>
  </div>
  <ol class="g process__steps">
    ${c.process.steps
      .map(
        (s, i) => `<li class="c${i + 1} w1 m1"><span class="mono">${pad(i + 1)} ${i < 3 ? '→' : ''}</span><h3 class="cond-md">${esc(
          s.title
        )}</h3><p>${esc(s.body)}</p></li>`
      )
      .join('')}
  </ol>
</section>

<section class="section on-dark client" id="${c.client.id}" aria-labelledby="client-title">
  <div class="g">
    <div class="c1 w1">${label(c.client.label, '03')}</div>
    <h2 id="client-title" class="serif-xl c2 w3">${rich(c.client.headline)}</h2>
  </div>
  <div class="g client__body">
    <div class="c1 w1 m1">${picture(c.client.image, { span: 1, shape: 'portrait' })}</div>
    <div class="c3 w1">
      <p class="lead">${esc(c.client.body)}</p>
      ${c.client.details.length ? `<ul class="mono-list">${c.client.details.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>` : ''}
      ${note(c.client.reviewNote)}
    </div>
    <p class="mono muted c4 w1">${esc(c.client.disclaimer)}</p>
  </div>
  <div class="g index-row index-row--dark">
    <p class="mono c1 w1">(→) ${esc(c.future.label)}</p>
    <h3 class="cond-lg c2 w1">${rich(c.future.headline)}</h3>
    <p class="c3 w1">${esc(c.future.body)}</p>
  </div>
</section>

${ctaBand({ id: 'cta-title', headline: c.cta.headline, ctas: [c.cta.button] })}
`,
  };
}

// ------------------------------------------------------- DISTRIK
export function distrikPage() {
  const c = pages.distrik;
  const r = c.recovery;
  const optional = (items, render) => (items.length ? render(items) : '');

  return {
    ...c,
    hero: 'dark',
    image: c.hero.image,
    body: `
${photoHero({
  hero: c.hero,
  meta: ['DISTRIK', c.hero.label, '(ID) Canggu, Bali', 'Run by PT The Savage Group'],
  logo: distrikLogo('distrik-logo--hero'),
  ctas: [book, { label: 'Explore Treatments', href: '#treatments' }],
})}

<section class="section statement" aria-labelledby="parts-title">
  <div class="g">
    <div class="c1 w1">${label(c.intro.label, '01')}</div>
    <h2 id="parts-title" class="serif-xl c2 w3">${rich(c.intro.headline)}</h2>
  </div>
  <ul class="g parts">
    ${c.intro.parts
      .map(
        (p, i) =>
          `<li class="c${i + 2} w1"><a href="${p.href}"><span class="mono">(${pad(i + 1)})</span><span class="cond-md">${esc(
            p.label
          )}</span><span class="cta__arrow" aria-hidden="true">↓</span></a></li>`
      )
      .join('')}
  </ul>
</section>

<section class="section on-dark treatments" id="${r.id}" aria-labelledby="treat-title">
  <div class="bleed">${picture(r.image, { span: 4, shape: 'wide' })}</div>
  <div class="g treatments__head">
    <div class="c1 w1">${label(r.label, '02')}</div>
    <h2 id="treat-title" class="cond-xl c2 w2">${rich(r.headline)}</h2>
    <div class="c4 w1">
      <p>${esc(r.note)}</p>
      <div class="cta-stack">${cta(book, 'cta--light')}</div>
    </div>
  </div>
  <ol class="g technique-grid" aria-label="Techniques">
    ${r.techniques.map((t, i) => `<li class="w1 m1"><span class="mono">${pad(i + 1)}</span>${esc(t)}</li>`).join('')}
  </ol>
  ${optional(
    distrik.prices,
    (ps) => `<div class="g"><h3 class="label c1 w1">Prices</h3><ul class="mono-list c2 w2">${ps
      .map((p) => `<li><span>${esc(p.name)}</span><span>${esc(p.price)}</span></li>`)
      .join('')}</ul></div>`
  )}
</section>

<section class="section index" aria-labelledby="focus-title">
  <div class="g section-head">
    <div class="c1 w1">${label('Treatment focus', '03')}</div>
    <h2 id="focus-title" class="serif-xl c2 w3">Three ways to <em>book.</em></h2>
  </div>
  ${r.focuses
    .map((f, i) =>
      indexRow({
        num: ['A', 'B', 'C'][i],
        labelText: 'Focus',
        title: f.name,
        body: `<p class="lead">${esc(f.body)}</p>`,
        image: ['distrik-massage', 'athlete-profile', 'athlete-stretch'][i],
      })
    )
    .join('')}
  <div class="g index-foot"><div class="c3 w1">${cta(book)}</div></div>
</section>

<section class="section" aria-label="DISTRIK Supply and Recovery Fuel">
  <div class="g">
    ${[c.supply, c.fuel]
      .map(
        (x, i) => `<article class="c${i * 2 + 1} w2 half" id="${x.id}" aria-labelledby="${x.id}-t">
      ${picture(x.image, { span: 2, shape: 'landscape' })}
      <div class="g g--nested half__text">
        <div class="c1 w1">${label(x.label, pad(i + 4))}</div>
        <div class="c2 w1"><h2 id="${x.id}-t" class="cond-md">${rich(x.headline)}</h2><p>${esc(x.body)}</p></div>
      </div>
    </article>`
      )
      .join('')}
  </div>
</section>

<section class="hero hero--dark community" id="${c.community.id}" aria-labelledby="community-title">
  <div class="hero__media">${picture(c.community.image, { span: 4 })}</div>
  <div class="hero__inner">
    <div class="g hero__meta"><p class="mono c1 w1">(06) ${esc(c.community.label)}</p><p class="mono c2 w1">${esc(
      c.community.when
    )}</p><p class="mono c3 w1">Free · every pace</p></div>
    <div class="hero__foot">
      <h2 id="community-title" class="display">${lines(c.community.headline)}</h2>
      <div class="g hero__row">
        <p class="hero__body c1 w2">${esc(c.community.body)} ${esc(c.community.when)}</p>
        <div class="c3 w1">${cta({ label: 'Follow on Instagram', href: distrik.instagram }, 'cta--light')}</div>
      </div>
    </div>
  </div>
</section>

<section class="section clinical" id="${c.clinical.id}" aria-labelledby="clinical-title">
  <div class="g">
    <div class="c1 w1">${label(c.clinical.label, '07')}</div>
    <h2 id="clinical-title" class="serif-lg c2 w2">${rich(c.clinical.headline)}</h2>
    <div class="c4 w1">
      <p>${esc(c.clinical.body)}</p>
      <p>${link(`mailto:${distrik.email}`, distrik.email, 'text-link')}</p>
      ${note(c.clinical.reviewNote)}
    </div>
  </div>
</section>

${visit(c.visit)}
`,
  };
}

function visit(v) {
  const hours = distrik.hours.length
    ? `<dl class="hours">${distrik.hours.map((h) => `<dt>${esc(h.days)}</dt><dd>${esc(h.time)}</dd>`).join('')}</dl>`
    : note('Opening hours, prices and promotions are hidden until confirmed — add them in content/site.mjs.');
  return `<section class="section visit" id="${v.id}" aria-labelledby="visit-title">
  <div class="g section-head">
    <div class="c1 w1">${label(v.label, '08')}</div>
    <h2 id="visit-title" class="cond-xl c2 w3">${rich(v.headline)}</h2>
  </div>
  <div class="g visit__row">
    <div class="c1 w1">${picture(v.image, { span: 1, shape: 'portrait', caption: true })}</div>
    <div class="c2 w1">
      <h3 class="label">Address</h3>
      <address>${distrik.address.map(esc).join('<br>')}</address>
      <p>${link(distrik.mapUrl, 'Open in Google Maps', 'text-link')}</p>
    </div>
    <div class="c3 w1">
      <h3 class="label">Contact</h3>
      <p>${link(`mailto:${distrik.email}`, distrik.email, 'text-link')}</p>
      <p>${link(distrik.instagram, `Instagram ${distrik.instagramHandle}`, 'text-link')}</p>
      <div class="cta-stack">${cta(book)}</div>
    </div>
    <div class="c4 w1">
      <h3 class="label">Hours</h3>
      ${hours}
    </div>
  </div>
</section>`;
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
${photoHero({ hero: { ...c.hero, body: '', tone: 'dark' }, meta: [c.hero.label, 'Justin Savage, founder', '(AU) — (ID)', ''], ctas: [] })}

${statement({ id: 'story-intro', num: '00', labelText: 'Introduction', headline: c.hero.body, size: 'serif-lg statement--long', extra: `<div class="c3 w2">${note(c.reviewNote)}</div>` })}

<section class="section index" aria-label="Chapters">
  ${chapters
    .slice(0, -1)
    .map((ch, i) =>
      indexRow({
        tag: 'h2',
        num: pad(i + 1),
        labelText: ch.label,
        title: ch.headline,
        body: ch.body.map((p) => `<p>${esc(p)}</p>`).join(''),
        image: ch.image,
      })
    )
    .join('')}
</section>

<div class="bleed">${picture(last.image, { span: 4, shape: 'wide', caption: true })}</div>

<section class="section" aria-labelledby="today-title">
  <div class="g">
    <div class="c1 w1">${label(last.label, pad(chapters.length))}</div>
    <h2 id="today-title" class="serif-xl c2 w3">${rich(last.headline)}</h2>
    ${last.body.map((p, i) => `<p class="c${i + 3} w1 statement__body">${esc(p)}</p>`).join('')}
  </div>
</section>

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
  .map(
    (g, gi) => `<section class="section project-group" id="${g.key}" aria-labelledby="g-${g.key}">
  ${g.items
    .map(
      (p) => `<article class="g project">
      <div class="c1 w1"><h2 id="g-${g.key}" class="label"><span class="label__num">(${pad(gi + 1)})</span> ${esc(g.name)}</h2></div>
      <div class="c2 w2">${picture(p.image, { span: 2, shape: 'landscape' })}</div>
      <div class="c4 w1 project__text">
        <h3 class="cond-lg">${esc(p.title)}</h3>
        <p class="mono muted">${esc(p.location)}</p>
        <p>${esc(p.summary)}</p>
        ${note(p.note)}
        ${p.href ? cta({ label: p.linkLabel || 'Read more', href: p.href }) : ''}
      </div>
    </article>`
    )
    .join('')}
</section>`
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
  <a class="c3 w2 pathway" href="#${c.distrik.id}"><span class="mono">(02)</span><span class="cond-xl">${esc(
    c.distrik.label
  )}</span><span class="mono muted">Performance recovery in Canggu, Bali →</span></a>
</nav>

<section class="section enquiry" id="${c.corporate.id}" aria-labelledby="corp-enq">
  <div class="g">
    <div class="c1 w1">${label(c.corporate.label, '01')}</div>
    <div class="c2 w1">
      <h2 id="corp-enq" class="serif-lg">${rich(c.corporate.headline)}</h2>
      <p>${esc(c.corporate.body)}</p>
    </div>
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
  </div>
</section>

<section class="section on-dark enquiry" id="${c.distrik.id}" aria-labelledby="distrik-enq">
  <div class="g">
    <div class="c1 w1">${label(c.distrik.label + ' · Canggu', '02')}</div>
    <div class="c2 w1">
      ${distrikLogo('distrik-logo--md')}
      <h2 id="distrik-enq" class="serif-lg">${rich(c.distrik.headline)}</h2>
      <p>${esc(c.distrik.body)}</p>
    </div>
    <ul class="c3 w2 contact-list">
      <li><span class="mono">Book</span>${link(distrik.booking, 'Book on Fresha ↗', 'contact-list__link')}</li>
      <li><span class="mono">Email</span>${link(`mailto:${distrik.email}`, distrik.email, 'contact-list__link')}</li>
      <li><span class="mono">Instagram</span>${link(distrik.instagram, distrik.instagramHandle + ' ↗', 'contact-list__link')}</li>
      <li><span class="mono">Address</span><address>${distrik.address.map(esc).join('<br>')}</address></li>
    </ul>
  </div>
</section>
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
<div class="g section-tail"><div class="c3 w1">${cta({ label: 'Back to home', href: '/' })}</div></div>`,
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
<div class="g section-tail">
  <div class="c3 w1">${cta({ label: 'Corporate Wellness', href: '/corporate-wellness/' })}</div>
  <div class="c4 w1">${cta({ label: 'Contact', href: '/contact/' })}</div>
</div>`,
  };
}

export const allPages = () => [home(), corporate(), distrikPage(), story(), projectsPage(), contact()];
