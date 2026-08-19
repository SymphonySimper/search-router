import GENERATED_MAPPINGS from '../generated/mappings.json';
import type { RouteResult } from '../types';

const MAPPINGS: Record<string, string> = GENERATED_MAPPINGS;

function getMapping(pathname: string): string | undefined {
	const slugIndex = pathname.indexOf('/', 1);
	const mappingPathname = (slugIndex === -1 ? pathname : pathname.slice(0, slugIndex)).toLowerCase();
	const slug = slugIndex === -1 ? '' : pathname.slice(slugIndex);
	const href = MAPPINGS[mappingPathname];

	return href ? `${href}${slug}` : undefined;
}

export function getMappingResult(pathname: string, search = '', cache: 'short' | 'none' = search === '' ? 'short' : 'none'): RouteResult {
	const url = getMapping(pathname);

	return url ? { redirect: `${url}${search}`, cache } : { status: 404, message: `No mapping found for ${pathname}.` };
}
