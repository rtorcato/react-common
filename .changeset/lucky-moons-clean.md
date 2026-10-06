---
'@rtorcato/shadcn-ui': patch
---

Drop the `src/lib/index.ts` re-export barrel, which removes the undocumented
`@rtorcato/shadcn-ui/lib/index` build output. `cn` is unaffected — import it
from `@rtorcato/shadcn-ui/lib/utils` (or from `@rtorcato/react-common`, where
it is defined).
