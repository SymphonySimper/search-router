import { SEARCH_BANG_REGEX, SEARCH_QUERY_PARAM } from './constants.ts';
import { DEFAULT_ROUTE, PARTS, ROUTES } from './generated.ts';
import type { DirectSearchRoute, Route } from './types.ts';

type ResultType = string | null;

function getDirectSearchResult(route: DirectSearchRoute, query: string): string {
	const encodedQuery = encodeURIComponent(query);

	if (route.length === 3) {
		const [hostIndex, beforeIndex, afterIndex] = route;
		return PARTS[hostIndex] + PARTS[beforeIndex] + encodedQuery + PARTS[afterIndex];
	}

	const [hostIndex, pathIndex, beforeIndex, afterIndex] = route;
	return PARTS[hostIndex] + PARTS[pathIndex] + PARTS[beforeIndex] + encodedQuery + PARTS[afterIndex];
}

export function getUrlForRequest(url: URL): ResultType {
	// pathname search takes precedence over param search
	let query: string = url.pathname.slice(1); // remove '/'

	if (query && query.includes('%')) {
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
	const match = query.includes('!') ? query.match(SEARCH_BANG_REGEX) : null;

	let route: Route;

	if (match && Object.hasOwn(ROUTES, match[1])) {
		route = ROUTES[match[1]];
		query = query.replace(match[0], '').trim();
	} else {
		route = DEFAULT_ROUTE;
	}

	if (query === '') {
		const host = PARTS[route[0]];
		const path = route.length === 2 || route.length === 4 ? PARTS[route[1]] : null;

		return path !== null ? host + path : host;
	}

	if (route.length === 1 || route.length === 2) {
		const host = PARTS[route[0]];

		return getDirectSearchResult(DEFAULT_ROUTE, `site:${host} ${query}`);
	}

	return getDirectSearchResult(route, query);
}
