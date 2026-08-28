# URL Redirector

A Cloudflare Worker. It changes short paths into full URLs. It also sends your searches to
other search engines.

## Use

The examples use `go.example.com` as the address.

| You go to          | The worker sends you to                   |
| ------------------ | ----------------------------------------- |
| `/gh`              | `https://github.com/repos`                |
| `/c/111`           | `https://symphonysimper.com/color/111`    |
| `/s?q=rust traits` | Google, and it searches for `rust traits` |
| `/s/rust traits`   | the same                                  |
| `/s?q=!b rust`     | Brave, and it searches for `rust`         |
| `/s?q=@gh`         | `https://github.com/repos`                |
| `/nope`            | 404                                       |

- Aliases are case-sensitive. `/GH` gives a 404.
- Mappings drop the query string. `/gh?tab=stars` goes to `https://github.com/repos`.
- A bang picks a different engine. It can be in any position. The worker uses the first one only.
- A target without its own search uses the default engine to search its host.
- `@` in a search uses the mappings.

To use it in your browser, add it as a search engine with this address:
`https://go.example.com/s?q=%s`.

## Configure

Targets are grouped by host in `src/config.ts`. Each ID works as both a path alias and a search
bang.

```ts
'github.com': [
	{ keys: ['github', 'gh'], path: '/repos' },
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

The worker uses HTTPS for every host. A target without `path` opens the host homepage. A search
without `search` becomes a site search through the default engine.

The build checks the configuration. A mistake stops the build and tells you the reason.

## Commands

| Command       | What it does            |
| ------------- | ----------------------- |
| `just init`   | Installs the packages   |
| `just dev`    | Runs it on your machine |
| `just deploy` | Sends it to Cloudflare  |
| `just format` | Formats the files       |
