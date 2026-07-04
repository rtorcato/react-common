import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ConfirmDialog } from '~/components/ui-extended/confirm-dialog'

describe('ConfirmDialog', () => {
	it('renders title and description when open', () => {
		render(
			<ConfirmDialog
				open
				onOpenChange={() => {}}
				title="Delete item?"
				description="This cannot be undone."
				onConfirm={() => {}}
			/>
		)
		expect(screen.getByText('Delete item?')).toBeInTheDocument()
		expect(screen.getByText('This cannot be undone.')).toBeInTheDocument()
	})

	it('uses default title when not provided', () => {
		render(<ConfirmDialog open onOpenChange={() => {}} onConfirm={() => {}} />)
		expect(screen.getByText('Are you sure?')).toBeInTheDocument()
	})

	it('renders custom confirm and cancel labels', () => {
		render(
			<ConfirmDialog
				open
				onOpenChange={() => {}}
				onConfirm={() => {}}
				confirmLabel="Yes, delete"
				cancelLabel="Keep it"
			/>
		)
		expect(screen.getByRole('button', { name: /yes, delete/i })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /keep it/i })).toBeInTheDocument()
	})

	it('calls onConfirm when the confirm button is clicked', async () => {
		const user = userEvent.setup()
		const onConfirm = vi.fn()
		render(<ConfirmDialog open onOpenChange={() => {}} onConfirm={onConfirm} />)

		await user.click(screen.getByRole('button', { name: /confirm/i }))

		expect(onConfirm).toHaveBeenCalledTimes(1)
	})

	it('calls onCancel and onOpenChange(false) when cancel is clicked', async () => {
		const user = userEvent.setup()
		const onCancel = vi.fn()
		const onOpenChange = vi.fn()
		render(
			<ConfirmDialog open onOpenChange={onOpenChange} onConfirm={() => {}} onCancel={onCancel} />
		)

		await user.click(screen.getByRole('button', { name: /cancel/i }))

		expect(onCancel).toHaveBeenCalledTimes(1)
		expect(onOpenChange).toHaveBeenCalledWith(false)
	})

	it('disables both buttons when loading', () => {
		render(<ConfirmDialog open onOpenChange={() => {}} onConfirm={() => {}} loading />)

		expect(screen.getByRole('button', { name: /confirm/i })).toBeDisabled()
		expect(screen.getByRole('button', { name: /cancel/i })).toBeDisabled()
	})
})
