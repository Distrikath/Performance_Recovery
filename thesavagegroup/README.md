# The Savage Group — thesavagegroup.com

Static multi-page site for **The Savage Group**, the parent company behind
Distrik. Performance Recovery (Canggu, Bali) and the group's corporate
wellness programs in Sydney and Melbourne.

No build step. Plain HTML, one shared stylesheet, one shared script.

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | Home — positioning, ventures, approach, locations |
| `ventures.html` | The operating companies in detail |
| `corporate-wellness.html` | B2B offering + enquiry form (Sydney / Melbourne) |
| `about.html` | The group, its principles, its two markets |
| `contact.html` | Enquiry routing + contact form |
| `404.html` | Not-found page |
| `assets/site.css` | Entire design system |
| `assets/site.js` | Film reel, drawer, reveals, office clocks, forms |
| `assets/img/` | Reel frames and venture stills (placeholder — see below) |
| `CNAME` | current live domain (see *Switching domains*) |
| `set-domain.sh` | one-command domain + contact-address switch |
| `robots.txt`, `sitemap.xml` | Indexing |

## The design system

Built in the Distrik. visual language so the parent reads as the same
house, not a neighbour: black ground, Inter 900 italic marks, Space Mono
micro-labels, film-plane imagery, grain, and a nav in `mix-blend-mode:
difference`.

Two ideas carry the group:

- **The group is monochrome; each venture brings its own colour.** The
  page grade is white/neutral by default. Hovering a venture row floods
  it with that brand's hue — Distrik red, corporate blue — and the
  `.grade` layer tracks whichever section is in view. A brand asserting
  itself over a neutral parent is the house-of-brands idea made visual.
- **Big graded image, small glass panel.** The `.plate` sections run a
  full-bleed duotone photograph with a compact frosted card floating over
  it carrying a counter, a statement and a figures row.

Set a venture's colour with one inline custom property:
`style="--grade:#FF2D2D"`, plus `data-grade="#FF2D2D"` so the page grade
follows it on scroll.

## Switching domains

The site currently points at **asquadcalledsavage.com**, as a staging home
while `thesavagegroup.com` is being set up. Everything domain-specific —
`CNAME`, canonical tags, `og:url`, the JSON-LD urls, `sitemap.xml`,
`robots.txt` and every contact address — moves in one command:

```bash
./set-domain.sh www.thesavagegroup.com hello@thesavagegroup.com
```

It reads the current values out of the files rather than assuming them, so
it is safe to re-run, and it prints every remaining reference afterwards so
you can confirm nothing was missed.

## Deploying

This folder is **self-contained** — everything inside it is the site root.
It lives here for convenience; it cannot be served from this repository,
because a GitHub Pages repo serves one custom domain and this one is already
`distrikath.com`.

To publish, copy the contents of this folder into the root of a new repo:

```bash
# from a clone of the new, empty repo
cp -r /path/to/performance_recovery/thesavagegroup/. .
git add . && git commit -m "The Savage Group site" && git push
```

Then in the new repo: **Settings → Pages →** deploy from `main` / root.
The included `CNAME` sets the custom domain automatically. In your DNS,
point `www` at `<owner>.github.io` with a CNAME record, and (optionally)
redirect the apex `thesavagegroup.com` to `www`.

Any static host works equally well — Netlify, Vercel, Cloudflare Pages:
set this folder as the publish directory, no build command.

## Before it goes live

- **`hello@asquadcalledsavage.com`** is used across every page and both
  forms. Confirm that mailbox exists — if the right address is different,
  `./set-domain.sh asquadcalledsavage.com <real@address>` swaps it everywhere.
- Both enquiry forms open the visitor's email client (`mailto:`). That
  works everywhere with zero backend, but it loses people who use webmail.
  For real capture, swap the `<form>` action to Formspree, Basin or
  Netlify Forms — the markup is ready for it.
- **Social + OG image.** There is no `og:image` yet; add a 1200×630 image
  to `assets/` and reference it from each page's `<meta property="og:image">`.
- **Photography is Distrik's, used as placeholder.** Everything in
  `assets/img/` is from the Distrik. shoot, so the group currently looks
  like its Bali studio. Group-level and Sydney/Melbourne corporate
  imagery should replace it — drop in files at the same names and
  nothing else changes.
- **Legal.** Add an ABN / registered entity line to the footer, and privacy
  and terms pages if the forms start collecting data server-side.
- **Analytics.** Nothing is tracked. Add a tag to each page's `<head>` if wanted.
