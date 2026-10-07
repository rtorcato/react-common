---
'@rtorcato/shadcn-ui': patch
---

Drop the `esbuild-analyzer` dependency and the `package:analyzer` scripts.

`esbuild-analyzer` was declared in `dependencies`, so every consumer of the
package installed it at runtime even though nothing in shipped code imports it.
Its only use was the `package:analyzer` script, which read the stale committed
`meta.json` metafile — now deleted and gitignored.
