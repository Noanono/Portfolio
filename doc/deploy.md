# Deployment

The site is a static Nuxt build served by **Cloudflare Workers** at
<https://noah.soler-pro.fr>. Every push to `main` deploys automatically through
GitHub Actions once the quality checks pass.

## How it works

```
push to main
   │
   ▼
quality job ── npm ci → lint → type-check → npm audit → nuxt generate
   │                                                  │
   │                                    .output/public uploaded as artifact "site"
   ▼
deploy job ─── downloads "site" → wrangler deploy → noah.soler-pro.fr
```

- **Workflow**: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml).
  Pull requests run the quality job only; nothing is deployed from a PR.
- **Cloudflare config**: [`wrangler.jsonc`](../wrangler.jsonc). It publishes
  `.output/public` as static assets, serves `404.html` for unknown paths, and
  attaches the `noah.soler-pro.fr` custom domain. The `*.workers.dev` URL and
  preview URLs are turned off, so the site is only reachable on its own domain.
- **DNS and HTTPS**: the `soler-pro.fr` zone is on Cloudflare, so the first
  deploy creates the `noah` DNS record and the certificate automatically.

## Security choices

| Measure | Why |
| --- | --- |
| Actions pinned to a full commit SHA (version in a comment) | A moved or hijacked tag cannot change the code that runs |
| `permissions: contents: read` for the workflow token | The pipeline cannot push code or change the repo |
| `persist-credentials: false` on checkout | The Git token is not left on disk for later steps |
| Cloudflare secrets scoped to the `production` environment | Only the deploy job, on `main`, can read them |
| API token limited to Workers on one account and one zone | A leaked token cannot touch anything else |
| `npm audit --omit=dev --audit-level=high` | The build fails on known high or critical vulnerabilities in shipped dependencies |
| Dependabot, weekly, for npm and GitHub Actions | Pinned SHAs and packages are kept up to date through reviewable PRs |

## One-time setup

Already done for this repo. Kept here to rebuild the setup from scratch.

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
5. Re-run the workflow from the *Actions* tab, or push to `main`.

## Deploying by hand

Useful to test a change to `wrangler.jsonc` without going through CI.

```bash
npx wrangler login            # once, opens the browser
npm run generate              # builds .output/public
npx wrangler deploy --dry-run # checks the config and lists the files, uploads nothing
npm run deploy                # publishes to noah.soler-pro.fr
```

## Rolling back

In the Cloudflare dashboard, open *Workers & Pages → portfolio → Deployments*
and roll back to a previous version. Then revert the faulty commit on `main`,
otherwise the next push deploys it again.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Deploy step fails with "Add the CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID secrets" | Secrets missing, or added to the repo instead of the `production` environment | Add both secrets to the `production` environment |
| `npm ci` fails in CI but works locally | Peer dependency conflict, e.g. `@nuxt/eslint` requiring a newer ESLint | Run `npm ci` in a clean clone to reproduce, align the versions, commit the updated lockfile |
| Wrangler reports the custom domain is already in use | A DNS record already exists for `noah` | Delete that record in Cloudflare DNS, then re-run the deploy |
| Authentication error from Wrangler | Token expired or lacks Workers permissions on the account or zone | Create a new token from the **Edit Cloudflare Workers** template and update the secret |

## History

| Date | Change |
| --- | --- |
| 2026-10-01 | First deployment to noah.soler-pro.fr via GitHub Actions and Cloudflare Workers |
