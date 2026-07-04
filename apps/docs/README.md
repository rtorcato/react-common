# @rtorcato/shadcn-ui-docs

Documentation site for [`@rtorcato/shadcn-ui`](https://www.npmjs.com/package/@rtorcato/shadcn-ui),
built with [Docusaurus](https://docusaurus.io/). Mirrors the setup of the sibling
[js-common](https://rtorcato.github.io/js-common/) docs.

## Develop

```bash
pnpm install          # from the repo root (apps/* is a workspace member)
pnpm --filter @rtorcato/shadcn-ui-docs dev
```

Or from this directory:

```bash
pnpm dev              # start the dev server
pnpm build            # production build → build/
pnpm serve            # preview the production build
pnpm typecheck        # tsc --noEmit
```

## Status

Being built out — see tracking issue [#12](https://github.com/rtorcato/shadcn-ui/issues/12).
