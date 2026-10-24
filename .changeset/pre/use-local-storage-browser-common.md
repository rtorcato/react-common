---
'@rtorcato/react-common': minor
---

`useLocalStorage` now delegates to `@rtorcato/browser-common/localstorage` (new dependency) instead of touching `window.localStorage` directly. It takes an optional `isValid` guard as a third argument so a stale or hand-edited entry is ignored, and returns a third tuple item that removes the entry and resets to the initial value. Without `isValid`, a stored value whose type does not match `initialValue` (e.g. the raw string browser-common returns for invalid JSON) is ignored, as before; the check is skipped when `initialValue` is `null`.
