import path from 'path';
import test from 'ava';
import fs from 'fs-extra';
import cache from './dist';
import findCacheDir from 'find-cache-dir'

const cacheDir = findCacheDir({
	name: 'test-cache-github-repo',
	create: true,
	cwd: __dirname
})

test(async t => {
	const repo = 'zeit/next.js'
	await cache(repo, path.join(cacheDir, repo), {force: true})
	t.true(await fs.pathExists(path.join(cacheDir, repo, 'examples')))
})
