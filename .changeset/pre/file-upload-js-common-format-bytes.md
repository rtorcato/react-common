---
'@rtorcato/shadcn-ui': patch
---

`FileUpload` now formats sizes with `formatBytes` from `@rtorcato/js-common` (new dependency) instead of an inline copy. Sizes of 1 GB and above now show in GB rather than as a large MB figure, and whole values drop the trailing `.0` (e.g. `1 KB`, not `1.0 KB`).
