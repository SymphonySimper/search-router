type Mappings = Map<string, string>;

const CONFIG: Record<string, Array<string>> = { 'github.com/SymphonySimper': ['github', 'git', 'gh'] };

function create(): Mappings {
	const mappings: Mappings = new Map();

	for (const [href, keys] of Object.entries(CONFIG)) {
		const value = href.includes('://') ? href : `https://${href}`;

		for (const key of keys) {
			const pathname = `/${key}`;

			if (mappings.has(pathname)) {
				throw new Error(`Duplicate pathname found: ${pathname} already mapped to ${mappings.get(pathname)}.`);
			}

			mappings.set(pathname, value);
		}
	}

	return mappings;
}

export const mappings = create();
