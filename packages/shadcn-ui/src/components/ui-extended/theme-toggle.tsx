'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'
import { Button } from '~/components/ui/button'

interface ThemeToggleProps extends React.ComponentProps<typeof Button> {
	/** Accessible label for the toggle button. Defaults to "Toggle theme". */
	label?: string
}

/**
 * A single-button light/dark theme toggle built on `next-themes`. Pairs with
 * `ThemeProvider`. Renders a stable icon until mounted to avoid a hydration
 * mismatch, then reflects the resolved theme.
 */
function ThemeToggle({
	label = 'Toggle theme',
	variant = 'ghost',
	size = 'icon',
	...props
}: ThemeToggleProps) {
	const { resolvedTheme, setTheme } = useTheme()
	const [mounted, setMounted] = React.useState(false)

	React.useEffect(() => setMounted(true), [])

	const isDark = mounted && resolvedTheme === 'dark'

	return (
		<Button
			type="button"
			variant={variant}
			size={size}
			aria-label={label}
			onClick={() => setTheme(isDark ? 'light' : 'dark')}
			{...props}
		>
			{isDark ? <Moon className="size-5" /> : <Sun className="size-5" />}
		</Button>
	)
}

export { ThemeToggle }
export type { ThemeToggleProps }
