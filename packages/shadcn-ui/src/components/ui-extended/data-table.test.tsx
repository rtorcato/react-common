import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { type ColumnDef, DataTable } from '~/components/ui-extended/data-table'

interface Row {
	id: number
	name: string
	age: number
}

const rows: Row[] = [
	{ id: 1, name: 'Alice', age: 30 },
	{ id: 2, name: 'Bob', age: 25 },
	{ id: 3, name: 'Carol', age: 40 },
]

const columns: ColumnDef<Row>[] = [
	{ accessorKey: 'name', header: 'Name' },
	{ accessorKey: 'age', header: 'Age' },
]

describe('DataTable', () => {
	it('renders all headers and rows', () => {
		render(<DataTable columns={columns} data={rows} />)

		expect(screen.getByRole('columnheader', { name: /name/i })).toBeInTheDocument()
		expect(screen.getByRole('columnheader', { name: /age/i })).toBeInTheDocument()
		expect(screen.getByText('Alice')).toBeInTheDocument()
		expect(screen.getByText('Bob')).toBeInTheDocument()
		expect(screen.getByText('Carol')).toBeInTheDocument()
	})

	it('shows the row count summary', () => {
		render(<DataTable columns={columns} data={rows} />)
		expect(screen.getByText(/1–3 of 3/)).toBeInTheDocument()
	})

	it('shows "No results" when data is empty', () => {
		render(<DataTable columns={columns} data={[]} />)
		expect(screen.getByText(/no results\./i)).toBeInTheDocument()
		expect(screen.getByText('No results')).toBeInTheDocument()
	})

	it('paginates with Next / Previous buttons', async () => {
		const user = userEvent.setup()
		render(<DataTable columns={columns} data={rows} pageSize={2} />)

		// Page 1 shows Alice and Bob
		expect(screen.getByText('Alice')).toBeInTheDocument()
		expect(screen.getByText('Bob')).toBeInTheDocument()
		expect(screen.queryByText('Carol')).not.toBeInTheDocument()
		expect(screen.getByText(/1–2 of 3/)).toBeInTheDocument()

		// Previous is disabled, Next enabled
		expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled()
		await user.click(screen.getByRole('button', { name: /next/i }))

		// Page 2 shows Carol
		expect(screen.queryByText('Alice')).not.toBeInTheDocument()
		expect(screen.getByText('Carol')).toBeInTheDocument()
		expect(screen.getByText(/3–3 of 3/)).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()

		// Go back
		await user.click(screen.getByRole('button', { name: /previous/i }))
		expect(screen.getByText('Alice')).toBeInTheDocument()
	})

	it('sorts a column when its header button is clicked', async () => {
		const user = userEvent.setup()
		const sortableColumns: ColumnDef<Row>[] = [
			{ accessorKey: 'name', header: 'Name', enableSorting: true },
			{ accessorKey: 'age', header: 'Age', enableSorting: true },
		]
		render(<DataTable columns={sortableColumns} data={rows} />)

		const nameHeader = screen.getByRole('columnheader', { name: /name/i })
		const sortButton = within(nameHeader).getByRole('button')

		// First click → ascending; rows should be Alice, Bob, Carol (already sorted in this case)
		await user.click(sortButton)
		let nameCells = screen
			.getAllByRole('cell')
			.filter((c) => /Alice|Bob|Carol/.test(c.textContent ?? ''))
		expect(nameCells[0]).toHaveTextContent('Alice')

		// Second click → descending; rows reverse to Carol, Bob, Alice
		await user.click(sortButton)
		nameCells = screen
			.getAllByRole('cell')
			.filter((c) => /Alice|Bob|Carol/.test(c.textContent ?? ''))
		expect(nameCells[0]).toHaveTextContent('Carol')
		expect(nameCells[nameCells.length - 1]).toHaveTextContent('Alice')
	})

	it('renders the Columns visibility trigger', () => {
		render(<DataTable columns={columns} data={rows} />)
		expect(screen.getByRole('button', { name: /columns/i })).toBeInTheDocument()
	})
})
