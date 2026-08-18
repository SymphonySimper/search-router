# URL Redirector

Keep changes small, direct, and configuration-driven. Do not add abstractions, dependencies, fallbacks, or aliases without a concrete need.

## Architecture

- `src/index.ts` is the Cloudflare Worker entrypoint. Search routes must be checked before normal mappings.
- `src/mappings/config.ts` contains redirect destinations and canonical keys; `src/mappings/index.ts` builds the lookup map once.
- `src/search/config.ts` contains the default engine and bang definitions; `src/search/index.ts` resolves complete URL templates once.
- `src/result.ts` defines the common redirect-or-error result returned by route resolvers.
- `src/url.ts` owns protocol normalization. Store configured hosts without `https://` and use `withProtocol()`.
- The production search domain is `p1a.in`; the Chromium configuration in `~/.dotfiles` points to `https://p1a.in/s/`.

## Behavior Invariants

- Mapping keys are case-insensitive. Preserve destination and dynamic-slug casing.
- Exact mappings win. Otherwise, ordered-subsequence matches are ranked by shortest key, then alphabetically.
- Only the first pathname segment selects a mapping; append the remaining pathname unchanged as its slug.
- Hyphenated mapping keys automatically gain a space variant. Avoid redundant aliases when subsequence matching preserves the intended destination.
- `/s`, `/search`, `/q`, and `/query` are equivalent search endpoints. Their entire pathname suffix is the query; without a suffix, use the `q` query parameter for form-encoded clients.
- Search queries beginning with `@` strictly resolve everything after it through mappings, preserve destination query parameters, and return a mapping error when unresolved; other `@` characters are ordinary search text.
- Bangs are case-insensitive tokens anywhere in the query. The first valid bang selects the engine; remove all valid bangs and preserve invalid ones as search text.
- Searches without a valid bang use the configured default engine. Empty searches and bang-only searches open the selected homepage.
- Search routes ignore incoming URL query parameters except a suffix-less endpoint's `q` and a leading `@` mapping's destination parameters; normal mappings preserve them.

## Configuration

- Direct search engines use `{ url, search }`; site searches use `{ site }` and reuse the default engine.
- Build search templates with `SEARCH_TERMS_PLACEHOLDER`; do not duplicate the placeholder literal.
- Prefer one canonical mapping key. Verify short subsequences before adding explicit short aliases.

## Verification and Git

- Run `./node_modules/.bin/tsc --noEmit` and `git diff --check` for every change.
- Use focused Bun assertions for affected mappings, bangs, and Worker redirect integration; there is no committed test suite.
- Do not deploy, commit, push, amend, or rewrite history unless explicitly requested. When asked to split commits, stage and verify each concern independently.
