---
"@rtorcato/shadcn-ui": minor
"@rtorcato/react-common": minor
---

Split the library into two packages. `@rtorcato/react-common` is the foundation — headless hooks (`useClickOutside`, `useDebounce`, `useLocalStorage`, `useMediaQuery`, `useIsMobile`, `useSidebar`), the `cn` class-merge utility, and the `ThemeProvider`. `@rtorcato/shadcn-ui` is the shadcn/ui component library (`components/ui/*`, `components/ui-extended/*`, `useToast`, styles) and now depends on `@rtorcato/react-common` for `cn` and `useIsMobile`.

The former `@rtorcato/common-react` and `@rtorcato/react-hooks` packages are gone: `common-react` is renamed back to `shadcn-ui`, and the standalone `react-hooks` package is folded into `react-common`.
