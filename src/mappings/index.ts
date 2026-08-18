import CONFIG from './config';
import type { RouteResult } from '../result';
import { withProtocol } from '../url';

function create() {
	const mappings = new Map<string, string>();

	for (const [href, keys] of Object.entries(CONFIG)) {
		const value = withProtocol(href);

		for (const key of keys) {
			const pathname = `/${encodeURIComponent(key.toLowerCase())}`;

			if (mappings.has(pathname)) {
				throw new Error(`Duplicate pathname found: ${pathname} already mapped to ${mappings.get(pathname)}.`);
			}

			mappings.set(pathname, value);
		}
	}

	return mappings;
}

const mappings = create();

function getMapping(pathname: string): string | undefined {
	const slugIndex = pathname.indexOf('/', 1);
	const mappingPathname = (slugIndex === -1 ? pathname : pathname.slice(0, slugIndex)).toLowerCase();
	const slug = slugIndex === -1 ? '' : pathname.slice(slugIndex);
	const href = mappings.get(mappingPathname);

	return href ? `${href}${slug}` : undefined;
}

export function getMappingResult(pathname: string, search = '', cache: 'short' | 'none' = search === '' ? 'short' : 'none'): RouteResult {
	const url = getMapping(pathname);

	return url ? { redirect: `${url}${search}`, cache } : { status: 404, message: `No mapping found for ${pathname}.` };
}
