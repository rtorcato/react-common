# @rtorcato/react-common-docs

Documentation site for **react-common** — the `@rtorcato` React monorepo, home of
the [`@rtorcato/shadcn-ui`](https://www.npmjs.com/package/@rtorcato/shadcn-ui)
component library and [`@rtorcato/react-common`](https://www.npmjs.com/package/@rtorcato/react-common).
Built with [Docusaurus](https://docusaurus.io/). Mirrors the setup of the sibling
[js-common](https://rtorcato.github.io/js-common/) docs.

## Develop

```bash
pnpm install          # from the repo root (apps/* is a workspace member)
pnpm --filter @rtorcato/react-common-docs dev
```

Or from this directory:

```bash
pnpm dev              # start the dev server
pnpm build            # production build → build/
pnpm serve            # preview the production build
pnpm typecheck        # tsc --noEmit
pnpm storybook:local  # build Storybook into static/ so <StorybookEmbed> previews work locally
```

The `<StorybookEmbed>` iframes on component pages load Storybook from
`/storybook/`. In production that's colocated by CI (`docs.yml`); locally it
isn't built, so the embeds show Docusaurus's "Page Not Found" until you run
`pnpm storybook:local` once (re-run it when stories change).

## Status

Being built out — see the
[react-common issues](https://github.com/rtorcato/react-common/issues).
