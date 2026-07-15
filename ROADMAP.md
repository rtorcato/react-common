# Roadmap

Tracks the direction of the `react-common` monorepo. Milestones here mirror the
[GitHub milestones](https://github.com/rtorcato/react-common/milestones) — keep them in
sync. Any release that adds or changes a public API must tick the relevant item here (see
the checklist in [RELEASING.md](./RELEASING.md)).

Current versions: `@rtorcato/react-common` `0.2.0`, `@rtorcato/shadcn-ui` `1.6.0`.

## Shipped

Foundation in place and published to npm:

- `@rtorcato/react-common` — headless hooks (`useClickOutside`, `useDebounce`,
  `useLocalStorage`, `useMediaQuery`, `useIsMobile`, `useSidebar`), `cn`, `ThemeProvider`.
- `@rtorcato/shadcn-ui` — React 19 shadcn/ui + Radix component library, `ui-extended`
  components, Tailwind v4; 63 published subpaths.
- Docs site (Docusaurus) with TypeDoc API reference + per-module pages (#30).
- Changesets release pipeline, in-repo AI skill + `AGENTS.md` (#38), public-API surface
  lock test (#32).

## Beta — npm preview

Pre-1.0 preview line. → [milestone](https://github.com/rtorcato/react-common/milestones)

- [ ] Publish a beta to npm under a `beta`/`next` dist-tag (#27).
- [ ] Adopt `@rtorcato/js-common` for non-React utilities as the need arises — add the dep
      only when something imports it; generic utils land in js-common first (#23).

## v1.0 — Stable API

Freeze the surface, then tag 1.0. → [milestone](https://github.com/rtorcato/react-common/milestones)

- [ ] Lock the 1.0 public API — audit every `exports` subpath, `knip` clean (#32).
- [ ] React-specific hooks expansion (#29).
- [ ] `ui-extended` components ported from real apps (#28).

## Backlog

Not yet scheduled — see the [Backlog milestone](https://github.com/rtorcato/react-common/milestones)
and open [issues](https://github.com/rtorcato/react-common/issues).
