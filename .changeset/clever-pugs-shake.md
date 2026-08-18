---
'@rtorcato/shadcn-ui': patch
---

Delete the dead Tailwind v3 `tailwind.config.ts` and wire the radius scale into `@theme inline`.

The JS config was never loaded — the package is Tailwind v4 CSS-first with no `@config` directive — and it was excluded from the published tarball. `@theme inline` in `globals.css` now declares `--radius-sm/md/lg/xl` derived from `--radius`, so `rounded-sm/md/lg/xl` track the `--radius` override instead of falling back to Tailwind's defaults. At the default `--radius: 0.5rem` the emitted values are unchanged.
