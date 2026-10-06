---
'@rtorcato/shadcn-ui': patch
---

Declare `class-variance-authority` as a runtime dependency. It is imported by
shipped code (`Button`, `Badge`, `Alert`, and others) but was only listed in
`devDependencies`, so under pnpm's isolated `node_modules` consumers hit
`Module not found: Can't resolve 'class-variance-authority'`.
