import type { Meta, StoryObj } from '@storybook/react-vite'

import { FileUpload } from '~/components/ui-extended/file-upload'

const meta = {
	title: 'ui-extended/FileUpload',
	component: FileUpload,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: { accept: 'image/*', maxSize: 2 * 1024 * 1024 },
}

export const Multiple: Story = {
	args: { multiple: true, maxSize: 5 * 1024 * 1024 },
}

export const Disabled: Story = {
	args: { disabled: true },
}
