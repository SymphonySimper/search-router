import CONFIG from './config';

function create() {
	const mappings = new Map<string, string>();

	for (const [href, keys] of Object.entries(CONFIG)) {
		const value = href.includes('://') ? href : `https://${href}`;

		const allKeys = keys.flatMap((k) => (k.includes('-') ? [k, k.replaceAll('-', ' ')] : k));

		for (const key of allKeys) {
			const pathname = `/${encodeURIComponent(key)}`;

			if (mappings.has(pathname)) {
				throw new Error(`Duplicate pathname found: ${pathname} already mapped to ${mappings.get(pathname)}.`);
			}

			mappings.set(pathname, value);
		}
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
