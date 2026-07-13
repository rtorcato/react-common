import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { usePrevious } from '~/hooks/use-previous'

describe('usePrevious', () => {
	it('returns undefined on the first render', () => {
		const { result } = renderHook(() => usePrevious(0))
		expect(result.current).toBeUndefined()
	})

	it('returns the value from the previous render after updates', () => {
		const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
			initialProps: { value: 0 },
		})

		rerender({ value: 1 })
		expect(result.current).toBe(0)

		rerender({ value: 2 })
		expect(result.current).toBe(1)
	})
})
