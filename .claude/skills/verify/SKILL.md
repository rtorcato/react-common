---
name: verify
description: Run the full CI gate locally (lint, typecheck, test) and report any failures before declaring work done. Use when the user says "verify", "is this ready", "/verify", or before opening a PR.
---

# verify

Run the same checks GitLab CI runs, in this order, and stop on the first failure. Do NOT mark work complete until all three pass.

## Steps

1. `pnpm lint` — Biome lint over the repo
2. `pnpm typecheck` — `tsc --noEmit`
3. `pnpm test` — Vitest (use `pnpm test -- --run` if Vitest enters watch mode; the bare `test` script does not pass `--run`)

## On failure

- For lint failures: offer to run `pnpm check:fix` which applies Biome's autofixes.
- For type errors: show the file/line and propose a fix; do not silence with `// @ts-ignore` or `any`.
- For test failures: read the relevant test and source, identify the root cause, and propose a fix.

## On success

Report a one-line summary: `verify: lint ✓ typecheck ✓ test ✓` (plain text, no emoji unless the user uses them) and what was checked.

## Notes

- `pnpm build-prod` is also a CI gate but is slow; only run it when the user explicitly asks or when changes affect `build.mjs`, entry points, or `tsconfig.build.json`.
- This skill mirrors the GitLab CI stages: `lint → varcheck → test → build`. The varcheck stage just verifies `NPM_TOKEN` / `GITLAB_TOKEN` exist in CI and is not reproducible locally.
