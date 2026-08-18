import { errorPage } from './html';
import { getMappingResult } from './mappings';
import { getSearchResult } from './search';

export default {
	fetch(request): Response {
		const requestUrl = new URL(request.url);
		const { pathname, search } = requestUrl;

		if (pathname === '/favicon.ico') {
			return new Response(null, { status: 404 });
		}

		const result = getSearchResult(requestUrl) ?? getMappingResult(pathname, search);

		return 'redirect' in result
			? Response.redirect(result.redirect, 302)
			: errorPage(result.status, result.message);
	},
} satisfies ExportedHandler<Env>;
