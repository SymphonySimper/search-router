export const RESERVED_PATHNAMES = {
	favicon: '/favicon.ico',
};

export const SEARCH_QUERY_PARAM = 'q';

export const DEFAULT_HEADERS: HeadersInit = {
	'referrer-policy': 'no-referrer',
	'x-robots-tag': 'noindex',
	// refer: https://hstspreload.org/?domain=p1a.in#submission-requirements
	'strict-transport-security': 'max-age=31536000; includeSubDomains; preload',
};

export const KEY_PATTERN = '[a-z0-9-]+';
export const SEARCH_SHORTCUT_REGEX = new RegExp(`^\\.(${KEY_PATTERN})`);

export const PROTOCOL = 'https://';
