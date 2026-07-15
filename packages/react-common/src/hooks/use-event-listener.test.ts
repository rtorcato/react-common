import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useEventListener } from '~/hooks/use-event-listener'

describe('useEventListener', () => {
	it('listens on window by default', () => {
		const handler = vi.fn()
		renderHook(() => useEventListener('resize', handler))
		act(() => window.dispatchEvent(new Event('resize')))
		expect(handler).toHaveBeenCalledTimes(1)
	})

	it('listens on a ref element', () => {
		const el = document.createElement('div')
		const ref = { current: el }
		const handler = vi.fn()
		renderHook(() => useEventListener('click', handler, ref))
		act(() => el.dispatchEvent(new MouseEvent('click')))
		expect(handler).toHaveBeenCalledTimes(1)
	})

	it('removes the listener on unmount', () => {
		const handler = vi.fn()
		const { unmount } = renderHook(() => useEventListener('resize', handler))
		unmount()
		act(() => window.dispatchEvent(new Event('resize')))
		expect(handler).not.toHaveBeenCalled()
	})

	it('uses the latest handler without re-subscribing', () => {
		const first = vi.fn()
		const second = vi.fn()
		const { rerender } = renderHook(
			({ h }: { h: (e: Event) => void }) => useEventListener('resize', h),
			{
				initialProps: { h: first as (e: Event) => void },
			}
		)
		rerender({ h: second })
		act(() => window.dispatchEvent(new Event('resize')))
		expect(first).not.toHaveBeenCalled()
		expect(second).toHaveBeenCalledTimes(1)
	})
})
