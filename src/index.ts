import { getMappingResult } from './mappings';
import { getSearchResult } from './search';
import { errorPage } from './utils';

export default {
	fetch(request): Response {
		const requestUrl = new URL(request.url);
		const { pathname, search } = requestUrl;

		if (pathname === '/favicon.ico') {
			return new Response(null, {
				status: 404,
				headers: { 'cache-control': 'private, max-age=86400' },
			});
		}

		const result = getSearchResult(requestUrl) ?? getMappingResult(pathname, search);

		if ('redirect' in result) {
			return new Response(null, {
				status: 302,
				headers: {
					location: result.redirect,
					'cache-control': result.cache === 'short' ? 'private, max-age=300' : 'private, no-store',
				},
			});
		}

		return errorPage(result.status, result.message);
	},
} satisfies ExportedHandler<Env>;
