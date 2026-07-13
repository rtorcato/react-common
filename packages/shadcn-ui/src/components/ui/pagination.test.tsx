import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '~/components/ui/pagination'

describe('Pagination', () => {
	it('renders the nav with data-slot="pagination"', () => {
		render(
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationLink href="#1">1</PaginationLink>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		)
		const nav = screen.getByRole('navigation')
		expect(nav).toHaveAttribute('data-slot', 'pagination')
	})

	it('renders next/previous/ellipsis items', () => {
		render(
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href="#" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#1" isActive>
							1
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
					<PaginationItem>
						<PaginationNext href="#" />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		)
		expect(screen.getByLabelText(/go to previous/i)).toBeInTheDocument()
		expect(screen.getByLabelText(/go to next/i)).toBeInTheDocument()
		expect(document.querySelector('[data-slot="pagination-ellipsis"]')).toBeInTheDocument()
		// Active link has aria-current="page"
		expect(screen.getByText('1')).toHaveAttribute('aria-current', 'page')
	})
})
