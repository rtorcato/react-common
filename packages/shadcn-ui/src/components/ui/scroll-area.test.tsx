import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area'

describe('ScrollArea', () => {
	it('renders the root + viewport with data-slot attributes', () => {
		render(
			<ScrollArea className="h-32">
				<div>tall content</div>
				<ScrollBar orientation="vertical" />
			</ScrollArea>
		)

		expect(document.querySelector('[data-slot="scroll-area"]')).toBeInTheDocument()
		expect(document.querySelector('[data-slot="scroll-area-viewport"]')).toBeInTheDocument()
	})
})
