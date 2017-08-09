import path from 'path';
import test from 'ava';
import fs from 'fs-extra';
import cache from './dist';
import findCacheDir from 'find-cache-dir'
import parentModule from 'parent-module'

const cachePath = findCacheDir({
	name: 'test-cache-github-repo',
	create: true,
	cwd: parentModule()
})

test(async t => {
	const repo = 'ragingwind/cache-github-repo'
	await cache(repo, path.join(cachePath, repo), {
		force: true,
		cachePath
	})
	t.true(await fs.pathExists(path.join(cachePath, repo, 'package.json')))
})
