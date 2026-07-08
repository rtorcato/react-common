# react-common

[![CI](https://github.com/rtorcato/react-common/actions/workflows/ci.yml/badge.svg)](https://github.com/rtorcato/react-common/actions/workflows/ci.yml)

The `@rtorcato` **React monorepo** — a pnpm workspace that publishes reusable
React packages to the public npm registry. The repo itself is private and
unpublished; the umbrella name `react-common` is the brand and the docs-site
identity.

## Packages

| Package | Description |
| --- | --- |
| [`@rtorcato/common-react`](https://www.npmjs.com/package/@rtorcato/common-react) | React 19 component library — shadcn/ui + Radix primitives, extended components, Tailwind CSS v4. Dir: [`packages/common-react`](./packages/common-react). |
| [`@rtorcato/react-hooks`](https://www.npmjs.com/package/@rtorcato/react-hooks) | Headless React hooks, zero UI dependencies. Dir: [`packages/react-hooks`](./packages/react-hooks). |

`apps/docs` is the private Docusaurus site (`@rtorcato/react-common-docs`).

## Install (consumers)

```bash
pnpm add @rtorcato/common-react   # components
pnpm add @rtorcato/react-hooks    # headless hooks
# react & react-dom 19 are peer dependencies
```

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
