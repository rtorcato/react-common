import { buildCode } from '@rtorcato/js-tooling/esbuild'

// Single barrel entry — the hooks are small and headless; one bundled module
// (with sideEffects:false) tree-shakes fine for consumers.
buildCode(['src/index.ts']).catch((e) => {
	console.error(e)
	process.exit(1)
})
