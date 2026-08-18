import { getMappingResult } from '../mappings';
import type { RouteResult } from '../result';
import { withProtocol } from '../url';
import { CONFIG, SEARCH_TERMS_PLACEHOLDER } from './config';

const SEARCH_PATHNAMES = new Set(['/s', '/search', '/q', '/query']);

type ResolvedSearchEngine = {
	homepage: string;
	beforeTerms: string;
	afterTerms: string;
	prefix: string;
};

function create() {
	const defaultEngine = CONFIG.engines[CONFIG.default];
	const defaultSearch = withProtocol(`${defaultEngine.url}${defaultEngine.search}`);
	const entries = Object.entries(CONFIG.engines).map(([key, engine]) => {
		const homepage = withProtocol('site' in engine ? engine.site : engine.url);
		const search = 'site' in engine ? defaultSearch : withProtocol(`${engine.url}${engine.search}`);
		const termsIndex = search.indexOf(SEARCH_TERMS_PLACEHOLDER);

		return [
			key,
			{
				homepage,
				beforeTerms: search.slice(0, termsIndex),
				afterTerms: search.slice(termsIndex + SEARCH_TERMS_PLACEHOLDER.length),
				prefix: 'site' in engine ? `site:${engine.site} ` : '',
			},
		] as const;
	});

	return new Map<string, ResolvedSearchEngine>(entries);
}

const SEARCH_ENGINES = create();
const DEFAULT_SEARCH_ENGINE = SEARCH_ENGINES.get(CONFIG.default)!;

function decodeQuery(value: string): string {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
}

function createSearchUrl(engine: ResolvedSearchEngine, query: string): string {
	if (query === '') {
		return engine.homepage;
	}

	return `${engine.beforeTerms}${encodeURIComponent(`${engine.prefix}${query}`)}${engine.afterTerms}`;
}

export function getSearchResult(url: URL): RouteResult | undefined {
	const pathname = url.pathname;
	const queryIndex = pathname.indexOf('/', 1);
	const searchPathname = queryIndex === -1 ? pathname : pathname.slice(0, queryIndex);

	if (!SEARCH_PATHNAMES.has(searchPathname)) {
		return undefined;
	}

	const query = (queryIndex === -1 ? url.searchParams.get('q') : decodeQuery(pathname.slice(queryIndex + 1)))?.trim() ?? '';

	if (query.startsWith('@')) {
		const mapping = query.slice(1);
		const mappingSearchIndex = mapping.indexOf('?');
		const mappingPath = mappingSearchIndex === -1 ? mapping : mapping.slice(0, mappingSearchIndex);
		const mappingPathname = `/${mappingPath.split('/').map(encodeURIComponent).join('/')}`;
		const mappingSearch = mappingSearchIndex === -1 ? (queryIndex === -1 ? '' : url.search) : mapping.slice(mappingSearchIndex);

		return getMappingResult(mappingPathname, mappingSearch);
	}

	if (query === '') {
		return { redirect: DEFAULT_SEARCH_ENGINE.homepage };
	}

	if (!query.includes('!')) {
		return { redirect: createSearchUrl(DEFAULT_SEARCH_ENGINE, query) };
	}

	let engine = DEFAULT_SEARCH_ENGINE;
	let hasBang = false;
	const searchTerms: Array<string> = [];

	for (const token of query.split(/\s+/)) {
		const bang = token.startsWith('!') ? token.slice(1).toLowerCase() : '';

		const bangEngine = SEARCH_ENGINES.get(bang);

		if (bangEngine) {
			if (!hasBang) {
				engine = bangEngine;
				hasBang = true;
			}

			continue;
		}

		searchTerms.push(token);
	}

	return { redirect: createSearchUrl(engine, searchTerms.join(' ')) };
}
