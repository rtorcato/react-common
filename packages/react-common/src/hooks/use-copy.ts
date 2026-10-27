import { copyToClipboard } from '@rtorcato/browser-common/clipboard'
import * as React from 'react'

/**
 * Copy text to the clipboard and expose `copied` / `failed` flags for the
 * last attempt. Either flag resets after `timeout` ms; they are never both
 * `true`. `copy` resolves to whether the copy succeeded.
 */
export function useCopy(timeout = 2000): {
	copy: (text: string) => Promise<boolean>
	copied: boolean
	failed: boolean
} {
	const [copied, setCopied] = React.useState(false)
	const [failed, setFailed] = React.useState(false)
	const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

	React.useEffect(() => () => clearTimeout(timer.current), [])

	const copy = React.useCallback(
		async (text: string) => {
			const ok = await copyToClipboard(text)
			clearTimeout(timer.current)
			setCopied(ok)
			setFailed(!ok)
			timer.current = setTimeout(() => {
				setCopied(false)
				setFailed(false)
			}, timeout)
			return ok
		},
		[timeout]
	)

	return { copy, copied, failed }
}
