import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Separator } from '~/components/ui/separator'

describe('Separator', () => {
	it('renders with data-slot="separator" and default horizontal orientation', () => {
		render(<Separator />)
		const sep = document.querySelector('[data-slot="separator"]')
		expect(sep).toBeInTheDocument()
		expect(sep).toHaveAttribute('data-orientation', 'horizontal')
	})

	it('renders vertical orientation when specified', () => {
		render(<Separator orientation="vertical" />)
		expect(document.querySelector('[data-slot="separator"]')).toHaveAttribute(
			'data-orientation',
			'vertical'
		)
	})
})
