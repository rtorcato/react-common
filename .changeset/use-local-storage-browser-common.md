---
'@rtorcato/react-common': minor
---

`useLocalStorage` now delegates to `@rtorcato/browser-common/localstorage` (new dependency) instead of touching `window.localStorage` directly. It takes an optional `isValid` guard as a third argument so a stale or hand-edited entry is ignored, and returns a third tuple item that removes the entry and resets to the initial value. Without `isValid`, an entry that isn't valid JSON now comes back as its raw string (browser-common's behaviour) rather than falling back to the initial value.
