export const SEARCH_TERMS_PLACEHOLDER = '{searchTerms}' as const;
export const DEFAULT_SEARCH_KEY = 'default' as const;

type Target = {
	keys: Array<string>;
	path?: `/${string}`;
	search?: `${string}${typeof SEARCH_TERMS_PLACEHOLDER}${string}`;
};

export const CONFIG: Record<string, Array<Target>> = {
	// Personal
	'symphonysimper.com': [
		{ keys: ['portfolio', 'i', 'my', 'me'] },
		{ keys: ['color', 'c'], path: '/color', search: `/${SEARCH_TERMS_PLACEHOLDER}` },
	],

	// Finance
	'unifiedportal-mem.epfindia.gov.in': [{ keys: ['epfo', 'pf'], path: '/memberinterface' }],
	'passbook.epfindia.gov.in': [{ keys: ['epfo-passbook', 'pf-book'], path: '/MemberPassBook/login' }],
	'pli.indiapost.gov.in': [{ keys: ['indian-post-insurance', 'pli'] }],

	// Bills
	'login.airfiber.co.in': [{ keys: ['airfiber', 'afr'], path: '/customer_portal' }],

	// Dev / tools
	'github.com': [
		{ keys: ['github', 'gh'] },
		{ keys: ['repos', 'repo'], path: '/repos' },
		{ keys: ['dotfiles', 'dots', 'nix-config'], path: '/SymphonySimper/.dotfiles' },
	],
	'regex101.com': [{ keys: ['regex101', 're101'] }],

	// Dev / infrastructure
	'porkbun.com': [{ keys: ['porkbun', 'pork', 'bun', 'domain'], search: `/checkout/search?q=${SEARCH_TERMS_PLACEHOLDER}` }],
	'dash.cloudflare.com': [{ keys: ['cloudflare', 'flare', 'cf'] }],
	'console.cloud.google.com': [{ keys: ['console', 'gcp'] }],

	// Dev / web
	'fonts.google.com': [{ keys: ['google-fonts', 'gf'] }],
	'developer.mozilla.org': [
		{ keys: ['mdn'] },
		{ keys: ['html', 'css', 'js'], path: '/en-US/play' },
		{ keys: ['mdn-scan', 'observatory'], path: '/en-US/observatory' },
	],
	'svelte.dev': [{ keys: ['svelte', 'sv'] }],
	'svelte-changelog.dev': [{ keys: ['svelte-changelog', 'sv-log'] }],
	'tailwindcss.com': [{ keys: ['tailwindcss', 'tailwind'], path: '/docs/installation' }],
	'npmx.dev': [{ keys: ['npm'], search: `/search?q=${SEARCH_TERMS_PLACEHOLDER}` }],

	// Dev / browser
	'chromeenterprise.google': [{ keys: ['chrome-enterprise-policy-list'], path: '/policies' }],

	// Dev / Nix
	'nix.dev': [{ keys: ['nix-builtins', 'nb'], path: '/manual/nix/latest/language/builtins.html' }],
	'nixpkgs-tracker.ocfox.me': [{ keys: ['nix-pr-tracker', 'npt'] }],
	'wiki.nixos.org': [{ keys: ['nix-wiki', 'nw'], path: '/wiki/NixOS_Wiki' }],
	'noogle.dev': [{ keys: ['noogle', 'ng'], search: `/q?term=${SEARCH_TERMS_PLACEHOLDER}` }],
	'search.nixos.org': [
		{
			keys: ['no'],
			path: '/options',
			search: `?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=${SEARCH_TERMS_PLACEHOLDER}`,
		},
		{
			keys: ['np'],
			path: '/packages',
			search: `?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=${SEARCH_TERMS_PLACEHOLDER}`,
		},
	],

	// Dev / learning
	'courses.joshwcomeau.com': [{ keys: ['joshw-courses', 'josh'] }],
	'leetcode.com': [{ keys: ['leetcode', 'lt'] }],

	// Search engines
	'www.google.com': [
		{ keys: ['default', 'g'], search: `/search?q=${SEARCH_TERMS_PLACEHOLDER}` },
		{ keys: ['flip', 'coin'], path: '/search?q=google%20flip%20a%20coin' },
		{ keys: ['map', 'm'], path: '/maps', search: `/search/${SEARCH_TERMS_PLACEHOLDER}` },
	],
	'search.brave.com': [{ keys: ['b'], search: `/search?q=${SEARCH_TERMS_PLACEHOLDER}` }],

	// Shopping
	'www.amazon.in': [{ keys: ['an'], search: `/s?k=${SEARCH_TERMS_PLACEHOLDER}` }],
	'www.flipkart.com': [{ keys: ['f'], search: `/search?q=${SEARCH_TERMS_PLACEHOLDER}` }],

	// Communication
	'mail.google.com': [
		{ keys: ['gmail', 'gm'], path: '/mail/u/0' },
		{ keys: ['gmail-1', 'gm1'], path: '/mail/u/1' },
		{ keys: ['gmail-2', 'gm2'], path: '/mail/u/2' },
	],
	'discord.com': [{ keys: ['discord', 'dis'], path: '/channels/@me' }],
	'meet.google.com': [{ keys: ['google-meet', 'meet'] }],
	'web.whatsapp.com': [{ keys: ['whatsapp', 'wp'] }],
	'app.element.io': [{ keys: ['element', 'matrix'] }],

	// Social
	'www.reddit.com': [{ keys: ['reddit', 'rt'] }],

	// Productivity
	'drive.google.com': [{ keys: ['google-drive', 'drive'] }],
	'calendar.google.com': [{ keys: ['cal', 'calendar'] }],

	// Entertainment
	'www.youtube.com': [{ keys: ['youtube', 'yt'], search: `/results?search_query=${SEARCH_TERMS_PLACEHOLDER}` }],
	'tenor.com': [{ keys: ['t', 'gif'], search: `/search/${SEARCH_TERMS_PLACEHOLDER}-gifs` }],

	// Gaming
	'store.steampowered.com': [{ keys: ['steam', 'sm'], search: `/search?term=${SEARCH_TERMS_PLACEHOLDER}` }],
	'steamdb.info': [{ keys: ['steamdb', 'sb'], search: `/search/?q=${SEARCH_TERMS_PLACEHOLDER}` }],
	'www.protondb.com': [{ keys: ['protondb', 'pb'], search: `/search?q=${SEARCH_TERMS_PLACEHOLDER}` }],

	// Utilities
	'excalidraw.com': [{ keys: ['excalidraw', 'ed', 'draw'] }],
	'www.keybr.com': [{ keys: ['keybr'] }],
	'monkeytype.com': [{ keys: ['monkeytype', 'mt'] }],
	'squoosh.app': [{ keys: ['squoosh', 'sq', 'image-compress'] }],
	'www.virustotal.com': [{ keys: ['virustotal', 'vt'] }],
	'speed.cloudflare.com': [{ keys: ['speed', 'speedtest', 'ookla'] }],

	// AI
	'chatgpt.com': [
		{ keys: ['chatgpt', 'gpt', 'a'], search: `?q=${SEARCH_TERMS_PLACEHOLDER}` },
		{ keys: ['at'], search: `?temporary-chat=true&q=${SEARCH_TERMS_PLACEHOLDER}` },
		{ keys: ['fg'], search: `?temporary-chat=true&q=Fix%20grammar%20%60${SEARCH_TERMS_PLACEHOLDER}%60` },
	],
	'gemini.google.com': [{ keys: ['gemini', 'gi'] }],

	// .new (keys should start with 'c')
	'doc.new': [{ keys: ['cdoc'] }], // Google Docs
	'sheet.new': [{ keys: ['csheet'] }], // Google Sheets
	'slide.new': [{ keys: ['cslide'] }], // Google Slides
	'cal.new': [{ keys: ['ccal'] }], // Google Calendar
	'meet.new': [{ keys: ['cmeet'] }], // Google Meet
	'repo.new': [{ keys: ['crepo'] }], // Github
	'gist.new': [{ keys: ['cgist'] }], // Github
};
