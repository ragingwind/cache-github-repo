import path from 'path';
import test from 'ava';
import fs from 'fs-extra';
import CacheGithubRepo from './dist';
import findCacheDir from 'find-cache-dir'
import parentModule from 'parent-module'

let cachePath = './node_modules/.cache/test-cache-github-repo'

test.before(async t => {
	await fs.remove(path.resolve(cachePath))

	cachePath = findCacheDir({
		name: 'test-cache-github-repo',
		create: true
	})
})

test(async t => {
	const repo = 'ragingwind/cache-github-repo'
	const cache = new CacheGithubRepo()

	t.true(await cache.updatable(repo, cachePath))
	t.false(await cache.updatable(repo, cachePath))

	await cache.cache(repo, path.join(cachePath, repo))
	t.true(await fs.pathExists(path.join(cachePath, repo)))
})
