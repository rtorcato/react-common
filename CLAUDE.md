# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`@rtorcato/common-react` — a published React 19 component library distributed via the public **npm** registry. Single package (not a monorepo). Hosted on GitHub (`github.com/rtorcato/common-react`). Tooling follows the `@rtorcato/js-tooling` standard, matching `js-common` / `browser-common`.

## Package manager

Always use `pnpm` (not `npm` or `yarn`). The lockfile is `pnpm-lock.yaml`.

## Common commands

- `pnpm test` — Vitest (jsdom, globals enabled, setup at `src/test/setup.ts`)
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm lint` — Biome lint
- `pnpm format` — Biome format
- `pnpm check:fix` — Biome lint+format with autofix
- `pnpm build-prod` — esbuild + `tsc --emitDeclarationOnly` (uses `tsconfig.build.json`)
- `pnpm verify` — the local gate: `typecheck` + `check` + `vitest run`

CI gates that must pass before merge: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build-prod` (separate jobs in `.github/workflows/ci.yml`).

Requires **Node ≥ 22** (`.nvmrc`) and pnpm `11.1.3` (`packageManager`).

## Code style (Biome)

- Indentation: **tabs**, line width **100**, **single quotes**.
- Configured in `biome.jsonc` — extends defaults; do not switch back to ESLint/Prettier.

## TypeScript

- Path aliases: `@/*` and `~/*` both map to `./src/*`.
- JSX: `react-jsx` (no `import React` needed in component files).
- Base config comes from `@rtorcato/js-tooling/typescript/react`.
- Targets TypeScript 6 — `baseUrl` is removed (deprecated); path aliases work without it.

## Build: entry points are NOT fully dynamic

`build.mjs` scans a **fixed list** of directories for esbuild entry points:

- `src/components`
- `src/components/ui` (`.tsx`)
- `src/components/ui-extended` (`.tsx`)
- `src/lib`
- `src/hooks`

If you add a new top-level folder under `src/` (e.g. `src/widgets/`), it will NOT be bundled until you add a `getEntryPoints('src/widgets')` call in `build.mjs` and include the result in `allEntryPoints`. Also extend the `exports` map in `package.json` if you want a public subpath.

## Shared config from `@rtorcato/js-tooling`

Build, lint, TypeScript, Biome, Vitest, commitlint, and semantic-release config are imported from `@rtorcato/js-tooling` (public npm, v2 peer-dep model — the underlying tools are peer deps in `devDependencies`). If behavior seems wrong but the local config looks fine, the source of truth is likely in that package — bump it or coordinate a change there before patching things locally. Run `npx @rtorcato/js-tooling doctor` to check for drift.

## Testing

- Framework: Vitest 4 with `@testing-library/react` and `jsdom`.
- Setup file: `src/test/setup.ts` (imports `@testing-library/jest-dom`; loaded via Vitest config).
- Run a single test: `pnpm test -- -t 'test name'` or `pnpm test path/to/file.test.tsx`.

## Branch flow

`main` is **branch-protected** (requires the `lint`, `typecheck`, `test`, `build` checks; linear history; no review required). Work on `feature/*` (or `fix/*`, `chore/*`, …) branches off `main`, open a PR, and squash-merge via auto-merge once CI is green. `main`, `release`, and `ci-testing` trigger CI.

## Commits & releases

- **Conventional Commits are required** — semantic-release reads commit messages to version, tag, and publish. `commitlint` validates the latest message in CI. Use `git commit -m` with a conventional message (no commitizen).
- `husky` + `lint-staged` runs Biome lint/format on staged `*.{js,ts,json,md}` before each commit; `pre-push` runs `pnpm verify`.
- The version in `package.json` is **auto-managed** — do not bump it by hand.
- Skip CI by including `[skip ci]` in the commit message.
- The `release` job runs on `main` via GitHub Actions and publishes to **public npm** with provenance. Requires the `NPM_TOKEN` secret (npmjs publish token).
- Note: `@semantic-release/git` is intentionally disabled (see `release.config.mjs`) so the release bot doesn't fight protected `main` — the version/CHANGELOG commit is not pushed back; tags + npm + the GitHub Release are the source of truth.

## Adding a public export

When adding a component intended to be consumed by library users:

1. Place it under `src/components/` (or `src/components/ui/` for shadcn-style primitives).
2. Add a matching test under `src/tests/`.
3. Add a subpath to the `exports` map in `package.json` if it should be importable as `@rtorcato/common-react/components/Foo`.
4. Verify the entry-points discovery in `build.mjs` will pick it up (see "Build: entry points are NOT fully dynamic" above).
