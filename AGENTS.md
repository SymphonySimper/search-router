# URL Redirector

Keep changes small, direct, and configuration-driven. Do not add abstractions, dependencies, fallbacks, or aliases without a concrete need.

## Architecture

- `src/index.ts` is the Cloudflare Worker entrypoint. Search routes must be checked before normal mappings.
- `src/mappings/config.ts` contains redirect destinations and canonical keys; `src/generated/mappings.json` is its ignored compiled lookup.
- `src/search/config.ts` contains the default engine and bang definitions; `src/generated/search.json` contains ignored compiled URL templates.
- `scripts/compile.ts` validates and compiles both configurations before Wrangler starts.
- `src/result.ts` defines the common redirect-or-error result returned by route resolvers.
- `src/url.ts` owns protocol normalization. Store configured hosts without `https://` and use `withProtocol()`.
- The production search domain is `p1a.in`; the Chromium configuration in `~/.dotfiles` points to `https://p1a.in/s/`.

## Behavior Invariants

- Mapping keys are case-insensitive. Preserve destination and dynamic-slug casing.
- Mappings are exact, explicit, case-insensitive aliases. Developers must add every supported alias to `src/mappings/config.ts`.
- Only the first pathname segment selects a mapping; append the remaining pathname unchanged as its slug.
- `/s` uses its pathname suffix as a normal query. `/q` is for form-encoded clients such as KISS and converts raw `+` characters in its pathname suffix to spaces before percent-decoding.
- Search queries beginning with `@` strictly resolve everything after it through mappings, preserve destination query parameters, and return a mapping error when unresolved; other `@` characters are ordinary search text.
- Bangs are case-insensitive tokens anywhere in the query. The first valid bang selects the engine; remove all valid bangs and preserve invalid ones as search text.
- Searches without a valid bang use the configured default engine. Empty searches and bang-only searches open the selected homepage.
- Search routes ignore incoming URL query parameters except a leading `@` mapping's destination parameters; normal mappings preserve them.

## Configuration

- Direct search engines use `{ url, search }`; site searches use `{ site }` and reuse the default engine.
- Build search templates with `SEARCH_TERMS_PLACEHOLDER`; do not duplicate the placeholder literal.
- Keep mapping aliases explicit; do not generate variants from configured keys.

## Verification and Git

- Run `pnpm typecheck` and `git diff --check` for every change.
- Use focused Bun assertions for affected mappings, bangs, and Worker redirect integration; there is no committed test suite.
- Do not deploy, commit, push, amend, or rewrite history unless explicitly requested. When asked to split commits, stage and verify each concern independently.
