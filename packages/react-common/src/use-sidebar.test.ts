import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useSidebar } from '~/use-sidebar'

describe('useSidebar', () => {
	it('initial state: open is true', () => {
		const { result } = renderHook(() => useSidebar())
		expect(result.current.open).toBe(true)
	})

	it('onOpenChange(false) sets open to false', () => {
		const { result } = renderHook(() => useSidebar())

		act(() => {
			result.current.onOpenChange(false)
		})

		expect(result.current.open).toBe(false)
	})

	it('onOpenChange(true) sets open back to true', () => {
		const { result } = renderHook(() => useSidebar())

		act(() => {
			result.current.onOpenChange(false)
		})
		expect(result.current.open).toBe(false)

		act(() => {
			result.current.onOpenChange(true)
		})
		expect(result.current.open).toBe(true)
	})
})
