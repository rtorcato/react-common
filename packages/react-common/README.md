# @rtorcato/react-common

The foundation package of the
[react-common](https://github.com/rtorcato/react-common) monorepo — the headless
React hooks plus the `cn` class-merge utility and `ThemeProvider`, with zero UI
dependencies.

## Install

```bash
pnpm add @rtorcato/react-common
```

Requires `react` and `react-dom` 19+ as peer dependencies.

## Usage

```ts
import { useDebounce, useLocalStorage, cn, ThemeProvider } from '@rtorcato/react-common'
```

## What's inside

### Hooks

| Hook | Purpose |
| --- | --- |
| `useClickOutside` | Fire a callback when a click lands outside a ref. |
| `useDebounce` | Debounce a rapidly-changing value. |
| `useLocalStorage` | State synced to `localStorage`. |
| `useMediaQuery` | Subscribe to a CSS media query. |
| `useIsMobile` | `true` below the 768px breakpoint. |
| `useSidebar` | Minimal open/close state helper. |

### Utilities

- `cn` — merge Tailwind class names (clsx + tailwind-merge).
- `ThemeProvider` — light/dark theme context provider.

## Scope

React-only utilities live here. Non-React runtime helpers belong in
[`@rtorcato/js-common`](https://github.com/rtorcato/js-common); browser Web API
wrappers belong in
[`@rtorcato/browser-common`](https://github.com/rtorcato/browser-common).
