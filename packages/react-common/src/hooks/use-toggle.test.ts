import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useToggle } from '~/hooks/use-toggle'

describe('useToggle', () => {
	it('defaults to false', () => {
		const { result } = renderHook(() => useToggle())
		expect(result.current.value).toBe(false)
	})

	it('respects the initial value', () => {
		const { result } = renderHook(() => useToggle(true))
		expect(result.current.value).toBe(true)
	})

	it('toggle() flips the value', () => {
		const { result } = renderHook(() => useToggle())
		act(() => result.current.toggle())
		expect(result.current.value).toBe(true)
		act(() => result.current.toggle())
		expect(result.current.value).toBe(false)
	})

	it('toggle(next) sets the value explicitly', () => {
		const { result } = renderHook(() => useToggle())
		act(() => result.current.toggle(true))
		expect(result.current.value).toBe(true)
		act(() => result.current.toggle(true))
		expect(result.current.value).toBe(true)
	})

	it('setOn / setOff force the value', () => {
		const { result } = renderHook(() => useToggle(true))
		act(() => result.current.setOff())
		expect(result.current.value).toBe(false)
		act(() => result.current.setOn())
		expect(result.current.value).toBe(true)
	})
})
