import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '~/components/ui/button'

describe('Button', () => {
	it('renders children', () => {
		render(<Button>Click me</Button>)
		expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
	})

	it('applies data-slot="button"', () => {
		render(<Button>Label</Button>)
		expect(screen.getByRole('button')).toHaveAttribute('data-slot', 'button')
	})

	it('applies default data-variant and data-size attributes', () => {
		render(<Button>Label</Button>)
		const btn = screen.getByRole('button')
		expect(btn).toHaveAttribute('data-variant', 'default')
		expect(btn).toHaveAttribute('data-size', 'default')
	})

	it('applies specified data-variant and data-size attributes', () => {
		render(
			<Button variant="destructive" size="lg">
				Label
			</Button>
		)
		const btn = screen.getByRole('button')
		expect(btn).toHaveAttribute('data-variant', 'destructive')
		expect(btn).toHaveAttribute('data-size', 'lg')
	})

	it('disables the button when disabled prop is set', () => {
		render(<Button disabled>Label</Button>)
		expect(screen.getByRole('button')).toBeDisabled()
	})

	it('calls onClick handler when clicked', async () => {
		const user = userEvent.setup()
		const handleClick = vi.fn()
		render(<Button onClick={handleClick}>Click me</Button>)
		await user.click(screen.getByRole('button'))
		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	it('renders child element instead of <button> when asChild is true', () => {
		render(
			<Button asChild>
				<a href="/home">Home</a>
			</Button>
		)
		const link = screen.getByRole('link', { name: 'Home' })
		expect(link).toBeInTheDocument()
		expect(link).toHaveAttribute('href', '/home')
		expect(link).toHaveAttribute('data-slot', 'button')
		expect(screen.queryByRole('button')).not.toBeInTheDocument()
	})
})
