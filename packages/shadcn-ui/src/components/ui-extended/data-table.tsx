'use client'

import {
	type ColumnVisibilityState,
	columnVisibilityFeature,
	createPaginatedRowModel,
	createSortedRowModel,
	type RowData,
	rowPaginationFeature,
	rowSortingFeature,
	type SortingState,
	sortFn_alphanumeric,
	sortFn_basic,
	sortFn_datetime,
	sortFn_text,
	type ColumnDef as TanstackColumnDef,
	tableFeatures,
	useTable,
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

const dataTableFeatures = tableFeatures({
	columnVisibilityFeature,
	rowPaginationFeature,
	rowSortingFeature,
	paginatedRowModel: createPaginatedRowModel(),
	sortedRowModel: createSortedRowModel(),
	sortFns: {
		alphanumeric: sortFn_alphanumeric,
		basic: sortFn_basic,
		datetime: sortFn_datetime,
		text: sortFn_text,
	},
})

type DataTableFeatures = typeof dataTableFeatures

/** v8-shaped column def bound to DataTable's feature set. */
type ColumnDef<TData extends RowData, TValue = unknown> = TanstackColumnDef<
	DataTableFeatures,
	TData,
	TValue
>

interface DataTableProps<TData extends RowData> {
	columns: ColumnDef<TData>[]
	data: TData[]
	pageSize?: number
	className?: string
}

function DataTable<TData extends RowData>({
	columns,
	data,
	pageSize = 10,
	className,
}: DataTableProps<TData>) {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibilityState>({})

	const table = useTable({
		features: dataTableFeatures,
		data,
		columns,
		onSortingChange: setSorting,
		onColumnVisibilityChange: setColumnVisibility,
		initialState: { pagination: { pageIndex: 0, pageSize } },
		state: { sorting, columnVisibility },
	})

	const { pageIndex, pageSize: currentPageSize } = table.state.pagination
	const totalRows = table.getPrePaginatedRowModel().rows.length
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
												<table.FlexRender header={header} />
												{header.column.getIsSorted() === 'asc' ? (
													<ChevronUpIcon className="size-3.5" />
												) : header.column.getIsSorted() === 'desc' ? (
													<ChevronDownIcon className="size-3.5" />
												) : (
													<ChevronsUpDownIcon className="size-3.5 opacity-50" />
												)}
											</button>
										) : (
											<table.FlexRender header={header} />
										)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.length > 0 ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											<table.FlexRender cell={cell} />
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
export type { ColumnDef, DataTableFeatures }
