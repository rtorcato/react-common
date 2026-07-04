import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'

describe('Alert', () => {
	it('renders with role="alert" and data-slot="alert"', () => {
		render(<Alert>body</Alert>)
		const root = screen.getByRole('alert')
		expect(root).toHaveAttribute('data-slot', 'alert')
	})

	it('renders sub-components with their data-slot attributes', () => {
		render(
			<Alert>
				<AlertTitle>Title</AlertTitle>
				<AlertDescription>Description</AlertDescription>
			</Alert>
		)
		expect(document.querySelector('[data-slot="alert-title"]')).toHaveTextContent('Title')
		expect(document.querySelector('[data-slot="alert-description"]')).toHaveTextContent(
			'Description'
		)
	})

	it('merges a custom className', () => {
		render(<Alert className="custom-class">body</Alert>)
		expect(screen.getByRole('alert')).toHaveClass('custom-class')
	})
})
