# react-common

[![CI](https://github.com/rtorcato/react-common/actions/workflows/ci.yml/badge.svg)](https://github.com/rtorcato/react-common/actions/workflows/ci.yml)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

The `@rtorcato` **React monorepo** — a pnpm workspace that publishes reusable
React packages to the public npm registry. The repo itself is private and
unpublished; the umbrella name `react-common` is the brand and the docs-site
identity.

## Packages

| Package | Description |
| --- | --- |
| [`@rtorcato/shadcn-ui`](https://www.npmjs.com/package/@rtorcato/shadcn-ui) | React 19 shadcn/ui component library — shadcn/ui + Radix primitives, extended components, Tailwind CSS v4. Dir: [`packages/shadcn-ui`](./packages/shadcn-ui). |
| [`@rtorcato/react-common`](https://www.npmjs.com/package/@rtorcato/react-common) | Foundation package — headless hooks, the `cn` class-merge utility, and `ThemeProvider`. Dir: [`packages/react-common`](./packages/react-common). |

`apps/docs` is the private Docusaurus site (`@rtorcato/react-common-docs`).

## Install (consumers)

```bash
pnpm add @rtorcato/shadcn-ui      # shadcn/ui components (pulls in @rtorcato/react-common)
pnpm add @rtorcato/react-common   # hooks, cn, ThemeProvider (standalone)
# react & react-dom 19 are peer dependencies
```

## Use with AI

An in-repo skill teaches AI coding tools to use the packages correctly (barrel
vs subpath imports, `styles.css` + Tailwind setup, theming).

**Claude Code** — install the self-hosted skill:

```
/plugin marketplace add rtorcato/react-common
/plugin install react-common@react-common
```

**Other tools (Cursor / Copilot / Codex)** — read [`AGENTS.md`](./AGENTS.md),
the cross-tool convention many agents pick up automatically. It stays in sync
with the Claude skill in [`skills/react-common/SKILL.md`](./skills/react-common/SKILL.md).

## Development

Requires Node ≥ 22 and pnpm 11 (see `.nvmrc` / `packageManager`).

```bash
pnpm install
pnpm verify       # typecheck + biome check + tests, across all packages
pnpm build        # build every package (build-prod)
```

Scripts run recursively (`pnpm -r`) across the workspace. Tooling (TypeScript,
Biome, Vitest, Commitlint, Husky, CI) is shared from
[`@rtorcato/js-tooling`](https://github.com/rtorcato/js-tooling) — run
`npx @rtorcato/js-tooling doctor` to check for drift.

## Contributing

`main` is protected; work happens on branches and merges via PR:

```bash
git switch -c feat/short-name origin/main
# …conventional commits + `pnpm changeset` for anything user-facing…
git push -u origin feat/short-name
gh pr create --fill
gh pr merge --auto --squash --delete-branch   # ships when CI is green
```

Releases are driven by [Changesets](https://github.com/changesets/changesets):
merging PRs with changesets opens a "Version Packages" PR; merging that publishes
the changed packages to npm.

## License

ISC © Richard Torcato
