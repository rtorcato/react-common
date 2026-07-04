import type { Meta, StoryObj } from '@storybook/react-vite'

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '~/components/ui/table'

const meta: Meta<typeof Table> = {
	title: 'ui/Table',
	component: Table,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table>

const invoices = [
	{ invoice: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
	{ invoice: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
	{ invoice: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
]

export const Default: Story = {
	render: () => (
		<Table className="w-[520px]">
			<TableCaption>A list of your recent invoices.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Invoice</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Method</TableHead>
					<TableHead className="text-right">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{invoices.map((invoice) => (
					<TableRow key={invoice.invoice}>
						<TableCell className="font-medium">{invoice.invoice}</TableCell>
						<TableCell>{invoice.status}</TableCell>
						<TableCell>{invoice.method}</TableCell>
						<TableCell className="text-right">{invoice.amount}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	),
}
