# Contributing to react-common

Thanks for your interest. This pnpm monorepo publishes two packages to npm: `@rtorcato/react-common` (headless hooks, `cn`, `ThemeProvider`) and `@rtorcato/shadcn-ui` (shadcn/ui components).

## Prerequisites

- Node.js ≥ 24 (a `.nvmrc` is checked in)
- pnpm 11.1.3, pinned via `packageManager` (use Corepack or install it). Never `npm` or `yarn`.
- git

## Setup

```bash
pnpm install
```

## Workflow

1. **Branch off `main`**: `feat/`, `fix/`, `docs/`, `chore/`, `ci/`, `refactor/` or `test/`, with the issue number when one exists (e.g. `feat/20-resource-card`). One branch and one PR per issue.
2. **Make your change.** Add a test next to any new component or hook.
3. **Add a changeset** for anything user-facing: `pnpm changeset`. Pick the package(s) and bump type, then commit the generated file under `.changeset/`. Never edit `version` in `package.json` by hand; Changesets owns versions.
4. **Verify locally** before you push:
   ```bash
   pnpm verify   # typecheck + biome check + tests
   pnpm build    # build-prod for every package
   ```
5. **Commit using Conventional Commits** (`feat:`, `fix:`, `docs:`, `chore:`, …). The husky `commit-msg` hook and commitlint check the format. Wrap commit body lines at 72 characters.
6. **Open a PR against `main`.** Give it a Conventional Commit title: that becomes the squash commit, and its subject decides whether a release is cut. Link the issue with `Closes #N`. CI runs lint, typecheck, test and build.

## Commands

Run from the repo root. Scripts fan out across the workspace with `pnpm -r`.

| Task | Command |
| --- | --- |
| Test everything | `pnpm test` |
| Test one package | `pnpm --filter @rtorcato/shadcn-ui test` |
| Typecheck | `pnpm typecheck` |
| Lint + format check | `pnpm check` |
| Autofix | `pnpm check:fix` |
| Build | `pnpm build` |

## Conventions

- **React code only.** Generic JS/TS helpers (dates, strings, arrays) belong in `@rtorcato/js-common`. Add them there first, then consume them here.
- **Public API is whatever `exports` exposes.** A new `shadcn-ui` component needs a file under `packages/shadcn-ui/src/components/`, a test next to it, a subpath in that package's `exports` map, and an entry in `build.mjs` (entry points come from a fixed list of folders, not a glob).
- **Style is enforced by Biome:** tabs, single quotes, 100-column lines. `pnpm check:fix` formats for you.

## Releases

Releases are driven by [Changesets](https://github.com/changesets/changesets), not semantic-release. Contributors only add changesets; maintainers run the release. See [RELEASING.md](./RELEASING.md) for the full flow, including the current beta pre-release mode.

## License

By contributing, you agree your contributions are licensed under the ISC license that covers this repo (see the [README](./README.md)).
