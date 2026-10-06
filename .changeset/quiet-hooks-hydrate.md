---
'@rtorcato/react-common': patch
---

`useLocalStorage` no longer reads `localStorage` during render. It now returns
`initialValue` on the first render and loads the stored value in an effect, so
server and client markup match and SSR apps no longer get a hydration mismatch.
The stored value shows up one commit after mount.
