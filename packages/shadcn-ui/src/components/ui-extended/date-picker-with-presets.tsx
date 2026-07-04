'use client'

import { addDays, format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export default function DatePickerWithPresets() {
	const [date, setDate] = React.useState<Date>()

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-[280px] justify-start text-left font-normal',
						!date && 'text-muted-foreground'
					)}
				>
					<CalendarIcon className="w-4 h-4 mr-2" />
					{date ? format(date, 'PPP') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="flex flex-col w-auto p-2 space-y-2">
				<Select onValueChange={(value) => setDate(addDays(new Date(), Number.parseInt(value, 10)))}>
					<SelectTrigger>
						<SelectValue placeholder="Select" />
					</SelectTrigger>
					<SelectContent position="popper">
						<SelectItem value="0">Today</SelectItem>
						<SelectItem value="1">Tomorrow</SelectItem>
						<SelectItem value="3">In 3 days</SelectItem>
						<SelectItem value="7">In a week</SelectItem>
					</SelectContent>
				</Select>
				<div className="border rounded-md">
					<Calendar mode="single" selected={date} onSelect={setDate} />
				</div>
			</PopoverContent>
		</Popover>
	)
}
