---
'@rtorcato/react-common': major
'@rtorcato/shadcn-ui': major
---

Require Node 24 or newer (breaking). `engines.node` moves from `>=22.12` to `>=24`, matching `@rtorcato/js-common` 6.x, which `shadcn-ui` now depends on. Node 22 installs warn, and fail under `engine-strict`. Folded into the 1.0.0 pre-release, so it costs no extra major.
