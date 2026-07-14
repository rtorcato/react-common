'use client'

import { addDays, format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export interface DatePickerPreset {
	label: string
	/** Days offset from today: 0 = today, 1 = tomorrow, 7 = a week out. */
	days: number
}

export interface DatePickerWithPresetsProps {
	/** Controlled selected date. Omit for uncontrolled usage. */
	value?: Date
	/** Called whenever the date changes (via a preset or the calendar). */
	onChange?: (date?: Date) => void
	/** Initial date when uncontrolled. */
	defaultValue?: Date
	/** Preset options, relative to today. Defaults to Today / Tomorrow / +3 days / +1 week. */
	presets?: DatePickerPreset[]
	className?: string
}

const DEFAULT_PRESETS: DatePickerPreset[] = [
	{ label: 'Today', days: 0 },
	{ label: 'Tomorrow', days: 1 },
	{ label: 'In 3 days', days: 3 },
	{ label: 'In a week', days: 7 },
]

export default function DatePickerWithPresets({
	value,
	onChange,
	defaultValue,
	presets = DEFAULT_PRESETS,
	className,
}: DatePickerWithPresetsProps) {
	const [internal, setInternal] = React.useState<Date | undefined>(defaultValue)
	const isControlled = value !== undefined
	const date = isControlled ? value : internal

	const setDate = (next?: Date) => {
		if (!isControlled) setInternal(next)
		onChange?.(next)
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-[280px] justify-start text-left font-normal',
						!date && 'text-muted-foreground',
						className
					)}
				>
					<CalendarIcon className="w-4 h-4 mr-2" />
					{date ? format(date, 'PPP') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="flex flex-col w-auto p-2 space-y-2">
				<Select onValueChange={(v) => setDate(addDays(new Date(), Number.parseInt(v, 10)))}>
					<SelectTrigger>
						<SelectValue placeholder="Select" />
					</SelectTrigger>
					<SelectContent position="popper">
						{presets.map((preset) => (
							<SelectItem key={preset.days} value={String(preset.days)}>
								{preset.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<div className="border rounded-md">
					<Calendar mode="single" selected={date} onSelect={setDate} />
				</div>
			</PopoverContent>
		</Popover>
	)
}
