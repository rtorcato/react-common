# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`react-common` — a **pnpm monorepo** (`packages/*` + `apps/*`) hosted on GitHub (`github.com/rtorcato/react-common`). The root (`react-common`) is a private workspace, not a published package. Tooling follows the `@rtorcato/js-tooling` standard, matching `js-common` / `browser-common`.

Workspace members:

- `packages/shadcn-ui` — `@rtorcato/shadcn-ui`, the published React 19 component library (components, hooks, utilities), distributed as tree-shakeable ESM with bundled types via public **npm**.
- `apps/docs` — `@rtorcato/shadcn-ui-docs`, a private Docusaurus documentation site (not published).

Most package-level detail below refers to `packages/shadcn-ui`.

## Package manager

Always use `pnpm` (not `npm` or `yarn`). The lockfile is `pnpm-lock.yaml`. Workspace globs are in `pnpm-workspace.yaml`.

## Common commands

Run from the repo root; the root scripts fan out across the workspace with `pnpm -r`:

- `pnpm test` — Vitest across all packages (jsdom, globals; package setup at `packages/shadcn-ui/src/test/setup.ts`)
- `pnpm typecheck` — `tsc --noEmit` per package
- `pnpm lint` / `pnpm format` — Biome
- `pnpm check:fix` — Biome lint+format with autofix
- `pnpm build` — build every package (`build-prod`: esbuild + `tsc --emitDeclarationOnly` via `tsconfig.build.json`)
- `pnpm verify` — the local gate: `typecheck` + `check` + `test`

Target one package with `pnpm --filter @rtorcato/shadcn-ui <script>` (e.g. `build-prod`, `coverage`, `dev` for Storybook).

CI gates that must pass before merge: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` (see `.github/workflows/ci.yml`).

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

`packages/shadcn-ui/build.mjs` scans a **fixed list** of directories for esbuild entry points:

- `src/components`
- `src/components/ui` (`.tsx`)
- `src/components/ui-extended` (`.tsx`)
- `src/lib`
- `src/hooks`

If you add a new top-level folder under `src/` (e.g. `src/widgets/`), it will NOT be bundled until you add a `getEntryPoints('src/widgets')` call in `build.mjs` and include the result in `allEntryPoints`. Also extend the `exports` map in `package.json` if you want a public subpath.

## Shared config from `@rtorcato/js-tooling`

Build, lint, TypeScript, Biome, Vitest, and commitlint config are imported from `@rtorcato/js-tooling` (public npm, v2 peer-dep model — the underlying tools are peer deps in `devDependencies`). If behavior seems wrong but the local config looks fine, the source of truth is likely in that package — bump it or coordinate a change there before patching things locally. Run `pnpm --filter @rtorcato/shadcn-ui doctor` (`js-tooling doctor`) to check for drift.

## Testing

- Framework: Vitest 4 with `@testing-library/react` and `jsdom`.
- Setup file: `packages/shadcn-ui/src/test/setup.ts` (imports `@testing-library/jest-dom`; loaded via Vitest config).
- Tests are **co-located** next to their sources (e.g. `src/components/ui/button.test.tsx`), not in a separate `src/tests/` dir.
- Run a single test: `pnpm --filter @rtorcato/shadcn-ui test -- -t 'test name'` or point at a file path.

## Branch flow

`main` is **branch-protected** (requires the `lint`, `typecheck`, `test`, `build` checks; linear history; no review required). Work on `feature/*` (or `fix/*`, `chore/*`, …) branches off `main`, open a PR, and squash-merge via auto-merge once CI is green. `main`, `release`, and `ci-testing` trigger CI.

## Commits & releases

Releases are driven by **[Changesets](https://github.com/changesets/changesets)**, not semantic-release. Versioning comes from changeset files, **not** from commit messages.

- **Any change to a published package needs a changeset.** Run `pnpm changeset`, pick the bump (patch/minor/major), and commit the generated `.changeset/*.md` file alongside your code.
- CI (`.github/workflows/ci.yml`, `release` job) uses `changesets/action`: on merge to `main` it either opens a **"Version Packages"** PR (applying pending changesets, bumping versions + CHANGELOGs) or, once that PR merges, publishes to **public npm**. Requires the `NPM_TOKEN` secret.
- `apps/docs` is excluded from releases via the `ignore` list in `.changeset/config.json`.
- Do not hand-edit package versions — `changeset version` manages them.
- **Conventional Commits are still enforced for style**: `commitlint` (config in `commitlint.config.mjs`) validates messages via the `.husky/commit-msg` hook. This is a lint gate only — it does not affect versioning.
- `husky` + `lint-staged` runs Biome lint/format on staged files before each commit; `pre-push` runs `pnpm verify`.

## Adding a public export

When adding a component intended to be consumed by library users (in `packages/shadcn-ui`):

1. Place it under `src/components/` (or `src/components/ui/` for shadcn-style primitives).
2. Add a matching **co-located** test (e.g. `src/components/ui/foo.test.tsx`).
3. Add a subpath to the `exports` map in `packages/shadcn-ui/package.json` if it should be importable as `@rtorcato/shadcn-ui/components/...`.
4. Verify the entry-points discovery in `build.mjs` will pick it up (see "Build: entry points are NOT fully dynamic" above).
5. Add a changeset (`pnpm changeset`) so the addition ships in the next release.
