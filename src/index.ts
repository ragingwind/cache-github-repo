'use strict'

import path = require('path')
import fs = require('fs-extra')
import findCacheDir = require('find-cache-dir')
import fetch = require('node-fetch')
import download = require('download')
import parentModule = require('parent-module')

async function checkUpdatable(repo: string) {
	const cacheDir = findCacheDir({
		name: 'cache-github-repo',
		create: true,
		cwd: parentModule()
	})
	const cacheManifestPath = path.join(cacheDir, 'cache.json')
	let cacheManifest = {
		updated: 0
	}

	if (fs.existsSync(cacheManifestPath)) {
		cacheManifest = JSON.parse(await fs.readFile(cacheManifestPath))
	}

	const res = await fetch(`https://api.github.com/repos/${repo}/commits`, {
		method: 'GET'
	})

	const latest = await res.json()
	const current = cacheManifest[repo]

	if (!current || current.sha !== latest[0].sha) {
		cacheManifest.updated = Date.now()
		cacheManifest[repo] = latest[0]

		await fs.writeFile(
			cacheManifestPath,
			JSON.stringify(cacheManifest, null, '\t')
		)
		return true
	}

	return false
}

async function downloadPackage(repo, dest) {
	const url = `https://codeload.github.com/${repo}/tar.gz/master`
	dest = path.resolve(dest)

	if (await fs.pathExists(dest)) {
		await fs.remove(dest)
	}

	return download(url, path.resolve(dest), {
		extract: true,
		strip: 1,
		mode: '666',
		headers: {
			accept: 'application/zip'
		}
	})
}

module.exports = async (repo, dest, opts) => {
	opts = {
		...{
			force: false
		},
		...opts
	}

	const update = await checkUpdatable(repo)
	if (opts.force || update) {
		await downloadPackage(repo, dest)
	}
}
