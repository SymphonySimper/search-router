import CONFIG from './config';
import type { RouteResult } from '../result';
import { withProtocol } from '../url';

function create() {
	const mappings = new Map<string, string>();
	const entries = Object.entries(CONFIG)
		.flatMap(([href, keys]) => {
			const value = withProtocol(href);
			const allKeys = keys.flatMap((key) => (key.includes('-') ? [key, key.replaceAll('-', ' ')] : key));

			return allKeys.map((key) => [`/${encodeURIComponent(key.toLowerCase())}`, value] as const);
		})
		.sort(([a], [b]) => a.length - b.length || a.localeCompare(b));

	for (const [pathname, href] of entries) {
		if (mappings.has(pathname)) {
			throw new Error(`Duplicate pathname found: ${pathname} already mapped to ${mappings.get(pathname)}.`);
		}

		mappings.set(pathname, href);
	}

	return mappings;
}

const mappings = create();

function isSubsequence(sequence: string, value: string): boolean {
	let position = -1;

	for (const character of sequence) {
		position = value.indexOf(character, position + 1);

		if (position === -1) {
			return false;
		}
	}

	return true;
}

function getMapping(pathname: string): string | undefined {
	const slugIndex = pathname.indexOf('/', 1);
	const mappingPathname = (slugIndex === -1 ? pathname : pathname.slice(0, slugIndex)).toLowerCase();
	const slug = slugIndex === -1 ? '' : pathname.slice(slugIndex);
	const exact = mappings.get(mappingPathname);

	if (exact) {
		return `${exact}${slug}`;
	}

	for (const [key, href] of mappings) {
		if (isSubsequence(mappingPathname, key)) {
			return `${href}${slug}`;
		}
	}

	return undefined;
}

export function getMappingResult(pathname: string, search = ''): RouteResult {
	const url = getMapping(pathname);

	return url
		? { redirect: `${url}${search}` }
		: { status: 404, message: `No mapping found for ${pathname}.` };
}
