import { copyToClipboard } from '@rtorcato/browser-common/clipboard'
import * as React from 'react'

/**
 * Copy text to the clipboard and expose a `copied` flag that resets after
 * `timeout` ms. `copy` resolves to whether the copy succeeded.
 */
export function useCopy(timeout = 2000): {
	copy: (text: string) => Promise<boolean>
	copied: boolean
} {
	const [copied, setCopied] = React.useState(false)
	const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

	React.useEffect(() => () => clearTimeout(timer.current), [])

	const copy = React.useCallback(
		async (text: string) => {
			const ok = await copyToClipboard(text)
			clearTimeout(timer.current)
			setCopied(ok)
			if (ok) timer.current = setTimeout(() => setCopied(false), timeout)
			return ok
		},
		[timeout]
	)

	return { copy, copied }
}
