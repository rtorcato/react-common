import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Spinner } from '~/components/ui/spinner'

describe('Spinner', () => {
	it('renders with role="status" and accessible label', () => {
		render(<Spinner />)
		expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument()
	})

	it('merges a custom className', () => {
		render(<Spinner className="custom-class" />)
		expect(screen.getByRole('status')).toHaveClass('custom-class')
	})
})
