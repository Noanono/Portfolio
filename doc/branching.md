# Branches and contributions

| Branch | Role | Deployed to |
| --- | --- | --- |
| `main` | Production | <https://noah.soler-pro.fr> |
| `develop` | Integration and testing | <https://staging-noah.soler-pro.fr> |
| `feat/*`, `fix/*`, `docs/*`… | One change each | Not deployed |
| `hotfix/*` | Urgent fix for production | Not deployed |

Nobody pushes to `develop` or `main` directly: every change goes through a pull
request that passes CI and is approved by the repo owner.

## Workflow

```
feat/xyz ──PR──▶ develop ──push──▶ staging (staging-noah.soler-pro.fr)
                    │
                    └──PR (release)──▶ main ──push──▶ production (noah.soler-pro.fr)
```

1. Branch off `develop`: `git switch develop && git pull && git switch -c feat/short-name`.
2. Commit with [Conventional Commits](https://www.conventionalcommits.org)
   (`feat:`, `fix:`, `docs:`, `ci:`…) and push the branch.
3. Open a pull request into `develop`. CI runs; merge once it is green and
   approved. The merge deploys to staging.
4. Check the change on <https://staging-noah.soler-pro.fr>.
5. To release, open a pull request from `develop` into `main`. Merging it
   deploys to production.

Dependabot opens its update PRs against `develop`, so they follow the same path.

### Hotfixes

For an urgent production fix, branch off `main` as `hotfix/short-name` and open
a PR into `main`. After the release, open a second PR from `main` (or the
hotfix branch) into `develop` so the fix is not lost at the next release.

## Protection rules

Both rulesets are defined as code in [`.github/rulesets/`](../.github/rulesets/)
and enforced by GitHub repository rulesets.

| Rule | `develop` | `main` |
| --- | --- | --- |
| Pull request required, no direct push | Yes | Yes |
| 1 approval from a code owner ([`CODEOWNERS`](../.github/CODEOWNERS): @Noanono) | Yes | Yes |
| New commits dismiss the approval; last push must be approved | Yes | Yes |
| All review threads resolved | Yes | Yes |
| Check "Lint, type-check, audit and build" passes | Yes | Yes |
| Branch must be up to date with the base before merging | Yes | No (see below) |
| Check "Release comes from develop": source is `develop` or `hotfix/*` | — | Yes |
| The commit was deployed successfully to staging | — | Yes |
| Merge methods | Squash, merge, rebase | Merge commit only |
| No force push, no deletion | Yes | Yes |

**Owner bypass, via pull request only.** GitHub does not let an author approve
their own pull request. So that the owner can still merge his own work, the
repository admin role may bypass the rules, but only from a pull request
(`bypass_mode: pull_request`). Even the owner cannot push straight to a
protected branch.

**Why `main` does not require "up to date" and only allows merge commits.**
A release merge adds a merge commit to `main` that `develop` never receives.
If `main` required the PR branch to be up to date, every release would first
need `main` merged back into `develop`, which itself needs a PR. With merge
commits only, `main`'s content always equals `develop`'s after a release, so
the next release merges cleanly without that round trip.

**Why "Release comes from develop" is a CI job.** Rulesets cannot restrict
which branch a PR comes from, so the `release-source` job in
[`ci.yml`](../.github/workflows/ci.yml) fails any PR into `main` whose source
is not `develop` or `hotfix/*`, and the `main` ruleset requires that check.

## Applying or updating a ruleset

The JSON files are the reference. To apply one:

1. Go to the repo's *Settings → Rules → Rulesets*.
2. Click *New ruleset → Import a ruleset* and choose the file
   (`develop.json` or `main.json`).
3. Check the summary and click *Create*.

When the rules change, edit the JSON in a pull request first, then delete and
re-import the ruleset (or apply the same change in the UI) so the file and
GitHub stay in sync.

## Checking that it works

```bash
git switch develop
git commit --allow-empty -m "test: direct push"
git push   # rejected: "Changes must be made through a pull request"
git reset --hard origin/develop
```

## History

| Date | Change |
| --- | --- |
| 2026-10-01 | `develop` created and protected by ruleset |
| 2026-10-01 | `main` ruleset added; release-source check; `develop` deploys to staging |
