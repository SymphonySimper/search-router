import { SEARCH_BANG_REGEX, SEARCH_QUERY_PARAM } from './constants.ts';
import { DEFAULT_ROUTE, PARTS, ROUTES } from './generated.ts';
import type { Route } from './types.ts';
import { withProtocol } from './utils.ts';

type ResultType = Parameters<typeof withProtocol> | null;

export function getUrlForRequest(url: URL): ResultType {
	// pathname search takes precedence over param search
	let query: string = url.pathname.slice(1); // remove '/'

	if (query) {
		try {
			query = decodeURIComponent(query);
		} catch {}
	} else if (url.search) {
		query = url.searchParams.get(SEARCH_QUERY_PARAM) ?? '';
	}

	query = query.trim();

	if (query === '') {
		return null;
	}

	// Checking for '!' and then doing match is faster
	const [bang, bangEngineKey] = (query.includes('!') ? query.match(SEARCH_BANG_REGEX) : null) ?? [null, null];

	let route: Route;

	if (bang && bangEngineKey && Object.hasOwn(ROUTES, bangEngineKey)) {
		route = ROUTES[bangEngineKey];
		query = query.replace(bang, '').trim();
	} else {
		route = DEFAULT_ROUTE;
	}

	if (query === '') {
		const host = PARTS[route[0]];
		const path = route.length === 2 || route.length === 4 ? PARTS[route[1]] : null;

		return path !== null ? [host, path] : [host];
	}

	if (route.length === 1 || route.length === 2) {
		const host = PARTS[route[0]];

		const [defaultHostIndex, defaultBeforeIndex, defaultAfterIndex] = DEFAULT_ROUTE;
		return [PARTS[defaultHostIndex], PARTS[defaultBeforeIndex], encodeURIComponent(`site:${host} ${query}`), PARTS[defaultAfterIndex]];
	}

	if (route.length === 3) {
		const [hostIndex, beforeIndex, afterIndex] = route;
		return [PARTS[hostIndex], PARTS[beforeIndex], encodeURIComponent(query), PARTS[afterIndex]];
	}

	if (route.length === 4) {
		const [hostIndex, pathIndex, beforeIndex, afterIndex] = route;
		return [PARTS[hostIndex], PARTS[pathIndex], PARTS[beforeIndex], encodeURIComponent(query), PARTS[afterIndex]];
	}

	return null;
}
