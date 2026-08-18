export function notFoundPage(pathname: string): Response {
	const html = `
	<!DOCTYPE html>
	<body>
		<p>404</p>
		<h1>No mapping found for ${pathname}.</h1>

		<style>
			* {
				margin: 0;
				box-sizing: border-box;
			}

			html,
			body {
				width: 100%;
				height: 100%;
			}

			body {
				--bg: #fafafa;
				--p: #b0b0b0;
				--h1: #3a3a3a;

				padding: 1rem;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				gap: 2px;
				text-align: center;
				background-color: var(--bg);

				p {
					font-family: monospace;
					font-size: 4rem;
					font-weight: 800;
					color: var(--p);
				}

				h1 {
					font-family: sans-serif;
					font-size: 1rem;
					font-weight: 400;
					color: var(--h1);
				}
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #111;
					--p: #666;
					--h1: #d0d0d0;
				}
			}
		</style>
	</body>
`;
	return new Response(html, {
		status: 404,
		headers: {
			'content-type': 'text/html;charset=UTF-8',
		},
	});
}
