# react-common

[![CI](https://github.com/rtorcato/react-common/actions/workflows/ci.yml/badge.svg)](https://github.com/rtorcato/react-common/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/@rtorcato/shadcn-ui.svg)](./LICENSE)

A **pnpm monorepo** for reusable React 19 UI. It ships one published package plus a docs site:

| Path | Package | Published? | What |
| --- | --- | --- | --- |
| `packages/shadcn-ui` | [`@rtorcato/shadcn-ui`](https://www.npmjs.com/package/@rtorcato/shadcn-ui) | ✅ npm | React 19 component library — components, hooks, utilities |
| `apps/docs` | `@rtorcato/shadcn-ui-docs` | — | Docusaurus documentation site |

## Install (`@rtorcato/shadcn-ui`)

```bash
pnpm add @rtorcato/shadcn-ui
# react & react-dom 19 are peer dependencies
pnpm add react react-dom
```

## Usage

Components ship as granular subpath exports, so bundlers only pull what you import. There is no root barrel — import from the specific subpath:

```tsx
import { Button } from '@rtorcato/shadcn-ui/components/ui/button'
import '@rtorcato/shadcn-ui/styles.css'

export function App() {
	return <Button>Click me</Button>
}
```

### Entry points

| Import | Contents |
| --- | --- |
| `@rtorcato/shadcn-ui/components/ui/*` | shadcn UI primitives (e.g. `.../ui/button`) |
| `@rtorcato/shadcn-ui/components/ui-extended/*` | Composed components (e.g. `.../ui-extended/data-table`) |
| `@rtorcato/shadcn-ui/hooks` | Shared hooks |
| `@rtorcato/shadcn-ui/lib/*` | Utility modules (e.g. `lib/utils`) |
| `@rtorcato/shadcn-ui/theme-provider` | Theme provider |
| `@rtorcato/shadcn-ui/styles.css` | Bundled styles |

## Development

Requires Node ≥ 22 and pnpm (see `.nvmrc` / `packageManager`). Run from the repo root:

```bash
pnpm install
pnpm verify       # typecheck + biome check + tests (the local gate), across the workspace
pnpm test         # vitest
pnpm build        # build every package
```

Work on a single package with `pnpm --filter @rtorcato/shadcn-ui <script>` (e.g. `dev` for Storybook, `coverage`).

Tooling (TypeScript, Biome, Vitest, Commitlint, Husky, CI) is shared from
[`@rtorcato/js-tooling`](https://github.com/rtorcato/js-tooling) —
run `pnpm --filter @rtorcato/shadcn-ui doctor` to check for drift.

## Contributing

`main` is protected; work happens on branches and merges via PR:

```bash
git switch -c feat/short-name origin/main
# …commits (Conventional Commits, enforced by commitlint)…
pnpm changeset    # describe the change + choose the version bump
git push -u origin feat/short-name
gh pr create --fill
gh pr merge --auto --squash --delete-branch   # ships when CI is green
```

Releases are driven by **[Changesets](https://github.com/changesets/changesets)**:
merging to `main` opens a "Version Packages" PR, and merging that publishes to npm.
Add a changeset for any change to a published package.

## License

ISC © Richard Torcato
