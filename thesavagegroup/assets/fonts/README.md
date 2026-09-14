# Drunk Wide — brand mark face

The display marks (`Savage.`, page headlines, drawer items, venture
names, footer) are set in **Drunk Wide Italic**, the face used for the
Distrik. logotype. It is not a Google Font, so it has to be self-hosted
from this folder.

## Files to add

Drop these in beside this README. The CSS already points at them:

| Filename | Needed |
| --- | --- |
| `drunk-wide-italic.woff2` | **Yes** — this is the one the site uses |
| `drunk-wide.woff2`        | Optional upright cut, currently unused |

`.woff2` only — every browser in service supports it, and a second
format would just double the failed requests while the folder is empty.

Nothing else changes — `assets/site.css` already declares the
`@font-face` rules and the `--mark` stack.

## Until they exist

The browser falls straight through to Inter 900 italic. The site looks
finished but it is **not** in the brand face yet, and every page load
makes one failed request for the missing file — harmless, and it clears
itself the moment the file lands. Check this folder is populated before
launch. If the font isn't coming, delete the two `@font-face` blocks at
the top of `assets/site.css` and the `--mark` token below them.

## Licensing — read before uploading

A **desktop licence does not cover a website.** Putting a `.woff2` on a
public server is web distribution and needs a webfont licence, usually
priced on monthly pageviews. Buying the desktop font to use in Figma or
Illustrator does not grant this.

Confirm the web licence covers `asquadcalledsavage.com` **and**
`thesavagegroup.com`, since the site is moving between them.

If you only have the desktop licence, two legitimate options:

1. **Keep the wordmark as artwork.** Export `Savage.` as an SVG and use
   it for the logo only — an image of type is not font distribution.
   The rest of the site stays in Inter. This is what the Distrik. site
   already does.
2. Licence the webfont.

## Converting what you have

If you hold a web licence and were given `.otf` or `.ttf`, convert to
`.woff2` — it is roughly half the size and every current browser takes
it:

```bash
pip install fonttools brotli
fonttools ttLib.woff2 compress -o drunk-wide-italic.woff2 DrunkWide-Italic.otf
```

Subsetting to Latin will shrink it further; the site only ever sets
these marks in caps and numerals.
