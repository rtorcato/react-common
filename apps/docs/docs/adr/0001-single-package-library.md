# ADR 0001 — `react-common` is a single published package

- Status: Accepted
- Date: 2026-07-07

## Context

`react-common` is a pnpm monorepo, but it publishes exactly **one** package today:
`@rtorcato/shadcn-ui` (`packages/shadcn-ui`) — components, hooks, and a small
`lib` (`cn`). `apps/docs` is private and unpublished.

A recurring question is whether the library should be split into several
published packages — e.g. a separate `@rtorcato/react-hooks`, a `lib`/utils
package, or a theme/tokens package — "to be a proper library."

The surrounding ecosystem already partitions concerns by **repo**, not by
package inside this one:

- `@rtorcato/js-common` — generic, non-React JS/TS utilities.
- `@rtorcato/browser-common` — raw browser Web APIs (clipboard, geolocation,
  observers, storage, …).
- `@rtorcato/js-tooling` — shared build/lint/test config.

So React-specific code (components, hooks, providers) is the only thing that
belongs here in the first place.

## Decision

**Ship `react-common` as a single published package (`@rtorcato/shadcn-ui`).
Do not split it into multiple published packages speculatively.**

Hooks and `lib` stay inside the component package, exposed via granular subpath
exports (`/hooks`, `/lib/*`, `/components/ui/*`, …) so bundlers still tree-shake.

The only sanctioned future split:

- **`@rtorcato/react-hooks`** — headless, zero-UI-dependency hooks — extracted
  **only when a real consumer needs the hooks without pulling in the UI deps**
  (Radix, Tailwind, etc.). Not before.

A theme/tokens package is a distant "maybe", justified only if the design tokens
must be consumed by something outside this library (e.g. another app's
`tailwind.config`).

## Consequences

- One version, one changelog, one install — no cross-package peer-dep churn or
  version-skew between hooks and components.
- Non-React utilities do **not** land here; they go to `js-common` /
  `browser-common` first, then get consumed (see #23). Hooks are thin React
  wrappers at most (see #29).
- The trigger to revisit is concrete: someone wants `@rtorcato/react-hooks`
  without the UI. Until that ticket exists, "should this be more packages?" is
  answered — no.

## Related

- #23 — adopt `@rtorcato/js-common` for non-React utilities (the boundary).
- #28 — `ui-extended` components ported from real apps (depth, not packages).
- #29 — React-specific hooks expansion (depth, not packages).
