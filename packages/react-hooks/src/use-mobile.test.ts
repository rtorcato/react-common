import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useIsMobile } from '~/use-mobile'

// ---------------------------------------------------------------------------
// matchMedia mock
// ---------------------------------------------------------------------------
type MatchMediaListener = (event: MediaQueryListEvent) => void

function createMatchMediaMock(matches: boolean) {
	const listeners: MatchMediaListener[] = []

	const mql = {
		matches,
		media: '',
		onchange: null,
		addEventListenerCalls: [] as { type: string; listener: MatchMediaListener }[],
		addEventListener(type: string, listener: MatchMediaListener) {
			listeners.push(listener)
			this.addEventListenerCalls.push({ type, listener })
		},
		removeEventListener(_type: string, listener: MatchMediaListener) {
			const idx = listeners.indexOf(listener)
			if (idx > -1) listeners.splice(idx, 1)
		},
		dispatchEvent(_event: Event) {
			return true
		},
		// Helper to fire the change event
		_fire() {
			const event = {} as MediaQueryListEvent
			listeners.forEach((l) => {
				l(event)
			})
		},
	}

	return mql
}

describe('useIsMobile', () => {
	let mqlMock: ReturnType<typeof createMatchMediaMock>

	beforeEach(() => {
		mqlMock = createMatchMediaMock(false)
		vi.stubGlobal(
			'matchMedia',
			vi.fn(() => mqlMock)
		)
	})

	afterEach(() => {
		vi.unstubAllGlobals()
	})

	it('returns false when window.innerWidth >= 768', () => {
		vi.stubGlobal('innerWidth', 1024)
		const { result } = renderHook(() => useIsMobile())
		expect(result.current).toBe(false)
	})

	it('returns true when window.innerWidth < 768', () => {
		vi.stubGlobal('innerWidth', 375)
		const { result } = renderHook(() => useIsMobile())
		expect(result.current).toBe(true)
	})

	it('updates when matchMedia fires a change event (narrow → wide)', () => {
		// Start narrow
		vi.stubGlobal('innerWidth', 375)
		const { result } = renderHook(() => useIsMobile())
		expect(result.current).toBe(true)

		// Simulate resize to desktop
		act(() => {
			vi.stubGlobal('innerWidth', 1280)
			mqlMock._fire()
		})

		expect(result.current).toBe(false)
	})

	it('updates when matchMedia fires a change event (wide → narrow)', () => {
		// Start wide
		vi.stubGlobal('innerWidth', 1280)
		const { result } = renderHook(() => useIsMobile())
		expect(result.current).toBe(false)

		// Simulate resize to mobile
		act(() => {
			vi.stubGlobal('innerWidth', 375)
			mqlMock._fire()
		})

		expect(result.current).toBe(true)
	})
})
