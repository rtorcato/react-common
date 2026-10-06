import '@testing-library/jest-dom'
// Polyfills matchMedia / ResizeObserver / IntersectionObserver for jsdom —
// use-media-query and use-mobile read window.matchMedia.
import '@rtorcato/repo-tooling/vitest/jsdom-shims'
