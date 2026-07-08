import Link from '@docusaurus/Link'
import { siblings } from '@rtorcato/shared-docs'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import type { ReactElement } from 'react'
import InstallTabs from '@site/src/components/InstallTabs'
import styles from './index.module.css'

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

type IconKey = 'shield' | 'palette' | 'copy' | 'brackets'

function Icon({ icon, title, size = 20 }: { icon: IconKey; title: string; size?: number }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.6}
			strokeLinecap="round"
			strokeLinejoin="round"
			role="img"
		>
			<title>{title}</title>
			{ICONS[icon]}
		</svg>
	)
}

const ICONS: Record<IconKey, ReactElement> = {
	shield: <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />,
	palette: (
		<>
			<circle cx="12" cy="12" r="9" />
			<circle cx="8.5" cy="10" r="1" fill="currentColor" />
			<circle cx="15.5" cy="10" r="1" fill="currentColor" />
			<circle cx="12" cy="15.5" r="1" fill="currentColor" />
		</>
	),
	copy: (
		<>
			<rect x="9" y="9" width="11" height="11" rx="2" />
			<path d="M5 15V5a2 2 0 0 1 2-2h10" />
		</>
	),
	brackets: (
		<>
			<path d="m9 8-5 4 5 4" />
			<path d="m15 8 5 4-5 4" />
		</>
	),
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const PILLARS: { title: string; desc: string; icon: IconKey }[] = [
	{
		title: 'Radix-powered',
		desc: 'Accessible, unstyled primitives from Radix UI under the hood.',
		icon: 'shield',
	},
	{
		title: 'Tailwind CSS v4',
		desc: 'Styled with the latest Tailwind; theme via CSS variables.',
		icon: 'palette',
	},
	{
		title: 'Own your components',
		desc: 'Built on shadcn/ui — copy, extend, and customize freely.',
		icon: 'copy',
	},
	{
		title: 'TypeScript-first',
		desc: 'Strict types and full IntelliSense on every component.',
		icon: 'brackets',
	},
]

const GROUPS: { name: string; desc: string; chips: string[] }[] = [
	{
		name: 'Forms & Inputs',
		desc: 'Buttons, inputs, selects, checkboxes and more.',
		chips: ['button', 'input', 'select', 'checkbox'],
	},
	{
		name: 'Overlays',
		desc: 'Dialogs, popovers, tooltips and dropdown menus.',
		chips: ['dialog', 'popover', 'tooltip', 'dropdown'],
	},
	{
		name: 'Data display',
		desc: 'Tables, cards, badges, avatars and accordions.',
		chips: ['table', 'card', 'badge', 'accordion'],
	},
	{
		name: 'Navigation',
		desc: 'Tabs, breadcrumbs, pagination and menus.',
		chips: ['tabs', 'breadcrumb', 'pagination', 'menu'],
	},
]

const SIBLINGS = siblings('@rtorcato/react-common')

const HERO_CODE = `import { Button } from '@rtorcato/common-react'
import '@rtorcato/common-react/styles.css'

export function Example() {
  return (
    <Button variant="outline">
      Click me
    </Button>
  )
}`

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function CodeWindow(): ReactElement {
	return (
		<div className={styles.codeWindow}>
			<div className={styles.codeBar}>
				<span className={styles.dot} style={{ background: '#ff5f57' }} />
				<span className={styles.dot} style={{ background: '#febc2e' }} />
				<span className={styles.dot} style={{ background: '#28c840' }} />
				<span className={styles.codeFile}>example.tsx</span>
			</div>
			<pre className={styles.codePre}>{HERO_CODE}</pre>
		</div>
	)
}

function Hero(): ReactElement {
	return (
		<header className={styles.hero}>
			<div className={styles.heroGlow} aria-hidden />
			<div className={styles.heroInner}>
				<h1 className={styles.heroTitle}>
					Beautiful React components,
					<br />
					<span className={styles.heroAccent}>ready to ship.</span>
				</h1>
				<p className={styles.heroSub}>
					A React component library built on shadcn/ui, Radix UI, TypeScript and Tailwind CSS v4 —
					accessible, themable, and yours to own.
				</p>
				<div className={styles.heroButtons}>
					<Link className={clsx('button button--primary button--lg', styles.cta)} to="/docs">
						Get started →
					</Link>
					<Link
						className={clsx('button button--lg', styles.ctaSecondary)}
						href="https://github.com/rtorcato/react-common"
					>
						GitHub
					</Link>
				</div>
				<div className={styles.heroActions}>
					<InstallTabs pkg="@rtorcato/common-react" />
				</div>
				<div className={styles.heroCode}>
					<CodeWindow />
				</div>
			</div>
		</header>
	)
}

function Pillars(): ReactElement {
	return (
		<section className={styles.section}>
			<div className={styles.pillarGrid}>
				{PILLARS.map((p) => (
					<div key={p.title} className={styles.pillar}>
						<div className={styles.pillarIcon}>
							<Icon icon={p.icon} title={p.title} />
						</div>
						<div className={styles.pillarTitle}>{p.title}</div>
						<div className={styles.pillarDesc}>{p.desc}</div>
					</div>
				))}
			</div>
		</section>
	)
}

function Groups(): ReactElement {
	return (
		<section className={styles.section}>
			<div className={styles.sectionHead}>
				<div>
					<h2 className={styles.h2}>Everything you need</h2>
					<p className={styles.sub}>
						Primitives from shadcn/ui plus custom components — import exactly what you need.
					</p>
				</div>
				<Link className={styles.viewAll} to="/docs">
					Browse the docs →
				</Link>
			</div>
			<div className={styles.catGrid}>
				{GROUPS.map((c) => (
					<Link key={c.name} to="/docs" className={styles.card}>
						<div className={styles.cardHead}>
							<div className={styles.cardName}>{c.name}</div>
						</div>
						<p className={styles.cardDesc}>{c.desc}</p>
						<div className={styles.chips}>
							{c.chips.map((ch) => (
								<span key={ch} className={styles.chip}>
									{ch}
								</span>
							))}
						</div>
					</Link>
				))}
			</div>
		</section>
	)
}

function Siblings(): ReactElement {
	return (
		<section className={styles.section}>
			<div className={styles.sectionHead}>
				<div>
					<h2 className={styles.h2}>Sibling projects</h2>
					<p className={styles.sub}>
						More from <code>@rtorcato</code> — same conventions, same release pipeline.
					</p>
				</div>
			</div>
			<div className={styles.siblingGrid}>
				{SIBLINGS.map((s) => (
					<Link key={s.name} href={s.href} className={styles.card}>
						<div className={styles.cardHead}>
							<div className={styles.cardName}>{s.name}</div>
							<div className={styles.cardCount}>{s.dest} ↗</div>
						</div>
						<p className={styles.cardDesc}>{s.tagline}</p>
					</Link>
				))}
			</div>
		</section>
	)
}

export default function Home(): ReactElement {
	return (
		<Layout description="A React component library built on shadcn/ui, Radix UI, and Tailwind CSS v4.">
			<main>
				<Hero />
				<Pillars />
				<Groups />
				<Siblings />
			</main>
		</Layout>
	)
}
