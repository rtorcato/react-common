import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { describe, expect, it } from 'vitest'

import { Button } from '~/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'

// ---------------------------------------------------------------------------
// Helper: a form wired up with react-hook-form
// ---------------------------------------------------------------------------
type FormValues = { username: string }

function TestForm({ required = false }: { required?: boolean }) {
	const form = useForm<FormValues>({
		defaultValues: { username: '' },
	})

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(() => {
					/* no-op */
				})}
			>
				<FormField
					control={form.control}
					name="username"
					rules={required ? { required: 'Username is required' } : undefined}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="Enter username" {...field} />
							</FormControl>
							<FormDescription>Your display name.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}

describe('Form sub-components', () => {
	it('FormItem renders with data-slot="form-item"', () => {
		render(<TestForm />)
		const item = document.querySelector('[data-slot="form-item"]')
		expect(item).toBeInTheDocument()
	})

	it('FormDescription renders with data-slot="form-description"', () => {
		render(<TestForm />)
		const desc = document.querySelector('[data-slot="form-description"]')
		expect(desc).toBeInTheDocument()
		expect(desc).toHaveTextContent('Your display name.')
	})

	it('FormMessage renders an error message when the field has a validation error', async () => {
		const user = userEvent.setup()
		render(<TestForm required />)

		// Submit without filling in the field to trigger validation
		await user.click(screen.getByRole('button', { name: 'Submit' }))

		await waitFor(() => {
			expect(screen.getByText('Username is required')).toBeInTheDocument()
		})

		const msg = document.querySelector('[data-slot="form-message"]')
		expect(msg).toBeInTheDocument()
		expect(msg).toHaveTextContent('Username is required')
	})

	it('FormLabel has data-error="true" when the field has an error', async () => {
		const user = userEvent.setup()
		render(<TestForm required />)

		await user.click(screen.getByRole('button', { name: 'Submit' }))

		await waitFor(() => {
			const label = document.querySelector('[data-slot="form-label"]')
			expect(label).toHaveAttribute('data-error', 'true')
		})
	})

	it('FormLabel has data-error="false" when there is no error', () => {
		render(<TestForm />)
		const label = document.querySelector('[data-slot="form-label"]')
		expect(label).toHaveAttribute('data-error', 'false')
	})
})
