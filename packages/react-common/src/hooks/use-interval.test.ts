import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useInterval } from '~/hooks/use-interval'

describe('useInterval', () => {
	beforeEach(() => vi.useFakeTimers())
	afterEach(() => vi.useRealTimers())

	it('calls the callback every delay ms', () => {
		const cb = vi.fn()
		renderHook(() => useInterval(cb, 100))
		expect(cb).not.toHaveBeenCalled()
		act(() => vi.advanceTimersByTime(250))
		expect(cb).toHaveBeenCalledTimes(2)
	})

	it('does not run when delay is null', () => {
		const cb = vi.fn()
		renderHook(() => useInterval(cb, null))
		act(() => vi.advanceTimersByTime(1000))
		expect(cb).not.toHaveBeenCalled()
	})

	it('always calls the latest callback without resetting the timer', () => {
		const first = vi.fn()
		const second = vi.fn()
		const { rerender } = renderHook(({ cb }) => useInterval(cb, 100), {
			initialProps: { cb: first },
		})
		rerender({ cb: second })
		act(() => vi.advanceTimersByTime(100))
		expect(first).not.toHaveBeenCalled()
		expect(second).toHaveBeenCalledTimes(1)
	})

	it('stops after unmount', () => {
		const cb = vi.fn()
		const { unmount } = renderHook(() => useInterval(cb, 100))
		unmount()
		act(() => vi.advanceTimersByTime(500))
		expect(cb).not.toHaveBeenCalled()
	})
})
