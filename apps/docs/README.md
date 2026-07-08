# @rtorcato/react-common-docs

Documentation site for **react-common** — the `@rtorcato` React monorepo, home of
the [`@rtorcato/common-react`](https://www.npmjs.com/package/@rtorcato/common-react)
component library and [`@rtorcato/react-hooks`](https://www.npmjs.com/package/@rtorcato/react-hooks).
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
```

## Status

Being built out — see the
[react-common issues](https://github.com/rtorcato/react-common/issues).
