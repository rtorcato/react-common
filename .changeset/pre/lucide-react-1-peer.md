---
'@rtorcato/shadcn-ui': patch
---

Widen the `lucide-react` peer to `^0.545.0 || ^1.0.0`. The documented `pnpm add lucide-react` installs 1.x, which npm rejected with ERESOLVE. Every icon the components import exists in lucide-react 1.0.0 and 1.61.0.
