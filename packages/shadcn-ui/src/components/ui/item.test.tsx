import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from '~/components/ui/item'

describe('Item', () => {
	it('renders the group + item with their data-slot attributes', () => {
		render(
			<ItemGroup>
				<Item>
					<ItemContent>
						<ItemTitle>Project</ItemTitle>
						<ItemDescription>Description</ItemDescription>
					</ItemContent>
					<ItemActions>actions</ItemActions>
				</Item>
			</ItemGroup>
		)

		expect(document.querySelector('[data-slot="item-group"]')).toBeInTheDocument()
		expect(document.querySelector('[data-slot="item"]')).toBeInTheDocument()
		expect(document.querySelector('[data-slot="item-content"]')).toBeInTheDocument()
		expect(document.querySelector('[data-slot="item-title"]')).toHaveTextContent('Project')
		expect(document.querySelector('[data-slot="item-description"]')).toHaveTextContent(
			'Description'
		)
		expect(document.querySelector('[data-slot="item-actions"]')).toHaveTextContent('actions')
	})
})
