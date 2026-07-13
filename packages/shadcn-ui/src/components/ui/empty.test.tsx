import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from '~/components/ui/empty'

describe('Empty', () => {
	it('renders all sub-components with their data-slots', () => {
		render(
			<Empty>
				<EmptyHeader>
					<EmptyTitle>Nothing here</EmptyTitle>
					<EmptyDescription>Add some items to get started.</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>action</EmptyContent>
			</Empty>
		)

		expect(document.querySelector('[data-slot="empty"]')).toBeInTheDocument()
		expect(document.querySelector('[data-slot="empty-header"]')).toBeInTheDocument()
		expect(document.querySelector('[data-slot="empty-title"]')).toHaveTextContent(
			'Nothing here'
		)
		expect(document.querySelector('[data-slot="empty-description"]')).toHaveTextContent(
			'Add some items to get started.'
		)
		expect(document.querySelector('[data-slot="empty-content"]')).toHaveTextContent('action')
	})
})
