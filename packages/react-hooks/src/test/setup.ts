import '@testing-library/jest-dom'
// Polyfills matchMedia / ResizeObserver / IntersectionObserver for jsdom —
// use-media-query and use-mobile read window.matchMedia.
import '@rtorcato/js-tooling/vitest/jsdom-shims'

import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { afterEach, expect } from 'vitest'

expect.extend(matchers)

afterEach(() => {
	cleanup()
})
