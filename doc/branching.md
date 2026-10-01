# Branches and contributions

`develop` is the integration branch. Nobody pushes to it directly: every change
goes through a pull request that passes CI and is approved by the repo owner.
`main` is what runs in production; each push to `main` deploys
<https://noah.soler-pro.fr> (see [deploy.md](deploy.md)).

## Workflow

```
feature/xyz ──PR──▶ develop ──PR──▶ main ──▶ deploy to noah.soler-pro.fr
               │                 │
               └ CI + approval   └ release when develop is ready
```

1. Branch off `develop`: `git switch develop && git pull && git switch -c feat/short-name`.
2. Commit with [Conventional Commits](https://www.conventionalcommits.org)
   (`feat:`, `fix:`, `docs:`, `ci:`…) and push the branch.
3. Open a pull request into `develop`. CI runs the quality job.
4. Merge once CI is green and the review is approved.
5. To release, open a pull request from `develop` into `main`.

Dependabot also opens its update PRs against `develop`, so they follow the
same path.

## What protects `develop`

The rules are defined as code in
[`.github/rulesets/develop.json`](../.github/rulesets/develop.json) and
enforced by a GitHub repository ruleset.

| Rule | Effect |
| --- | --- |
| Pull request required | Direct pushes to `develop` are rejected, for everyone |
| 1 approval from a code owner | [`CODEOWNERS`](../.github/CODEOWNERS) makes @Noanono the required reviewer of every file |
| Stale approvals dismissed, last push must be approved | A commit added after the approval needs a new approval |
| All review threads resolved | Open comments block the merge |
| Status check "Lint, type-check, audit and build" must pass | Comes from GitHub Actions only, on a branch up to date with `develop` |
| No force push, no deletion | History on `develop` cannot be rewritten or lost |

**Owner bypass, via pull request only.** GitHub does not let an author approve
their own pull request. So that the owner can still merge his own work, the
repository admin role may bypass the rules, but only from a pull request
(`bypass_mode: pull_request`). Even the owner cannot push straight to
`develop`; he opens a PR and merges it himself.

## Applying or updating the ruleset

The JSON file is the reference. To apply it:

1. Go to the repo's *Settings → Rules → Rulesets*.
2. Click *New ruleset → Import a ruleset* and choose
   `.github/rulesets/develop.json`.
3. Check the summary and click *Create*.

When the rules change, edit the JSON file in a pull request first, then delete
and re-import the ruleset (or apply the same change in the UI) so the file and
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
| 2026-10-01 | `develop` branch created and protected by ruleset |
