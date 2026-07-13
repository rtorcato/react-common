'use client'

import { FileIcon, UploadIcon, XIcon } from 'lucide-react'
import * as React from 'react'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

interface FileUploadProps {
	accept?: string
	multiple?: boolean
	maxSize?: number
	disabled?: boolean
	onFilesChange?: (files: File[]) => void
	className?: string
}

function formatBytes(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function FileUpload({
	accept,
	multiple = false,
	maxSize,
	disabled = false,
	onFilesChange,
	className,
}: FileUploadProps) {
	const [files, setFiles] = React.useState<File[]>([])
	const [dragOver, setDragOver] = React.useState(false)
	const [errors, setErrors] = React.useState<string[]>([])
	const inputRef = React.useRef<HTMLInputElement>(null)

	function validate(incoming: File[]): { valid: File[]; errors: string[] } {
		const valid: File[] = []
		const errs: string[] = []

		for (const file of incoming) {
			if (maxSize && file.size > maxSize) {
				errs.push(`"${file.name}" exceeds the ${formatBytes(maxSize)} limit.`)
			} else {
				valid.push(file)
			}
		}

		return { valid, errors: errs }
	}

	function addFiles(incoming: File[]) {
		const { valid, errors: errs } = validate(incoming)
		setErrors(errs)
		const next = multiple ? [...files, ...valid] : valid.slice(0, 1)
		setFiles(next)
		onFilesChange?.(next)
	}

	function removeFile(index: number) {
		const next = files.filter((_, i) => i !== index)
		setFiles(next)
		onFilesChange?.(next)
	}

	function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files) addFiles(Array.from(e.target.files))
		e.target.value = ''
	}

	function onDrop(e: React.DragEvent<HTMLElement>) {
		e.preventDefault()
		setDragOver(false)
		if (disabled) return
		addFiles(Array.from(e.dataTransfer.files))
	}

	return (
		<div data-slot="file-upload" className={cn('flex flex-col gap-2', className)}>
			<button
				type="button"
				disabled={disabled}
				onClick={() => inputRef.current?.click()}
				onDragOver={(e) => {
					e.preventDefault()
					if (!disabled) setDragOver(true)
				}}
				onDragLeave={() => setDragOver(false)}
				onDrop={onDrop}
				className={cn(
					'flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center transition-colors',
					dragOver
						? 'border-primary bg-primary/5'
						: 'border-border hover:border-primary/50 hover:bg-muted/50',
					disabled && 'cursor-not-allowed opacity-50'
				)}
			>
				<UploadIcon className="size-8 text-muted-foreground" />
				<div className="text-sm">
					<span className="font-medium text-primary">Click to upload</span>
					{' or drag and drop'}
				</div>
				{(accept || maxSize) && (
					<p className="text-xs text-muted-foreground">
						{[accept, maxSize && `Max ${formatBytes(maxSize)}`].filter(Boolean).join(' · ')}
					</p>
				)}
			</button>

			<input
				ref={inputRef}
				type="file"
				accept={accept}
				multiple={multiple}
				disabled={disabled}
				onChange={onInputChange}
				className="sr-only"
			/>

			{errors.length > 0 && (
				<ul className="space-y-1">
					{errors.map((error) => (
						<li key={error} className="text-xs text-destructive">
							{error}
						</li>
					))}
				</ul>
			)}

			{files.length > 0 && (
				<ul className="space-y-1">
					{files.map((file, index) => (
						<li
							key={`${file.name}-${file.size}`}
							className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2 text-sm"
						>
							<FileIcon className="size-4 shrink-0 text-muted-foreground" />
							<span className="flex-1 truncate">{file.name}</span>
							<span className="shrink-0 text-xs text-muted-foreground">
								{formatBytes(file.size)}
							</span>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="size-5 shrink-0"
								onClick={() => removeFile(index)}
								disabled={disabled}
								aria-label={`Remove ${file.name}`}
							>
								<XIcon className="size-3" />
							</Button>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export { FileUpload }
export type { FileUploadProps }
