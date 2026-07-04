# Contributing

Thanks for picking this up. This file covers the conventions specific to `@rtorcato/shadcn-ui` so you don't have to reverse-engineer them from the code.

## One-time setup

```bash
pnpm install
```

All dependencies (including `@rtorcato/js-tooling`) resolve from the public npm registry — no token needed.

Node version: see `.nvmrc` (currently `22`). Use `nvm use` or your tool of choice.

## Running the workshop

This is a component library, so there's no app-level dev server. The way to develop visually is Storybook:

```bash
pnpm dev              # alias for `pnpm storybook` — http://localhost:6006
pnpm storybook        # same thing, explicit
pnpm build-storybook  # produce a static build at storybook-static/
```

Stories live next to their components as `*.stories.tsx`. CSF3 conventions; see `src/components/ui-extended/*.stories.tsx` for examples. Each story imports straight from the source (`~/components/...`), not from `dist`, so changes hot-reload instantly.

**Theme controls** (top toolbar, configured in `.storybook/preview.ts`):

- **Theme** — color preset (Default, Orange, Blue, Rose, Green, Violet). Each preset is a CSS file under `.storybook/themes/` that overrides `--primary`, `--primary-foreground`, and `--ring` for both light and dark. Add new presets by dropping another file in `.storybook/themes/` and adding it to the `withThemeByClassName` map in `preview.ts`.
- **Mode** — toggles a `dark` class on `<html>`, which is how `src/styles/globals.css` activates the dark CSS variables. Flip Storybook's background to "dark" too so the canvas behind dark-mode components isn't white.
- **Radius** — sets `--radius` on `<html>` to one of `0`, `0.3`, `0.5`, `0.75`, `1` rem so you can preview rounded variants live.

If your component uses a `bg-*`/`border-*`/`text-*` utility that resolves to nothing in Storybook, you're probably missing a `--color-*` mapping under `@theme inline` in `globals.css`. The `src/test/theme-tokens.test.ts` smoke check is meant to catch this at CI time.

## Component split

There are two component directories and the distinction matters:

### `src/components/ui/` — generated shadcn components

- Created by `pnpm component-add <name>` (wraps `npx shadcn@latest add`).
- Treated as **vendored upstream code**. Don't hand-edit unless fixing a specific shadcn bug — your changes will get clobbered by the next `component-add` run.
- Biome doesn't lint this directory (excluded in `biome.jsonc`) so generated output style isn't fought.

### `src/components/ui-extended/` — hand-written compositions

- Custom components on top of `ui/` primitives. Examples: `data-table`, `multi-select`, `date-picker-with-range`.
- Fully linted, fully tested. Treat like any other source file.
- This is where most contributions land.

### `src/hooks/` — custom React hooks

Tests live next to the source (`use-mobile.ts` + `use-mobile.test.ts`). Re-exports from `src/hooks/index.ts` for the consumer-facing `@rtorcato/shadcn-ui/hooks` entry point.

## Adding a new shadcn component

```bash
pnpm component-add button-group
```

The custom esbuild wrapper (`build.mjs`) auto-discovers entry points by scanning `src/components/`, `src/lib/`, and `src/hooks/`, so a new file is picked up automatically by the build. **But**: you also need to add a matching subpath entry under `exports` in `package.json` so consumers can import it. The pattern is:

```jsonc
"./components/ui/<name>": {
  "types": "./dist/components/ui/<name>.d.ts",
  "import": "./dist/components/ui/<name>.js"
}
```

## Tailwind v3 vs v4

This package supports both:

- **Tailwind v4 consumers** (recommended) — `dist/styles.css` ships a `@theme inline` block that maps CSS variables to design tokens automatically. They just need to import the stylesheet.
- **Tailwind v3 consumers** — `tailwind.config.ts` at the repo root has the equivalent `hsl(var(--xxx))` mappings under `theme.extend.colors`. They can copy or import this config.

If you're updating theme tokens, change them in **both** places — `src/styles/globals.css` (`@theme inline` block) and `tailwind.config.ts` — until we drop v3 support.

## Companion packages

This repo leans on two sibling packages so we don't reinvent infrastructure:

| Package | Use case |
|---|---|
| [`@rtorcato/js-tooling`](https://github.com/rtorcato/js-tooling) | TypeScript, Biome, Vitest, commitlint, semantic-release, esbuild config |
| [`@rtorcato/js-common`](https://github.com/rtorcato/js-common) | Runtime utilities (date, formatting, arrays, async, validation) |

`@rtorcato/js-tooling` is published to the public npm registry and installed as a normal version spec. Dependabot keeps it updated. (`@rtorcato/js-common` isn't a dependency here — it's a compatible companion package, install it separately if a consumer wants it.)

## Commits

[Conventional Commits](https://www.conventionalcommits.org/) is enforced by commitlint on every commit (`commitlint.config.mjs` re-exports the shared `@rtorcato/js-tooling/commitlint/config`).

Use `pnpm commit` for an interactive prompt that walks you through type/scope/subject. Or write commits by hand following the spec:

```
<type>[optional scope]: <subject>

[optional body]

[optional footer]
```

The header is capped at 72 characters by commitlint. Type vocabulary, with what each does for `semantic-release`:

| Type | Releases |
|---|---|
| `feat` | minor |
| `fix` | patch |
| `update`, `refactor`, `revert`, `perf` | patch |
| Anything with `BREAKING CHANGE:` footer or `!:` in header | major |
| `chore`, `ci`, `docs`, `style`, `test`, `build` | no release |

Branch names mirror commit types: `feat/...`, `fix/...`, `chore/...`.

## Releases

Versioning and publishing are fully automated. Semantic-release runs on every push to `main` in GitHub Actions:

1. `commit-analyzer` reads the commit messages since the last tag (using the rules above).
2. If a releasing commit is found, semantic-release bumps the version in `package.json`, generates `CHANGELOG.md` entries, pushes a `chore(release): X.Y.Z [skip ci]` commit + a `vX.Y.Z` tag, creates a GitHub Release, and publishes the package to the public npm registry.
3. If no releasing commits exist (only `chore`/`ci`/`docs`/`style`/`test`/`build`), release exits cleanly with "no new version" — no churn.

**Do not** bump the version in `package.json` manually — semantic-release will overwrite it.

CI requirements (repository secrets, in **Settings → Secrets and variables → Actions**):
- `NPM_TOKEN` — an npm **automation** token with publish rights to `@rtorcato/*`. Used to publish to the public npm registry.
- `RELEASE_TOKEN` (optional) — a fine-grained PAT with `contents: write`. Falls back to the built-in `GITHUB_TOKEN` if unset; only needed if you want release commits to trigger downstream workflows or to push to a protected `main`.

## CI gates

| Gate | Blocking? | Notes |
|---|---|---|
| `dependencies` | yes | pnpm install with frozen lockfile |
| `lint` / `typecheck` / `commitlint` / `knip` | yes | parallel |
| `test (22)` / `test (24)` | yes | matrix |
| `build` | yes | `pnpm build-prod` |
| `storybook` | yes | `pnpm build-storybook` — catches broken stories before merge |
| `bundle-size` | yes | `pnpm bundle-size` — gzips each exported subpath, fails if any grows past its `bundle-size.json` budget × `(1 + tolerance)`. Re-baseline with `pnpm bundle-size:write` |
| `release` | runs on `main` push | semantic-release; no-ops on non-releasing commits |
| Dependabot | scheduled | weekly npm + monthly actions PRs (`.github/dependabot.yml`) |

## Pre-commit / pre-push hooks

- **pre-commit** (`.husky/pre-commit`) — `pnpm typecheck` + `pnpm check` + `pnpm exec biome format .`
- **pre-push** (`.husky/pre-push`) — `pnpm test --run`

If a hook is interfering for a legitimate reason (e.g. an in-flight refactor), discuss in the PR — don't bypass with `--no-verify` without a note.
