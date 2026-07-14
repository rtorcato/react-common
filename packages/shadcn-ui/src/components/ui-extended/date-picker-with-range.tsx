'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'
import type { DateRange } from 'react-day-picker'

import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

export interface DatePickerWithRangeProps {
	/** Controlled selected range. Omit for uncontrolled usage. */
	value?: DateRange
	/** Called whenever the selected range changes. */
	onChange?: (range?: DateRange) => void
	/** Initial range when uncontrolled. */
	defaultValue?: DateRange
	className?: string
}

export default function DatePickerWithRange({
	value,
	onChange,
	defaultValue,
	className,
}: DatePickerWithRangeProps) {
	const dateId = React.useId()
	const [internal, setInternal] = React.useState<DateRange | undefined>(defaultValue)
	const isControlled = value !== undefined
	const date = isControlled ? value : internal

	const setDate = (next?: DateRange) => {
		if (!isControlled) setInternal(next)
		onChange?.(next)
	}

	return (
		<div className={cn('grid gap-2', className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id={dateId}
						variant={'outline'}
						className={cn(
							'w-[300px] justify-start text-left font-normal',
							!date && 'text-muted-foreground'
						)}
					>
						<CalendarIcon className="w-4 h-4 mr-2" />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
								</>
							) : (
								format(date.from, 'LLL dd, y')
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={setDate}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}
