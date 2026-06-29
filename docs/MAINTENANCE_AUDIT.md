# Maintenance Audit

- Source: `/Users/shichengrao/Projects/IdeaProjects/website`
- Category: **useful for the future**
- Maintenance branch: `codex/repo-health-audit-20260629`
- Generated: 2026-06-29 05:08:12 UTC

## Repo Map
- `.claude/` - project file or directory
- `.gitignore` - ignored local/generated files
- `.idea/` - JetBrains IDE metadata
- `.next/` - project file or directory
- `.nvmrc` - project file or directory
- `README.md` - project overview
- `app/` - application/source code
- `data/` - fixtures, sample data, or local runtime data
- `eslint.config.mjs` - project file or directory
- `next-env.d.ts` - project file or directory
- `next.config.ts` - project file or directory
- `node_modules/` - project file or directory
- `package-lock.json` - project file or directory
- `package.json` - Node package metadata and scripts
- `postcss.config.mjs` - project file or directory
- `public/` - static assets
- `scripts/` - project file or directory
- `tsconfig.json` - project file or directory

## Setup
- install Node dependencies with `npm install`.
- run the local app with `npm run dev`.
- build with `npm run build`.
- lint with `npm run lint`.

## Verification Status
- `npm run lint` (lint): pass in 1.4s
- `npm run build` (build): pass in 5.3s

## Top Maintenance Issues
1. Add tests or at least smoke tests for core workflows.
2. Add CI to run the documented verification commands on pull requests.
3. Pin or constrain dependencies consistently to improve reproducible setup.
4. Add an npm test script, even if it starts with a narrow smoke test.
5. Clarify which data files are sample fixtures versus private/local runtime data.
6. Keep IDE metadata out of the maintainer-facing path unless the repo intentionally standardizes it.
7. Resolve existing uncommitted work before handing the repo to another maintainer.
8. Add or confirm licensing expectations for future reuse.
9. Document environment variables and external services required for local development.
10. Document release/deploy steps or explicitly mark the repo as local-only.
11. Add an architecture or repo-map document for non-obvious code paths.
12. Add dependency update guidance, including known incompatible versions.
13. Add issue labels or TODO triage notes for easy future PRs.

## Low-Risk Fixes In This Branch
- Added this maintainer handoff document.
- Updated ignore-file hygiene where missing.

## Product Behavior
- No product behavior changes were made.

## Remaining Backlog
- Add tests or at least smoke tests for core workflows.
- Add CI to run the documented verification commands on pull requests.
- Pin or constrain dependencies consistently to improve reproducible setup.
- Add an npm test script, even if it starts with a narrow smoke test.
- Clarify which data files are sample fixtures versus private/local runtime data.
- Keep IDE metadata out of the maintainer-facing path unless the repo intentionally standardizes it.
- Resolve existing uncommitted work before handing the repo to another maintainer.
- Add or confirm licensing expectations for future reuse.
- Document environment variables and external services required for local development.
- Document release/deploy steps or explicitly mark the repo as local-only.
- Add an architecture or repo-map document for non-obvious code paths.
- Add dependency update guidance, including known incompatible versions.
- Add issue labels or TODO triage notes for easy future PRs.
