import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Skeleton } from '~/components/ui/skeleton'

describe('Skeleton', () => {
	it('renders a div with data-slot="skeleton"', () => {
		render(<Skeleton />)
		expect(document.querySelector('[data-slot="skeleton"]')).toBeInTheDocument()
	})

	it('merges a custom className', () => {
		render(<Skeleton className="custom-class" />)
		expect(document.querySelector('[data-slot="skeleton"]')).toHaveClass('custom-class')
	})
})
