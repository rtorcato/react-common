import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useMediaQuery } from '~/use-media-query'

type ChangeListener = (event: MediaQueryListEvent) => void

function createMqlMock(matches: boolean) {
	const listeners: ChangeListener[] = []
	return {
		matches,
		media: '',
		onchange: null,
		addEventListener(_type: string, listener: ChangeListener) {
			listeners.push(listener)
		},
		removeEventListener(_type: string, listener: ChangeListener) {
			const idx = listeners.indexOf(listener)
			if (idx > -1) listeners.splice(idx, 1)
		},
		dispatchEvent() {
			return true
		},
		_fire(next: boolean) {
			this.matches = next
			for (const l of listeners) l({ matches: next } as MediaQueryListEvent)
		},
		_listenerCount() {
			return listeners.length
		},
	}
}

describe('useMediaQuery', () => {
	let mql: ReturnType<typeof createMqlMock>

	beforeEach(() => {
		mql = createMqlMock(false)
		vi.stubGlobal(
			'matchMedia',
			vi.fn(() => mql)
		)
	})

	afterEach(() => {
		vi.unstubAllGlobals()
	})

	it('reflects the initial matchMedia.matches value', () => {
		mql = createMqlMock(true)
		vi.stubGlobal(
			'matchMedia',
			vi.fn(() => mql)
		)
		const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
		expect(result.current).toBe(true)
	})

	it('updates when the matchMedia change event fires', () => {
		const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
		expect(result.current).toBe(false)

		act(() => {
			mql._fire(true)
		})

		expect(result.current).toBe(true)
	})

	it('removes the change listener on unmount', () => {
		const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'))
		expect(mql._listenerCount()).toBe(1)

		unmount()

		expect(mql._listenerCount()).toBe(0)
	})
})
