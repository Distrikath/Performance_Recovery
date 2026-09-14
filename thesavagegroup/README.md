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
| `assets/site.js` | Mobile nav, scroll reveal, office clocks, form handling |
| `CNAME` | `www.thesavagegroup.com` |
| `robots.txt`, `sitemap.xml` | Indexing |

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

- **`hello@thesavagegroup.com`** is used across every page and both forms.
  Create that mailbox, or search-and-replace it with the real address.
- Both enquiry forms open the visitor's email client (`mailto:`). That
  works everywhere with zero backend, but it loses people who use webmail.
  For real capture, swap the `<form>` action to Formspree, Basin or
  Netlify Forms — the markup is ready for it.
- **Social + OG image.** There is no `og:image` yet; add a 1200×630 image
  to `assets/` and reference it from each page's `<meta property="og:image">`.
- **Photography.** The design is typographic on purpose so it stands up with
  no imagery. Group photography can drop into the hero and venture rows.
- **Legal.** Add an ABN / registered entity line to the footer, and privacy
  and terms pages if the forms start collecting data server-side.
- **Analytics.** Nothing is tracked. Add a tag to each page's `<head>` if wanted.
