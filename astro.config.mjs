import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

const base = '/copilot-app-coe';

/**
 * MDX pages link with root-relative paths such as `/roles/`. After the build,
 * prefix those `href` and `src` attributes with the site base so they work under
 * the GitHub Pages subpath. Links that already include the base are left alone.
 * @returns {import('astro').AstroIntegration}
 */
function prefixBaseLinks() {
  const pattern = new RegExp(`\\b(href|src)="/(?!/|${base.slice(1)}/)`, 'g');
  /** @param {string} dir @returns {Promise<string[]>} */
  const htmlFiles = async (dir) => {
    const out = [];
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) out.push(...(await htmlFiles(path)));
      else if (entry.name.endsWith('.html')) out.push(path);
    }
    return out;
  };
  return {
    name: 'prefix-base-links',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        for (const file of await htmlFiles(fileURLToPath(dir))) {
          const html = await readFile(file, 'utf8');
          const next = html.replace(pattern, `$1="${base}/`);
          if (next !== html) await writeFile(file, next);
        }
      },
    },
  };
}

export default defineConfig({
  site: 'https://pierceboggan.github.io',
  base,
  integrations: [mdx(), prefixBaseLinks()],
});
