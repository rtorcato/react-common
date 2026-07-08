'use client'

import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react'
import * as React from 'react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '~/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { cn } from '~/lib/utils'

interface MultiSelectOption {
	label: string
	value: string
}

interface MultiSelectProps {
	options: MultiSelectOption[]
	value?: string[]
	onValueChange?: (value: string[]) => void
	placeholder?: string
	searchPlaceholder?: string
	emptyMessage?: string
	disabled?: boolean
	className?: string
}

function MultiSelect({
	options,
	value = [],
	onValueChange,
	placeholder = 'Select options...',
	searchPlaceholder = 'Search...',
	emptyMessage = 'No options found.',
	disabled = false,
	className,
}: MultiSelectProps) {
	const [open, setOpen] = React.useState(false)

	function toggle(optionValue: string) {
		const next = value.includes(optionValue)
			? value.filter((v) => v !== optionValue)
			: [...value, optionValue]
		onValueChange?.(next)
	}

	function remove(optionValue: string, e: React.MouseEvent | React.KeyboardEvent) {
		e.stopPropagation()
		onValueChange?.(value.filter((v) => v !== optionValue))
	}

	const selectedLabels = options.filter((o) => value.includes(o.value))

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					disabled={disabled}
					className={cn('h-auto min-h-9 w-full justify-between px-3 py-1.5 font-normal', className)}
				>
					<span className="flex flex-wrap gap-1">
						{selectedLabels.length > 0 ? (
							selectedLabels.map((option) => (
								<Badge key={option.value} variant="secondary" className="gap-1 pr-1">
									{option.label}
									{/* biome-ignore lint/a11y/useSemanticElements: PopoverTrigger
									    already renders this badge inside a <button>, so we can't
									    nest a real <button> here. */}
									<span
										role="button"
										tabIndex={0}
										aria-label={`Remove ${option.label}`}
										onClick={(e) => remove(option.value, e)}
										onKeyDown={(e) => {
											if (e.key === 'Enter' || e.key === ' ') {
												e.preventDefault()
												remove(option.value, e)
											}
										}}
										className="inline-flex cursor-pointer items-center rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
									>
										<XIcon className="size-3" />
									</span>
								</Badge>
							))
						) : (
							<span className="text-muted-foreground">{placeholder}</span>
						)}
					</span>
					<ChevronsUpDownIcon className="ms-2 size-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
				<Command>
					<CommandInput placeholder={searchPlaceholder} />
					<CommandList>
						<CommandEmpty>{emptyMessage}</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.value}
									value={option.value}
									onSelect={() => toggle(option.value)}
								>
									<CheckIcon
										className={cn(
											'me-2 size-4',
											value.includes(option.value) ? 'opacity-100' : 'opacity-0'
										)}
									/>
									{option.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export { MultiSelect }
export type { MultiSelectOption, MultiSelectProps }
