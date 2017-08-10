'use strict'

import path = require('path')
import fs = require('fs-extra')
import fetch = require('node-fetch')
import download = require('download')
import parentModule = require('parent-module')
import findCacheDir = require('find-cache-dir')

class CacheGithubRepo {
	cache(repo: string, dest: string) {
		const url = `https://codeload.github.com/${repo}/tar.gz/master`

		dest = path.resolve(dest)

		return fs
			.pathExists(dest)
			.then(exist => exist && fs.remove(dest))
			.then(() =>
				download(url, path.resolve(dest), {
					extract: true,
					strip: 1,
					mode: '666',
					headers: {
						accept: 'application/zip'
					}
				})
			)
	}

	updatable(repo: string, cachePath) {
		if (!repo) {
			throw Error('Invalid repo address for checking cache files on github')
		}

		if (!cachePath) {
			cachePath = findCacheDir({
				name: 'cache-github-repo',
				create: true,
				cwd: parentModule() || __dirname
			})
		}
		const cacheManifestPath = path.join(cachePath, 'cache-github-repo.json')

		const readManifest = () => {
			return fs
				.pathExists(cacheManifestPath)
				.then(
					exist => (exist ? fs.readJson(cacheManifestPath) : { updated: 0 })
				)
				.then(current => {
					return fetch(`https://api.github.com/repos/${repo}/commits`, {
						method: 'GET'
					})
						.then(res => res.json())
						.then(latest => {
							return {
								current,
								latest
							}
						})
				})
		}

		const updateManifest = manifest => {
			const { current, latest } = manifest

			if (
				!current ||
				!current[repo] ||
				!latest ||
				!latest[0] ||
				current[repo].sha !== latest[0].sha
			) {
				current.updated = Date.now()
				current[repo] = latest[0]

				return fs
					.writeJson(cacheManifestPath, current, { spaces: '\t' })
					.then(() => {
						return true
					})
					.catch(() => {
						return false
					})
			}

			return Promise.resolve(false)
		}

		return readManifest().then(updateManifest).catch(() => {
			return false
		})
	}
}

export default CacheGithubRepo
