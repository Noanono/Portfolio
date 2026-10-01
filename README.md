# Portfolio

Noah Soler's personal portfolio, built with [Nuxt 4](https://nuxt.com).

The home page opens on an interactive topographic map: contour lines of a few
"mountains", plus one that follows the pointer. It is drawn on a canvas with a
small marching-squares tracer, and it stays still when the visitor prefers
reduced motion.

## Requirements

- Node.js 22 (see `.nvmrc`)
- npm

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command             | What it does                                 |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start the dev server with hot reload         |
| `npm run build`     | Build for a Node server                      |
| `npm run generate`  | Pre-render a static site into `.output/public` |
| `npm run preview`   | Preview the production build locally         |
| `npm run lint`      | Lint with ESLint (`lint:fix` to auto-fix)    |
| `npm run typecheck` | Type-check Vue and TypeScript files          |

## Project structure

```
app/
  assets/css/main.css      Design tokens (colors, type scale) and base styles
  components/
    ContourMap.vue         Interactive contour-line hero
    ProjectList.vue        Project rows used on the home and projects pages
  data/projects.ts         Project content: edit this file to add a project
  layouts/default.vue      Header, footer, skip link
  pages/
    index.vue              Home
    about.vue              Background, experience, languages
    projects/index.vue     All projects
    projects/[slug].vue    One project
public/                    Static files served as-is
```

## Adding a project

Add an entry to `app/data/projects.ts`. Its `slug` becomes the URL
(`/projects/<slug>`), and `featured: true` puts it on the home page.

## Commit messages

This repo follows [Conventional Commits](https://www.conventionalcommits.org)
(`feat:`, `fix:`, `chore:`, `ci:`…).

## CI/CD

`.github/workflows/ci.yml` runs on every pull request and every push to `main`:

1. **quality**: `npm ci`, lint, type-check, `npm audit` on production
   dependencies, then `nuxt generate`. The built site is kept as an artifact.
2. **deploy** (pushes to `main` only, after quality passes): publishes the
   artifact to Cloudflare Workers with `wrangler deploy`. The site is served at
   <https://noah.soler-pro.fr>; Cloudflare creates the DNS record and HTTPS
   certificate itself, since the `soler-pro.fr` zone is on Cloudflare.

Actions are pinned to commit SHAs, the workflow token is read-only, and
Dependabot opens weekly update PRs for npm packages and actions.

### One-time setup

1. **Cloudflare API token**: in the Cloudflare dashboard, go to
   *My Profile → API Tokens → Create Token* and use the
   **Edit Cloudflare Workers** template. Limit it to your account and to the
   `soler-pro.fr` zone.
2. **Account ID**: shown on the Workers & Pages overview page in the dashboard.
3. **GitHub environment**: in the repo, go to *Settings → Environments → New
   environment*, name it `production`, and add two secrets:
   `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
4. Make sure no DNS record already exists for `noah.soler-pro.fr`, otherwise
   Cloudflare cannot attach the custom domain.
5. Re-run the workflow (or push to `main`).

Configuration lives in `wrangler.jsonc`. To deploy by hand:
`npm run generate && npm run deploy` (after `npx wrangler login`).
