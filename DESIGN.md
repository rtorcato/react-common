# Design

react-common's docs site is a Docusaurus v3 app in `apps/docs`, one of the
torcato.dev docs sites. Shared components (`InstallTabs`, `UseWithAI`,
`Siblings`) come from `@rtorcato/shared-docs`. Site tokens live in
`apps/docs/src/css/custom.css`. This file covers what is specific to
react-common.

Signed off by rtorcato on 2026-10-22 (#228, #229). The mockups are private and
live outside this repo.

## Tokens

The accent is teal. Change `--su-accent*` in `custom.css` to reskin; don't add
new variables.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--su-accent` | `#0f766e` | `#2dd4bf` | Links, accent text, active states |
| `--su-accent-fill` | `#14b8a6` | `#2dd4bf` | Primary button, mark |
| `--su-on-accent` | `#04201c` | | Text on the accent fill |
| `--su-text` | `#374253` | | Body text |
| `--su-muted` | `#5b6675` | `#94a1b4` | Secondary text, table subpaths |
| `--su-faint` | `#5f6b7a` | `#768397` | Footer titles, copyright |
| `--su-bg2` | `#f6f8fb` | `#0b101a` | Footer surface |
| `--su-code-bg` | `#f3f6f9` | | Code surfaces |

Type is Geist (headings 800) and Geist Mono for code.

## Home page (`src/pages/index.tsx`)

### Section order

1. Hero (mark, H1, sub-line, CTAs, install tabs, code sample)
2. Value props: Radix-powered, Tailwind CSS v4, Own your components, TypeScript-first
3. Everything you need (component groups)
4. Use with AI (`UseWithAI` from shared-docs)
5. Sibling projects (`Siblings` from shared-docs)

Say what the library is before showing how agents install it.

### One container

Every home section shares one left edge. `.section` in `index.module.css` uses
`max-width: 1200px` (padding `54px 24px 8px`), the same width as the shared-docs
`UseWithAI` and `Siblings` sections. Done means every section heading and card
edge lines up at 1440px.

### Hero code sample

The `example.tsx` window keeps its chrome (three dots and the file name). Its body renders
through `@theme/CodeBlock` with `language="tsx"`, not a bare `<pre>`, so it
uses the site's Prism themes (github light, vsDark dark) and the token contrast
overrides in `custom.css`. Reset the CodeBlock's own margin, border and radius
inside the window so it doesn't draw a second frame. Highlighting is required in
both themes.

## Footer (`docusaurus.config.ts`, `custom.css`)

- **Documentation** lists every top-level docs page in sidebar order: Getting
  started, Tailwind setup, Theming, Hooks, Components.
- **Resources** (GitHub, npm, `rtorcato`) and **Projects** keep their links.
- External links show Docusaurus' ↗ icon. Delete the rule in `custom.css` that
  hides `.footer__link-item svg` / `[class*="iconExternalLink"]`. The icon
  carries `aria-label="(opens in new tab)"`, so don't hide it from screen
  readers either.

## Components table (`docs/components/index.mdx`)

The UI primitives table has the columns **Component | Subpath | Upstream | Live**.

- The intro line keeps the full prefix once: "Import from
  `@rtorcato/shadcn-ui/components/ui/<name>`".
- The Subpath cell shows only `ui/<name>` (e.g. `ui/accordion`), as plain
  muted monospace: `--su-muted`, no code chip background, no accent colour.
  That's 5.8:1 on white (5.5:1 on the zebra row) and 7.4:1 in dark.
- No copy buttons in the table. The intro line already gives the full import.

The narrower table also helps the 390px overflow (#227). Done means the table
fits the 1440px content column with no repeated prefix.

## Brand

The repo assets in `brand/` come from `npx @rtorcato/brand-kit`: `banner.svg`/`.png`,
`banner-mobile.svg`/`.png`, `social-card.svg`/`.png`, `favicon.svg`,
`favicon-512.png` and `favicon.ico`. The banner uses the docs site icon (#236)
and the teal accent `#2dd4bf` on the dark brand-kit ground. Regenerate them
with `brand/render.sh`. Don't edit the PNGs by hand.

## Accessibility

- Text contrast meets WCAG AA in both themes. Recheck the maths whenever a token changes.
- Focus rings stay visible on CTAs, install tabs, copy buttons and footer links.
- Touch targets are at least 44px. The home mark is decorative (`alt=""`), and the H1 carries the name.
- No horizontal page scroll at 390px.
