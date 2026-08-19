export function errorPage(status: number, message: string): Response {
	const html = `
<!doctype html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<style>
		body {
			margin: 0;
			padding: 1rem;
			box-sizing: border-box;
			height: 100vh;
			display: grid;
			place-items: center;
			text-align: center;
			color: #666;
			font: 0.875rem monospace;
		}

		@media (prefers-color-scheme: dark) {
			body {
				background: #111;
				color: #aaa;
			}
		}
	</style>
</head>
<body>${message}</body>`;

	return new Response(html, {
		status,
		headers: {
			'content-type': 'text/html;charset=UTF-8',
			'cache-control': 'private, no-store',
		},
	});
}
