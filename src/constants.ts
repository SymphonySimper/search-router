export const RESERVED_PATHNAMES = {
	favicon: '/favicon.ico',
};

export const SEARCH_QUERY_PARAM = 'q';

export const DEFAULT_HEADERS: HeadersInit = {
	'x-robots-tag': 'noindex',
};

export const KEY_PATTERN = '[a-z0-9-]+';
export const SEARCH_BANG_REGEX = new RegExp(`!(${KEY_PATTERN})`); // bangs can be anywhere
