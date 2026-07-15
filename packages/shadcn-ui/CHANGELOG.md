# [1.4.0](https://github.com/rtorcato/shadcn-ui/compare/v1.3.0...v1.4.0) (2026-07-04)

## 1.7.0

### Minor Changes

- cb9b1d3: Add `ThemeToggle` (ui-extended): a light/dark toggle built on `next-themes` and the `Button` primitive. Pairs with `ThemeProvider`; token-based styling, SSR-safe (renders a stable icon until mounted), accessible label. Importable from `@rtorcato/shadcn-ui/components/ui-extended/theme-toggle`.

## 1.6.0

### Minor Changes

- c5c8594: Make `DatePickerWithPresets` and `DatePickerWithRange` controllable. Both now
  accept `value` / `onChange` (controlled) and `defaultValue` (uncontrolled), and
  `DatePickerWithPresets` takes a configurable `presets` array. `DatePickerWithRange`
  no longer defaults to a hardcoded Jan 2022 range — it starts empty unless a
  `value` or `defaultValue` is provided.

### Patch Changes

- Updated dependencies [9927254]
  - @rtorcato/react-common@0.2.0

## 1.5.1

### Patch Changes

- 7b5dc43: Upgrade `react-day-picker` to v10. Adapts the `Calendar` component to the v10 API: the `table` class-names key is now `month_grid`, and the custom `WeekNumber` slot no longer leaks the `week` prop onto the DOM. No visible behavior change.

## 1.5.0

### Minor Changes

- ce26fb1: Split the library into two packages. `@rtorcato/react-common` is the foundation — headless hooks (`useClickOutside`, `useDebounce`, `useLocalStorage`, `useMediaQuery`, `useIsMobile`, `useSidebar`), the `cn` class-merge utility, and the `ThemeProvider`. `@rtorcato/shadcn-ui` is the shadcn/ui component library (`components/ui/*`, `components/ui-extended/*`, `useToast`, styles) and now depends on `@rtorcato/react-common` for `cn` and `useIsMobile`.

  The former `@rtorcato/common-react` and `@rtorcato/react-hooks` packages are gone: `common-react` is renamed back to `shadcn-ui`, and the standalone `react-hooks` package is folded into `react-common`.

### Patch Changes

- Updated dependencies [ce26fb1]
  - @rtorcato/react-common@0.1.0

## 0.1.0

### Minor Changes

- 89f983c: Extract the headless hooks (`useClickOutside`, `useDebounce`, `useLocalStorage`, `useMediaQuery`, `useIsMobile`, `useSidebar`) into a new zero-UI-dependency package, `@rtorcato/react-hooks`.

  `@rtorcato/common-react` now depends on `@rtorcato/react-hooks` and re-exports only the sonner-coupled `useToast` from its `/hooks` subpath. Import the generic hooks from `@rtorcato/react-hooks` instead.

### Patch Changes

- Updated dependencies [89f983c]
  - @rtorcato/react-hooks@0.1.0

### Bug Fixes

- **deps:** mark lucide-react as a required peer dependency ([73eb7b2](https://github.com/rtorcato/shadcn-ui/commit/73eb7b2e6cb5b28e2810e5e3043403f5386790f9))
- **multi-select:** swap nested <button> for span role="button" ([fa6d3cc](https://github.com/rtorcato/shadcn-ui/commit/fa6d3cc071f34a6bafb45a416b189cef96775ead))
- **styles:** map design tokens into [@theme](https://github.com/theme) inline for Tailwind v4 ([e85ba7c](https://github.com/rtorcato/shadcn-ui/commit/e85ba7c375a4223ada1b39c82d6f510162bc3f23))

### Features

- **storybook:** add theme preset, mode, and radius toolbars ([6bdccc0](https://github.com/rtorcato/shadcn-ui/commit/6bdccc030055a42bd152383a1c40aa325cf24e15))

# [1.3.0](https://gitlab.com/rtorcato/shadcn-ui/compare/v1.2.0...v1.3.0) (2026-04-02)

### Features

- add ui-extended components and custom hooks ([f33bd64](https://gitlab.com/rtorcato/shadcn-ui/commit/f33bd64faea45f50f175d6a54c26fc7dabb0bb3b))

# [1.2.0](https://gitlab.com/rtorcato/shadcn-ui/compare/v1.1.0...v1.2.0) (2026-04-01)

### Features

- migrate to shadcn new-york style with RTL and Radix consolidation ([df8648f](https://gitlab.com/rtorcato/shadcn-ui/commit/df8648f097535376d68e6e9f672049d19a189f7f))

# [1.1.0](https://gitlab.com/rtorcato/shadcn-ui/compare/v1.0.2...v1.1.0) (2025-10-10)

### Features

- add input-group component ([e308cac](https://gitlab.com/rtorcato/shadcn-ui/commit/e308cacd93546c61e7349a5e36fa3dc6295e7ee0))

## [1.0.2](https://gitlab.com/rtorcato/shadcn-ui/compare/v1.0.1...v1.0.2) (2025-10-10)

### Bug Fixes

- update npm version ([daa8755](https://gitlab.com/rtorcato/shadcn-ui/commit/daa87553c748d915af3c75aee6b98d14b29e00ef))

## [1.0.1](https://gitlab.com/rtorcato/shadcn-ui/compare/v1.0.0...v1.0.1) (2025-10-10)

### Bug Fixes

- add new components and update packages ([76daa06](https://gitlab.com/rtorcato/shadcn-ui/commit/76daa0680947b9cc5ef041e11e0842dd933a8b06))
- add new components and update packages ([fa1a8e2](https://gitlab.com/rtorcato/shadcn-ui/commit/fa1a8e2a6473720cbfc6f904c2ee26c3224f50e3))
- downgrade jsdom to v26 for CI compatibility ([680c72c](https://gitlab.com/rtorcato/shadcn-ui/commit/680c72c47fdbf9b60683cc51c2f6d809a0fdc95b))

## [1.0.1](https://gitlab.com/rtorcato/shadcn-ui/compare/v1.0.0...v1.0.1) (2025-10-10)

### Bug Fixes

- add new components and update packages ([76daa06](https://gitlab.com/rtorcato/shadcn-ui/commit/76daa0680947b9cc5ef041e11e0842dd933a8b06))
- add new components and update packages ([fa1a8e2](https://gitlab.com/rtorcato/shadcn-ui/commit/fa1a8e2a6473720cbfc6f904c2ee26c3224f50e3))
- downgrade jsdom to v26 for CI compatibility ([680c72c](https://gitlab.com/rtorcato/shadcn-ui/commit/680c72c47fdbf9b60683cc51c2f6d809a0fdc95b))

# 1.0.0 (2025-05-28)

### Bug Fixes

- fix for react day picker and prune packages ([f083313](https://gitlab.com/rtorcato/shadcn-ui/commit/f083313a28951ca65f3d71126b994a7b8dcee0a0))
- MyComponent and Hook entries ([e8d212e](https://gitlab.com/rtorcato/shadcn-ui/commit/e8d212ee5eac2fe76206d1ab6c53e3a5a8dba514))
- new release ([a32edec](https://gitlab.com/rtorcato/shadcn-ui/commit/a32edec9f8f061372bb112261b31aebca3e51ddb))
- new release ([88ec04d](https://gitlab.com/rtorcato/shadcn-ui/commit/88ec04dc3ed4d0cf1e3d016414962ea31c80dc7e))
- new release ([af3e484](https://gitlab.com/rtorcato/shadcn-ui/commit/af3e4846a6f94947095d5bef0d9e3424eacbf570))
- new release ([a2a1206](https://gitlab.com/rtorcato/shadcn-ui/commit/a2a1206472cdcde704bc864ba34057b135aecc16))
- update package.json ([532639d](https://gitlab.com/rtorcato/shadcn-ui/commit/532639ddff6b40f18c9ac8ee79bea02c1f0418d3))

### Features

- add sidbar example and new hooks ([04f3875](https://gitlab.com/rtorcato/shadcn-ui/commit/04f3875c154ef56a577e903a4be22263b2f5d350))
- add sidebar component ([5d986fa](https://gitlab.com/rtorcato/shadcn-ui/commit/5d986fabe2d22ca07e11fa05f4dc1068ed406451))
- update analyze bundle ([873d739](https://gitlab.com/rtorcato/shadcn-ui/commit/873d7393635d9f06cb31aea18e554e2b9ef3fba4))
