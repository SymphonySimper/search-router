# Search Router

A Cloudflare Worker that sends queries to configured search engines. A bang can also open a
configured target.

## Use

The examples use `go.example.com` as the address.

| You go to         | The worker sends you to                   |
| ----------------- | ----------------------------------------- |
| `/rust traits`    | Google, and it searches for `rust traits` |
| `/?q=rust traits` | the same                                  |
| `/!b rust`        | Brave, and it searches for `rust`         |
| `/!repos`         | `https://github.com/repos`                |
| `/!repos actions` | Google, with a site search for GitHub     |
| `/!c 111`         | `https://symphonysimper.com/color/111`    |

- The pathname takes precedence over the `q` parameter.
- A bang at the start of the query selects a target.
- A bang without search terms opens the target homepage.
- A target without its own search uses the default engine to search its host.
- Keys are case-sensitive. An unknown bang remains part of the default search query.
- An empty query returns a 404.

To use the worker as a browser search engine, set its address to `https://go.example.com/%s`.
For an Android launcher, use `https://go.example.com/?q=%s`.

## Configure

Targets are grouped by host in `src/config.ts`. Each key selects its target after a bang.

```ts
'github.com': [
	{ keys: ['github', 'gh'] },
	{ keys: ['repos', 'repo'], path: '/repos' },
],
```

Add `search` when the host has its own search URL. The build replaces `{searchTerms}` with the
encoded query.

```ts
'www.youtube.com': [
	{
		keys: ['youtube', 'yt'],
		search: `/results?search_query=${SEARCH_TERMS_PLACEHOLDER}`,
	},
],
```

The worker uses HTTPS for every host. `path` sets the target homepage. When a target also has
`search`, the path prefixes its search URL. Without `search`, the worker uses the default engine
to search the target host.

The build checks the configuration. A mistake stops the build and tells you the reason.

## Commands

| Command       | What it does            |
| ------------- | ----------------------- |
| `just init`   | Installs the packages   |
| `just dev`    | Runs it on your machine |
| `just deploy` | Sends it to Cloudflare  |
| `just format` | Formats the files       |
