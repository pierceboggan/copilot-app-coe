# GitHub Copilot app Enablement Center

A site for running a Center of Excellence around the GitHub Copilot app. It has role-based use cases with ready-to-run prompts, a CoE operating model, governance, customization and measurement guides, an interactive rollout checklist, a maturity assessment, playbooks and a library of downloadable templates.

Content is based on the public [Copilot app docs](https://docs.github.com/copilot/how-tos/github-copilot-app).

## Develop

```sh
npm install
npm run dev     # http://localhost:4321
npm run check   # type and template check
npm run build   # static output in dist/, then builds the Pagefind search index
npm run preview # serve dist/ (search only works here, not in dev)
```

Astro is pinned to 7.3.6. Test the site before you upgrade it.

## Where things live

- `src/data/roles.ts` holds role use cases, prompts and day-in-the-life timelines
- `src/data/checklist.ts` holds checklist phases and items
- `src/lib/deeplink.ts` builds "Open in Copilot app" links
- `src/lib/checklist-export.ts` turns checklist progress into Markdown or a GitHub issue link
- `src/pages/` contains the routes, with prose pages written in MDX
- `src/pages/coe/` has the CoE overview, governance, customizations and plugin marketplaces, measurement, checklist and assessment
- `src/data/beyondCode.ts` drives the "more than writing code" cards on the home page
- `public/resources/files/` holds the downloadable templates linked from `/resources/`

Items that need checking against current GitHub docs are marked with `TODO` comments. Search for them before publishing.

Checklist progress, the chosen repository and the color mode are stored in the browser's localStorage only.

## Deploy

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages on every push to `main`. The site lives at https://pierceboggan.github.io/copilot-app-coe/, so `astro.config.mjs` sets `base` to `/copilot-app-coe`. In `.astro` files, wrap internal paths in `href()` from `src/lib/paths.ts`. MDX pages can use plain `/path/` links, because a build step adds the base to them.
