# AGENTS.md

Guidance for AI coding tools (Cursor, Copilot, Codex, …) using the `@rtorcato`
React packages. Kept in sync with `skills/react-common/SKILL.md` (the Claude
Code skill) — update both when the public API changes.

Two published packages: `@rtorcato/react-common` is the foundation (headless
hooks, the `cn` class-merge utility, `ThemeProvider`; zero UI deps).
`@rtorcato/shadcn-ui` is the pre-built shadcn/ui component library and depends on
`react-common`.

## Rules

1. **Import `@rtorcato/react-common` from the package root (single barrel).**
   ```ts
   import { cn, useIsMobile, usePrevious, useToggle, ThemeProvider } from '@rtorcato/react-common'
   ```
   Exports: `useClickOutside`, `useDebounce`, `useLocalStorage`,
   `useMediaQuery`, `useIsMobile`, `useSidebar`, `usePrevious`, `useToggle`,
   `cn`, and `ThemeProvider` / `useTheme` (next-themes re-export).

2. **Import `@rtorcato/shadcn-ui` from the subpath, never the package root** —
   there is no root export.
   ```ts
   import { Button } from '@rtorcato/shadcn-ui/components/ui/button'
   import { DataTable } from '@rtorcato/shadcn-ui/components/ui-extended/data-table'
   import { useToast } from '@rtorcato/shadcn-ui/hooks'
   ```

3. **Using components?** Import `@rtorcato/shadcn-ui/styles.css` once at the app
   root, and add `./node_modules/@rtorcato/shadcn-ui/dist/**/*.{js,mjs}` to your
   Tailwind `content` globs.

4. **Theming** goes through `ThemeProvider` (`attribute="class"`); override the
   raw-HSL CSS variables (`--primary`, …) in a stylesheet imported after
   `styles.css`.

5. **Peers:** React 19 / react-dom 19; `shadcn-ui` also needs `lucide-react`,
   `tailwindcss`, `tw-animate-css`.
