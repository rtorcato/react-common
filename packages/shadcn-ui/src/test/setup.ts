import '@testing-library/jest-dom'
// Polyfills ResizeObserver / IntersectionObserver / matchMedia / pointer-capture
// for jsdom — Radix, cmdk, embla-carousel, react-day-picker all need them.
import '@rtorcato/repo-tooling/vitest/jsdom-shims'
