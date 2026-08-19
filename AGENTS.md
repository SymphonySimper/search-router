# URL Redirector

Keep changes small, direct, and configuration-driven. Do not add abstractions, dependencies, fallbacks, or aliases without a concrete need.

## Behavior

- Check search routes before mappings.
- Mapping aliases are exact, explicit, and case-insensitive; never generate variants. Preserve destination and slug casing.
- Only the first pathname segment selects a mapping; append the remaining pathname unchanged as its slug.
- `/s` preserves literal `+`; `/q` converts `+` to spaces before percent-decoding.
- A leading `@` strictly resolves through mappings, preserves destination query parameters, and errors when unresolved. Other `@` characters are search text.
- Bangs are case-insensitive tokens anywhere in the query. The first valid bang selects the engine; remove all valid bangs and preserve invalid ones as search text.
- Use the default engine without a valid bang. Empty and bang-only searches open the selected homepage.
- Search routes ignore incoming URL query parameters except a leading `@` mapping's destination parameters; normal mappings preserve them.

## Configuration

- Store hosts without a protocol and normalize them with `withProtocol()`.
- Direct search engines use `{ url, search }`; site searches use `{ site }` and reuse the default engine.
- Use `SEARCH_TERMS_PLACEHOLDER` in search templates.

## Workflow

- Run `pnpm typecheck` and `git diff --check` for every change.
- Use focused Bun assertions for affected routing behavior.
- Do not deploy or change Git history unless explicitly requested.
