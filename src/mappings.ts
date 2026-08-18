import CONFIG from './config';

function create() {
	const mappings = new Map<string, string>();
	const entries = Object.entries(CONFIG)
		.flatMap(([href, keys]) => {
			const value = href.includes('://') ? href : `https://${href}`;
			const allKeys = keys.flatMap((key) => (key.includes('-') ? [key, key.replaceAll('-', ' ')] : key));

			return allKeys.map((key) => [`/${encodeURIComponent(key)}`, value] as const);
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

export function getMapping(pathname: string): string | undefined {
	const exact = mappings.get(pathname);

	if (exact) {
		return exact;
	}

	for (const [key, href] of mappings) {
		if (isSubsequence(pathname, key)) {
			return href;
		}
	}

	return undefined;
}
