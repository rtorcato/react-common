---
"@rtorcato/react-common": minor
---

Add two React-specific hooks (#29):

- `useInterval(callback, delay)` — declarative `setInterval`; always calls the latest callback without resetting, and `delay: null` pauses it.
- `useEventListener(event, handler, target?)` — typed event listener with automatic cleanup; defaults to `window`, accepts a `Document`, `HTMLElement`, or ref; the handler is ref-stable so updating it never re-attaches.

Both are purely React (state/effect/lifecycle) and add no dependencies — the vanilla Web-API boundary stays in `@rtorcato/browser-common`.
