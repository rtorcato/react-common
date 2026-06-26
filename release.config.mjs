// @ts-nocheck
import semanticRelease from '@rtorcato/js-tooling/semantic-release'

// The shared config targets GitLab. We host on GitHub now, so:
//  - swap @semantic-release/gitlab -> @semantic-release/github (bundled with semantic-release)
//  - drop @semantic-release/git: main is branch-protected and the github-actions[bot]
//    can't push the release commit past required checks. Tags + npm + GitHub Releases
//    (with regenerated CHANGELOG.md uploaded as a release asset) still cover everything;
//    only the version/CHANGELOG commit back to main is given up.
// ponytail: override here instead of forking js-tooling; revert if that pkg gains GitHub support.
const plugins = semanticRelease.plugins
	.filter((p) => (Array.isArray(p) ? p[0] : p) !== '@semantic-release/git')
	.map((p) =>
		(Array.isArray(p) ? p[0] : p) === '@semantic-release/gitlab'
			? [
					'@semantic-release/github',
					{
						assets: ['dist/*.js', 'dist/*.js.map', 'CHANGELOG.md', 'package.json', 'README.md'],
					},
				]
			: p
	)

export default {
	...semanticRelease,
	repositoryUrl: 'https://github.com/rtorcato/common-react.git',
	plugins,
}
