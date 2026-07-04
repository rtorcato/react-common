import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
	it('renders the text prop', () => {
		render(<MyComponent text="Hello, World!" />)
		expect(screen.getByText('Hello, World!')).toBeDefined()
	})

	it('renders with different text', () => {
		render(<MyComponent text="Testing is fun!" />)
		expect(screen.getByText('Testing is fun!')).toBeDefined()
	})
})
