import CONFIG from './config';

function create() {
	const mappings = new Map<string, string>();
	const entries = Object.entries(CONFIG)
		.flatMap(([href, keys]) => {
			const value = href.includes('://') ? href : `https://${href}`;
			const allKeys = keys.flatMap((key) => (key.includes('-') ? [key, key.replaceAll('-', ' ')] : key));

			return allKeys.map((key) => [`/${encodeURIComponent(key)}`, value] as const);
		})
		.sort(([a], [b]) => a.localeCompare(b));

	for (const [pathname, href] of entries) {
		if (mappings.has(pathname)) {
			throw new Error(`Duplicate pathname found: ${pathname} already mapped to ${mappings.get(pathname)}.`);
		}

		mappings.set(pathname, href);
	}

	return mappings;
}

const mappings = create();

export function getMapping(pathname: string): string | undefined {
	const exact = mappings.get(pathname);

	if (exact) {
		return exact;
	}

	let match: string | undefined;

	for (const [key, href] of mappings) {
		if (!key.startsWith(pathname)) {
			continue;
		}

		if (match !== undefined && match !== href) {
			return undefined;
		}

		match = href;
	}

	return match;
}
