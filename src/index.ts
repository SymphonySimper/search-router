import { notFoundPage } from './html';
import { getMapping } from './mappings';
import { getSearchRedirect } from './search';

export default {
	async fetch(request): Promise<Response> {
		const { pathname, search } = new URL(request.url);

		if (pathname === '/favicon.ico') {
			return new Response('No favicon.', { status: 404 });
		}

		const searchUrl = getSearchRedirect(pathname);

		if (searchUrl) {
			return Response.redirect(searchUrl, 302);
		}

		const url = getMapping(pathname);

		if (url) {
			return Response.redirect(`${url}${search}`, 302);
		}

		return notFoundPage(pathname);
	},
} satisfies ExportedHandler<Env>;
