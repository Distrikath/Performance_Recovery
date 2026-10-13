// Page templates. Each returns { path, title, description, body, hero }.
import { pages, projects, projectCategories, distrik, forms, images, site } from '../content/site.mjs';
import { esc, lines, label, note, link, button, buttons, picture, photoHero, textHero } from './components.mjs';

const publicProjects = () => projects.filter((p) => p.verified && p.public);

const distrikLogo = (cls = '') =>
  `<span class="distrik-logo ${cls}" role="img" aria-label="DISTRIK">${distrikSvg}</span>`;
let distrikSvg = '';
export function setDistrikSvg(svg) {
  distrikSvg = svg
    .replace(/<svg[^>]*?(viewBox="[^"]*")[^>]*>/, '<svg $1 xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">')
    .replace(/<\?xml[^>]*>/, '');
}

function projectCard(p, { large = false, headingLevel = 3 } = {}) {
  const h = `h${headingLevel}`;
  return `<article class="project${large ? ' project--large' : ''}">
    <a class="project__link" href="${esc(p.href)}">
      ${picture(p.image, {
        ratio: large ? '4/5' : '3/2',
        sizes: large ? '(min-width: 800px) 58vw, 100vw' : '(min-width: 800px) 38vw, 100vw',
      })}
      <div class="project__text">
        <p class="label">${esc(projectCategories[p.category])}</p>
        <${h} class="project__title">${esc(p.title)}</${h}>
        <p class="project__meta">${esc(p.location)}</p>
      </div>
    </a>
  </article>`;
}

// ------------------------------------------------------------------ HOME
export function home() {
  const c = pages.home;
  const work = publicProjects();
  const [lead, ...rest] = work;
  return {
    ...c,
    hero: 'dark',
    image: c.hero.image,
    body: `
${photoHero({ hero: c.hero })}

<section class="section intro" aria-labelledby="intro-title">
  <div class="wrap grid">
    <div class="intro__label">${label(c.intro.label)}</div>
    <div class="intro__text">
      <h2 id="intro-title" class="h-xl">${esc(c.intro.headline)}</h2>
      <p class="lead">${esc(c.intro.body)}</p>
    </div>
  </div>
</section>

<section class="section feature" aria-labelledby="corp-title">
  <div class="wrap grid feature__grid">
    <div class="feature__media">${picture(c.corporate.image, { ratio: '4/5', sizes: '(min-width: 800px) 58vw, 100vw' })}</div>
    <div class="feature__text">
      ${label(c.corporate.label)}
      <h2 id="corp-title" class="h-lg">${lines(c.corporate.headline)}</h2>
      <p>${esc(c.corporate.body)}</p>
      ${buttons([c.corporate.cta])}
    </div>
  </div>
</section>

<section class="section distrik-feature on-dark" aria-labelledby="distrik-title">
  <div class="wrap">
    <div class="distrik-feature__head">
      ${distrikLogo('distrik-logo--lg')}
      ${label(c.distrik.label)}
    </div>
  </div>
  <div class="distrik-feature__image">${picture(c.distrik.image, { ratio: '21/9', sizes: '100vw', cls: 'frame--wide' })}</div>
  <div class="wrap grid distrik-feature__body">
    <div class="distrik-feature__text">
      <h2 id="distrik-title" class="h-xl">${esc(c.distrik.headline)}</h2>
      <p class="lead">${esc(c.distrik.body)}</p>
      ${buttons(
        [
          { label: 'Discover DISTRIK', href: '/distrik/' },
          { label: 'Book Recovery', href: distrik.booking },
        ],
        ['light', 'outline-light']
      )}
    </div>
    <ul class="rule-list distrik-feature__list" aria-label="At DISTRIK">
      ${c.distrik.list.map((i) => `<li>${esc(i)}</li>`).join('')}
    </ul>
  </div>
</section>

${
  work.length
    ? `<section class="section work" aria-labelledby="work-title">
  <div class="wrap">
    <div class="section-head">
      ${label(c.work.label)}
      <h2 id="work-title" class="h-lg">${esc(c.work.headline)}</h2>
    </div>
    <div class="work__grid">
      ${lead ? projectCard(lead, { large: true }) : ''}
      <div class="work__stack">${rest.map((p) => projectCard(p)).join('')}</div>
    </div>
    <p class="work__more">${link('/projects/', 'All projects', 'text-link')}</p>
  </div>
</section>`
    : ''
}

<section class="section story-teaser" aria-labelledby="story-title">
  <div class="wrap grid">
    <div class="story-teaser__media">${picture(c.story.image, { ratio: '2/3', sizes: '(min-width: 800px) 40vw, 100vw', caption: true })}</div>
    <div class="story-teaser__text">
      ${label(c.story.label)}
      <h2 id="story-title" class="h-lg">${lines(c.story.headline)}</h2>
      <p>${esc(c.story.body)}</p>
      ${buttons([c.story.cta], ['outline'])}
    </div>
  </div>
</section>

${contactStrip(c.contact)}
`,
  };
}

function contactStrip(cs, id = 'cta-title') {
  return `<section class="section contact-strip" aria-labelledby="${id}">
  <div class="wrap">
    ${label(cs.label)}
    <h2 id="${id}" class="h-xl">${lines(cs.headline)}</h2>
    ${buttons(cs.ctas)}
  </div>
</section>`;
}

// ------------------------------------------------------- CORPORATE
export function corporate() {
  const c = pages.corporate;
  const o = Object.fromEntries(c.offerings.map((x) => [x.id, x]));
  const offeringText = (x, h = 'h3') => `
      ${label(x.label, 'p')}
      <${h} class="h-md">${esc(x.headline)}</${h}>
      <p>${esc(x.body)}</p>`;

  return {
    ...c,
    hero: 'light',
    body: `
${photoHero({ hero: c.hero })}

<section class="section intro" aria-labelledby="offer-title">
  <div class="wrap grid">
    <div class="intro__label">${label('What we offer')}</div>
    <div class="intro__text">
      <h2 id="offer-title" class="h-xl">Five ways in.</h2>
      <p class="lead">Start with one area or bring them together. Every program is shaped around your teams, spaces and calendar.</p>
      <ul class="index-list" aria-label="Offering areas">
        ${c.offerings.map((x, i) => `<li><a href="#${x.id}"><span>0${i + 1}</span>${esc(x.label)}</a></li>`).join('')}
      </ul>
    </div>
  </div>
</section>

<section class="section split" id="${o.movement.id}" aria-label="${esc(o.movement.label)}">
  <div class="wrap grid split__grid">
    <div class="split__media">${picture(o.movement.image, { ratio: '4/5', sizes: '(min-width: 800px) 58vw, 100vw' })}</div>
    <div class="split__text">${offeringText(o.movement)}</div>
  </div>
</section>

<section class="section split split--reverse" id="${o.recovery.id}" aria-label="${esc(o.recovery.label)}">
  <div class="wrap grid split__grid">
    <div class="split__media">${picture(o.recovery.image, {
      ratio: '5/4',
      sizes: '(min-width: 800px) 58vw, 100vw',
      caption: true,
    })}</div>
    <div class="split__text">${offeringText(o.recovery)}</div>
  </div>
</section>

<section class="section pair" aria-label="Education and connection">
  <div class="wrap grid">
    <div class="pair__item" id="${o.education.id}">${offeringText(o.education)}</div>
    <div class="pair__item pair__item--media" id="${o.connection.id}">
      ${picture(o.connection.image, { ratio: '3/2', sizes: '(min-width: 800px) 45vw, 100vw' })}
      ${offeringText(o.connection)}
    </div>
  </div>
</section>

<section class="section band" id="${o.management.id}" aria-label="${esc(o.management.label)}">
  <div class="wrap grid">
    <div class="band__text">${offeringText(o.management)}</div>
    <ul class="band__list">
      ${o.management.items.map((i) => `<li>${esc(i)}</li>`).join('')}
    </ul>
  </div>
</section>

<section class="section process" aria-labelledby="process-title">
  <div class="wrap">
    <div class="section-head">
      ${label(c.process.label)}
      <h2 id="process-title" class="h-lg">${esc(c.process.headline)}</h2>
    </div>
    <ol class="process__steps">
      ${c.process.steps
        .map(
          (s, i) => `<li><span class="process__num">0${i + 1}</span><h3 class="h-sm">${esc(s.title)}</h3><p>${esc(s.body)}</p></li>`
        )
        .join('')}
    </ol>
  </div>
</section>

<section class="section client on-dark" id="${c.client.id}" aria-labelledby="client-title">
  <div class="wrap grid">
    <div class="client__text">
      ${label(c.client.label)}
      <h2 id="client-title" class="h-lg">${esc(c.client.headline)}</h2>
      <p class="lead">${esc(c.client.body)}</p>
      ${c.client.details.length ? `<ul class="rule-list">${c.client.details.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>` : ''}
      <p class="small muted">${esc(c.client.disclaimer)}</p>
      ${note(c.client.reviewNote)}
    </div>
    <div class="client__media">${picture(c.client.image, { ratio: '4/5', sizes: '(min-width: 800px) 40vw, 100vw' })}</div>
  </div>
  <div class="wrap">
    <div class="client__future">
      ${label(c.future.label)}
      <h3 class="h-md">${esc(c.future.headline)}</h3>
      <p>${esc(c.future.body)}</p>
    </div>
  </div>
</section>

<section class="section contact-strip" aria-labelledby="cta-title">
  <div class="wrap">
    <h2 id="cta-title" class="h-xl">${lines(c.cta.headline)}</h2>
    ${buttons([c.cta.button])}
  </div>
</section>
`,
  };
}

// ------------------------------------------------------- DISTRIK
export function distrikPage() {
  const c = pages.distrik;
  const r = c.recovery;
  const book = { label: 'Book Recovery', href: distrik.booking };

  const optional = (items, render) => (items.length ? render(items) : '');

  return {
    ...c,
    hero: 'dark',
    image: c.hero.image,
    body: `
${photoHero({
  hero: c.hero,
  eyebrow: distrikLogo('distrik-logo--hero'),
  ctas: [book, { label: 'Explore Treatments', href: '#treatments' }],
})}

<section class="section intro" aria-labelledby="parts-title">
  <div class="wrap grid">
    <div class="intro__label">${label(c.intro.label)}</div>
    <div class="intro__text">
      <h2 id="parts-title" class="h-lg">${esc(c.intro.headline)}</h2>
      <ul class="index-list">
        ${c.intro.parts.map((p, i) => `<li><a href="${p.href}"><span>0${i + 1}</span>${esc(p.label)}</a></li>`).join('')}
      </ul>
    </div>
  </div>
</section>

<section class="section treatments on-dark" id="${r.id}" aria-labelledby="treat-title">
  <div class="treatments__image">${picture(r.image, { ratio: '16/9', sizes: '100vw', cls: 'frame--wide', caption: true })}</div>
  <div class="wrap grid treatments__grid">
    <div class="treatments__text">
      ${label('01 · ' + r.label)}
      <h2 id="treat-title" class="h-lg">${esc(r.headline)}</h2>
      <p class="lead">${esc(r.note)}</p>
      ${buttons([book], ['light'])}
    </div>
    <ul class="rule-list treatments__list" aria-label="Techniques">
      ${r.techniques.map((t) => `<li>${esc(t)}</li>`).join('')}
    </ul>
  </div>
  ${optional(
    distrik.prices,
    (ps) => `<div class="wrap"><h3 class="label">Prices</h3><ul class="rule-list">${ps
      .map((p) => `<li><span>${esc(p.name)}</span><span>${esc(p.price)}</span></li>`)
      .join('')}</ul></div>`
  )}
</section>

<section class="section focuses" aria-labelledby="focus-title">
  <div class="wrap grid">
    <div class="focuses__media">${picture(r.focusImage, { ratio: '4/5', sizes: '(min-width: 800px) 38vw, 100vw' })}</div>
    <div class="focuses__list">
      ${label('Treatment focus')}
      <h2 id="focus-title" class="sr-only">Treatment focus</h2>
      ${r.focuses
        .map(
          (f) => `<div class="focus">
        <h3 class="focus__name">${esc(f.name)}</h3>
        <p>${esc(f.body)}</p>
      </div>`
        )
        .join('')}
      ${buttons([book])}
    </div>
  </div>
</section>

<section class="section split" id="${c.supply.id}" aria-labelledby="supply-title">
  <div class="wrap grid split__grid">
    <div class="split__media">${picture(c.supply.image, { ratio: '5/4', sizes: '(min-width: 800px) 58vw, 100vw' })}</div>
    <div class="split__text">
      ${label('02 · ' + c.supply.label)}
      <h2 id="supply-title" class="h-md">${esc(c.supply.headline)}</h2>
      <p>${esc(c.supply.body)}</p>
    </div>
  </div>
</section>

<section class="section split split--reverse" id="${c.fuel.id}" aria-labelledby="fuel-title">
  <div class="wrap grid split__grid">
    <div class="split__media">${picture(c.fuel.image, { ratio: '4/5', sizes: '(min-width: 800px) 45vw, 100vw' })}</div>
    <div class="split__text">
      ${label('03 · ' + c.fuel.label)}
      <h2 id="fuel-title" class="h-md">${esc(c.fuel.headline)}</h2>
      <p>${esc(c.fuel.body)}</p>
    </div>
  </div>
</section>

<section class="community on-dark" id="${c.community.id}" aria-labelledby="community-title">
  <div class="community__media">${picture(c.community.image, { sizes: '100vw' })}</div>
  <div class="community__content wrap">
    ${label(c.community.label)}
    <h2 id="community-title" class="display">${esc(c.community.headline)}</h2>
    <p class="community__when">${esc(c.community.when)}</p>
    <p class="lead">${esc(c.community.body)}</p>
    ${buttons([{ label: 'Follow on Instagram', href: distrik.instagram }], ['light'])}
  </div>
</section>

<section class="section clinical" id="${c.clinical.id}" aria-labelledby="clinical-title">
  <div class="wrap grid">
    <div class="intro__label">${label(c.clinical.label)}</div>
    <div class="intro__text">
      <h2 id="clinical-title" class="h-md">${esc(c.clinical.headline)}</h2>
      <p>${esc(c.clinical.body)}</p>
      <p>Enquiries: ${link(`mailto:${distrik.email}`, distrik.email, 'text-link')}</p>
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
  <div class="wrap grid">
    <div class="visit__head">
      ${label(v.label)}
      <h2 id="visit-title" class="h-lg">${esc(v.headline)}</h2>
      ${v.image ? `<div class="visit__media">${picture(v.image, { ratio: '4/5', sizes: '(min-width: 800px) 40vw, 100vw', caption: true })}</div>` : ''}
    </div>
    <div class="visit__details">
      <div>
        <h3 class="label">Address</h3>
        <address>${distrik.address.map(esc).join('<br>')}</address>
        <p>${link(distrik.mapUrl, 'Open in Google Maps', 'text-link')}</p>
      </div>
      <div>
        <h3 class="label">Contact</h3>
        <p>${link(`mailto:${distrik.email}`, distrik.email, 'text-link')}</p>
        <p>${link(distrik.instagram, `Instagram ${distrik.instagramHandle}`, 'text-link')}</p>
      </div>
      <div>
        <h3 class="label">Hours</h3>
        ${hours}
      </div>
    </div>
    <div class="visit__cta">${buttons([{ label: 'Book Recovery', href: distrik.booking }])}</div>
  </div>
</section>`;
}

// ------------------------------------------------------- OUR STORY
export function story() {
  const c = pages.story;
  return {
    ...c,
    hero: 'none',
    body: `
<section class="hero hero--split" aria-labelledby="page-title">
  <div class="wrap grid">
    <div class="hero--split__text">
      ${label(c.hero.label)}
      <h1 id="page-title" class="display display--md">${lines(c.hero.headline)}</h1>
      <p class="hero__body">${esc(c.hero.body)}</p>
      ${note(c.reviewNote)}
    </div>
    <div class="hero--split__media">${picture(c.hero.image, { ratio: '4/5', sizes: '(min-width: 800px) 45vw, 100vw', eager: true })}</div>
  </div>
</section>

${c.chapters
  .map(
    (ch, i) => `<section class="section chapter${i % 2 ? ' chapter--reverse' : ''}${ch.image ? '' : ' chapter--text'}" aria-labelledby="ch-${i}">
  <div class="wrap grid">
    <div class="chapter__text">
      ${label(`0${i + 1} · ${ch.label}`)}
      <h2 id="ch-${i}" class="h-lg">${esc(ch.headline)}</h2>
      ${ch.body.map((p) => `<p>${esc(p)}</p>`).join('')}
    </div>
    ${
      ch.image
        ? `<div class="chapter__media">${picture(ch.image, {
            ratio: images[ch.image].placeholder ? '4/3' : undefined,
            sizes: '(min-width: 800px) 50vw, 100vw',
            caption: true,
          })}</div>`
        : ''
    }
  </div>
</section>`
  )
  .join('\n')}

${contactStrip(pages.home.contact, 'story-cta')}
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
${textHero(c.hero)}
<nav class="wrap filter" aria-label="Project categories">
  <ul>${groups.map((g) => `<li><a href="#${g.key}">${esc(g.name)}</a></li>`).join('')}</ul>
</nav>
${groups
  .map(
    (g) => `<section class="section project-group" id="${g.key}" aria-labelledby="g-${g.key}">
  <div class="wrap">
    <h2 id="g-${g.key}" class="label project-group__title">${esc(g.name)}</h2>
    ${g.items
      .map(
        (p, i) => `<article class="project-row${i % 2 ? ' project-row--reverse' : ''}">
      <div class="project-row__media">${picture(p.image, { ratio: '3/2', sizes: '(min-width: 800px) 60vw, 100vw' })}</div>
      <div class="project-row__text">
        <h3 class="h-md">${esc(p.title)}</h3>
        <p class="project__meta">${esc(p.location)}</p>
        <p>${esc(p.summary)}</p>
        ${note(p.note)}
        ${p.href ? `<p>${link(p.href, p.linkLabel || 'Read more', 'text-link')}</p>` : ''}
      </div>
    </article>`
      )
      .join('')}
  </div>
</section>`
  )
  .join('\n')}
${contactStrip(pages.home.contact, 'projects-cta')}
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
${textHero(c.hero)}
<nav class="wrap pathways" aria-label="Enquiry type">
  <a class="pathway" href="#${c.corporate.id}"><span class="label">01</span><span class="pathway__name">${esc(c.corporate.label)}</span><span class="pathway__desc">Workplace programs in Australia</span></a>
  <a class="pathway" href="#${c.distrik.id}"><span class="label">02</span><span class="pathway__name">${esc(c.distrik.label)}</span><span class="pathway__desc">Performance recovery in Canggu, Bali</span></a>
</nav>

<section class="section enquiry" id="${c.corporate.id}" aria-labelledby="corp-enq">
  <div class="wrap grid">
    <div class="enquiry__intro">
      ${label(c.corporate.label)}
      <h2 id="corp-enq" class="h-lg">${esc(c.corporate.headline)}</h2>
      <p>${esc(c.corporate.body)}</p>
    </div>
    <form class="form" data-enquiry-form data-endpoint="${esc(f.endpoint)}" ${
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
      <p class="small muted">Fields marked as required must be completed. We use your details only to respond to your enquiry.</p>
      <button class="btn btn--solid" type="submit">Send enquiry</button>
      <p class="form__status" data-form-status role="status" aria-live="polite"></p>
    </form>
  </div>
</section>

<section class="section enquiry enquiry--distrik on-dark" id="${c.distrik.id}" aria-labelledby="distrik-enq">
  <div class="wrap grid">
    <div class="enquiry__intro">
      ${distrikLogo('distrik-logo--md')}
      ${label(c.distrik.label + ' · Canggu, Bali')}
      <h2 id="distrik-enq" class="h-lg">${esc(c.distrik.headline)}</h2>
      <p>${esc(c.distrik.body)}</p>
    </div>
    <ul class="contact-list">
      <li><span class="label">Book</span>${link(distrik.booking, 'Book on Fresha', 'contact-list__link')}</li>
      <li><span class="label">Email</span>${link(`mailto:${distrik.email}`, distrik.email, 'contact-list__link')}</li>
      <li><span class="label">Instagram</span>${link(distrik.instagram, distrik.instagramHandle, 'contact-list__link')}</li>
      <li><span class="label">Address</span><address>${distrik.address.map(esc).join('<br>')}</address></li>
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
    body: `${textHero({ label: '404', headline: ['Page not found.'], body: 'The page you are looking for has moved or does not exist.' })}
<div class="wrap section-tail">${buttons([{ label: 'Back to home', href: '/' }])}</div>`,
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
    body: `${textHero({ label: 'Client hub', headline: [c.headline], body: c.body })}
<div class="wrap section-tail">${buttons([
      { label: 'Corporate Wellness', href: '/corporate-wellness/' },
      { label: 'Contact', href: '/contact/' },
    ])}</div>`,
  };
}

export const allPages = () => [home(), corporate(), distrikPage(), story(), projectsPage(), contact()];
export { site };
