import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button } from '~/components/ui/button'
import { ButtonGroup } from '~/components/ui/button-group'

describe('ButtonGroup', () => {
	it('renders with data-slot="button-group" and groups its children', () => {
		render(
			<ButtonGroup>
				<Button>Left</Button>
				<Button>Right</Button>
			</ButtonGroup>
		)

		expect(document.querySelector('[data-slot="button-group"]')).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Left' })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Right' })).toBeInTheDocument()
	})
})
