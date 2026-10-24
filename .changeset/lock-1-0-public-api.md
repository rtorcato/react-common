---
'@rtorcato/react-common': major
'@rtorcato/shadcn-ui': major
---

Lock the 1.0 public API by removing two dead exports (breaking).

- `@rtorcato/shadcn-ui`: remove `useToast` and the whole `./hooks` subpath. It reimplemented a toast store that nothing rendered; the `sonner` component has its own store. Replace with `import { toast } from 'sonner'`.
- `@rtorcato/react-common`: remove `useSidebar`. Replace with `useToggle`.
