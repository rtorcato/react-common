import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '~/components/ui/carousel'

describe('Carousel', () => {
	it('renders root, content, items, and prev/next controls', () => {
		render(
			<Carousel>
				<CarouselContent>
					<CarouselItem>one</CarouselItem>
					<CarouselItem>two</CarouselItem>
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		)

		expect(document.querySelector('[data-slot="carousel"]')).toBeInTheDocument()
		expect(document.querySelector('[data-slot="carousel-content"]')).toBeInTheDocument()
		expect(document.querySelectorAll('[data-slot="carousel-item"]')).toHaveLength(2)
		expect(document.querySelector('[data-slot="carousel-previous"]')).toBeInTheDocument()
		expect(document.querySelector('[data-slot="carousel-next"]')).toBeInTheDocument()
	})
})
