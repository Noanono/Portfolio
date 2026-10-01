# Deployment

The site is a static Nuxt build served by **Cloudflare Workers**, in two
environments deployed automatically by GitHub Actions once the quality checks
pass:

| Environment | Branch | URL | Cloudflare Worker | GitHub environment |
| --- | --- | --- | --- | --- |
| Production | `main` | <https://noah.soler-pro.fr> | `portfolio` | `production` |
| Staging | `develop` | <https://staging-noah.soler-pro.fr> | `portfolio-staging` | `staging` |

Staging is the same build as production, but it tells search engines not to
index it (`robots.txt` disallows everything and every response carries
`X-Robots-Tag: noindex, nofollow`).

## How it works

```
push to develop or main
   │
   ▼
quality job ── npm ci → lint → type-check → npm audit → nuxt generate
   │                                                  │
   │                                    .output/public uploaded as artifact "site"
   ▼
deploy job ─── downloads "site"
               ├─ develop: add noindex files → wrangler deploy --env staging → staging-noah.soler-pro.fr
               └─ main:                        wrangler deploy --env ""      → noah.soler-pro.fr
```

- **Workflow**: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml).
  Pull requests run the checks only; nothing is deployed from a PR.
- **Cloudflare config**: [`wrangler.jsonc`](../wrangler.jsonc). The top level
  is production; `env.staging` is staging. Each publishes `.output/public` as
  static assets, serves `404.html` for unknown paths, and attaches its custom
  domain. `*.workers.dev` and preview URLs are off, so each site is only
  reachable on its own domain.
- **DNS and HTTPS**: the `soler-pro.fr` zone is on Cloudflare, so the first
  deploy of each environment creates its DNS record and certificate.
- **Release gate**: `main` only accepts a PR whose commit was deployed
  successfully to staging (see [branching.md](branching.md)).

## Security choices

| Measure | Why |
| --- | --- |
| Actions pinned to a full commit SHA (version in a comment) | A moved or hijacked tag cannot change the code that runs |
| `permissions: contents: read` for the workflow token | The pipeline cannot push code or change the repo |
| `persist-credentials: false` on checkout | The Git token is not left on disk for later steps |
| Cloudflare secrets scoped to the `staging` and `production` environments | Only the deploy job, on `develop` or `main`, can read them |
| API token limited to Workers on one account and one zone | A leaked token cannot touch anything else |
| Branch names passed to scripts through `env`, not `${{ }}` in `run:` | A crafted branch name cannot inject shell commands |
| Deployments are never cancelled by a newer run | A deploy cannot be cut off halfway |
| `npm audit --omit=dev --audit-level=high` | The build fails on known high or critical vulnerabilities in shipped dependencies |
| Dependabot, weekly, for npm and GitHub Actions | Pinned SHAs and packages are kept up to date through reviewable PRs |

## One-time setup

Kept here to rebuild the setup from scratch.

1. **Cloudflare API token**: in the Cloudflare dashboard, go to
   *My Profile → API Tokens → Create Token* and use the
   **Edit Cloudflare Workers** template. Limit it to your account and to the
   `soler-pro.fr` zone.
2. **Account ID**: shown on the Workers & Pages overview page in the dashboard.
3. **GitHub environments**: in the repo, go to *Settings → Environments*. Create
   `production` and `staging`, and add two secrets to each:
   `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. In each environment,
   under *Deployment branches and tags*, choose *Selected branches* and allow
   only `main` for `production` and only `develop` for `staging`.
4. Make sure no DNS record already exists for `noah.soler-pro.fr` or
   `staging-noah.soler-pro.fr`, otherwise Cloudflare cannot attach the domain.
5. Push to `develop`, then to `main`, or re-run the workflow from the
   *Actions* tab.

## Deploying by hand

Useful to test a change to `wrangler.jsonc` without going through CI.

```bash
npx wrangler login                          # once, opens the browser
npm run generate                            # builds .output/public
npx wrangler deploy --dry-run --env staging # checks the config, uploads nothing
npm run deploy:staging                      # publishes to staging-noah.soler-pro.fr
npm run deploy                              # publishes to noah.soler-pro.fr
```

A manual staging deploy skips the noindex files that CI adds.

## Rolling back

In the Cloudflare dashboard, open *Workers & Pages*, pick `portfolio`
(production) or `portfolio-staging`, then *Deployments*, and roll back to a
previous version. Then revert the faulty commit through a PR, otherwise the
next push deploys it again.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Deploy step fails with "Add the CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID secrets to the … environment" | Secrets missing from that GitHub environment | Add both secrets to the environment named in the message |
| Deploy job is rejected before it starts, with a branch protection message | The environment's deployment branch rule does not allow this branch | Check *Settings → Environments → Deployment branches and tags* |
| `npm ci` fails in CI but works locally | Peer dependency conflict, e.g. `@nuxt/eslint` requiring a newer ESLint | Run `npm ci` in a clean clone to reproduce, align the versions, commit the updated lockfile. The failed run's annotations show npm's error lines |
| Wrangler reports the custom domain is already in use | A DNS record already exists for that subdomain | Delete that record in Cloudflare DNS, then re-run the deploy |
| Authentication error from Wrangler | Token expired or lacks Workers permissions on the account or zone | Create a new token from the **Edit Cloudflare Workers** template and update the secret in both environments |
| The release PR into `main` waits for a deployment | The `develop` commit has not been deployed to staging yet, or that deploy failed | Wait for, or fix, the staging deploy of that commit |

## History

| Date | Change |
| --- | --- |
| 2026-10-01 | First deployment to noah.soler-pro.fr via GitHub Actions and Cloudflare Workers |
| 2026-10-01 | Staging environment: `develop` deploys to staging-noah.soler-pro.fr |
