import { getMappingResult } from '../mappings';
import type { RouteResult } from '../result';
import GENERATED_SEARCH from '../generated/search.json';

const SEARCH_PATHNAME = '/s';
const FORM_SEARCH_PATHNAME = '/q';

type ResolvedSearchEngine = {
	homepage: string;
	beforeTerms: string;
	afterTerms: string;
	prefix: string;
};

const SEARCH_ENGINES: Record<string, ResolvedSearchEngine> = GENERATED_SEARCH.engines;
const DEFAULT_SEARCH_ENGINE = SEARCH_ENGINES[GENERATED_SEARCH.default];

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

	if (searchPathname !== SEARCH_PATHNAME && searchPathname !== FORM_SEARCH_PATHNAME) {
		return undefined;
	}

	const queryPath = queryIndex === -1 ? '' : pathname.slice(queryIndex + 1);
	const query = decodeQuery(searchPathname === FORM_SEARCH_PATHNAME ? queryPath.replaceAll('+', ' ') : queryPath).trim();

	if (query.startsWith('@')) {
		const mapping = query.slice(1);
		const mappingSearchIndex = mapping.indexOf('?');
		const mappingPath = mappingSearchIndex === -1 ? mapping : mapping.slice(0, mappingSearchIndex);
		const mappingPathname = `/${mappingPath.split('/').map(encodeURIComponent).join('/')}`;
		const mappingSearch = mappingSearchIndex === -1 ? url.search : mapping.slice(mappingSearchIndex);

		return getMappingResult(mappingPathname, mappingSearch, 'none');
	}

	if (query === '') {
		return { redirect: DEFAULT_SEARCH_ENGINE.homepage, cache: 'none' };
	}

	if (!query.includes('!')) {
		return { redirect: createSearchUrl(DEFAULT_SEARCH_ENGINE, query), cache: 'none' };
	}

	let engine = DEFAULT_SEARCH_ENGINE;
	let hasBang = false;
	const searchTerms: Array<string> = [];

	for (const token of query.split(/\s+/)) {
		const bang = token.startsWith('!') ? token.slice(1).toLowerCase() : '';

		const bangEngine = Object.hasOwn(SEARCH_ENGINES, bang) ? SEARCH_ENGINES[bang] : undefined;

		if (bangEngine) {
			if (!hasBang) {
				engine = bangEngine;
				hasBang = true;
			}

			continue;
		}

		searchTerms.push(token);
	}

	return { redirect: createSearchUrl(engine, searchTerms.join(' ')), cache: 'none' };
}
