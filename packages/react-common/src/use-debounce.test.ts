import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useDebounce } from '~/use-debounce'

describe('useDebounce', () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('returns the initial value synchronously', () => {
		const { result } = renderHook(({ value }) => useDebounce(value, 200), {
			initialProps: { value: 'a' },
		})
		expect(result.current).toBe('a')
	})

	it('does not update before the delay has elapsed', () => {
		const { result, rerender } = renderHook(({ value }) => useDebounce(value, 200), {
			initialProps: { value: 'a' },
		})

		rerender({ value: 'b' })
		act(() => {
			vi.advanceTimersByTime(199)
		})
		expect(result.current).toBe('a')
	})

	it('updates to the latest value after the delay elapses', () => {
		const { result, rerender } = renderHook(({ value }) => useDebounce(value, 200), {
			initialProps: { value: 'a' },
		})

		rerender({ value: 'b' })
		act(() => {
			vi.advanceTimersByTime(200)
		})
		expect(result.current).toBe('b')
	})

	it('coalesces rapid changes — only the last value is emitted', () => {
		const { result, rerender } = renderHook(({ value }) => useDebounce(value, 200), {
			initialProps: { value: 'a' },
		})

		rerender({ value: 'b' })
		act(() => {
			vi.advanceTimersByTime(100)
		})
		rerender({ value: 'c' })
		act(() => {
			vi.advanceTimersByTime(100)
		})
		// Still 'a' because the timer was reset when value changed to 'c'
		expect(result.current).toBe('a')

		act(() => {
			vi.advanceTimersByTime(100)
		})
		expect(result.current).toBe('c')
	})

	it('respects a changed delay value', () => {
		const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
			initialProps: { value: 'a', delay: 200 },
		})

		rerender({ value: 'b', delay: 50 })
		act(() => {
			vi.advanceTimersByTime(50)
		})
		expect(result.current).toBe('b')
	})
})
