import { act, render } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { useClickOutside } from '~/use-click-outside'

function Harness({ onOutside }: { onOutside: () => void }) {
	const ref = useClickOutside<HTMLDivElement>(onOutside)
	return React.createElement(
		'div',
		null,
		React.createElement(
			'div',
			{ ref, 'data-testid': 'inside' },
			React.createElement('button', { type: 'button', 'data-testid': 'inside-child' }, 'inside')
		),
		React.createElement('button', { type: 'button', 'data-testid': 'outside' }, 'outside')
	)
}

describe('useClickOutside', () => {
	it('fires the handler when a mousedown occurs outside the ref', () => {
		const handler = vi.fn()
		const { getByTestId } = render(React.createElement(Harness, { onOutside: handler }))

		act(() => {
			getByTestId('outside').dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
		})

		expect(handler).toHaveBeenCalledTimes(1)
	})

	it('fires the handler on touchstart outside the ref', () => {
		const handler = vi.fn()
		const { getByTestId } = render(React.createElement(Harness, { onOutside: handler }))

		act(() => {
			getByTestId('outside').dispatchEvent(new Event('touchstart', { bubbles: true }))
		})

		expect(handler).toHaveBeenCalledTimes(1)
	})

	it('does not fire when mousedown is inside the ref', () => {
		const handler = vi.fn()
		const { getByTestId } = render(React.createElement(Harness, { onOutside: handler }))

		act(() => {
			getByTestId('inside-child').dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
		})

		expect(handler).not.toHaveBeenCalled()
	})

	it('removes document listeners on unmount', () => {
		const handler = vi.fn()
		const removeSpy = vi.spyOn(document, 'removeEventListener')
		const { unmount } = render(React.createElement(Harness, { onOutside: handler }))

		unmount()

		const types = removeSpy.mock.calls.map((call) => call[0])
		expect(types).toContain('mousedown')
		expect(types).toContain('touchstart')

		removeSpy.mockRestore()
	})
})
