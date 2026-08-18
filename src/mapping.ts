const data: Array<[string, Array<string>]> = [['github.com/SymphonySimper', ['github', 'git', 'gh']]];

export const mappings: Map<string, string> = new Map();
for (const [path, keys] of data) {
	const value = path.includes('://') ? path : `https://${path}`;

	for (const key of keys) {
		const pathname = `/${key}`;

		if (mappings.has(pathname)) {
			throw new Error(`Duplicate pathname found: ${pathname} already mapped to ${mappings.get(pathname)}.`);
		}

		mappings.set(pathname, value);
	}
}
