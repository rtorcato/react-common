# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`react-common` — a **pnpm monorepo** of `@rtorcato` React packages, hosted on GitHub (`github.com/rtorcato/react-common`). The repo root is private/unpublished; it publishes packages to the public **npm** registry. Tooling follows the `@rtorcato/js-tooling` standard, matching `js-common` / `browser-common`.

Workspace layout (`pnpm-workspace.yaml`: `packages/*`, `apps/*`):

- `packages/shadcn-ui` — `@rtorcato/shadcn-ui`, the React 19 shadcn/ui component library (shadcn/ui + Radix primitives, extended `ui-extended` components, Tailwind CSS v4). Published on npm from `1.4.x`.
- `packages/react-common` — `@rtorcato/react-common`, the foundation package: headless hooks (`useClickOutside`, `useDebounce`, `useLocalStorage`, `useMediaQuery`, `useIsMobile`, `useSidebar`), the `cn` class-merge utility, and `ThemeProvider`.
- `apps/docs` — `@rtorcato/react-common-docs`, the private Docusaurus site.

`@rtorcato/shadcn-ui` depends on `@rtorcato/react-common` (`workspace:*`) for `cn` (re-exported internally via `~/lib/utils`) and `useIsMobile`. It re-exports only the sonner-coupled `useToast` from its own `/hooks` subpath. `@rtorcato/react-common` has no workspace deps.

## Where utilities live (js-common boundary)

Do **not** re-implement generic JS/TS utilities here — those belong in **`@rtorcato/js-common`** (dates, strings, arrays, formatting, …). This repo holds only **React-specific** code: components, hooks, and providers. `cn()` stays here (it's React/Tailwind-specific).

When you need a generic utility that isn't in js-common yet, add it to **js-common first**, then consume it here — don't inline a one-off. Add `@rtorcato/js-common` as a dependency only when something actually imports from it (react-common currently has none, so it isn't a dep yet — see #23).

## Package manager

Always use `pnpm` (not `npm` or `yarn`). The lockfile is `pnpm-lock.yaml`.

## Common commands

Run from the repo root; scripts fan out across the workspace with `pnpm -r`:

- `pnpm test` — Vitest across all packages (jsdom, globals enabled)
- `pnpm typecheck` — `tsc --noEmit` per package
- `pnpm lint` / `pnpm format` / `pnpm check:fix` — Biome
- `pnpm build` — `build-prod` (esbuild + `tsc --emitDeclarationOnly`) per package
- `pnpm verify` — the local gate: `typecheck` + `check` + `test`

Target a single package with `pnpm --filter @rtorcato/shadcn-ui <script>`, or `cd` into its dir.

CI gates that must pass before merge: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` (separate jobs in `.github/workflows/ci.yml`).

Requires **Node ≥ 22** (`.nvmrc`) and pnpm `11.1.3` (`packageManager`).

## Code style (Biome)

- Indentation: **tabs**, line width **100**, **single quotes**.
- Each package has its own `biome.jsonc` extending `@rtorcato/js-tooling/biome` — do not switch back to ESLint/Prettier.

## TypeScript

- Path aliases: `@/*` and `~/*` both map to `./src/*` (per package).
- JSX: `react-jsx` (no `import React` needed in component files).
- Base config comes from `@rtorcato/js-tooling/typescript/react`.
- `@rtorcato/react-common` uses source-condition exports (`exports` → `src`, `publishConfig.exports` → `dist`) so `pnpm verify` typechecks/tests the workspace without a pre-build; publishing swaps to `dist`.

## Build: entry points are NOT fully dynamic

`packages/shadcn-ui/build.mjs` scans a **fixed list** of directories for esbuild entry points: `src/components`, `src/components/ui` (`.tsx`), `src/components/ui-extended` (`.tsx`), `src/lib`, `src/hooks`. If you add a new top-level folder under `src/`, it will NOT be bundled until you add a `getEntryPoints('src/…')` call in `build.mjs` and include it in `allEntryPoints`. Also extend the `exports` map in that package's `package.json` for a public subpath.

`packages/react-common/build.mjs` builds a single barrel entry (`src/index.ts`).

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

When adding a component to `@rtorcato/shadcn-ui`:

1. Place it under `packages/shadcn-ui/src/components/` (or `src/components/ui/` for shadcn-style primitives).
2. Add a matching test alongside it.
3. Add a subpath to the `exports` map in `packages/shadcn-ui/package.json` if it should be importable as `@rtorcato/shadcn-ui/components/Foo`.
4. Verify the entry-points discovery in `build.mjs` will pick it up (see "Build: entry points are NOT fully dynamic" above).
