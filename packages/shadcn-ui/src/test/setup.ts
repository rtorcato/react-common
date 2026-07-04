import '@testing-library/jest-dom'
// Polyfills ResizeObserver / IntersectionObserver / matchMedia / pointer-capture
// for jsdom — Radix, cmdk, embla-carousel, react-day-picker all need them.
import '@rtorcato/js-tooling/vitest/jsdom-shims'

import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { afterEach, expect } from 'vitest'

expect.extend(matchers)

afterEach(() => {
	cleanup()
})
