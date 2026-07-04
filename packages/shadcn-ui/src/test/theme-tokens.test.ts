import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

// Smoke check: every design token referenced anywhere in src/components/ as
// `bg-{token}`, `text-{token}`, `border-{token}`, or `ring-{token}` must be
// mapped to a Tailwind v4 `--color-{token}` (or `--color-{token}-foreground`)
// inside `@theme inline` in globals.css. Otherwise the utility class compiles
// to nothing and you get invisible borders / transparent dialogs — exactly the
// regression that surfaced when we wired up Storybook.

const REPO_ROOT = path.resolve(__dirname, '../..')
const GLOBALS_CSS = path.join(REPO_ROOT, 'src/styles/globals.css')
const COMPONENTS_DIR = path.join(REPO_ROOT, 'src/components')

// Tokens that Tailwind v4 ships out of the box — these don't need to be in
// our @theme block. Anything else must be declared.
const TAILWIND_BUILTIN_COLORS = new Set([
	'transparent',
	'current',
	'inherit',
	'black',
	'white',
	'slate',
	'gray',
	'zinc',
	'neutral',
	'stone',
	'red',
	'orange',
	'amber',
	'yellow',
	'lime',
	'green',
	'emerald',
	'teal',
	'cyan',
	'sky',
	'blue',
	'indigo',
	'violet',
	'purple',
	'fuchsia',
	'pink',
	'rose',
])

// Non-color suffixes that the `bg-`, `text-`, `border-`, `ring-`, `fill-`,
// `stroke-` utility families also produce. We strip these out before deciding
// whether a token must be declared in @theme.
const TAILWIND_NON_COLOR_SUFFIXES = new Set([
	// text-* sizing / style
	'xs',
	'sm',
	'base',
	'lg',
	'xl',
	'2xl',
	'3xl',
	'4xl',
	'5xl',
	'6xl',
	'7xl',
	'8xl',
	'9xl',
	'left',
	'right',
	'center',
	'justify',
	'start',
	'end',
	'balance',
	'pretty',
	'nowrap',
	'ellipsis',
	'clip',
	'wrap',
	// border-* style / width / side
	'solid',
	'dashed',
	'dotted',
	'double',
	'none',
	'hidden',
	'collapse',
	'separate',
	't',
	'b',
	'l',
	'r',
	'x',
	'y',
	's',
	'e',
	't-transparent',
	'b-transparent',
	'l-transparent',
	'r-transparent',
	's-transparent',
	'e-transparent',
	// ring-* width / offset
	'inset',
	'offset-0',
	'offset-1',
	'offset-2',
	'offset-4',
	'offset-8',
	'offset',
	// bg-* misc
	'fixed',
	'local',
	'scroll',
	'cover',
	'contain',
	'auto',
	'repeat',
	'top',
	'bottom',
	// fill/stroke
	'radius',
])

function walk(dir: string, out: string[] = []): string[] {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name)
		if (entry.isDirectory()) walk(full, out)
		else if (entry.isFile() && /\.(tsx?|css)$/.test(entry.name)) out.push(full)
	}
	return out
}

function extractDefinedTokens(css: string): Set<string> {
	const themeBlock = css.match(/@theme inline\s*\{([\s\S]*?)\}/)?.[1] ?? ''
	const tokens = new Set<string>()
	for (const m of themeBlock.matchAll(/--color-([a-z0-9-]+)\s*:/gi)) {
		tokens.add(m[1] as string)
	}
	return tokens
}

function extractReferencedTokens(files: string[]): Set<string> {
	// Match Tailwind utilities `bg-{token}`, `text-{token}`, `border-{token}`,
	// `ring-{token}` inside double or single quotes / template strings.
	// Captures everything before the first `/` (opacity modifier) or end of
	// the token. e.g. `bg-popover-foreground/50` → `popover-foreground`.
	const re = /\b(?:bg|text|border|ring|fill|stroke)-([a-z][a-z0-9-]*?)(?=\/|\s|"|'|`|\]|$)/g
	const tokens = new Set<string>()
	for (const file of files) {
		// Skip test files and stories
		if (/\.(test|stories)\.tsx?$/.test(file)) continue
		const src = fs.readFileSync(file, 'utf8')
		for (const m of src.matchAll(re)) {
			tokens.add(m[1] as string)
		}
	}
	return tokens
}

function isTailwindBuiltin(token: string): boolean {
	if (TAILWIND_BUILTIN_COLORS.has(token)) return true
	if (TAILWIND_NON_COLOR_SUFFIXES.has(token)) return true
	// Pure numeric: border-0, border-2, ring-4, etc.
	if (/^\d+$/.test(token)) return true
	// border-side width: border-t-0, border-b-2, border-s-4, etc.
	if (/^[tblrxyse]-\d+$/.test(token)) return true
	// Numeric scale: red-500, slate-50, etc.
	const family = token.split('-')[0] ?? ''
	if (TAILWIND_BUILTIN_COLORS.has(family) && /^\d{2,3}$/.test(token.split('-')[1] ?? '')) {
		return true
	}
	return false
}

describe('theme tokens', () => {
	const css = fs.readFileSync(GLOBALS_CSS, 'utf8')
	const definedTokens = extractDefinedTokens(css)
	const files = walk(COMPONENTS_DIR)
	const referencedTokens = extractReferencedTokens(files)

	it('every project token referenced under src/components is declared in @theme inline', () => {
		const missing: string[] = []
		for (const raw of referencedTokens) {
			// `ring-offset-background` reads --color-background; strip the prefix.
			const token = raw.startsWith('offset-') ? raw.slice('offset-'.length) : raw
			if (isTailwindBuiltin(token)) continue
			if (definedTokens.has(token)) continue
			missing.push(token)
		}
		expect(missing).toEqual([])
	})

	it('@theme inline declares the core shadcn design tokens', () => {
		const required = [
			'background',
			'foreground',
			'card',
			'card-foreground',
			'popover',
			'popover-foreground',
			'primary',
			'primary-foreground',
			'secondary',
			'secondary-foreground',
			'muted',
			'muted-foreground',
			'accent',
			'accent-foreground',
			'destructive',
			'border',
			'input',
			'ring',
		]
		for (const token of required) {
			expect(definedTokens, `missing --color-${token} in @theme inline`).toContain(token)
		}
	})
})
