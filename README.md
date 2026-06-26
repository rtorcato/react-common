# @rtorcato/common-react

[![npm](https://img.shields.io/npm/v/@rtorcato/common-react.svg)](https://www.npmjs.com/package/@rtorcato/common-react)
[![CI](https://github.com/rtorcato/common-react/actions/workflows/ci.yml/badge.svg)](https://github.com/rtorcato/common-react/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/@rtorcato/common-react.svg)](./LICENSE)

A published **React 19** component library — reusable components, hooks, and utilities, distributed as tree-shakeable ESM with bundled type definitions.

## Install

```bash
pnpm add @rtorcato/common-react
# react & react-dom 19 are peer dependencies
pnpm add react react-dom
```

## Usage

```tsx
import { MyComponent } from '@rtorcato/common-react/components/MyComponent'

export function App() {
	return <MyComponent />
}
```

### Entry points

The package ships granular subpath exports so bundlers only pull what you import:

| Import | Contents |
| --- | --- |
| `@rtorcato/common-react` | Root barrel |
| `@rtorcato/common-react/components/MyComponent` | Individual component |
| `@rtorcato/common-react/hooks` | Shared hooks |
| `@rtorcato/common-react/lib/*` | Utility modules (e.g. `lib/utils`) |

## Development

Requires Node ≥ 22 and pnpm (see `.nvmrc` / `packageManager`).

```bash
pnpm install
pnpm verify       # typecheck + biome check + tests (the local gate)
pnpm test         # vitest (watch)
pnpm build-prod   # esbuild bundle + .d.ts emit
```

Tooling (TypeScript, Biome, Vitest, Commitlint, Husky, semantic-release, CI)
is shared from [`@rtorcato/js-tooling`](https://github.com/rtorcato/js-tooling) —
run `npx @rtorcato/js-tooling doctor` to check for drift.

## Contributing

`main` is protected; work happens on branches and merges via PR:

```bash
git switch -c feat/short-name origin/main
# …conventional commits…
git push -u origin feat/short-name
gh pr create --fill
gh pr merge --auto --squash --delete-branch   # ships when CI is green
```

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org)
— `semantic-release` reads them to version, tag, and publish to npm on merge to `main`.

## License

ISC © Richard Torcato
