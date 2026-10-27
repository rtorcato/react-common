import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { CopyButton } from '~/components/ui-extended/copy-button'

let writeText = vi.fn()

function icon() {
	return document.querySelector('svg[data-state]')?.getAttribute('data-state')
}

describe('CopyButton', () => {
	beforeEach(() => {
		writeText = vi.fn().mockResolvedValue(undefined)
		Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('copies value on click and reports the result', async () => {
		const onCopy = vi.fn()
		render(<CopyButton value="npm i x" onCopy={onCopy} />)
		await userEvent.click(screen.getByRole('button', { name: 'Copy' }))
		expect(writeText).toHaveBeenCalledWith('npm i x')
		expect(onCopy).toHaveBeenCalledWith(true)
	})

	it('shows the copied state, keeps its aria-label, then returns to idle', async () => {
		vi.useFakeTimers({ shouldAdvanceTime: true })
		render(<CopyButton value="x" timeout={1000} />)
		expect(icon()).toBe('idle')
		await userEvent.click(screen.getByRole('button', { name: 'Copy' }))
		await waitFor(() => expect(icon()).toBe('copied'))
		expect(screen.getByRole('status')).toHaveTextContent('Copied')
		expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
		act(() => {
			vi.advanceTimersByTime(1000)
		})
		expect(icon()).toBe('idle')
		expect(screen.getByRole('status')).toHaveTextContent('')
	})

	it('shows the failed state when the copy is rejected', async () => {
		writeText.mockRejectedValue(new Error('denied'))
		const onCopy = vi.fn()
		render(<CopyButton value="x" onCopy={onCopy} />)
		await userEvent.click(screen.getByRole('button', { name: 'Copy' }))
		await waitFor(() => expect(icon()).toBe('failed'))
		expect(screen.getByRole('status')).toHaveTextContent("Couldn't copy")
		expect(onCopy).toHaveBeenCalledWith(false)
	})

	it('shows the result in the tooltip when icon-only', async () => {
		render(<CopyButton value="x" />)
		await userEvent.click(screen.getByRole('button', { name: 'Copy' }))
		await waitFor(() => expect(screen.getByRole('tooltip')).toHaveTextContent('Copied'))
	})

	it('renders no tooltip when disabled', async () => {
		render(<CopyButton value="x" disabled />)
		const button = screen.getByRole('button', { name: 'Copy' })
		expect(button).toBeDisabled()
		await userEvent.hover(button)
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
	})

	it('uses the visible text as the name with showLabel', async () => {
		render(<CopyButton value="x" showLabel />)
		const button = screen.getByRole('button', { name: 'Copy' })
		expect(button).not.toHaveAttribute('aria-label')
		await userEvent.click(button)
		expect(await screen.findByRole('button', { name: 'Copied' })).toBeInTheDocument()
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
	})
})
