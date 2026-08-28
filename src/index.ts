import { DEFAULT_HEADERS, RESERVED_PATHNAMES } from './constants.ts';
import { getUrlForRequest } from './router.ts';
import { withProtocol } from './utils.ts';

export default {
	fetch(request): Response {
		const requestUrl = new URL(request.url);

		if (requestUrl.pathname === RESERVED_PATHNAMES.favicon) {
			return new Response(null, {
				status: 404,
				headers: {
					...DEFAULT_HEADERS,
					'cache-control': 'private, max-age=86400',
				},
			});
		}

		const urlArgs = getUrlForRequest(requestUrl);

		if (urlArgs) {
			return new Response(null, {
				status: 302,
				headers: {
					...DEFAULT_HEADERS,
					location: withProtocol(...urlArgs),
					'cache-control': 'private, max-age=300',
				},
			});
		}

		return new Response(null, {
			status: 404,
			headers: {
				...DEFAULT_HEADERS,
				'cache-control': 'private, no-store',
			},
		});
	},
} satisfies ExportedHandler<Env>;
