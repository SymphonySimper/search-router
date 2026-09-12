export const SEARCH_TERMS_PLACEHOLDER = '{searchTerms}' as const;
export const DEFAULT_SEARCH_KEY = 'default' as const;

type Target = {
	keys: Array<string>;
	path?: `/${string}`;
	search?: `${string}${typeof SEARCH_TERMS_PLACEHOLDER}${string}`;
};

export const CONFIG: Record<string, Array<Target>> = {
	// AI
	'chatgpt.com': [
		{ keys: ['gpt', 'a'], search: `?q=${SEARCH_TERMS_PLACEHOLDER}` },
		{ keys: ['at'], search: `?temporary-chat=true&q=${SEARCH_TERMS_PLACEHOLDER}` },
		{ keys: ['fg'], search: `?temporary-chat=true&q=Fix%20grammar%20%60${SEARCH_TERMS_PLACEHOLDER}%60` },
	],
	'gemini.google.com': [{ keys: ['gi'] }],

	// Bills
	'login.airfiber.co.in': [{ keys: ['airfiber', 'afr'], path: '/customer_portal' }],

	// Communication
	'app.element.io': [{ keys: ['element', 'matrix'] }],
	'discord.com': [{ keys: ['discord', 'dis'], path: '/channels/@me' }],
	'mail.google.com': [
		{ keys: ['gm'], path: '/mail/u/0' },
		{ keys: ['gm1'], path: '/mail/u/1' },
		{ keys: ['gm2'], path: '/mail/u/2' },
	],
	'meet.google.com': [{ keys: ['gmeet', 'meet'] }],
	'web.whatsapp.com': [{ keys: ['wp'] }],

	// Dev / browser
	'chromeenterprise.google': [{ keys: ['chrome-policy'], path: '/policies' }],

	// Dev / infrastructure
	'console.cloud.google.com': [{ keys: ['console', 'gcp'] }],
	'dash.cloudflare.com': [{ keys: ['cloudflare', 'flare', 'cf'] }],
	'porkbun.com': [{ keys: ['porkbun', 'pork', 'bun', 'domain'], search: `/checkout/search?q=${SEARCH_TERMS_PLACEHOLDER}` }],

	// Dev / learning
	'courses.joshwcomeau.com': [{ keys: ['josh'] }],
	'leetcode.com': [{ keys: ['leet', 'lt'] }],

	// Dev / Nix
	'nix.dev': [{ keys: ['nix-builtins', 'nb'], path: '/manual/nix/latest/language/builtins.html' }],
	'nixpkgs-tracker.ocfox.me': [{ keys: ['nix-pr-tracker', 'npt'], search: `?pr=${SEARCH_TERMS_PLACEHOLDER}` }],
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
	'wiki.nixos.org': [{ keys: ['nix-wiki', 'nw'], path: '/wiki/NixOS_Wiki' }],

	// Dev / tools
	'github.com': [
		{ keys: ['github', 'gh'] },
		{ keys: ['repos', 'repo'], path: '/repos' },
		{ keys: ['dots'], path: '/SymphonySimper/.dotfiles' },
	],
	'regex101.com': [{ keys: ['regex101', 're101'] }],

	// Dev / web
	'developer.mozilla.org': [
		{ keys: ['mdn'] },
		{ keys: ['html', 'css', 'js'], path: '/en-US/play' },
		{ keys: ['mdn-scan', 'observatory'], path: '/en-US/observatory' },
	],
	'fonts.google.com': [{ keys: ['gfonts', 'fonts'] }, { keys: ['gicons'], path: '/icons' }],
	'icon-sets.iconify.design': [{ keys: ['iconify', 'icon'] }],
	'npmx.dev': [{ keys: ['npm'], search: `/search?q=${SEARCH_TERMS_PLACEHOLDER}` }],
	'svelte-changelog.dev': [{ keys: ['sv-log'] }],
	'svelte.dev': [{ keys: ['svelte', 'sv'] }],
	'tailwindcss.com': [{ keys: ['tailwind'], path: '/docs/installation' }],

	// Entertainment
	'myanimelist.net': [
		{ keys: ['mal'], search: `/anime.php?q=${SEARCH_TERMS_PLACEHOLDER}&cat=anime` },
		{ keys: ['mymal'], path: '/animelist/SymphonySimper' },
	],
	'www.netflix.com': [{ keys: ['netflix', 'flix'], search: `/search?q=${SEARCH_TERMS_PLACEHOLDER}` }],
	'tenor.com': [{ keys: ['t', 'gif'], search: `/search/${SEARCH_TERMS_PLACEHOLDER}-gifs` }],
	'www.youtube.com': [{ keys: ['yt'], search: `/results?search_query=${SEARCH_TERMS_PLACEHOLDER}` }],

	// Finance
	'passbook.epfindia.gov.in': [{ keys: ['pfbook'], path: '/MemberPassBook/login' }],
	'pli.indiapost.gov.in': [{ keys: ['pli'] }],
	'unifiedportal-mem.epfindia.gov.in': [{ keys: ['epfo', 'pf'], path: '/memberinterface' }],

	// Gaming
	'steamdb.info': [{ keys: ['steamdb', 'sb'], search: `/search/?q=${SEARCH_TERMS_PLACEHOLDER}` }],
	'store.steampowered.com': [{ keys: ['steam', 'sm'], search: `/search?term=${SEARCH_TERMS_PLACEHOLDER}` }],
	'www.protondb.com': [{ keys: ['protondb', 'pb'], search: `/search?q=${SEARCH_TERMS_PLACEHOLDER}` }],

	// .new (keys should start with 'c')
	'cal.new': [{ keys: ['ccal'] }], // Google Calendar
	'doc.new': [{ keys: ['cdoc'] }], // Google Docs
	'gist.new': [{ keys: ['cgist'] }], // Github
	'meet.new': [{ keys: ['cmeet'] }], // Google Meet
	'repo.new': [{ keys: ['crepo'] }], // Github
	'sheet.new': [{ keys: ['csheet'] }], // Google Sheets
	'slide.new': [{ keys: ['cslide'] }], // Google Slides

	// Personal
	'symphonysimper.com': [
		{ keys: ['portfolio', 'i', 'my', 'me'] },
		{ keys: ['color', 'c'], path: '/color', search: `/${SEARCH_TERMS_PLACEHOLDER}` },
	],

	// Productivity
	'calendar.google.com': [{ keys: ['cal', 'calendar'] }],
	'docs.google.com': [
		{ keys: ['doc', 'docs'], path: '/document', search: `?q=${SEARCH_TERMS_PLACEHOLDER}` },
		{ keys: ['slide', 'slides'], path: '/presentation', search: `?q=${SEARCH_TERMS_PLACEHOLDER}` },
		{ keys: ['sheet', 'sheets'], path: '/spreadsheets', search: `?q=${SEARCH_TERMS_PLACEHOLDER}` },
	],
	'drive.google.com': [{ keys: ['gdrive', 'drive'] }],
	'www.figma.com': [{ keys: ['figma'] }],

	// Search engines
	'search.brave.com': [{ keys: ['b'], search: `/search?q=${SEARCH_TERMS_PLACEHOLDER}` }],
	'www.google.com': [
		{ keys: ['default', 'g'], search: `/search?q=${SEARCH_TERMS_PLACEHOLDER}` },
		{ keys: ['flip', 'coin'], path: '/search?q=google%20flip%20a%20coin' },
		{ keys: ['map', 'm'], path: '/maps', search: `/search/${SEARCH_TERMS_PLACEHOLDER}` },
	],

	// Shopping
	'www.amazon.in': [{ keys: ['an'], search: `/s?k=${SEARCH_TERMS_PLACEHOLDER}` }],
	'www.flipkart.com': [{ keys: ['ft'], search: `/search?q=${SEARCH_TERMS_PLACEHOLDER}` }],

	// Social
	'www.reddit.com': [{ keys: ['reddit', 'rt'] }],

	// Utilities
	'excalidraw.com': [{ keys: ['draw'] }],
	'monkeytype.com': [{ keys: ['monkey'] }],
	'speed.cloudflare.com': [{ keys: ['speed'] }],
	'squoosh.app': [{ keys: ['squoosh', 'sq'] }],
	'www.keybr.com': [{ keys: ['keybr'] }],
	'www.virustotal.com': [{ keys: ['virustotal', 'vt'] }],
};
