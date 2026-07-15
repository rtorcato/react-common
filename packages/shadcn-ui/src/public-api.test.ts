import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

// vitest runs per-package (pnpm -r), so cwd is this package's root.
const root = process.cwd()

// Locks the public export surface of @rtorcato/shadcn-ui. The package has no
// barrel — it's subpath-only — so instead of snapshotting a namespace we assert
// the package.json `exports` map stays in lockstep with the components on disk.
// This is build-independent (checks source filenames, not dist) and catches the
// drift that bit us before: a component added without an export, or an export
// left pointing at a file that no longer exists (#18, #74).

const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const subpaths = Object.keys(pkg.exports)

function componentNames(sub: string): string[] {
	return readdirSync(join(root, 'src/components', sub))
		.filter((f) => f.endsWith('.tsx') && !f.includes('.test.') && !f.includes('.stories.'))
		.map((f) => f.replace(/\.tsx$/, ''))
		.sort()
}

function exportedUnder(prefix: string): string[] {
	return subpaths
		.filter((k) => k.startsWith(prefix))
		.map((k) => k.slice(prefix.length))
		.sort()
}

describe('public API surface', () => {
	it('every ui primitive is exported and every ui export has a source file', () => {
		expect(exportedUnder('./components/ui/')).toEqual(componentNames('ui'))
	})

	it('every ui-extended component is exported and vice versa', () => {
		expect(exportedUnder('./components/ui-extended/')).toEqual(componentNames('ui-extended'))
	})

	it('exposes exactly the locked non-component subpaths', () => {
		const nonComponent = subpaths.filter((k) => !k.startsWith('./components/')).sort()
		expect(nonComponent).toMatchInlineSnapshot(`
			[
			  "./hooks",
			  "./lib/*",
			  "./styles.css",
			]
		`)
	})
})
