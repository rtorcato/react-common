import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from '~/components/ui/input-group'

describe('InputGroup', () => {
	it('renders with role="group" and data-slot="input-group"', () => {
		render(
			<InputGroup>
				<InputGroupAddon>@</InputGroupAddon>
				<InputGroupInput aria-label="username" />
			</InputGroup>
		)

		const group = document.querySelector('[data-slot="input-group"]')
		expect(group).toHaveAttribute('role', 'group')
		expect(document.querySelector('[data-slot="input-group-addon"]')).toHaveTextContent('@')
		expect(document.querySelector('[data-slot="input-group-control"]')).toBeInTheDocument()
	})
})
