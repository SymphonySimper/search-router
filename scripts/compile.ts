import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { CONFIG, DEFAULT_SEARCH_KEY, SEARCH_TERMS_PLACEHOLDER } from '../src/config.ts';
import { KEY_PATTERN, RESERVED_PATHNAMES } from '../src/constants.ts';
import type { Parts, Route } from '../src/types.ts';
import { withProtocol } from '../src/utils.ts';

const RESERVED_PATHNAMES_VALUES = Object.values(RESERVED_PATHNAMES);

const KEY_REGEX = new RegExp(`^${KEY_PATTERN}$`);

const parts: Parts = [];
const routes = new Map<string, Route>();

function addToParts(value: string): number {
	let index = parts.indexOf(value);
	if (index !== -1) return index;

	parts.push(value);
	return parts.length - 1;
}

function isNotURL(...args: Parameters<typeof withProtocol>): boolean {
	return !URL.canParse(withProtocol(...args));
}

for (const [host, targets] of Object.entries(CONFIG)) {
	if (isNotURL(host)) {
		throw new Error(`Not a valid host: ${host}`);
	}

	const hostIndex = addToParts(host);

	for (const target of targets) {
		const { keys, path, search } = target;

		const value: Route = [hostIndex];

		if (path !== undefined) {
			if (isNotURL(parts[hostIndex], path)) {
				throw new Error(`Not a valid path: ${path}`);
			}

			value.push(addToParts(path));
		}

		if (search !== undefined) {
			if (!search.includes(SEARCH_TERMS_PLACEHOLDER)) {
				throw new Error(`Search does not have placeholder: ${search}`);
			}

			const [before, after] = search.split(SEARCH_TERMS_PLACEHOLDER);
			value.push(addToParts(before), addToParts(after));
		}

		for (const key of keys) {
			if (!KEY_REGEX.test(key)) {
				throw new Error(`'${key}' is not a valid key. It should match this pattern '${KEY_PATTERN}'.`);
			}

			if (RESERVED_PATHNAMES_VALUES.includes(`/${key}`)) {
				throw new Error(`'/${key}' is reserved.`);
			}

			if (routes.has(key)) {
				throw new Error(`'${key}' already has a value.`);
			}

			routes.set(key, value);
		}
	}
}

const defaultRoute = routes.get(DEFAULT_SEARCH_KEY);

if (!defaultRoute) {
	throw new Error(`Default search key does not exist: ${DEFAULT_SEARCH_KEY}`);
}

if (defaultRoute.length < 3) {
	throw new Error(`Default search key must be a direct search: ${DEFAULT_SEARCH_KEY}`);
}

const content = `import type { Parts, DirectSearchRoute, Route } from './types.ts';

export const PARTS: Parts = ${JSON.stringify(parts)};

export const ROUTES: Record<string, Route> = ${JSON.stringify(Object.fromEntries(routes))};
export const DEFAULT_ROUTE = ROUTES[${JSON.stringify(DEFAULT_SEARCH_KEY)}] as DirectSearchRoute;
`;

await writeFile(join(import.meta.dirname, '../src/generated.ts'), content);
