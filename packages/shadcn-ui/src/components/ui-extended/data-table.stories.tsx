import type { Meta, StoryObj } from '@storybook/react-vite'

import { type ColumnDef, DataTable } from '~/components/ui-extended/data-table'

interface User {
	id: number
	name: string
	email: string
	role: string
}

const users: User[] = [
	{ id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'Admin' },
	{ id: 2, name: 'Alan Turing', email: 'alan@example.com', role: 'Engineer' },
	{ id: 3, name: 'Grace Hopper', email: 'grace@example.com', role: 'Engineer' },
	{ id: 4, name: 'Linus Torvalds', email: 'linus@example.com', role: 'Maintainer' },
	{ id: 5, name: 'Tim Berners-Lee', email: 'tim@example.com', role: 'Architect' },
]

const columns: ColumnDef<User>[] = [
	{ accessorKey: 'name', header: 'Name', enableSorting: true },
	{ accessorKey: 'email', header: 'Email' },
	{ accessorKey: 'role', header: 'Role', enableSorting: true },
]

// DataTable is generic over TData; pin it to User here so the stories typecheck.
const UserDataTable = DataTable as typeof DataTable<User>

const meta: Meta<typeof UserDataTable> = {
	title: 'ui-extended/DataTable',
	component: UserDataTable,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof UserDataTable>

export const Default: Story = {
	args: { columns, data: users, pageSize: 5 },
}

export const Paginated: Story = {
	args: { columns, data: users, pageSize: 2 },
}

export const Empty: Story = {
	args: { columns, data: [], pageSize: 5 },
}
