# cache-github-repo [![Build Status](https://travis-ci.org/ragingwind/cache-github-repo.svg?branch=master)](https://travis-ci.org/ragingwind/cache-github-repo)

> Download files of the github repository at the local cache by managing commit tracing


## Install

```
$ npm install cache-github-repo
```


## Usage

```js
const CacheGithubRepo = require('cache-github-repo');

const cache = new CacheGithubRepo()

if (await cache.updatable(repo, './node_modules/')) {
	await cache.cache('zeit/next.js', path.join('dest'))
}
```

## API

### CacheGithubRepo()

It returns the instance of cache manager

#### updatable

Check the repo can be updated, is out of dated

##### repo

Type: `string`

Repository names on github. ex) `ragingwind/cache-github-repo`

##### cachePath

Type: `string`

Path for saving of cache manifest file, named by `cache-github-repo.json`. Default is parent's `node_module/.cache`

#### cache

Cache the repo to local

##### repo

Type: `string`

Repository names on github. ex) `ragingwind/cache-github-repo`

##### dest

Type: `string`

unzipped files after downloading

## License

MIT © [Jimmy Moon](http://ragingwind.me)
