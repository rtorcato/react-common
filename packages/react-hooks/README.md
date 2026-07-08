# @rtorcato/react-hooks

Headless React hooks with zero UI dependencies. Part of the
[react-common](https://github.com/rtorcato/react-common) monorepo.

## Install

```bash
pnpm add @rtorcato/react-hooks
```

Requires `react` and `react-dom` 19+ as peer dependencies.

## Usage

```ts
import { useDebounce, useLocalStorage, useMediaQuery } from '@rtorcato/react-hooks'
```

## Hooks

| Hook | Purpose |
| --- | --- |
| `useClickOutside` | Fire a callback when a click lands outside a ref. |
| `useDebounce` | Debounce a rapidly-changing value. |
| `useLocalStorage` | State synced to `localStorage`. |
| `useMediaQuery` | Subscribe to a CSS media query. |
| `useIsMobile` | `true` below the 768px breakpoint. |
| `useSidebar` | Minimal open/close state helper. |
