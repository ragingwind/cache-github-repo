'use strict'

const findCacheDir = require('find-cache-dir')

function checkUpdatable() {
	const cacheDir = findCacheDir({
		name: 'cache-github-repo',
		create: true,
		cwd: __dirname
	})
}

module.exports = (input, opts) => {
	return 'd'
}
