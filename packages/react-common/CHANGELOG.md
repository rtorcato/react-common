# @rtorcato/react-common

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
