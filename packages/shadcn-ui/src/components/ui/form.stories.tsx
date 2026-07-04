import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'

import { Button } from '~/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'

interface FormValues {
	email: string
}

function FormExample() {
	const form = useForm<FormValues>({ defaultValues: { email: '' } })

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((data) => {
					alert(`Submitted: ${data.email}`)
				})}
				className="flex flex-col gap-4"
				style={{ width: 320 }}
			>
				<FormField
					control={form.control}
					name="email"
					rules={{ required: 'Email is required' }}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" placeholder="you@example.com" {...field} />
							</FormControl>
							<FormDescription>We'll never share your email.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}

const meta: Meta<typeof FormExample> = {
	title: 'ui/Form',
	component: FormExample,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FormExample>

export const Default: Story = {}
