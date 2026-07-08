---
"@rtorcato/react-hooks": minor
"@rtorcato/common-react": minor
---

Extract the headless hooks (`useClickOutside`, `useDebounce`, `useLocalStorage`, `useMediaQuery`, `useIsMobile`, `useSidebar`) into a new zero-UI-dependency package, `@rtorcato/react-hooks`.

`@rtorcato/common-react` now depends on `@rtorcato/react-hooks` and re-exports only the sonner-coupled `useToast` from its `/hooks` subpath. Import the generic hooks from `@rtorcato/react-hooks` instead.
