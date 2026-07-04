import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from '~/components/ui/field'

describe('Field', () => {
	it('renders the fieldset + field + label + description with data-slots', () => {
		render(
			<FieldSet>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="email">Email</FieldLabel>
						<input id="email" />
						<FieldDescription>We'll never share it.</FieldDescription>
					</Field>
				</FieldGroup>
			</FieldSet>
		)

		expect(document.querySelector('[data-slot="field-set"]')?.tagName).toBe('FIELDSET')
		expect(document.querySelector('[data-slot="field-group"]')).toBeInTheDocument()
		expect(document.querySelector('[data-slot="field"]')).toBeInTheDocument()
		expect(document.querySelector('[data-slot="field-label"]')).toHaveTextContent('Email')
		expect(document.querySelector('[data-slot="field-description"]')).toHaveTextContent(
			"We'll never share it."
		)
	})
})
