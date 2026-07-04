#!/usr/bin/env node
// Gzipped bundle-size gate. Reads dist/ + bundle-size.json, fails if any
// exported subpath's gzipped size grew past `budget * (1 + tolerance)`.
//
// Re-baseline after intentional growth: `node scripts/check-bundle-size.mjs --write`.

import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

const BUDGET_FILE = 'bundle-size.json'
const WRITE = process.argv.includes('--write')

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
const budgets = fs.existsSync(BUDGET_FILE)
	? JSON.parse(fs.readFileSync(BUDGET_FILE, 'utf8'))
	: { tolerance: 0.1, entries: {}, chunksTotal: 0 }
const tolerance = budgets.tolerance ?? 0.1

const entries = []
for (const [subpath, mapping] of Object.entries(pkg.exports)) {
	if (typeof mapping !== 'object' || !mapping.import) continue
	if (typeof mapping.import !== 'string' || !mapping.import.endsWith('.js')) continue
	if (mapping.import.includes('*')) continue
	entries.push([subpath, mapping.import])
}
entries.sort((a, b) => a[0].localeCompare(b[0]))

let failed = false
const measured = {}
const rows = []
for (const [subpath, dist] of entries) {
	if (!fs.existsSync(dist)) {
		// Missing dist artifact: fail only if there was a budget (regression).
		// Otherwise warn — covers exports that point at unbuilt files.
		const hadBudget = budgets.entries?.[subpath] != null
		rows.push({ subpath, missing: true, hadBudget })
		if (hadBudget) failed = true
		continue
	}
	const gz = zlib.gzipSync(fs.readFileSync(dist)).length
	measured[subpath] = gz
	const budget = budgets.entries?.[subpath]
	const limit = budget == null ? null : Math.ceil(budget * (1 + tolerance))
	const ok = limit == null || gz <= limit
	if (!ok) failed = true
	rows.push({ subpath, gz, budget, limit, ok })
}

const chunksDir = 'dist/chunks'
let chunksTotal = 0
if (fs.existsSync(chunksDir)) {
	for (const f of fs.readdirSync(chunksDir)) {
		if (!f.endsWith('.js')) continue
		chunksTotal += zlib.gzipSync(fs.readFileSync(path.join(chunksDir, f))).length
	}
}
const chunksBudget = budgets.chunksTotal
const chunksLimit = chunksBudget == null ? null : Math.ceil(chunksBudget * (1 + tolerance))
const chunksOk = chunksLimit == null || chunksTotal <= chunksLimit
if (!chunksOk) failed = true

if (WRITE) {
	const next = {
		tolerance,
		entries: measured,
		chunksTotal,
	}
	fs.writeFileSync(BUDGET_FILE, `${JSON.stringify(next, null, 2)}\n`)
	console.log(
		`✏️  Wrote new baseline to ${BUDGET_FILE} (${Object.keys(measured).length} entries, chunks=${chunksTotal}B)`
	)
	process.exit(0)
}

const green = (s) => `[32m${s}[0m`
const red = (s) => `[31m${s}[0m`
const dim = (s) => `[2m${s}[0m`

console.log(`Bundle-size gate (tolerance ${(tolerance * 100).toFixed(0)}%)\n`)
console.log(
	'  '.padEnd(2),
	'subpath'.padEnd(46),
	'gzipped'.padStart(9),
	'budget'.padStart(9),
	'limit'.padStart(9)
)
console.log('-'.repeat(86))
for (const r of rows) {
	if (r.missing) {
		const mark = r.hadBudget ? red('✗') : dim('⚠')
		const msg = r.hadBudget
			? red('  missing dist artifact (regression)')
			: dim('  missing dist artifact (no budget — unbuilt export?)')
		console.log(mark, r.subpath.padEnd(46), msg)
		continue
	}
	const mark = r.ok ? green('✓') : red('✗')
	const gz = `${r.gz}B`
	const bud = r.budget == null ? dim('—') : `${r.budget}B`
	const lim = r.limit == null ? dim('—') : `${r.limit}B`
	console.log(mark, r.subpath.padEnd(46), gz.padStart(9), bud.padStart(9), lim.padStart(9))
}
console.log('-'.repeat(86))
const chunksMark = chunksOk ? green('✓') : red('✗')
console.log(
	chunksMark,
	'chunks/ (transitive shared code)'.padEnd(46),
	`${chunksTotal}B`.padStart(9),
	`${chunksBudget ?? '—'}B`.padStart(9),
	`${chunksLimit ?? '—'}B`.padStart(9)
)

if (failed) {
	console.error(
		`\n${red('❌ Bundle-size gate failed.')} Review the diff; if the growth is intentional run \`node scripts/check-bundle-size.mjs --write\` to re-baseline ${BUDGET_FILE}.`
	)
	process.exit(1)
}
console.log(`\n${green('✅ Bundle-size gate passed.')}`)
