# cache-github-repo [![Build Status](https://travis-ci.org/ragingwind/cache-github-repo.svg?branch=master)](https://travis-ci.org/ragingwind/cache-github-repo)

> Download files of the github repository at the local cache by managing commit tracing


## Install

```
$ npm install cache-github-repo
```


## Usage

```js
const cacheGithubRepo = require('cache-github-repo');

await cacheGithubRepo('zeit/next.js', path.join('dest'))
```

## API

### cacheGithubRepo(repo, dest, [options])

#### repo

Type: `string`

repository names on github. ex) `ragingwind/cache-github-repo`

#### dest

Type: `string`

Path for unzipped files after downloading

#### options

##### force

Type: `boolean`<br>
Default: `false`

If it true, the download will be started whenever

## License

MIT © [Jimmy Moon](http://ragingwind.me)
