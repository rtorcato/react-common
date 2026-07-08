import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Slider } from '~/components/ui/slider'

describe('Slider', () => {
	it('renders with data-slot="slider" and a thumb', () => {
		render(<Slider defaultValue={[50]} max={100} aria-label="volume" />)
		expect(document.querySelector('[data-slot="slider"]')).toBeInTheDocument()
		expect(document.querySelector('[data-slot="slider-thumb"]')).toBeInTheDocument()
	})

	it('exposes the slider role and the current value', () => {
		render(<Slider defaultValue={[42]} max={100} aria-label="volume" />)
		const slider = screen.getByRole('slider')
		expect(slider).toHaveAttribute('aria-valuenow', '42')
	})
})
