# @rtorcato/shadcn-ui

[![CI/CD](https://github.com/rtorcato/shadcn-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/rtorcato/shadcn-ui/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@rtorcato/shadcn-ui)](https://www.npmjs.com/package/@rtorcato/shadcn-ui)

A pre-built [shadcn/ui](https://ui.shadcn.com) component library for React + Tailwind CSS v4. Install once — every shadcn component, the extended components, and the hooks are available via subpath imports. No more running `npx shadcn add <name>` in every new project.

## Why this package

The standard shadcn workflow is "copy components into your project". That's great for customization but painful when you start a new app every other week:

- You run `npx shadcn add button card input dialog ...` on every project.
- You re-style and re-tweak the same components.
- Upgrades mean re-running the CLI and reconciling diffs by hand.

This package flips it around: shadcn components are built once, here, and consumed as a regular npm dependency. You still own the source (everything is MIT-style open) and you can fork/extend `ui-extended/` for project-specific variants — but the baseline is reusable.

## Companion packages

This library leans on two sibling packages so it doesn't reinvent tooling or utilities:

- **[`@rtorcato/js-common`](https://github.com/rtorcato/js-common)** — runtime utilities (date, formatting, arrays, async, validation). Compatible companion package — install separately if you want it; this library doesn't currently pull it as a dependency.
- **[`@rtorcato/js-tooling`](https://github.com/rtorcato/js-tooling)** — shared TypeScript / Biome / Vitest / commitlint / semantic-release configs. The repo's `tsconfig.json` already extends `@rtorcato/js-tooling/typescript/react`; other configs are being migrated.

## Installation

```bash
pnpm add @rtorcato/shadcn-ui
# or
npm install @rtorcato/shadcn-ui
# or
yarn add @rtorcato/shadcn-ui
```

Peer dependencies (you most likely already have these):

```bash
pnpm add react react-dom lucide-react tailwindcss tw-animate-css
```

## Setup

### 1. Import the stylesheet

```ts
import '@rtorcato/shadcn-ui/styles.css'
```

### 2. Tell Tailwind to scan the package

Tailwind v4 needs the package source in its content globs so utility classes used inside components ship to your build:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@rtorcato/shadcn-ui/dist/**/*.{js,mjs}',
  ],
}

export default config
```

## Usage

Import components from their subpath — bundlers tree-shake the rest.

```tsx
import { Button } from '@rtorcato/shadcn-ui/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@rtorcato/shadcn-ui/components/ui/card'
import { Input } from '@rtorcato/shadcn-ui/components/ui/input'
import { DataTable } from '@rtorcato/shadcn-ui/components/ui-extended/data-table'
import { useToast } from '@rtorcato/shadcn-ui/hooks'
import '@rtorcato/shadcn-ui/styles.css'

export function App() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Enter your name" />
        <Button>Get Started</Button>
      </CardContent>
    </Card>
  )
}
```

## Components

### Core UI (`components/ui/*`)

Generated from `shadcn@latest`. Drop-in compatible with the upstream API.

`accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `avatar`, `badge`, `breadcrumb`, `button`, `button-group`, `calendar`, `card`, `carousel`, `chart`, `checkbox`, `collapsible`, `command`, `context-menu`, `dialog`, `drawer`, `dropdown-menu`, `empty`, `field`, `form`, `hover-card`, `input`, `input-group`, `input-otp`, `item`, `kbd`, `label`, `menubar`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `slider`, `sonner`, `spinner`, `switch`, `table`, `tabs`, `textarea`, `toggle`, `toggle-group`, `tooltip`

### Extended (`components/ui-extended/*`)

Hand-written compositions on top of the primitives:

- `confirm-dialog` — AlertDialog wrapper with confirm/cancel callbacks and a loading state
- `data-table` — TanStack Table wrapper (sorting, pagination, column visibility)
- `date-picker-with-presets` — date picker with quick-pick presets
- `date-picker-with-range` — date range picker
- `file-upload` — drag-and-drop file input
- `multi-select` — multi-value Command + Popover combobox
- `page-header` — title + breadcrumb + actions layout

### Hooks (`hooks`)

`use-click-outside`, `use-debounce`, `use-local-storage`, `use-media-query`, `use-mobile`, `use-sidebar`, `use-toast`

## Theming

You don't have to fork the package to re-theme it. Every component uses semantic Tailwind utilities (`bg-primary`, `text-foreground`, `rounded-md`, …) that resolve to CSS variables at runtime. Override those variables in your own stylesheet and the components pick up the change.

### How it works

1. Import the library stylesheet **first**, then your overrides.

   ```ts
   import '@rtorcato/shadcn-ui/styles.css'
   import './theme.css' // <- your overrides
   ```

2. In `theme.css`, redefine the tokens you care about under `:root` (light) and `.dark` (dark mode).

   ```css
   :root {
     --primary: 262 83% 58%;          /* purple */
     --primary-foreground: 0 0% 100%;
     --radius: 0.75rem;
   }

   .dark {
     --primary: 263 70% 50%;
     --primary-foreground: 210 40% 98%;
   }
   ```

   Color values are written as raw HSL triplets (`H S L`) — no `hsl()` wrapper — because the components call `hsl(var(--primary))` internally.

### Using a shadcn theme preset

If you're coming from shadcn.com's [`/create`](https://ui.shadcn.com/create) flow, note that `pnpm dlx shadcn@latest init --preset <id>` **does not apply to this library**. That CLI scaffolds a brand-new project by *copying* shadcn primitives into your repo — the opposite of how this package works. Here, primitives are already built and shipped as a regular dependency, so a preset goes straight into your own CSS instead.

The actual workflow:

1. Pick a theme at <https://ui.shadcn.com/themes>.
2. Copy its `:root { ... }` and `.dark { ... }` blocks.
3. Paste them into the `theme.css` you already import after `@rtorcato/shadcn-ui/styles.css` (see "How it works" above).

For example, the canonical **Orange** preset:

```css
/* theme.css */
:root {
  --primary: 24.6 95% 53.1%;
  --primary-foreground: 60 9.1% 97.8%;
  --ring: 24.6 95% 53.1%;
}

.dark {
  --primary: 20.5 90.2% 48.2%;
  --primary-foreground: 60 9.1% 97.8%;
  --ring: 20.5 90.2% 48.2%;
}
```

These are the same values used by the Orange preview in this repo's Storybook (`.storybook/themes/orange.css`), so what you see there matches what you ship.

> **HSL vs OKLCH:** the current shadcn theme generator emits OKLCH values, but this library still uses HSL triplets internally. Either grab presets from the older HSL-based picker, or convert OKLCH → HSL when copying. The token table below lists every variable that's available to override.

### Overridable tokens

| Group | Tokens | Notes |
|---|---|---|
| **Surfaces** | `--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--muted`, `--muted-foreground` | Base page + container colors |
| **Brand** | `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--accent`, `--accent-foreground` | Buttons, links, highlights |
| **Status** | `--destructive`, `--destructive-foreground` | Error / danger states |
| **Form** | `--border`, `--input`, `--ring` | Inputs, focus rings, dividers |
| **Sidebar** | `--sidebar-background`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-accent`, `--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring` | Used by `Sidebar` |
| **Charts** | `--chart-1` through `--chart-5` | Recharts palette |
| **Shape** | `--radius` | Base radius; `rounded-{sm,md,lg,xl}` are derived |
| **Typography** | `--font-geist-sans` | Default sans font stack |

### Dark mode

Dark mode is wired to the `.dark` class. Toggle it on `<html>` either manually or via `next-themes`:

```tsx
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
```

### Tailwind v3 vs v4 consumers

This package ships both a Tailwind v3 `tailwind.config.ts` (with `hsl(var(--xxx))` mappings) and a Tailwind v4 `@theme inline` block in `dist/styles.css`. Either consumer path works without extra setup.

## Development

```bash
pnpm install
pnpm build-dev           # clean → CSS → esbuild → tsc declarations
pnpm test                # vitest + jsdom + Testing Library
pnpm check               # biome lint + format check
pnpm typecheck           # tsc --noEmit
```

To add a new shadcn component:

```bash
pnpm component-add <name>     # wraps `npx shadcn@latest add`
```

The esbuild wrapper (`build.mjs`) auto-discovers entry points by scanning `src/components/`, `src/lib/`, and `src/hooks/` — new files are picked up automatically. Add a matching subpath entry under `exports` in `package.json` so consumers can import it.

See [`CLAUDE.md`](./CLAUDE.md) for the full contributor guide and [`TODOS.md`](./TODOS.md) for the active roadmap.

## Releases

Versioning and publishing are handled by `semantic-release` in GitHub Actions on every push to `main`, publishing to the public npm registry. Do **not** bump the version in `package.json` manually. Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/) — use `pnpm commit` for an interactive prompt.

## License

ISC.
