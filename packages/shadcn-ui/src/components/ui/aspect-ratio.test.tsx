import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AspectRatio } from '~/components/ui/aspect-ratio'

describe('AspectRatio', () => {
	it('renders with data-slot="aspect-ratio"', () => {
		render(
			<AspectRatio ratio={16 / 9}>
				<img alt="" src="/x.png" />
			</AspectRatio>
		)
		expect(document.querySelector('[data-slot="aspect-ratio"]')).toBeInTheDocument()
	})
})
