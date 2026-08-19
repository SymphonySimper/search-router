import { mkdir, writeFile } from 'node:fs/promises';

import MAPPING_CONFIG from '../src/mappings/config.ts';
import { CONFIG as SEARCH_CONFIG, SEARCH_TERMS_PLACEHOLDER, type SearchEngine } from '../src/search/config.ts';

const GENERATED_DIRECTORY = new URL('../src/generated/', import.meta.url);
const RESERVED_PATHNAMES = new Set(['/s', '/q']);

type ResolvedSearchEngine = {
	homepage: string;
	beforeTerms: string;
	afterTerms: string;
	prefix: string;
};

function resolveHttpUrl(value: string, label: string): string {
	const resolved = /^[a-z][a-z\d+.-]*:/i.test(value) ? value : `https://${value}`;
	let url: URL;

	try {
		url = new URL(resolved);
	} catch {
		throw new Error(`${label} is not a valid URL: ${value}`);
	}

	if (url.protocol !== 'https:' && url.protocol !== 'http:') {
		throw new Error(`${label} must use HTTP or HTTPS: ${value}`);
	}

	return resolved;
}

function compileMappings(): Record<string, string> {
	const entries: Array<[string, string]> = [];
	const pathnames = new Map<string, string>();

	for (const [href, aliases] of Object.entries(MAPPING_CONFIG)) {
		if (aliases.length === 0) {
			throw new Error(`Mapping destination must have at least one alias: ${href}`);
		}

		const destination = resolveHttpUrl(href, 'Mapping destination');

		for (const alias of aliases) {
			const pathname = `/${encodeURIComponent(alias.toLowerCase())}`;

			if (RESERVED_PATHNAMES.has(pathname)) {
				throw new Error(`Mapping alias collides with reserved route: ${pathname}`);
			}

			const existing = pathnames.get(pathname);

			if (existing) {
				throw new Error(`Duplicate mapping alias: ${pathname} maps to both ${existing} and ${destination}.`);
			}

			pathnames.set(pathname, destination);
			entries.push([pathname, destination]);
		}
	}

	return Object.fromEntries(entries);
}

function resolveDirectSearch(engine: Extract<SearchEngine, { url: string }>, key: string): { homepage: string; search: string } {
	const matches = engine.search.split(SEARCH_TERMS_PLACEHOLDER).length - 1;

	if (matches !== 1) {
		throw new Error(`Search engine ${key} must contain exactly one ${SEARCH_TERMS_PLACEHOLDER} placeholder.`);
	}

	const homepage = resolveHttpUrl(engine.url, `Search engine ${key} homepage`);
	const search = resolveHttpUrl(`${engine.url}${engine.search}`, `Search engine ${key} search URL`);

	return { homepage, search };
}

function compileSearchEngines(): { default: string; engines: Record<string, ResolvedSearchEngine> } {
	const { default: defaultKey, engines } = SEARCH_CONFIG;
	const defaultEngine = engines[defaultKey];

	if ('site' in defaultEngine) {
		throw new Error(`Default search engine must define a direct search URL: ${defaultKey}`);
	}

	const defaultSearch = resolveDirectSearch(defaultEngine, defaultKey).search;
	const entries: Array<[string, ResolvedSearchEngine]> = [];

	for (const [key, engine] of Object.entries(engines)) {
		if (key === '' || key !== key.toLowerCase()) {
			throw new Error(`Search engine key must be non-empty and lowercase: ${key}`);
		}

		let homepage: string;
		let search: string;
		let prefix: string;

		if ('site' in engine) {
			homepage = resolveHttpUrl(engine.site, `Site search engine ${key} homepage`);
			search = defaultSearch;
			prefix = `site:${engine.site} `;
		} else {
			({ homepage, search } = resolveDirectSearch(engine, key));
			prefix = '';
		}

		const termsIndex = search.indexOf(SEARCH_TERMS_PLACEHOLDER);

		entries.push([
			key,
			{
				homepage,
				beforeTerms: search.slice(0, termsIndex),
				afterTerms: search.slice(termsIndex + SEARCH_TERMS_PLACEHOLDER.length),
				prefix,
			},
		]);
	}

	return {
		default: defaultKey,
		engines: Object.fromEntries(entries),
	};
}

await mkdir(GENERATED_DIRECTORY, { recursive: true });
await Promise.all([
	writeFile(new URL('mappings.json', GENERATED_DIRECTORY), `${JSON.stringify(compileMappings(), null, '\t')}\n`),
	writeFile(new URL('search.json', GENERATED_DIRECTORY), `${JSON.stringify(compileSearchEngines(), null, '\t')}\n`),
]);
