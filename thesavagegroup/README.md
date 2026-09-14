# The Savage Group — thesavagegroup.org

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

- **Everything grades red.** Photography runs as a red duotone: the
  image is desaturated and darkened, then a `mix-blend-mode: color`
  layer floods it with the house red. Ventures shift within that family
  — Distrik `#FF2D2D`, corporate `#C4161C`, the unbuilt one a muted
  `#7A4A48` — so rows still separate without leaving red. The `.grade`
  layer tracks whichever section is in view.
- **Big graded image, small glass panel.** The `.plate` sections run a
  full-bleed duotone photograph with a genuinely translucent card
  floating over it — heavy `backdrop-filter` blur so the colour behind
  reads through, a 20px radius, a light hairline border.

Glass only stays legible over a controlled ground. Every image under a
card is darkened (`brightness(.46)`) with a directional scrim where the
card sits. Text inside the cards measures 6.5:1 to 18.7:1 — **re-check
those numbers before lightening any plate image.**

Set a venture's colour with one inline custom property:
`style="--grade:#FF2D2D"`, plus `data-grade="#FF2D2D"` so the page grade
follows it on scroll.

### Type

Display marks — `Savage.`, page headlines, drawer items, venture names,
the footer — are set in **Drunk Wide Italic**, the Distrik. logotype
face. It is self-hosted and **the file is not in the repo yet**; see
`assets/fonts/README.md`. Until it lands, everything falls back to Inter
900 italic. Running statements stay in Inter on purpose: a wide face at
that length runs off the screen.

## Switching domains

The site points at **thesavagegroup.org**. Everything domain-specific —
`CNAME`, canonical tags, `og:url`, the JSON-LD urls, `sitemap.xml`,
`robots.txt` and every contact address — moves in one command:

```bash
./set-domain.sh thesavagegroup.org hello@thesavagegroup.org
```

The second argument is optional: pass it only when the contact address
should move with the domain. Leave it off and the existing address is
kept, which is what you want while the new mailbox does not exist yet.

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
The included `CNAME` sets the custom domain automatically.

DNS for the apex `thesavagegroup.org` needs **A records**, not a CNAME —
apex domains cannot be CNAMEs. Point it at GitHub's four Pages
addresses:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Then add a `CNAME` record for `www` → `<owner>.github.io` so both
spellings resolve; GitHub redirects `www` to the apex automatically once
the apex is set in `CNAME`. Tick **Enforce HTTPS** after the certificate
issues (usually minutes, occasionally an hour).

Any static host works equally well — Netlify, Vercel, Cloudflare Pages:
set this folder as the publish directory, no build command.

## Before it goes live

- **The contact address is still `hello@asquadcalledsavage.com`**, used
  on every page and in both forms. It was deliberately left behind when
  the site moved to `thesavagegroup.org`, because a working address beats
  a matching one — every form on the site sends there. Once
  `hello@thesavagegroup.org` exists, move it:
  `./set-domain.sh thesavagegroup.org hello@thesavagegroup.org`
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
