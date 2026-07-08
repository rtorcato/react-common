import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { FileUpload } from '~/components/ui-extended/file-upload'

function makeFile(name: string, size = 100, type = 'text/plain') {
	const file = new File(['x'.repeat(size)], name, { type })
	// jsdom honours the constructor size for File.size, but be explicit
	Object.defineProperty(file, 'size', { value: size })
	return file
}

function getHiddenInput(container: HTMLElement): HTMLInputElement {
	const input = container.querySelector('input[type="file"]') as HTMLInputElement | null
	if (!input) throw new Error('file input not found')
	return input
}

describe('FileUpload', () => {
	it('renders the drop zone instructions', () => {
		render(<FileUpload />)
		expect(screen.getByText(/click to upload/i)).toBeInTheDocument()
	})

	it('calls onFilesChange and lists the selected file when a single file is picked', async () => {
		const user = userEvent.setup()
		const onFilesChange = vi.fn()
		const { container } = render(<FileUpload onFilesChange={onFilesChange} />)

		const file = makeFile('hello.txt')
		await user.upload(getHiddenInput(container), file)

		expect(onFilesChange).toHaveBeenCalledTimes(1)
		const firstCall = onFilesChange.mock.calls[0] as [File[]]
		expect(firstCall[0]).toHaveLength(1)
		expect(screen.getByText('hello.txt')).toBeInTheDocument()
	})

	it('keeps only the latest file when multiple=false', async () => {
		const user = userEvent.setup()
		const onFilesChange = vi.fn()
		const { container } = render(<FileUpload onFilesChange={onFilesChange} />)
		const input = getHiddenInput(container)

		await user.upload(input, makeFile('first.txt'))
		await user.upload(input, makeFile('second.txt'))

		// Last call should contain exactly one file: second.txt
		const lastFiles = onFilesChange.mock.calls.at(-1)?.[0] as File[]
		expect(lastFiles).toHaveLength(1)
		expect(lastFiles[0]?.name).toBe('second.txt')
		expect(screen.queryByText('first.txt')).not.toBeInTheDocument()
		expect(screen.getByText('second.txt')).toBeInTheDocument()
	})

	it('accumulates files when multiple=true', async () => {
		const user = userEvent.setup()
		const onFilesChange = vi.fn()
		const { container } = render(<FileUpload multiple onFilesChange={onFilesChange} />)
		const input = getHiddenInput(container)

		await user.upload(input, makeFile('a.txt'))
		await user.upload(input, makeFile('b.txt'))

		const lastFiles = onFilesChange.mock.calls.at(-1)?.[0] as File[]
		expect(lastFiles.map((f) => f.name)).toEqual(['a.txt', 'b.txt'])
		expect(screen.getByText('a.txt')).toBeInTheDocument()
		expect(screen.getByText('b.txt')).toBeInTheDocument()
	})

	it('removes a file when its remove button is clicked', async () => {
		const user = userEvent.setup()
		const onFilesChange = vi.fn()
		const { container } = render(<FileUpload onFilesChange={onFilesChange} />)

		await user.upload(getHiddenInput(container), makeFile('doomed.txt'))
		expect(screen.getByText('doomed.txt')).toBeInTheDocument()

		await user.click(screen.getByRole('button', { name: /remove doomed\.txt/i }))

		expect(screen.queryByText('doomed.txt')).not.toBeInTheDocument()
		const lastFiles = onFilesChange.mock.calls.at(-1)?.[0] as File[]
		expect(lastFiles).toHaveLength(0)
	})

	it('shows an error and rejects files exceeding maxSize', async () => {
		const user = userEvent.setup()
		const onFilesChange = vi.fn()
		const { container } = render(<FileUpload maxSize={50} onFilesChange={onFilesChange} />)

		await user.upload(getHiddenInput(container), makeFile('big.txt', 200))

		expect(screen.getByText(/exceeds the.*limit/i)).toBeInTheDocument()
		// The over-sized file should not be listed
		expect(screen.queryByText('big.txt')).not.toBeInTheDocument()
	})

	it('disables interaction when disabled=true', () => {
		const { container } = render(<FileUpload disabled />)
		const dropZone = screen.getByRole('button', { name: /click to upload/i })
		expect(dropZone).toBeDisabled()
		expect(getHiddenInput(container)).toBeDisabled()
	})
})
