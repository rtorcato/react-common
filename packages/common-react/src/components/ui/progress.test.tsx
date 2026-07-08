import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Progress } from '~/components/ui/progress'

describe('Progress', () => {
	it('renders with data-slot="progress"', () => {
		render(<Progress value={42} />)
		expect(document.querySelector('[data-slot="progress"]')).toBeInTheDocument()
	})

	it('translates the indicator based on value', () => {
		render(<Progress value={75} />)
		const indicator = document.querySelector(
			'[data-slot="progress-indicator"]'
		) as HTMLElement
		expect(indicator?.style.transform).toBe('translateX(-25%)')
	})

	it('handles missing value (falls back to 0)', () => {
		render(<Progress />)
		const indicator = document.querySelector(
			'[data-slot="progress-indicator"]'
		) as HTMLElement
		expect(indicator?.style.transform).toBe('translateX(-100%)')
	})
})
