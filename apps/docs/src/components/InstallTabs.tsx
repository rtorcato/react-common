import { type ReactElement, useState } from 'react'
import styles from './InstallTabs.module.css'

type Manager = {
	id: string
	cmd: (pkg: string) => string
}

const MANAGERS: Manager[] = [
	{ id: 'pnpm', cmd: (p) => `pnpm add ${p}` },
	{ id: 'npm', cmd: (p) => `npm install ${p}` },
	{ id: 'yarn', cmd: (p) => `yarn add ${p}` },
	{ id: 'bun', cmd: (p) => `bun add ${p}` },
]

function CopyIcon({ done }: { done: boolean }): ReactElement {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.7}
			strokeLinecap="round"
			strokeLinejoin="round"
			role="img"
		>
			<title>{done ? 'Copied' : 'Copy'}</title>
			{done ? (
				<path d="M20 6 9 17l-5-5" />
			) : (
				<>
					<rect x="9" y="9" width="11" height="11" rx="2" />
					<path d="M5 15V5a2 2 0 0 1 2-2h10" />
				</>
			)}
		</svg>
	)
}

type InstallTabsProps = {
	pkg?: string
}

export default function InstallTabs({
	pkg = '@rtorcato/shadcn-ui',
}: InstallTabsProps): ReactElement {
	const [active, setActive] = useState('pnpm')
	const [copied, setCopied] = useState(false)
	const cmd = (MANAGERS.find((m) => m.id === active) ?? MANAGERS[0]).cmd(pkg)

	async function copy() {
		try {
			await navigator.clipboard.writeText(cmd)
		} catch {
			// Clipboard may be unavailable (e.g., insecure context) — ignore.
		}
		setCopied(true)
		setTimeout(() => setCopied(false), 1300)
	}

	return (
		<div className={styles.wrap}>
			<div className={styles.tabs} role="tablist" aria-label="Package manager">
				{MANAGERS.map((m) => (
					<button
						key={m.id}
						type="button"
						role="tab"
						aria-selected={active === m.id}
						className={active === m.id ? styles.tabActive : styles.tab}
						onClick={() => {
							setActive(m.id)
							setCopied(false)
						}}
					>
						{m.id}
					</button>
				))}
			</div>
			<div className={styles.cmdRow}>
				<span className={styles.prompt} aria-hidden>
					$
				</span>
				<code className={styles.cmd}>{cmd}</code>
				<button
					type="button"
					className={styles.copy}
					onClick={copy}
					aria-label={copied ? 'Copied' : 'Copy install command'}
					data-copied={copied}
				>
					<CopyIcon done={copied} />
				</button>
			</div>
		</div>
	)
}
