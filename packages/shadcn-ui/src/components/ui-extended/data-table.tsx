'use client'

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from '@tanstack/react-table'
import { ChevronDownIcon, ChevronsUpDownIcon, ChevronUpIcon } from 'lucide-react'
import * as React from 'react'
import { Button } from '~/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '~/components/ui/table'
import { cn } from '~/lib/utils'

interface DataTableProps<TData> {
	columns: ColumnDef<TData>[]
	data: TData[]
	pageSize?: number
	className?: string
}

function DataTable<TData>({ columns, data, pageSize = 10, className }: DataTableProps<TData>) {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		onColumnVisibilityChange: setColumnVisibility,
		initialState: { pagination: { pageSize } },
		state: { sorting, columnVisibility },
	})

	const { pageIndex, pageSize: currentPageSize } = table.getState().pagination
	const totalRows = table.getFilteredRowModel().rows.length
	const from = totalRows === 0 ? 0 : pageIndex * currentPageSize + 1
	const to = Math.min((pageIndex + 1) * currentPageSize, totalRows)

	return (
		<div data-slot="data-table" className={cn('flex flex-col gap-4', className)}>
			<div className="flex justify-end">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="sm">
							Columns
							<ChevronDownIcon className="ms-2 size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((col) => col.getCanHide())
							.map((col) => (
								<DropdownMenuCheckboxItem
									key={col.id}
									checked={col.getIsVisible()}
									onCheckedChange={(value) => col.toggleVisibility(!!value)}
								>
									{col.id}
								</DropdownMenuCheckboxItem>
							))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder ? null : header.column.getCanSort() ? (
											<button
												type="button"
												onClick={header.column.getToggleSortingHandler()}
												className="flex items-center gap-1 hover:text-foreground"
											>
												{flexRender(header.column.columnDef.header, header.getContext())}
												{header.column.getIsSorted() === 'asc' ? (
													<ChevronUpIcon className="size-3.5" />
												) : header.column.getIsSorted() === 'desc' ? (
													<ChevronDownIcon className="size-3.5" />
												) : (
													<ChevronsUpDownIcon className="size-3.5 opacity-50" />
												)}
											</button>
										) : (
											flexRender(header.column.columnDef.header, header.getContext())
										)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.length > 0 ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-between text-sm text-muted-foreground">
				<span>{totalRows === 0 ? 'No results' : `${from}–${to} of ${totalRows}`}</span>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	)
}

export { DataTable }
export type { DataTableProps }
export type { ColumnDef } from '@tanstack/react-table'
