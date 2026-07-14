---
name: react-common
description: Use when writing React 19 code in a project that depends on @rtorcato/react-common (headless hooks, the cn class-merge utility, ThemeProvider) and/or @rtorcato/shadcn-ui (a pre-built shadcn/ui component library). Guides correct imports (barrel vs subpath), the styles.css + Tailwind content setup, and ThemeProvider theming.
---

# Using @rtorcato/react-common and @rtorcato/shadcn-ui

Two published packages. `@rtorcato/react-common` is the foundation (headless
hooks, `cn`, `ThemeProvider`, zero UI deps). `@rtorcato/shadcn-ui` is the
component library and depends on `react-common`.

## Rules

1. **Import `@rtorcato/react-common` from the package root (single barrel).**
   ```ts
   import { cn, useIsMobile, usePrevious, useToggle, ThemeProvider } from '@rtorcato/react-common'
   ```
   Exports: hooks `useClickOutside`, `useDebounce`, `useLocalStorage`,
   `useMediaQuery`, `useIsMobile`, `useSidebar`, `usePrevious`, `useToggle`; the
   `cn` class-merge utility; and `ThemeProvider` / `useTheme` (re-exported from
   next-themes).

2. **Import `@rtorcato/shadcn-ui` from the subpath, never the package root.**
   There is no root export — components are one subpath each, so bundlers ship
   only what you use.
   ```ts
   // ✅ do
   import { Button } from '@rtorcato/shadcn-ui/components/ui/button'
   import { DataTable } from '@rtorcato/shadcn-ui/components/ui-extended/data-table'
   import { useToast } from '@rtorcato/shadcn-ui/hooks'
   // ❌ don't — there is no '@rtorcato/shadcn-ui' root export
   import { Button } from '@rtorcato/shadcn-ui'
   ```
   `components/ui/*` are the shadcn primitives; `components/ui-extended/*` are
   hand-written compositions (data-table, multi-select, file-upload, …).

3. **Using components? Import the stylesheet once and scan the package with
   Tailwind.** Import `@rtorcato/shadcn-ui/styles.css` at the app root, and add
   the package's built output to Tailwind `content`:
   ```ts
   import '@rtorcato/shadcn-ui/styles.css'
   ```
   ```ts
   // tailwind config
   content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@rtorcato/shadcn-ui/dist/**/*.{js,mjs}']
   ```

4. **Theming / dark mode goes through `ThemeProvider`.** Wrap the app with
   `attribute="class"` so components respond to the `.dark` class. Override the
   raw-HSL CSS variables (`--primary`, …) in a stylesheet imported *after*
   `styles.css`.
   ```tsx
   import { ThemeProvider } from '@rtorcato/react-common'
   <ThemeProvider attribute="class" defaultTheme="system" enableSystem>{children}</ThemeProvider>
   ```

5. **Peer requirement: React 19 / react-dom 19.** `shadcn-ui` also needs
   `lucide-react`, `tailwindcss`, and `tw-animate-css`.

Keep this file in sync with the root `AGENTS.md` — update both in any PR that
changes the public API.
