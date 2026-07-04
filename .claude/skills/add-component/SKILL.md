---
name: add-component
description: Scaffold a new React component in @rtorcato/common-react under src/components/, with matching test, public export, and a reminder about build.mjs entry-point discovery. Use when the user says "add a component", "scaffold component X", or "/add-component X".
---

# add-component

Scaffold a new component in this library. Accept the component name from `$ARGUMENTS` (PascalCase). If missing, ask the user.

## Steps

1. **Decide placement** — ask the user (or infer from name) whether the component goes under:
   - `src/components/` — general component
   - `src/components/ui/` — shadcn-style primitive
   - `src/components/ui-extended/` — extended/composed UI

2. **Create the component file** at the chosen path, e.g. `src/components/Foo.tsx`:
   - Default-export and named-export the component.
   - Type the props with a `FooProps` interface (use `type` only if the project file you'd be matching already uses it).
   - Tabs for indentation, single quotes, line width 100 (matches Biome config).
   - JSX transform is `react-jsx` — do NOT add `import React from 'react'`.

3. **Create a matching test** at `src/tests/Foo.test.tsx` using Vitest + `@testing-library/react`. The Vitest setup file is `src/test/setup.ts` — globals (`describe`, `it`, `expect`) are enabled.

4. **Add a public export** if the component should be consumable from the package:
   - Add a subpath entry in `package.json` under `exports`, mirroring the existing `./components/MyComponent` entry.

5. **Entry-points check** — `build.mjs` already scans `src/components`, `src/components/ui`, `src/components/ui-extended`, `src/lib`, `src/hooks`. If the chosen placement is one of these, no `build.mjs` change is needed. If the user wants the component in a new top-level dir under `src/`, edit `build.mjs` to add `await getEntryPoints('src/<new-dir>')` and include it in `allEntryPoints`.

6. **Verify** — run `pnpm exec biome check --fix <new-files>` and `pnpm typecheck` on the new files. Report what was created and any follow-ups (e.g., add to a barrel file if one exists).

## Notes

- Do not bump `package.json` version — semantic-release handles versioning.
- Prefer extending existing patterns: read a nearby component before generating boilerplate from scratch.
