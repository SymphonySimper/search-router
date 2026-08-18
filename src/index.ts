import { errorPage } from './html';
import { getMapping } from './mappings';
import { getSearchRedirect } from './search';

export default {
	fetch(request): Response {
		const { pathname, search, searchParams } = new URL(request.url);

		if (pathname === '/favicon.ico') {
			return new Response(null, { status: 404 });
		}

		const searchUrl = getSearchRedirect(pathname, searchParams.get('q'));

		if (searchUrl) {
			return Response.redirect(searchUrl, 302);
		}

		const url = getMapping(pathname);

		if (url) {
			return Response.redirect(`${url}${search}`, 302);
		}

		return errorPage(404, `No mapping found for ${pathname}.`);
	},
} satisfies ExportedHandler<Env>;
