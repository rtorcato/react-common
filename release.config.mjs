// @ts-nocheck
import semanticRelease from '@rtorcato/js-tooling/semantic-release/github'

// main is branch-protected, so the github-actions[bot] can't push the release
// commit past required checks. Drop @semantic-release/git: tags + npm publish +
// GitHub Release (with regenerated CHANGELOG uploaded as an asset) still cover
// everything; only the version/CHANGELOG commit back to main is given up.
// ponytail: filter here instead of forking js-tooling; drop the filter if main protection is lifted.
const plugins = semanticRelease.plugins.filter(
	(p) => (Array.isArray(p) ? p[0] : p) !== '@semantic-release/git'
)

export default {
	...semanticRelease,
	repositoryUrl: 'https://github.com/rtorcato/common-react.git',
	plugins,
}
