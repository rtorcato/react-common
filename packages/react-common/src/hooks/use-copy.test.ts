import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useCopy } from '~/hooks/use-copy'

const writeText = vi.fn()

describe('useCopy', () => {
	beforeEach(() => {
		vi.useFakeTimers()
		writeText.mockReset().mockResolvedValue(undefined)
		Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('copies, sets copied, then resets after the timeout', async () => {
		const { result } = renderHook(() => useCopy(1000))
		expect(result.current.copied).toBe(false)

		let ok = false
		await act(async () => {
			ok = await result.current.copy('hello')
		})
		expect(ok).toBe(true)
		expect(writeText).toHaveBeenCalledWith('hello')
		expect(result.current.copied).toBe(true)

		act(() => {
			vi.advanceTimersByTime(1000)
		})
		expect(result.current.copied).toBe(false)
	})

	it('restarts the timer when copying again', async () => {
		const { result } = renderHook(() => useCopy(1000))
		await act(async () => {
			await result.current.copy('a')
		})
		act(() => {
			vi.advanceTimersByTime(600)
		})
		await act(async () => {
			await result.current.copy('b')
		})
		act(() => {
			vi.advanceTimersByTime(600)
		})
		expect(result.current.copied).toBe(true)
		act(() => {
			vi.advanceTimersByTime(400)
		})
		expect(result.current.copied).toBe(false)
	})

	it('stays false and resolves false when the copy fails', async () => {
		writeText.mockRejectedValue(new Error('denied'))
		const { result } = renderHook(() => useCopy())
		let ok = true
		await act(async () => {
			ok = await result.current.copy('x')
		})
		expect(ok).toBe(false)
		expect(result.current.copied).toBe(false)
	})
})
