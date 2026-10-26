# @rtorcato/react-common

## 1.0.0-beta.0

### Major Changes

- 14b3213: Lock the 1.0 public API by removing two dead exports (breaking).
  
  - `@rtorcato/shadcn-ui`: remove `useToast` and the whole `./hooks` subpath. It reimplemented a toast store that nothing rendered; the `sonner` component has its own store. Replace with `import { toast } from 'sonner'`.
  - `@rtorcato/react-common`: remove `useSidebar`. Replace with `useToggle`.

### Minor Changes

- f7b782b: Add `useCopy(timeout)`: returns `{ copy, copied }` built on `@rtorcato/browser-common` `copyToClipboard`, with `copied` resetting after `timeout` ms (default 2000).
- 76e539e: Add `useHasMounted()`: `false` on the server and first client render, `true` after mount, for deferring browser-only values without a hydration mismatch.
- e8bdb3e: `useLocalStorage` now delegates to `@rtorcato/browser-common/localstorage` (new dependency) instead of touching `window.localStorage` directly. It takes an optional `isValid` guard as a third argument so a stale or hand-edited entry is ignored, and returns a third tuple item that removes the entry and resets to the initial value. Without `isValid`, a stored value whose type does not match `initialValue` (e.g. the raw string browser-common returns for invalid JSON) is ignored, as before; the check is skipped when `initialValue` is `null`.

### Patch Changes

- 1377953: First `@beta` pre-release: exercises the changesets pre mode release flow end to end.

## 0.3.1

### Patch Changes

- 3f9f2c2: `useLocalStorage` no longer reads `localStorage` during render. It now returns
  `initialValue` on the first render and loads the stored value in an effect, so
  server and client markup match and SSR apps no longer get a hydration mismatch.
  The stored value shows up one commit after mount.

## 0.3.0

### Minor Changes

- 43f8d55: Add two React-specific hooks (#29):

  - `useInterval(callback, delay)` — declarative `setInterval`; always calls the latest callback without resetting, and `delay: null` pauses it.
  - `useEventListener(event, handler, target?)` — typed event listener with automatic cleanup; defaults to `window`, accepts a `Document`, `HTMLElement`, or ref; the handler is ref-stable so updating it never re-attaches.

  Both are purely React (state/effect/lifecycle) and add no dependencies — the vanilla Web-API boundary stays in `@rtorcato/browser-common`.

## 0.2.0

### Minor Changes

- 9927254: Add two headless React hooks: `usePrevious` (the value from the previous render) and `useToggle` (boolean state with stable `toggle`/`setOn`/`setOff` helpers).

## 0.1.0

### Minor Changes

- ce26fb1: Split the library into two packages. `@rtorcato/react-common` is the foundation — headless hooks (`useClickOutside`, `useDebounce`, `useLocalStorage`, `useMediaQuery`, `useIsMobile`, `useSidebar`), the `cn` class-merge utility, and the `ThemeProvider`. `@rtorcato/shadcn-ui` is the shadcn/ui component library (`components/ui/*`, `components/ui-extended/*`, `useToast`, styles) and now depends on `@rtorcato/react-common` for `cn` and `useIsMobile`.

  The former `@rtorcato/common-react` and `@rtorcato/react-hooks` packages are gone: `common-react` is renamed back to `shadcn-ui`, and the standalone `react-hooks` package is folded into `react-common`.
