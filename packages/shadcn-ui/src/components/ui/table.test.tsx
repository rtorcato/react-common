import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '~/components/ui/table'

describe('Table', () => {
	it('renders semantic table elements with their data-slot attributes', () => {
		render(
			<Table>
				<TableCaption>Numbers</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>Ada</TableCell>
					</TableRow>
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell>Total</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		)

		expect(document.querySelector('[data-slot="table-container"]')).toBeInTheDocument()
		expect(document.querySelector('[data-slot="table"]')?.tagName).toBe('TABLE')
		expect(document.querySelector('[data-slot="table-header"]')?.tagName).toBe('THEAD')
		expect(document.querySelector('[data-slot="table-body"]')?.tagName).toBe('TBODY')
		expect(document.querySelector('[data-slot="table-footer"]')?.tagName).toBe('TFOOT')
		expect(screen.getByText('Ada')).toBeInTheDocument()
	})
})
