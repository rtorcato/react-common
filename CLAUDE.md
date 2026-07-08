# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`react-common` — a **pnpm monorepo** of `@rtorcato` React packages, hosted on GitHub (`github.com/rtorcato/react-common`). The repo root is private/unpublished; it publishes packages to the public **npm** registry. Tooling follows the `@rtorcato/js-tooling` standard, matching `js-common` / `browser-common`.

Workspace layout (`pnpm-workspace.yaml`: `packages/*`, `apps/*`):

- `packages/common-react` — `@rtorcato/common-react`, the React 19 component library (shadcn/ui + Radix primitives, extended components, hooks, `lib/utils`, Tailwind CSS v4).
- `packages/react-hooks` — `@rtorcato/react-hooks`, headless React hooks with zero UI dependencies.
- `apps/docs` — `@rtorcato/react-common-docs`, the private Docusaurus site.

`@rtorcato/common-react` depends on `@rtorcato/react-hooks` (`workspace:*`); it re-exports only the sonner-coupled `useToast` from its own `/hooks` subpath.

## Package manager

Always use `pnpm` (not `npm` or `yarn`). The lockfile is `pnpm-lock.yaml`.

## Common commands

Run from the repo root; scripts fan out across the workspace with `pnpm -r`:

- `pnpm test` — Vitest across all packages (jsdom, globals enabled)
- `pnpm typecheck` — `tsc --noEmit` per package
- `pnpm lint` / `pnpm format` / `pnpm check:fix` — Biome
- `pnpm build` — `build-prod` (esbuild + `tsc --emitDeclarationOnly`) per package
- `pnpm verify` — the local gate: `typecheck` + `check` + `test`

Target a single package with `pnpm --filter @rtorcato/common-react <script>`, or `cd` into its dir.

CI gates that must pass before merge: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` (separate jobs in `.github/workflows/ci.yml`).

Requires **Node ≥ 22** (`.nvmrc`) and pnpm `11.1.3` (`packageManager`).

## Code style (Biome)

- Indentation: **tabs**, line width **100**, **single quotes**.
- Each package has its own `biome.jsonc` extending `@rtorcato/js-tooling/biome` — do not switch back to ESLint/Prettier.

## TypeScript

- Path aliases: `@/*` and `~/*` both map to `./src/*` (per package).
- JSX: `react-jsx` (no `import React` needed in component files).
- Base config comes from `@rtorcato/js-tooling/typescript/react`.
- `@rtorcato/react-hooks` uses source-condition exports (`exports` → `src`, `publishConfig.exports` → `dist`) so `pnpm verify` typechecks/tests the workspace without a pre-build; publishing swaps to `dist`.

## Build: entry points are NOT fully dynamic

`packages/common-react/build.mjs` scans a **fixed list** of directories for esbuild entry points: `src/components`, `src/components/ui` (`.tsx`), `src/components/ui-extended` (`.tsx`), `src/lib`, `src/hooks`. If you add a new top-level folder under `src/`, it will NOT be bundled until you add a `getEntryPoints('src/…')` call in `build.mjs` and include it in `allEntryPoints`. Also extend the `exports` map in that package's `package.json` for a public subpath.

`packages/react-hooks/build.mjs` builds a single barrel entry (`src/index.ts`).

## Shared config from `@rtorcato/js-tooling`

Build, lint, TypeScript, Biome, Vitest, and commitlint config are imported from `@rtorcato/js-tooling` (public npm, v2 peer-dep model — the underlying tools are peer deps in `devDependencies`). If behavior seems wrong but local config looks fine, the source of truth is likely in that package — bump it or coordinate a change there. Run `npx @rtorcato/js-tooling doctor` to check for drift.

## Testing

- Framework: Vitest with `@testing-library/react` and `jsdom`.
- Setup file: `src/test/setup.ts` per package (imports `@testing-library/jest-dom` + `@rtorcato/js-tooling/vitest/jsdom-shims`).
- Run a single test: `pnpm --filter <pkg> test -- -t 'test name'` or `pnpm --filter <pkg> test path/to/file.test.tsx`.

## Branch flow

`main` is **branch-protected** (requires the `lint`, `typecheck`, `test`, `build` checks; linear history; no review required). Work on `feature/*` (or `fix/*`, `chore/*`, …) branches off `main`, open a PR, and squash-merge via auto-merge once CI is green. `main`, `release`, and `ci-testing` trigger CI.

## Commits & releases

Releases are driven by **Changesets** (not semantic-release):

- **Conventional Commits are required** — `commitlint` validates the latest message in CI. Use `git commit -m` with a conventional message.
- Add a changeset for any user-facing change: `pnpm changeset` (root). It records which packages bump and how.
- On merge to `main`, the Changesets GitHub Action opens/updates a "Version Packages" PR; merging **that** PR runs `pnpm release` (`pnpm build && changeset publish`) to publish changed packages to **public npm** with provenance. Requires the `NPM_TOKEN` secret.
- Do **not** bump versions in `package.json` by hand — Changesets owns them.
- `husky` + `lint-staged` runs Biome on staged files before each commit; `pre-push` runs `pnpm verify`.
- Skip CI by including `[skip ci]` in the commit message.

## Adding a public export

When adding a component to `@rtorcato/common-react`:

1. Place it under `packages/common-react/src/components/` (or `src/components/ui/` for shadcn-style primitives).
2. Add a matching test alongside it.
3. Add a subpath to the `exports` map in `packages/common-react/package.json` if it should be importable as `@rtorcato/common-react/components/Foo`.
4. Verify the entry-points discovery in `build.mjs` will pick it up (see "Build: entry points are NOT fully dynamic" above).
