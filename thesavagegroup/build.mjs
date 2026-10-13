// Static build: renders every page from content/site.mjs into dist/.
// Usage: node build.mjs
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, reservedRoutes } from './content/site.mjs';
import * as comps from './src/components.mjs';
import * as pagesMod from './src/pages.mjs';
import { layout } from './src/layout.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, 'dist');

// The supplied DISTRIK logo (assets/brand/DISTRIK.svg) is black on a white
// square. For the site: drop the white background, crop to the wordmark and
// let it take the surrounding text colour.
const LOGO_CROP = '24 186 352 56';
function webLogo(svg) {
  return svg
    .replace(/<path fill="#ffffff"[^>]*\/>/gi, '')
    .replace(/fill="#000000"/gi, 'fill="currentColor"')
    .replace(/viewBox="[^"]*"/, `viewBox="${LOGO_CROP}"`)
    .replace(/<svg[^>]*>/, (tag) => tag.replace(/\s(width|height)="[^"]*"/g, ''));
}

export function build() {

  const manifestPath = join(ROOT, 'assets/img/manifest.json');
  if (!existsSync(manifestPath)) throw new Error('assets/img/manifest.json missing — run `npm run images` first.');
  comps.setManifest(JSON.parse(readFileSync(manifestPath, 'utf8')));
  pagesMod.setDistrikSvg(webLogo(readFileSync(join(ROOT, 'assets/brand/DISTRIK.svg'), 'utf8')));

  rmSync(DIST, { recursive: true, force: true });
  mkdirSync(join(DIST, 'assets'), { recursive: true });
  cpSync(join(ROOT, 'assets/img'), join(DIST, 'assets/img'), { recursive: true });
  cpSync(join(ROOT, 'src/assets'), join(DIST, 'assets'), { recursive: true });

  const write = (path, html) => {
    const file = path.endsWith('.html') ? join(DIST, path) : join(DIST, path, 'index.html');
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
  };

  const pages = pagesMod.allPages();
  for (const p of pages) write(p.path, layout(p));
  write('/404.html', layout(pagesMod.notFound()));
  for (const r of reservedRoutes) write(r, layout(pagesMod.reserved(r)));

  const urls = pages.map((p) => `  <url><loc>${site.domain}${p.path}</loc></url>`).join('\n');
  writeFileSync(
    join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );
  writeFileSync(
    join(DIST, 'robots.txt'),
    site.preview
      ? 'User-agent: *\nDisallow: /\n'
      : `User-agent: *\nAllow: /\nDisallow: /linkedin/\n\nSitemap: ${site.domain}/sitemap.xml\n`
  );
  return pages.length + reservedRoutes.length + 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const n = build();
  console.log(`Built ${n} pages into dist/`);
}
