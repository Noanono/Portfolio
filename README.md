# Portfolio

[![CI/CD](https://github.com/Noanono/portfolio/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Noanono/portfolio/actions/workflows/ci.yml)

Noah Soler's personal portfolio, built with [Nuxt 4](https://nuxt.com).
Live at <https://noah.soler-pro.fr> (staging: <https://staging-noah.soler-pro.fr>).

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
  assets/fonts/            Archivo (variable font, SIL OFL), served from this site
  components/
    ContourMap.vue         Interactive contour-line hero
    ProjectList.vue        Project rows used on the home and projects pages
  composables/useLocale.ts Current language, translated strings, localized links
  data/projects.ts         Project content (EN + FR): edit this file to add a project
  i18n/
    locale.ts              Locales, /fr path helpers, absolute URLs
    messages.ts            Interface and page texts in English and French
  layouts/default.vue      Header, footer, skip link, language switch
  pages/
    index.vue              Home
    about.vue              Background, experience, languages
    projects/index.vue     All projects
    projects/[slug].vue    One project
public/
  cv/                      CV as PDF, one per language (Noah-Soler-CV-en.pdf, -fr.pdf)
  bde/                     Embedded student-union site (static Angular build)
```

## Adding a project

Add an entry to `app/data/projects.ts`. Its `slug` becomes the URL
(`/projects/<slug>`, or `/fr/projects/<slug>` in French), and
`featured: true` puts it on the home page. Every text field is written
in English and in French; the build fails if one is missing.

## Commit messages

This repo follows [Conventional Commits](https://www.conventionalcommits.org)
(`feat:`, `fix:`, `chore:`, `ci:`…).

## CI/CD

`.github/workflows/ci.yml` checks every pull request (lint, type-check,
`npm audit`, build) and deploys on push:

| Branch | Environment | URL |
| --- | --- | --- |
| `develop` | Staging | <https://staging-noah.soler-pro.fr> |
| `main` | Production | <https://noah.soler-pro.fr> |

Both branches are protected: changes go through a reviewed pull request, and
`main` only accepts releases from `develop` (or `hotfix/*`) that were deployed
to staging first.

## Documentation

More detailed docs live in [`doc/`](doc/):

- [Branches and contributions](doc/branching.md): `develop` / `main` workflow and branch protection
- [Languages (EN / FR)](doc/i18n.md): how the two versions work and how to edit or add texts
- [Deployment](doc/deploy.md): Cloudflare setup, secrets, manual deploy and troubleshooting
