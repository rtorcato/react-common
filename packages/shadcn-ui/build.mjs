import { buildCode, getEntryPoints } from '@rtorcato/js-tooling/esbuild'

const componentsFolder = await getEntryPoints('src/components')
const componentsTsxFolder = await getEntryPoints('src/components', '.tsx')
const libFolder = await getEntryPoints('src/lib')
const hookFolders = await getEntryPoints('src/hooks')
const uiFolders = await getEntryPoints('src/components/ui', '.tsx')
const uiExtendedFolders = await getEntryPoints('src/components/ui-extended', '.tsx')

// const uiExtendedFolders = await getEntrypointFolders('src/components/ui-extended')
// const libEntryPointsArrays = await Promise.all(
// 	// uiFolders.map((folder) => getEntryPoints(folder, '.tsx', false)),
// 	uiExtendedFolders.map((folder) => getEntryPoints(folder, '.tsx', false))
// )
const allEntryPoints = [
	//'src/index.ts',
	...uiFolders,
	...componentsFolder,
	...componentsTsxFolder,
	...libFolder,
	...hookFolders,
	...uiExtendedFolders,
	// ...libEntryPointsArrays.flat(),
]

buildCode(allEntryPoints).catch((e) => {
	console.error(e)
	process.exit(1)
})
