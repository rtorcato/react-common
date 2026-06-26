// @ts-nocheck
import semanticRelease from '@rtorcato/js-tooling/semantic-release'

// The shared config targets GitLab. We host on GitHub now, so swap the
// @semantic-release/gitlab plugin for @semantic-release/github (bundled with
// semantic-release) and let it detect the repo from package.json/origin.
// ponytail: override here instead of forking js-tooling; revert if that pkg gains GitHub support.
const plugins = semanticRelease.plugins.map((p) =>
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
